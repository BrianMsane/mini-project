'''Extracting information from uploaded documents; Symbols
'''

import os
import pymupdf
from easyocr import Reader


def ocr(path: str) -> str:
    '''Extract text from images if scanned symbols or certficate are in png, jpeg, jpg format or PDF documents
    '''
    ext = os.path.splitext(path)[1]
    if ext in ('.png', '.jpeg', '.jpg'):
        info: str=''
        reader = Reader(['en'])
        for _, text, _ in reader.readtext(path):
            info += text + " "
        return text
    elif ext == '.pdf':
        doc = pymupdf.open(path)
        text = ''
        for page in doc:
            text += page.get_text()
            return text
