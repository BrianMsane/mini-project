'''
'''

from pydantic import BaseModel


class User(BaseModel):
    username: str
    name: str
    points: int
