'''Define the FASTAPI endpoints for this application
'''

from fastapi import APIRouter, UploadFile, File
from support.emails import send_email
import os
import dotenv

dotenv.load_dotenv()
router = APIRouter()


@router.get('/')
async def root():
    return {
        'message': 'This is the root endpoint'
    }


@router.post('/contact-us', tags=['Email-Handling'])
async def email_support(
    name: str,
    sender_email: str,
    message: str
):
    '''API Endpoint for handling contact-us page and visitors queries [powered by AI]
    '''
    send_email(
        name=name,
        sender_email=sender_email,
        receiver_email=os.getenv("EMAIL"),
        message=message
    )


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
        f.write(file.file.read())
