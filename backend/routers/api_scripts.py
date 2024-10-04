
from fastapi import APIRouter
from support.emails import send_email
import os
import dotenv

dotenv.load_dotenv()
app = APIRouter()


@app.post('/contact-us')
def email_support(
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