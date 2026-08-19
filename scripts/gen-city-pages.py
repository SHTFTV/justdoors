#!/usr/bin/env python3
"""Generate static, SEO-complete city landing pages from content/cities/*.md into public/<slug>.html.
Includes: city-hall map + permit links, and a static Rambo Wall & Ceiling contact floater with EyeSpyR badge."""
import os, re, glob, html, json
from urllib.parse import quote
import markdown

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "content", "cities")
OUT = os.path.join(ROOT, "public")
SITE = "https://justdoors.co"
GSV = '<meta name="google-site-verification" content="JOBgjbITYGnOGVozuyqPje7bcu4Ij1GjmmoNSBmDPyw" />'

# Per-city civic data (city hall + building authority + permits link)
CIVIC = {
  "vancouver": {"hall":"515 W 10th Ave, Vancouver, BC V5Z 4A8",
    "auth":"City of Vancouver — Development, Buildings & Licensing",
    "note":"Vancouver uses its own Vancouver Building By-law (VBBL), administered by Development, Buildings & Licensing, with fire review by Vancouver Fire & Rescue Services.",
    "permit":"https://vancouver.ca/home-property-development/building-permits.aspx"},
  "surrey": {"hall":"13450 104 Ave, Surrey, BC V3T 1V8",
    "auth":"City of Surrey — Building Division",
    "note":"Surrey follows the BC Building Code, administered by the City of Surrey Building Division, with fire review by Surrey Fire Service.",
    "permit":"https://www.surrey.ca/services-payments/building-permits"},
  "burnaby": {"hall":"4949 Canada Way, Burnaby, BC V5G 1M2",
    "auth":"City of Burnaby — Building Department",
    "note":"Burnaby follows the BC Building Code, administered by the City of Burnaby Building Department, with fire review by Burnaby Fire Department.",
    "permit":"https://www.burnaby.ca/services-and-payments/permits-and-applications"},
}

def city_from_h1(h1):
    m = re.search(r"in\s+([A-Za-z .'-]+?),?\s*BC", h1)
    return m.group(1).strip() if m else h1

def parse(md_path):
    raw = open(md_path, encoding="utf-8").read()
    h1 = re.search(r"^#\s+(.+)$", raw, re.M).group(1).strip()
    intro = re.search(r"\*\*(.+?)\*\*", raw, re.S)
    desc = re.sub(r"\s+", " ", intro.group(1)).strip() if intro else h1
    desc = re.sub(r"[*_`]", "", desc)[:300]
    faqs = []
    faq_sec = re.search(r"##[^\n]*FAQ[^\n]*\n(.*?)(?=\n##\s|\Z)", raw, re.S)
    if faq_sec:
        for m in re.finditer(r"\*\*(.+?\?)\*\*\s*\n+(.+?)(?=\n\*\*|\Z)", faq_sec.group(1), re.S):
            q = re.sub(r"\s+", " ", m.group(1)).strip()
            a = re.sub(r"\s+", " ", re.sub(r"[*_`]", "", m.group(2))).strip()
            if q and a: faqs.append((q, a))
    return raw, h1, desc, faqs

def civic_block(slug, city):
    c = CIVIC.get(slug)
    if not c: return ""
    mapq = quote(f"{city} City Hall, BC")
    src = f"https://maps.google.com/maps?q={mapq}&z=14&output=embed"
    return f'''<div class="civic">
  <div class="civic-map"><iframe loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="{src}" title="{html.escape(city)} City Hall map"></iframe></div>
  <div class="civic-info">
    <div class="civic-k">Local Building Authority</div>
    <div class="civic-auth">{html.escape(c["auth"])}</div>
    <p class="civic-note">{html.escape(c["note"])}</p>
    <div class="civic-hall"><span>City Hall</span> {html.escape(c["hall"])}</div>
    <div class="civic-links">
      <a class="civic-btn" href="{c["permit"]}" target="_blank" rel="noopener">Building Permits &amp; Applications &rarr;</a>
      <a class="civic-btn ghost" href="https://maps.google.com/maps?q={mapq}" target="_blank" rel="noopener">Open in Maps</a>
    </div>
  </div>
</div>'''

def build_schema(url, title, desc, city, faqs):
    graph = [
        {"@type": ["Organization","HomeAndConstructionBusiness"], "@id": url+"#business",
         "name":"Just Doors","url":url,"description":desc,
         "areaServed":{"@type":"City","name":city},
         "parentOrganization":{"@type":"Organization","name":"Builderhaus","url":"https://buildershaus.com"},
         "knowsAbout":["Fire-rated doors","Security doors","Multi-family suite entry doors","Door schedules","NFPA 80"]},
        {"@type":"BreadcrumbList","itemListElement":[
            {"@type":"ListItem","position":1,"name":"Just Doors","item":SITE+"/"},
            {"@type":"ListItem","position":2,"name":city,"item":url}]},
    ]
    if faqs:
        graph.append({"@type":"FAQPage","mainEntity":[
            {"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}} for q,a in faqs]})
    return json.dumps({"@context":"https://schema.org","@graph":graph}, ensure_ascii=False)

WIDGET = open(os.path.join(os.path.dirname(__file__), "_widget.html"), encoding="utf-8").read()

TEMPLATE = open(os.path.join(os.path.dirname(__file__), "_template.html"), encoding="utf-8").read()

def main():
    for md in sorted(glob.glob(os.path.join(SRC, "*.md"))):
        raw, h1, desc, faqs = parse(md)
        slug = os.path.splitext(os.path.basename(md))[0]
        city = city_from_h1(h1)
        url = f"{SITE}/{slug}"
        body = markdown.markdown(raw, extensions=["extra"])
        body = re.sub(r"<p><strong>", '<p class="lead"><strong>', body, count=1)
        # inject civic card right after the lead paragraph
        civ = civic_block(slug, city)
        if civ:
            body = re.sub(r"(</p>)", r"\1\n" + civ.replace("\\", "\\\\"), body, count=1)
        page = (TEMPLATE
            .replace("__GSV__", GSV)
            .replace("__TITLE__", html.escape(h1))
            .replace("__DESC__", html.escape(desc))
            .replace("__URL__", url)
            .replace("__CITY__", html.escape(city))
            .replace("__SCHEMA__", schema_safe(build_schema(url,h1,desc,city,faqs)))
            .replace("__BODY__", body)
            .replace("__WIDGET__", WIDGET))
        open(os.path.join(OUT, f"{slug}.html"),"w",encoding="utf-8").write(page)
        print(f"  built /{slug}  ({len(body.split())} words, {len(faqs)} FAQs, civic={'yes' if civ else 'no'})")

def schema_safe(s):
    return s.replace("</", "<\\/")

if __name__ == "__main__":
    print("Generating city pages:")
    main()
