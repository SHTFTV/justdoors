"""Build the editorial guides and add them to the generated sitemap."""
import glob, html, json, os, re
from pathlib import Path
import markdown
ROOT=Path(__file__).resolve().parents[1]
SITE='https://www.justdoors.co'
widget=(ROOT/'scripts/_widget.html').read_text()
city_links='<nav aria-label="Service cities"><h2>Door and wall projects in your city</h2><p>'+ ' · '.join('<a href="/'+f.stem+'">'+html.escape(f.stem.replace('-', ' ').title())+'</a>' for f in sorted((ROOT/'content/cities').glob('*.md')))+'</p></nav>'
template=(ROOT/'scripts/_template.html').read_text()
# Reuse the site's typography and navigation without city-specific sections.
head=template.split('<body>')[0]
head=head.replace('lang="en"','lang="en-CA"').replace('__GSV__','').replace('https://justdoors.co/icon-512.png',SITE+'/images/pressed-steel-door-example.jpg')
nav='<header class="top"><div class="in"><a class="brand" href="/">Just Doors</a><a href="/guides">Planning guides</a><a class="cta" href="/#quote">Get a quote</a></div></header>'
cta='<div class="footcta"><h2>Discuss your door project</h2><p>Send your opening list, drawings or photographs and project location for a scope review.</p><a class="btn" href="/#quote">Prepare a quote request →</a><p style="margin-top:16px"><a href="tel:7787732790">778-773-2790</a> · <a href="mailto:rambowallceiling@gmail.com">Email the project contact</a></p></div>'
posts=[]
for file in sorted((ROOT/'content/guides').glob('*.md')):
 raw=file.read_text(); title=re.search(r'^# (.+)',raw).group(1); desc=re.search(r'\*\*(.+?)\*\*',raw,re.S).group(1); slug=file.stem
 posts.append(dict(slug=slug,title=title,description=desc,content=markdown.markdown(raw),date='2026-09-29'))

def visual(slug,title):
 return '<figure class="steel-example"><img src="/images/'+slug+'-planning.svg" width="960" height="300" alt="Planning steps for '+html.escape(title)+'"/><figcaption class="steel-copy">'+html.escape(title)+': organize the information shown before confirming a project scope. <small>Source: original Just Doors planning diagram; not an installation detail.</small></figcaption></figure>'

def page(title,desc,url,body,schema):
 return head.replace('__TITLE__',html.escape(title)).replace('__DESC__',html.escape(desc)).replace('__URL__',url).replace('__SCHEMA__',json.dumps(schema).replace('<','\\u003c'))+'<body>'+nav+'<main class="wrap">'+body+city_links+'</main>'+widget+'</body></html>'

out=ROOT/'public/guides';out.mkdir(exist_ok=True)
for p in posts:
 url=SITE+'/guides/'+p['slug']
 schema={'@context':'https://schema.org','@type':'Article','headline':p['title'],'description':p['description'],'datePublished':p['date'],'dateModified':p['date'],'author':{'@type':'Organization','name':'Just Doors','url':SITE+'/'},'publisher':{'@type':'Organization','name':'Just Doors','url':SITE+'/'},'mainEntityOfPage':url,'inLanguage':'en-CA'}
 related='<nav aria-label="Related guides"><h2>Related planning guides</h2><ul>'+''.join('<li><a href="/guides/'+q['slug']+'">'+html.escape(q['title'])+'</a></li>' for q in posts if q!=p)+'</ul></nav>'
 p['content']=p['content'].replace('</h1>', '</h1>'+visual(p['slug'],p['title']),1)
 body='<nav class="crumb"><a href="/">Home</a> / <a href="/guides">Guides</a></nav><article>'+p['content']+'<p>Published September 29, 2026 · Just Doors</p></article>'+related+cta
 (out/(p['slug']+'.html')).write_text(page(p['title']+' | Just Doors',p['description'],url,body,schema))
body='<h1>Door Planning Guides</h1>'+visual('guides','Door planning workflow')+'<p class="lead">Practical checklists for preparing a door package, assessing an existing opening and comparing installation quotes.</p>'+''.join('<section><h2><a href="/guides/'+p['slug']+'">'+html.escape(p['title'])+'</a></h2><p>'+html.escape(p['description'])+'</p></section>' for p in posts)+cta
(ROOT/'public/guides.html').write_text(page('Door Planning Guides | Just Doors','Door schedule, replacement and commercial quote planning guides.',SITE+'/guides',body,{'@context':'https://schema.org','@type':'CollectionPage','name':'Door Planning Guides','url':SITE+'/guides'}))
p=ROOT/'public/sitemap.xml';s=p.read_text();extra=['guides']+['guides/'+p['slug'] for p in posts]
s=s.replace('</urlset>',''.join('<url><loc>'+SITE+'/'+slug+'</loc><lastmod>2026-09-29</lastmod></url>\n' for slug in extra)+'</urlset>');p.write_text(s)
print(f'Built {len(posts)} guides, their index and sitemap entries.')
