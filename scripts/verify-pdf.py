"""Check generated PDF text coverage, embedded fonts, links, and page bounds."""
import json
import re
import sys

import pdfplumber
from pypdf import PdfReader

request = json.loads(sys.stdin.buffer.read().decode('utf-8'))
data = request['data']
reader = PdfReader(request['path'])

def normalize(value):
    return re.sub(r'\s+', '', re.sub(r'[\u2010-\u2015\u2212]', '-', value))

text = normalize('\n'.join(page.extract_text() for page in reader.pages))
expected = [data['profile'][key] for key in [
    'name', 'role', 'intro', 'target', 'period', 'specialties', 'company',
    'position', 'education', 'educationPeriod', 'educationStatus', 'email', 'phone', 'siteUrl',
]]
expected += data['careerHighlights']
for category, items in data['skills']:
    expected.extend([category, items])
for project in data['projects']:
    expected.extend([project['title'], project['period']])
    expected.extend(project['stack'])
    study = project.get('caseStudy')
    if study:
        for key, value in study.items():
            if isinstance(value, list):
                expected.extend(value)
            elif isinstance(value, str):
                expected.append(value)
    else:
        expected.extend(project['work'])
        if project.get('result'):
            expected.append(project['result'])
missing = [value for value in expected if normalize(value) not in text]
assert not missing, f'Missing PDF content: {missing}'
assert '\ufffd' not in text, 'Replacement glyphs in extracted text'
assert len(reader.pages) >= 2

for page in reader.pages:
    assert abs(float(page.mediabox.width) - 595.28) < 1
    assert abs(float(page.mediabox.height) - 841.89) < 1
    for font_reference in page['/Resources']['/Font'].values():
        font = font_reference.get_object()
        descriptor = font['/DescendantFonts'][0].get_object()['/FontDescriptor'].get_object()
        assert '/FontFile2' in descriptor or '/FontFile3' in descriptor, 'Font is not embedded'

with pdfplumber.open(request['path']) as pdf:
    for number, page in enumerate(pdf.pages, 1):
        assert len(page.chars) > 200, f'Unexpected sparse page: {number}'
        # Preserve the vector-based site styling and prevent a return to plain text export.
        assert len(page.rects) >= 2, f'Missing page background or panels: {number}'
        assert not page.images, f'PDF text should not be replaced by screenshots: {number}'
        assert all(c['x0'] >= 40 and c['x1'] <= page.width - 38 for c in page.chars), f'Horizontal overflow on page {number}'
        assert all(c['top'] >= 15 and c['bottom'] <= page.height - 15 for c in page.chars), f'Vertical overflow on page {number}'

links = [a.get_object().get('/A', {}).get('/URI') for page in reader.pages for a in page.get('/Annots', [])]
assert data['profile']['siteUrl'] in links
assert f"mailto:{data['profile']['email']}" in links
print(f'PASS: {len(expected)} content checks; {len(reader.pages)} A4 pages; embedded fonts, links and page bounds.')
