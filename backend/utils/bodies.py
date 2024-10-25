'''Endpoints request bodies
'''


from pydantic import BaseModel


class Email(BaseModel):
    '''Contact Us request body'''
    name: str
    email: str
    message: str


class AuthenticateReq(BaseModel):
    '''Authentication request body'''
    username: str
    password: str


class RegisterReq(BaseModel):
    '''Registration request body'''
    username: str
    email: str
    password: str
    conf_password: str