'''Uvicorn local server to serve backend resources
'''

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.api_scripts import router


app = FastAPI(title="EduSphere", description="Application to tertiary")
app.include_router(router=router)#, prefix="/api")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


if __name__ == '__main__':
    uvicorn.run(app, port=3017, host='127.0.0.1')
