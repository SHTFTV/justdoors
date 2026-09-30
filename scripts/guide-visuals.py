from pathlib import Path
from html import escape
ROOT=Path(__file__).resolve().parents[1]
DIAGRAMS={
'project':['Opening','Door + frame','Hardware + installation'],
'door-schedule-quote-checklist':['Opening ID + size','Door + frame schedule','Hardware + scope'],
'replace-door-or-door-and-frame':['Existing opening','Frame condition','Leaf or complete set'],
'compare-commercial-door-quotes':['Product scope','Hardware + preparation','Delivery + installation'],
'pressed-steel-door-replacement-checklist':['Steel leaf + frame','Anchors + preparations','Hardware + site access'],
'emergency-board-up-information-checklist':['Safe context photos','Opening + damage','Site contact + access'],
'emergency-door-window-board-up':['Damaged opening','Temporary closure','Replacement review'],
'guides':['Record the opening','Prepare the schedule','Compare complete scopes']}
for slug,labels in DIAGRAMS.items():
 parts=['<svg xmlns="http://www.w3.org/2000/svg" width="960" height="300" viewBox="0 0 960 300" role="img" aria-labelledby="title"><title id="title">'+escape(' → '.join(labels))+'</title><rect width="960" height="300" rx="20" fill="#141414"/>']
 for i,label in enumerate(labels):
  x=25+i*315
  parts.append(f'<rect x="{x}" y="35" width="280" height="230" rx="14" fill="#202020" stroke="#b88934"/><text x="{x+24}" y="90" fill="#fbbf24" font-family="Arial,sans-serif" font-size="32">0{i+1}</text>')
  words=label.split();lines=[];line=''
  for w in words:
   if len(line+' '+w)>19:lines.append(line);line=w
   else:line=(line+' '+w).strip()
  lines.append(line)
  for n,line in enumerate(lines):parts.append(f'<text x="{x+24}" y="{145+n*31}" fill="#fff" font-family="Arial,sans-serif" font-size="22">{escape(line)}</text>')
 parts.append('</svg>');(ROOT/'public/images'/f'{slug}-planning.svg').write_text(''.join(parts))
