'''Attend to user emails
'''

import os
import datetime
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.message import EmailMessage
from dotenv import load_dotenv
import openai
import ssl

load_dotenv()


class EmailSupport:
    '''Support Contact Us feature
    '''

    def __init__(
        self,
        sender_email: str = None,
        message: str = None,
        name: str = None,
    ):
        self.sender_email = sender_email
        self.message = message
        self.name = name

        self.date = datetime.date.today().strftime('%Y-%m-%d')
        self.sender_password = os.getenv('EMAIL_PASSWORD')
        self.admin_email = os.getenv('EMAIL')
        self.openai_api_key = os.getenv('OPENAI_API_KEY')
        openai.api_key = self.openai_api_key

        self.smtp_server: str="smtp.gmail.com",
        self.smtp_port: int=465


    def send_email(self) -> bool:
        '''Send the user query to admin email so they can attend and respond to it manually
        '''        
        em = EmailMessage()
        em['From'] = self.send_email
        em['To'] = self.admin_email
        em['Subject'] = f"New Support Query from {self.name} on {self.date}"
        em.set_content(self.message)
        context = ssl.create_default_context()

        try:
            with smtplib.SMTP_SSL(self.smtp_server, self.smtp_port, context=context) as smtp:
                smtp.login(self.sender_email, self.sender_password)
                smtp.sendmail(self.sender_email, self.admin_email, em.as_string())
                print("Email sent successfully to admin.")
        except Exception as e:
            print(f'Unable to send email: {e}')
            return False


# # Example usage
# if __name__ == '__main__':
#     email_support = EmailSupport(sender_email='msanebrianboss@gmail.com', message='Testing', name='Kuhle')
#     if email_support.send_email():
#         print('!!!!!!!!!!!!!!!!!!!!')
