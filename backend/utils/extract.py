'''Extracting information from uploaded documents; Symbols
'''

import os
import pymupdf
from pydantic import BaseModel
from typing import Any, Literal
from easyocr import Reader


class Symbols(BaseModel):
    symbols: list[dict[str, Any]]
    _type: str='symbols'


class SymbolsExtraction:
    '''Extract the symbols from the given format and 
    '''

    def __init__(
        self,
        format: Literal['PNG', 'JPG', 'PDF']='PDF', 
        doc_type: Literal['certificate', 'symbols']='certificate'
    ):
        self.format = format
        self._type = doc_type


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


    def parse(text: str) -> Symbols:
        '''Parse the extracted information to get the symbols
        '''
        pass


    def redact(path: str):
        '''Redact sensitive information fromt the document
        '''
        pass
