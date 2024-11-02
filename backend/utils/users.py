'''Information to be collected from the user
'''

from dataclasses import dataclass, asdict
from typing import Literal
import json


@dataclass
class Account:
    username: str
    email: str
    password: str
    created: str


@dataclass
class Demographic:
    first_name: str
    middle_name: str
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
    region: str
    country: str
    phone: str | list[str]
    telephone: str
    email: str


@dataclass
class NextofKin:
    firstname: str
    middlename: str
    surname: str
    relationship: str
    phone: str
    email: str


@dataclass
class EducationalBackground:
    school: str
    qualifications: str
    grades: str
    stream: str
    points: int


@dataclass
class JSONTrait:
    def dict(self):
        return asdict(self)
    def json(self):
        return json.dumps(self.dict(), default=str)


@dataclass
class Applicant(JSONTrait):
    '''This class represents a student who is willing to apply for university
    '''
    demographic: Demographic
    kin: NextofKin
    education: EducationalBackground
    interests: list[str]
    _type: str='users.Applicant'
