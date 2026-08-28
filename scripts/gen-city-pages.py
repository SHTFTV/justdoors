#!/usr/bin/env python3
"""Generate factual static city landing pages from content/cities/*.md into public/<slug>.html."""
import os, re, glob, html, json
from urllib.parse import quote
import markdown
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__))); SRC=os.path.join(ROOT,'content','cities'); OUT=os.path.join(ROOT,'public'); SITE='https://www.justdoors.co'; GSV='<meta name="google-site-verification" content="JOBgjbITYGnOGVozuyqPje7bcu4Ij1GjmmoNSBmDPyw" />'
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
 return json.dumps({'@context':'https://schema.org','@graph':[{'@type':'Organization','@id':'https://justdoors.co/#organization','name':'Just Doors','url':SITE+'/','description':'Door supply, schedules, takeoffs, hardware coordination and installation coordination in the Lower Mainland.','parentOrganization':{'@type':'Organization','name':'Builderhaus','url':'https://buildershaus.com/'}},{'@type':'Service','name':f'Door supply and coordination in {city}','url':url,'provider':{'@id':'https://justdoors.co/#organization'},'areaServed':{'@type':'City','name':city},'description':desc},{'@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem','position':1,'name':'Just Doors','item':SITE+'/'},{'@type':'ListItem','position':2,'name':city,'item':url}]}]},ensure_ascii=False).replace('</','<\\/')
def main():
 template=open(os.path.join(os.path.dirname(__file__),'_template.html'),encoding='utf-8').read(); widget=open(os.path.join(os.path.dirname(__file__),'_widget.html'),encoding='utf-8').read()
 for md in sorted(glob.glob(os.path.join(SRC,'*.md'))):
  raw,h1,desc=parse(md); slug=os.path.splitext(os.path.basename(md))[0]; city=city_from_h1(h1); url=f'{SITE}/{slug}'; body=markdown.markdown(raw,extensions=['extra']); body=re.sub(r'<p><strong>','<p class="lead"><strong>',body,count=1); cb=civic(slug,city); body=re.sub(r'(</p>)',r'\1\n'+cb.replace('\\','\\\\'),body,count=1) if cb else body; page=template.replace('__GSV__',GSV).replace('__TITLE__',html.escape(h1)).replace('__DESC__',html.escape(desc)).replace('__URL__',url).replace('__CITY__',html.escape(city)).replace('__SCHEMA__',schema(url,desc,city)).replace('__BODY__',body).replace('__WIDGET__',widget); open(os.path.join(OUT,f'{slug}.html'),'w',encoding='utf-8').write(page); print('built',slug)
if __name__=='__main__':main()
