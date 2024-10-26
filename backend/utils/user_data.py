'''Process user personal and academic data, including symbols
'''


import typing
from users.users import Applicant
from .extract import SymbolsExtraction


class DataProcessing(SymbolsExtraction):
    '''Process, serialize, store, and utilize user data
    '''

    def __init__(
        self,
        applicant: Applicant,
        type: typing.Literal['personal', 'academic']
    ):
        self.applicant = applicant
        self._type = type


    def process_personal(self):
        '''
        '''
        pass


    def process_academic(self):
        '''
        '''
        pass
