'''
API to serve backend resources
    Severless environment (Azure or AWS) at deployment
    Localhost Sever for testing
'''

import os
import uvicorn
from fastapi import FastAPI
from support.emails import send_email
app = FastAPI()


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
        receiver_email='msanebrianboss@gmail.com',
        message=message
    )



if __name__ == '__main__':
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, port=port, host='0.0.0.0')