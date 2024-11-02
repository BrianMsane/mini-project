'''Define the FASTAPI endpoints for this application
'''

import os
import dotenv
import json
import datetime
import logging
from fastapi import APIRouter, UploadFile, File, Request, HTTPException
from db.mongo import read, create
from utils.emails import EmailSupport
from utils.request import EmailReq, AuthenticateReq, RegisterReq, FormReq
from backend.utils.users import EducationalBackground, Demographic, NextofKin, Applicant


dotenv.load_dotenv()
router = APIRouter()


@router.get('/')
async def root():
    return {
        'message': 'This is the root endpoint'
    }


@router.post('/authenticate', tags=['Authenicate'])
async def authenticate(req: AuthenticateReq):
    '''Authenticatin
    '''
    print(req)
    doc = read(query={'username': req.username})[0]
    if doc:
        if doc.get('password') == req.password:
            return {"authenticated": True}
    return {"authenticated": False}


@router.post('/register', tags=['Authenicate'])
async def register(req: RegisterReq):
    '''Register users on signup
    '''
    if req.conf_password != req.password:
        raise HTTPException(status_code=400, detail="Passwords do not match")
    doc = {
        'username': req.username,
        'email': req.email,
        'password': req.password,
        'date': datetime.date.today().strftime('%Y-%m-%d')
    }
    if create(doc=doc):
        return {"registered": True}
    return {"registered": False}


@router.post('/contact-us', tags=['Email-Handling'])
async def email_support(req: EmailReq) -> bool:
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


@router.post('/modify-details', tags=['User'])
async def modify_details(req: Request):
    '''Modify user details'''
    data = await req.json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Implement logic to update user details in the database
    success = update_user_details(username, email, password)

    return {"success": success}



@router.post('/form', tags=['Application'])
async def form(req: Request):
    '''Get the data in the form and store it'''
    form = await req.form()
    data = form.get('data')
    applicant_data = json.loads(data)
    upload_folder = 'uploads'
    if not os.path.exists(upload_folder):
        os.makedirs(upload_folder)

    # Handle the uploaded files
    file_locations = {}
    for key in form.keys():
        form_value = form[key]
        if isinstance(form_value, UploadFile):
            upload_file = form_value
            file_location = os.path.join(upload_folder, upload_file.filename)
            with open(file_location, "wb") as buffer:
                buffer.write(await upload_file.read())
            file_locations[key] = file_location

    applicant = Applicant(
        demographic=Demographic(**applicant_data['demographic']),
        kin=NextofKin(**applicant_data['kin']),
        education=EducationalBackground(**applicant_data['education']),
        interests=applicant_data['interests'],
        _type=applicant_data['_type']
    )
    if create(collection='applicants', doc=applicant):
        return True
