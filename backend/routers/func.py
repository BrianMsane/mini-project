'''
API to serve backend resources
    Severless environment (Azure or AWS) at deployment
    Uvicorn/local Sever for testing
'''

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from support.emails import send_email
from api_scripts import router


app = FastAPI(
    title="Document OCR and Question Answering!",
    description="This is an API that deals with Document Summarization"
)
app.include_router(router=router, prefix="/app")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


if __name__ == '__main__':
    uvicorn.run(app, port=3017, host='0.0.0.0')