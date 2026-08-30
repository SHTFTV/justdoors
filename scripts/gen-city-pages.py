#!/usr/bin/env python3
"""Generate factual static city landing pages from content/cities/*.md into public/<slug>.html."""
import os, re, glob, html, json
from datetime import date
from urllib.parse import quote
import markdown
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__))); SRC=os.path.join(ROOT,'content','cities'); OUT=os.path.join(ROOT,'public'); SITE='https://www.justdoors.co'; GSV='<meta name="google-site-verification" content="JOBgjbITYGnOGVozuyqPje7bcu4Ij1GjmmoNSBmDPyw" />'
SERVICE_SRC=os.path.join(ROOT,'content','services')
EMERGENCY_NOTES={
'abbotsford':'Abbotsford requests may involve storefronts, farm-commercial buildings or multi-family properties; photos of both the damaged opening and surrounding wall help define a safe temporary closure.',
'burnaby':'Burnaby board-ups often involve strata common areas, retail podiums or service doors, so building access rules and the property manager contact should be included with the opening photos.',
'chilliwack':'For Chilliwack properties, send the address, opening dimensions and whether the damaged door or window is exposed to weather so temporary materials can be planned appropriately.',
'coquitlam':'Coquitlam strata and commercial requests should identify the affected unit or common area and any access-control hardware that must remain protected during temporary securing.',
'delta':'Delta service areas include industrial, residential and coastal locations; note wind or rain exposure and whether the opening is a door, sidelight, storefront panel or window.',
'ladner':'Ladner board-up planning should account for exterior exposure and older opening conditions, with wide photos showing the frame, cladding and safe fastening areas.',
'langley':'Langley requests can range from retail units to rural and industrial buildings; include gate or loading access details when they affect arrival at the damaged opening.',
'maple-ridge':'Maple Ridge property owners should send clear inside and outside photos, approximate dimensions and details about rain exposure or an opening that cannot latch.',
'mission':'Mission board-up scopes benefit from early confirmation of site access, opening size and whether temporary weather protection is required in addition to security.',
'new-westminster':'New Westminster requests may involve older masonry, heritage fabric or occupied strata buildings, so temporary fastening locations must be assessed without assuming a standard wall assembly.',
'north-vancouver':'North Vancouver board-ups should identify whether the property is in the City or District and describe slope, parking or loading constraints that may affect access.',
'pitt-meadows':'Pitt Meadows requests should note whether the opening is residential, agricultural-commercial or industrial and whether wind-driven rain protection is part of the temporary scope.',
'port-coquitlam':'Port Coquitlam storefront and industrial openings may include access-control or commercial hardware; document those components before temporary covering is planned.',
'port-moody':'Port Moody strata and mixed-use properties should provide the building contact, access instructions and photographs showing adjacent finishes that need protection.',
'richmond':'Richmond board-up planning should note storefront glazing, aluminum frames and weather exposure, with measurements taken only when the area is safe to approach.',
'surrey':'Surrey service requests cover a wide range of residential, retail and industrial properties; the neighbourhood, opening type and safe site-contact information help define the response.',
'tsawwassen':'Tsawwassen exterior openings can face coastal weather, so describe current wind and rain exposure and whether the temporary closure must protect finished cladding.',
'vancouver':'Vancouver requests may involve secured parkades, occupied strata buildings, retail storefronts or constrained loading areas; include access and property-contact details with the photos.',
'west-vancouver':'West Vancouver properties may have custom cladding and oversized openings; wide context photos help plan a temporary closure without assuming standard fastening points.',
'white-rock':'White Rock board-ups should account for coastal exposure, storefront or strata access, and the condition of the frame surrounding the damaged door or window.'}
CIVIC={
'vancouver':{'hall':'515 W 10th Ave, Vancouver, BC V5Z 4A8','auth':'City of Vancouver — Development, Buildings & Licensing','note':'Confirm current Vancouver Building By-law, permit and fire/life-safety requirements for the specific project.','permit':'https://vancouver.ca/home-property-development/building-permits.aspx'},
'surrey':{'hall':'13450 104 Ave, Surrey, BC V3T 1V8','auth':'City of Surrey — Building Division','note':'Confirm current municipal and BC Building Code requirements for the specific project.','permit':'https://www.surrey.ca/services-payments/building-permits'},
'burnaby':{'hall':'4949 Canada Way, Burnaby, BC V5G 1M2','auth':'City of Burnaby — Building Department','note':'Confirm current municipal and BC Building Code requirements for the specific project.','permit':'https://www.burnaby.ca/services-and-payments/permits-and-applications'},
'richmond':{'hall':'6911 No. 3 Road, Richmond, BC V6Y 2C1','auth':'City of Richmond — Building Approvals','note':'Confirm current municipal and BC Building Code requirements for the specific project.','permit':'https://www.richmond.ca/business-development/permits/building.htm'},
'coquitlam':{'hall':'3000 Guildford Way, Coquitlam, BC V3B 7N2','auth':'City of Coquitlam — Building Permits','note':'Confirm current municipal and BC Building Code requirements for the specific project.','permit':'https://www.coquitlam.ca/442/Building-Permits'},
'langley':{'hall':'20338 65 Ave, Langley, BC V2Y 3J1','auth':'Langley building departments','note':'Confirm whether the project is in the City or Township and use that authority’s current requirements.','permit':'https://www.tol.ca/en/business-and-development/building-permits.aspx'}}
def parse(path):
 raw=open(path,encoding='utf-8').read(); h1=re.search(r'^#\s+(.+)$',raw,re.M).group(1).strip(); intro=re.search(r'\*\*(.+?)\*\*',raw,re.S); desc=re.sub(r'\s+',' ',intro.group(1)).strip() if intro else h1; desc=re.sub(r'[*_`]','',desc); desc=desc if len(desc)<=155 else desc[:152].rsplit(' ',1)[0]+'...'; return raw,h1,desc
