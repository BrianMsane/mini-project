'''Define the FASTAPI endpoints for this application
'''


import logging
from fastapi import APIRouter, UploadFile, File, HTTPException
from db.mongo import read, create
from utils.emails import send_email
from utils.request import Email, AuthenticateReq, RegisterReq
from utils.extract import ocr
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
    doc = read(collecton='users', query={'username': req.username})
    if doc:
        if doc['password'] == req.password:
            return True


@router.post('/register', tags=['Authenicate'])
async def register(req: RegisterReq):
    '''Register users on signup
    '''
    doc = {
        'username': req.username,
        'email': req.email,
        'password': req.password if req.conf_password == req.password else ''
    }
    if create(collection='users', doc=doc):
        return True


@router.post('/contact-us', tags=['Email-Handling'])
async def email_support(req: Email) -> bool:
    '''API Endpoint for handling contact-us page and visitors queries [powered by AI]
    '''
    try:
        if send_email(
            name=req.name,
            sender_email=req.email,
            receiver_email=os.getenv("EMAIL"),
            message=req.message
        ):
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


@router.post('/ocr', tags=['Symbols'])
async def ocr_operation(file_path: str):
    '''OCR operation on document
    '''
    if file_path.endswith('.pdf'):
        ocr(path=file_path)
