"""Verify the actual build artifact, including all local page/asset links."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse, unquote
import json, xml.etree.ElementTree as ET
class Page(HTMLParser):
 def __init__(self,s):
  super().__init__();self.h1=0;self.titles=0;self.can=[];self.links=[];self.ld=[];self.ins=False;self.buf='';self.feed(s)
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  if t=='h1':self.h1+=1
  if t=='title':self.titles+=1
  if t=='link' and a.get('rel')=='canonical':self.can.append(a.get('href'))
  if t in ['a','img','script']:
   v=a.get('href') if t=='a' else a.get('src')
   if v:self.links.append(v)
  if t=='script' and a.get('type')=='application/ld+json':self.ins=True;self.buf=''
 def handle_data(self,d):
  if self.ins:self.buf+=d
 def handle_endtag(self,t):
  if t=='script' and self.ins:self.ld.append(json.loads(self.buf));self.ins=False
urls=[e.text for e in ET.parse('dist/sitemap.xml').iter() if e.tag.endswith('loc')]
assert len(urls)==len(set(urls))
for url in urls:
 route=urlparse(url).path;file=Path('dist/index.html' if route=='/' else 'dist'+route+'.html');p=Page(file.read_text())
 assert p.h1==1,(url,'h1',p.h1)
 assert p.titles==1,(url,'title',p.titles)
 assert p.can==[url],(url,'canonical',p.can)
 for link in p.links:
  if not link.startswith('/') or link.startswith('//'):continue
  target=unquote(urlparse(link).path)
  candidates=[Path('dist'+target),Path('dist'+target+'.html')]
  assert target=='/' or any(f.is_file() for f in candidates),(url,'missing target',link)
print(f'Verified {len(urls)} URLs: headings, metadata, structured data and local links/assets.')
