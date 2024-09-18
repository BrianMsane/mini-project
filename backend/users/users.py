'''Information to be collected from the user
'''

from dataclasses import dataclass, asdict
from typing import Union
import json


@dataclass
class Demographic:
    first_name: str
    middle_name: str
    surname: str
    date_of_birth: str
    gender: str
    home_address: str
    phone: str | list[str]
    email: str
    race: str
    languages: list[str]


@dataclass
class Family:
    parent_guardian_names: list[str]
    parent_guardian_contact_info: list[str]
    home_area: str


@dataclass
class EducationalBackground:
    high_school_name: str
    high_school_address: str
    high_school_transcript: str
    standardized_test_scores: dict[str, Union[int, str]]


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
class Student(JSONTrait):
    '''This class represents a student who is willing to apply for university'''
    demographic: Demographic
    family: Family
    education: EducationalBackground
    citizenship: CitizenshipResidency
    interests: list[str]        
