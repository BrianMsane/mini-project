'''Endpoints request bodies
'''


import typing

class Email(typing.TypedDict):
    '''Contact Us request body'''
    name: str
    email: str
    message: str