#!/usr/bin/env python3
"""Generate static, SEO-complete city landing pages from content/cities/*.md into public/<slug>.html."""
import os, re, glob, html, json
import markdown

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "content", "cities")
OUT = os.path.join(ROOT, "public")
SITE = "https://justdoors.co"

def slugify(name):
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")

def parse(md_path):
    raw = open(md_path, encoding="utf-8").read()
    # H1
    h1 = re.search(r"^#\s+(.+)$", raw, re.M).group(1).strip()
    # first bold intro paragraph -> meta description
    intro = re.search(r"\*\*(.+?)\*\*", raw, re.S)
    desc = re.sub(r"\s+", " ", intro.group(1)).strip() if intro else h1
    desc = re.sub(r"[*_`]", "", desc)[:300]
    # FAQ pairs from the FAQ section
    faqs = []
    faq_sec = re.search(r"##[^\n]*FAQ[^\n]*\n(.*?)(?=\n##\s|\Z)", raw, re.S)
    if faq_sec:
        for m in re.finditer(r"\*\*(.+?\?)\*\*\s*\n+(.+?)(?=\n\*\*|\Z)", faq_sec.group(1), re.S):
            q = re.sub(r"\s+", " ", m.group(1)).strip()
            a = re.sub(r"\s+", " ", re.sub(r"[*_`]", "", m.group(2))).strip()
            if q and a:
                faqs.append((q, a))
    return raw, h1, desc, faqs

def city_from_h1(h1):
    m = re.search(r"in\s+([A-Za-z .'-]+?),?\s*BC", h1)
    return m.group(1).strip() if m else h1

TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>{title}</title>
<meta name="description" content="{desc}"/>
<link rel="canonical" href="{url}"/>
<meta property="og:type" content="website"/>
<meta property="og:site_name" content="Just Doors"/>
<meta property="og:title" content="{title}"/>
<meta property="og:description" content="{desc}"/>
<meta property="og:url" content="{url}"/>
<meta name="twitter:card" content="summary_large_image"/>
<link rel="icon" href="/favicon.svg"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&family=Syne:wght@700;800&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet"/>
<script type="application/ld+json">{schema}</script>
<style>
:root{{--ink:#0a0a0a;--panel:#141414;--line:#262626;--text:#e5e5e5;--muted:#a3a3a3;--dim:#737373;--amber:#f59e0b;--amber2:#fbbf24}}
*{{box-sizing:border-box;margin:0;padding:0}}
body{{background:var(--ink);color:var(--text);font-family:'Plus Jakarta Sans',system-ui,sans-serif;line-height:1.65;-webkit-font-smoothing:antialiased}}
a{{color:var(--amber);text-decoration:none}} a:hover{{color:var(--amber2)}}
.top{{border-bottom:1px solid var(--line);position:sticky;top:0;background:rgba(10,10,10,.85);backdrop-filter:blur(8px);z-index:10}}
.top .in{{max-width:820px;margin:0 auto;padding:14px 22px;display:flex;align-items:center;justify-content:space-between}}
.brand{{display:flex;align-items:center;gap:9px;font-weight:800;color:#fff;font-family:'Syne',sans-serif}}
.brand .mk{{width:26px;height:26px;border-radius:7px;background:var(--amber);display:flex;align-items:center;justify-content:center;color:var(--ink);font-weight:800}}
.top .cta{{font-size:13px;font-weight:700;background:var(--amber);color:var(--ink);padding:8px 14px;border-radius:9px}}
.wrap{{max-width:820px;margin:0 auto;padding:44px 22px 80px}}
.crumb{{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--dim);margin-bottom:20px}}
.crumb a{{color:var(--dim)}} .crumb a:hover{{color:var(--amber)}}
h1{{font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(28px,5vw,44px);line-height:1.08;letter-spacing:-.02em;color:#fff;margin-bottom:10px}}
h2{{font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(21px,3.4vw,28px);color:#fff;margin:38px 0 12px;letter-spacing:-.01em}}
h3{{font-weight:800;font-size:17px;color:var(--amber2);margin:24px 0 8px}}
p{{margin:0 0 15px;color:#d4d4d4}}
strong{{color:#fff}}
.wrap>p:first-of-type strong,.lead strong{{color:#fff}}
.lead{{font-size:18px;color:#fff;background:linear-gradient(180deg,rgba(245,158,11,.08),transparent);border-left:3px solid var(--amber);padding:16px 18px;border-radius:0 12px 12px 0;margin:0 0 8px}}
ul{{margin:0 0 15px 20px}} li{{margin:5px 0;color:#d4d4d4}}
em{{color:var(--muted)}}
.faq{{margin-top:8px}}
.footcta{{margin-top:44px;background:linear-gradient(135deg,rgba(245,158,11,.12),transparent);border:1px solid var(--line);border-radius:18px;padding:26px}}
.footcta h2{{margin-top:0}}
.btn{{display:inline-flex;align-items:center;gap:8px;background:var(--amber);color:var(--ink);font-weight:800;font-size:15px;padding:13px 22px;border-radius:11px;margin-top:6px}}
.sig{{margin-top:26px;padding-top:18px;border-top:1px solid var(--line);font-size:13px;color:var(--dim)}}
hr{{border:0;border-top:1px solid var(--line);margin:30px 0}}
</style>
</head>
<body>
<header class="top"><div class="in"><a class="brand" href="/"><span class="mk">J</span>Just Doors</a><a class="cta" href="/#quote">Get a quote</a></div></header>
<main class="wrap">
<div class="crumb"><a href="/">Just Doors</a> · Service Areas · {city}</div>
{body}
<div class="footcta">
<h2>Get a {city} door quote</h2>
<p>Send drawings, a door schedule, or a few photos and measurements — we return an itemized door package and quote, typically within one to two business days.</p>
<a class="btn" href="/#quote">Send your {city} door project →</a>
</div>
</main>
</body>
</html>
"""

def build_schema(url, title, desc, city, faqs):
    graph = [
        {
            "@type": ["Organization", "HomeAndConstructionBusiness"],
            "@id": url + "#business",
            "name": "Just Doors",
            "url": url,
            "description": desc,
            "areaServed": {"@type": "City", "name": city},
            "parentOrganization": {"@type": "Organization", "name": "Builderhaus", "url": "https://buildershaus.com"},
            "knowsAbout": ["Fire-rated doors", "Security doors", "Multi-family suite entry doors", "Door schedules", "NFPA 80"],
        },
        {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Just Doors", "item": SITE + "/"},
                {"@type": "ListItem", "position": 2, "name": city, "item": url},
            ],
        },
    ]
    if faqs:
        graph.append({
            "@type": "FAQPage",
            "mainEntity": [
                {"@type": "Question", "name": q,
                 "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in faqs
            ],
        })
    return json.dumps({"@context": "https://schema.org", "@graph": graph}, ensure_ascii=False)

def main():
    slugs = []
    for md in sorted(glob.glob(os.path.join(SRC, "*.md"))):
        raw, h1, desc, faqs = parse(md)
        slug = os.path.splitext(os.path.basename(md))[0]
        city = city_from_h1(h1)
        url = f"{SITE}/{slug}"
        body = markdown.markdown(raw, extensions=["extra"])
        # mark the lead paragraph (the first <p> that starts with <strong>)
        body = re.sub(r"<p><strong>", '<p class="lead"><strong>', body, count=1)
        schema = build_schema(url, h1, desc, city, faqs)
        page_hesc = TEMPLATE.format(
            title=html.escape(h1), desc=html.escape(desc), url=url, city=html.escape(city),
            schema=schema, body=body,
        )
        open(os.path.join(OUT, f"{slug}.html"), "w", encoding="utf-8").write(page_hesc)
        slugs.append((slug, city))
        print(f"  built /{slug}  ({len(body.split())} words, {len(faqs)} FAQs)")
    return slugs

if __name__ == "__main__":
    print("Generating city pages:")
    main()
