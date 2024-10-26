'''Define the FASTAPI endpoints for this application
'''


import logging
from fastapi import APIRouter, UploadFile, File
from db.mongo import read, create, connect
from utils.emails import EmailSupport
from utils.request import Email, AuthenticateReq, RegisterReq
import os
import dotenv


dotenv.load_dotenv()
router = APIRouter()


@router.get('/')
async def root():
    return {
        'message': 'This is the root endpoint'
    }


@router.post('/authenticate', tags=['Authenicate'])
async def authenticate(req: AuthenticateReq):
    '''Authenticate the users on login
    '''
    collection = connect()
    doc = read(collection=collection, query={'username': req.username})
    if doc:
        if doc['password'] == req.password:
            return True
    return False


@router.post('/register', tags=['Authenicate'])
async def register(req: RegisterReq):
    '''Register users on signup
    '''
    doc = {
        'username': req.username,
        'email': req.email,
        'password': req.password if req.conf_password == req.password else ''
    }
    collection = connect(collection='users')
    if create(collection=collection, doc=doc):
        return True


@router.post('/contact-us', tags=['Email-Handling'])
async def email_support(req: Email) -> bool:
    '''API Endpoint for handling contact-us page and visitors queries [powered by AI]
    '''
    try:
        email = EmailSupport(sender_email=req.email, message=req.message, name=req.name)
        if email.send_email():
            return True
        return False
    except Exception as e:
        logging.error('Error on email support endpoint %s', e)
        return False


@router.post('/upload_document', tags=['Symbols'])
async def upload(
    file: UploadFile = File(description='File'),
    upload_dir: str="uploaded"
):
    os.makedirs(upload_dir, exist_ok=True)
    # ext = file.filename.split('.')[-1]
    # file.filename = f'user_id_.{ext}'

    file_location = os.path.join(upload_dir, file.filename)
    with open(file_location, "wb") as f:
        await f.write(file.file.read())
