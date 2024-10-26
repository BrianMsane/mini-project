'''Information to be collected from the user
'''

from dataclasses import dataclass, asdict
from typing import Literal
import json
import datetime


@dataclass
class Account:
    username: str
    email: str
    password: str
    created: str


@dataclass
class Demographic:
    first_name: str
    middle_name: str=None
    surname: str
    date_of_birth: str
    gender: Literal['Male', 'Female', 'Other']
    nationality: str
    identity_no: str
    maritual: Literal['Single', 'Married', 'Other']
    residence: Literal['Yes', "No"]
    disability: Literal['Yes', 'No']
    medical: Literal['Yes', 'No']


@dataclass
class Contact:
    address: str
    phone: str | list[str]
    postal: str


@dataclass
class Family:
    parents: list[str]
    contacts: list[str]=None
    address: str
    area: str


@dataclass
class EducationalBackground:
    name: str
    addresss: str
    telephone: str


@dataclass
class CitizenshipResidency:
    citizenship_status: str
    country_of_birth: str
    state_residency: str


@dataclass
class JSONTrait:
    def dict(self):
        return asdict(self)
    def json(self):
        return json.dumps(self.dict(), default=str)


@dataclass
class Applicant(JSONTrait):
    '''This class represents a student who is willing to apply for university'''
    demographic: Demographic
    family: Family
    education: EducationalBackground
    citizenship: CitizenshipResidency
    interests: list[str]
    _type: str='users.Applicant'
