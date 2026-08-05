#!/usr/bin/env python3
"""Render docs/product-screens-brief.md to PDF via headless Chrome.

The brief itself is generated from products.ts / platform-nav.ts, so when the
content data changes: regenerate the markdown, then run this.

    python3 scripts/brief-to-pdf.py
"""
import re, html, pathlib, subprocess, os
import tempfile
OUT = 'docs/product-screens-brief.pdf'
SP = tempfile.mkdtemp()
md = open('docs/product-screens-brief.md').read()

def inline(t):
    t = html.escape(t)
    t = re.sub(r'`([^`]+)`', r'<code>\1</code>', t)
    t = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', t)
    t = re.sub(r'(?<!\w)_([^_]+)_(?!\w)', r'<em>\1</em>', t)
    return t

out, lines, i = [], md.split('\n'), 0
while i < len(lines):
    ln = lines[i]
    if re.match(r'^\|', ln) and i+1 < len(lines) and re.match(r'^\|[-\s|]+\|$', lines[i+1]):
        hdr = [c.strip() for c in ln.strip('|').split('|')]
        cls = ' class="screens"' if hdr[0] == '#' else ' class="spec"'
        i += 2
        rows = []
        while i < len(lines) and lines[i].startswith('|'):
            rows.append([c.strip() for c in lines[i].strip('|').split('|')]); i += 1
        out.append(f'<table{cls}><thead><tr>' + ''.join(f'<th>{inline(c)}</th>' for c in hdr) + '</tr></thead><tbody>')
        for r in rows:
            out.append('<tr>' + ''.join(f'<td>{inline(c)}</td>' for c in r) + '</tr>')
        out.append('</tbody></table>')
        continue
    if ln.startswith('### '): out.append(f'<h3>{inline(ln[4:])}</h3>'); i+=1; continue
    if ln.startswith('## '):  out.append(f'<h2>{inline(ln[3:])}</h2>'); i+=1; continue
    if ln.startswith('# '):   out.append(f'<h1>{inline(ln[2:])}</h1>'); i+=1; continue
    if ln.strip() == '---':   out.append('<hr>'); i+=1; continue
    if re.match(r'^\d+\.\s', ln):
        items=[]
        while i < len(lines) and re.match(r'^\d+\.\s', lines[i]):
            items.append(inline(re.sub(r'^\d+\.\s','',lines[i]))); i+=1
        out.append('<ol>'+''.join(f'<li>{x}</li>' for x in items)+'</ol>'); continue
    if ln.startswith('- '):
        items=[]
        while i < len(lines) and (lines[i].startswith('- ') or (items and lines[i].startswith('  ') and lines[i].strip())):
            if lines[i].startswith('- '): items.append(inline(lines[i][2:]))
            else: items[-1] += ' ' + inline(lines[i].strip())
            i+=1
        out.append('<ul>'+''.join(f'<li>{x}</li>' for x in items)+'</ul>'); continue
    if not ln.strip(): i+=1; continue
    buf=[]
    while i < len(lines) and lines[i].strip() and not re.match(r'^(#|\||-\s|\d+\.\s|---)', lines[i]):
        buf.append(lines[i].strip()); i+=1
    if buf: out.append(f'<p>{inline(" ".join(buf))}</p>')

CSS = """
@page { size: A4; margin: 16mm 14mm 18mm; }
* { box-sizing: border-box; }
body { font: 10.5pt/1.55 -apple-system, "Helvetica Neue", Arial, sans-serif; color:#1a1725; margin:0; }
h1 { font-size: 25pt; line-height:1.15; letter-spacing:-0.02em; margin:0 0 6pt; }
h2 { font-size: 15pt; letter-spacing:-0.01em; margin:22pt 0 8pt; padding-bottom:5pt;
     border-bottom:2px solid #7c5cf8; color:#0d0b16; break-after:avoid; }
h3 { font-size: 12pt; margin:16pt 0 4pt; color:#0d0b16; break-after:avoid; }
h2 + p, h3 + p { margin-top:0; }
p, ul, ol { margin: 0 0 8pt; }
li { margin-bottom: 3pt; }
hr { border:0; border-top:1px solid #e3e1ea; margin:16pt 0; }
code { font: 8.6pt/1.4 "SF Mono", Menlo, monospace; background:#f3f2f7; padding:1pt 3pt;
       border-radius:3px; color:#5b3fd1; overflow-wrap:break-word; }
table { width:100%; border-collapse:collapse; margin:6pt 0 14pt; font-size:8.8pt; }
thead { display: table-header-group; }
tr { break-inside: avoid; }
th { text-align:left; background:#f3f2f7; border-bottom:1.5px solid #d5d2de;
     padding:5pt 6pt; font-size:8pt; text-transform:uppercase; letter-spacing:0.05em; color:#5c5870; }
td { padding:5pt 6pt; border-bottom:1px solid #ecebf1; vertical-align:top; }
tbody tr:nth-child(even) { background:#faf9fc; }
/* numbered screen tables only — the delivery-spec table has a label column here */
table.screens th:first-child, table.screens td:first-child {
  width:22pt; text-align:right; color:#8b8799; }
table.screens td:nth-child(2), table.screens th:nth-child(2) { width:24%; }
table.screens td:nth-child(3), table.screens th:nth-child(3) { width:28%; }
table.screens td:nth-child(4), table.screens th:nth-child(4) { width:9%; }
table.spec th:first-child, table.spec td:first-child { width:22%; font-weight:600; }
"""
doc = f'<!doctype html><meta charset="utf-8"><title>Product screens — design brief</title><style>{CSS}</style>' + '\n'.join(out)
pathlib.Path(SP+'/brief.html').write_text(doc)
subprocess.run(['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome','--headless','--disable-gpu',
  '--no-pdf-header-footer', f'--print-to-pdf={os.path.abspath(OUT)}', f'file://{SP}/brief.html'],
  check=True, capture_output=True)
d=open(OUT,'rb').read()
print(OUT, '| pages:', len(re.findall(rb'/Type\s*/Page[^s]', d)), '| size:', round(len(d)/1024), 'KB')
