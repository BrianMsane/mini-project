'''Process user personal and academic data, including symbols
'''

import os
import typing
import pymupdf
from easyocr import Reader
from users.users import Applicant


class ApplicantDataProcess:
    '''Process, serialize, store, and utilize user data
    '''

    def __init__(
        self,
        applicant: Applicant,
        type: typing.Literal['personal', 'academic']
    ):
        self.applicant = applicant
        self._type = type


    def ocr(
        self,
        path: str
    ) -> str:
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