def city_from_h1(h1):
 m=re.search(r'in\s+([A-Za-z .&\'-]+?),?\s*BC',h1); return m.group(1).strip() if m else h1.replace('Door Supply & Installation in ','').replace(', BC','')
def civic(slug,city):
 c=CIVIC.get(slug)
 if not c:return ''
 q=quote(f'{city} City Hall, BC'); return f'''<div class="civic"><div class="civic-map"><iframe loading="lazy" src="https://maps.google.com/maps?q={q}&z=14&output=embed" title="{html.escape(city)} City Hall map"></iframe></div><div class="civic-info"><div class="civic-k">Local Building Authority</div><div class="civic-auth">{html.escape(c['auth'])}</div><p class="civic-note">{html.escape(c['note'])}</p><div class="civic-hall">{html.escape(c['hall'])}</div><div class="civic-links"><a class="civic-btn" href="{c['permit']}" target="_blank" rel="noopener">Building information &rarr;</a><a class="civic-btn ghost" href="https://maps.google.com/maps?q={q}" target="_blank" rel="noopener">Open in Maps</a></div></div></div>'''
def schema(url,desc,city):
 return json.dumps({'@context':'https://schema.org','@graph':[{'@type':'Organization','@id':'https://justdoors.co/#organization','name':'Just Doors','url':SITE+'/','description':'Door supply, schedules, takeoffs, hardware coordination and installation coordination in the Lower Mainland, with pressed-steel doors and frames as a priority service.','knowsAbout':['Pressed-steel doors','Hollow-metal doors and frames','Commercial doors','Fire-rated door assemblies','Architectural door hardware'],'parentOrganization':{'@type':'Organization','name':'Builderhaus','url':'https://buildershaus.com/'}},{'@type':'Service','name':f'Door supply and coordination in {city}','serviceType':['Pressed-steel doors and frames','Door supply','Door schedules and takeoffs','Installation coordination'],'url':url,'provider':{'@id':'https://justdoors.co/#organization'},'areaServed':{'@type':'City','name':city},'description':desc},{'@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem','position':1,'name':'Just Doors','item':SITE+'/'},{'@type':'ListItem','position':2,'name':city,'item':url}]}]},ensure_ascii=False).replace('</','<\\/')
def write_sitemap(slugs):
 today=date.today().isoformat()
 urls=[f'  <url><loc>{SITE}/</loc><lastmod>{today}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>']
 urls += [f'  <url><loc>{SITE}/{slug}</loc><lastmod>{today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>' for slug in slugs]
 urls.append(f'  <url><loc>{SITE}/emergency-door-window-board-up</loc><lastmod>{today}</lastmod><changefreq>monthly</changefreq><priority>0.9</priority></url>')
 xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+'\n'.join(urls)+'\n</urlset>\n'
 open(os.path.join(OUT,'sitemap.xml'),'w',encoding='utf-8').write(xml)

def main():
 template=open(os.path.join(os.path.dirname(__file__),'_template.html'),encoding='utf-8').read(); widget=open(os.path.join(os.path.dirname(__file__),'_widget.html'),encoding='utf-8').read()
 slugs=[]
 for md in sorted(glob.glob(os.path.join(SRC,'*.md'))):
  raw,h1,desc=parse(md); slug=os.path.splitext(os.path.basename(md))[0]; slugs.append(slug); city=city_from_h1(h1); url=f'{SITE}/{slug}'; body=markdown.markdown(raw,extensions=['extra']); body=re.sub(r'<p><strong>','<p class="lead"><strong>',body,count=1); cb=civic(slug,city); body=re.sub(r'(</p>)',r'\1\n'+cb.replace('\\','\\\\'),body,count=1) if cb else body
  feature=f'<figure class="steel-example"><img src="/images/pressed-steel-door-example.jpg" width="1536" height="1024" alt="Example pressed-steel commercial door and frame available for {html.escape(city)} projects"/><figcaption class="steel-copy"><h2>Pressed-steel doors in {html.escape(city)}</h2><p>Pressed-steel doors and frames are a priority Just Doors service for commercial, multi-family, parkade, stair, mechanical-room, warehouse and service openings. The complete assembly is coordinated to the project schedule and specified requirements.</p><small>Representative product example—not a claimed completed project</small></figcaption></figure>'
  local=f'<section><h2>Emergency door and window board-up in {html.escape(city)}</h2><p>{html.escape(EMERGENCY_NOTES[slug])}</p><p><a class="btn" href="/emergency-door-window-board-up">Emergency board-up service details &rarr;</a></p></section>'
  page=template.replace('__GSV__',GSV).replace('__TITLE__',html.escape(h1)).replace('__DESC__',html.escape(desc)).replace('__URL__',url).replace('__CITY__',html.escape(city)).replace('__SCHEMA__',schema(url,desc,city)).replace('__LEAD_FEATURE__',feature).replace('__BODY__',body).replace('__LOCAL_EMERGENCY__',local).replace('__WIDGET__',widget); open(os.path.join(OUT,f'{slug}.html'),'w',encoding='utf-8').write(page); print('built',slug)
 service=os.path.join(SERVICE_SRC,'emergency-door-window-board-up.md'); raw,h1,desc=parse(service); url=SITE+'/emergency-door-window-board-up'; body=markdown.markdown(raw,extensions=['extra']); body=re.sub(r'<p><strong>','<p class="lead"><strong>',body,count=1); feature='<figure class="steel-example"><img src="/images/emergency-door-window-board-up-example.jpg" width="1536" height="1024" alt="Representative temporary board-up securing a damaged exterior door and adjacent window"/><figcaption class="steel-copy"><h2>Temporary securing for damaged doors and windows</h2><p>Board-up work is a temporary safety, security and weather-protection measure while permanent door, frame, glass or window replacement is assessed.</p><small>Representative service example—not a claimed completed project</small></figcaption></figure>'; service_schema=json.dumps({'@context':'https://schema.org','@graph':[{'@type':'Service','name':'Emergency door and window board-up','serviceType':['Door board-up','Window board-up','Temporary opening security','Temporary weather protection'],'url':url,'provider':{'@id':'https://justdoors.co/#organization'},'areaServed':{'@type':'AdministrativeArea','name':'Lower Mainland, British Columbia'},'description':desc},{'@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem','position':1,'name':'Just Doors','item':SITE+'/'},{'@type':'ListItem','position':2,'name':'Emergency board-up','item':url}]}]},ensure_ascii=False)
 page=template.replace('__GSV__',GSV).replace('__TITLE__',html.escape(h1)).replace('__DESC__',html.escape(desc)).replace('__URL__',url).replace('__CITY__','Lower Mainland').replace('__SCHEMA__',service_schema).replace('__LEAD_FEATURE__',feature).replace('__BODY__',body).replace('__LOCAL_EMERGENCY__','').replace('__WIDGET__',widget); open(os.path.join(OUT,'emergency-door-window-board-up.html'),'w',encoding='utf-8').write(page); print('built emergency-door-window-board-up')
 write_sitemap(slugs)
if __name__=='__main__':main()
