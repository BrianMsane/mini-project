'''Attend to user emails
'''

# pylint: disable=line-too-long


import os
import logging
import datetime
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from dotenv import load_dotenv

load_dotenv()


class EmailSupport:
    '''Support Contact us feature
    '''

    def __init__(
        self,
        date: datetime=datetime.date.today().strftime(''),
        sender_email: str=os.getenv('EMAIL')
    ):
        self.data = date
        self.sender_email = sender_email


    def send_email(
        self,
        name: str,
        receiver_email: str,
        message: str
    ) -> bool:
        '''Send the user query to admin email so they can attend and respond to it manually
        '''
        # Set up the SMTP server
        smtp_server = "smtp.gmail.com"
        smtp_port = 587
        password = os.getenv('EMAIL_PASSWORD')

        # Create the email message
        msg = MIMEMultipart()
        msg['From'] = self.sender_email.strip()
        msg['To'] = receiver_email.strip()
        msg['Subject'] = f"Response to Your Query - {name} on {self.date}"
        body = f"Dear {name},\n\nThank you for reaching out to us.\n\n{message}\n\nBest regards,\nSupport Team, Edusphere"
        msg.attach(MIMEText(body, 'plain'))

        try:
            server = smtplib.SMTP(smtp_server, smtp_port)
            server.starttls()
            server.login(self.sender_email, password)
            server.sendmail(self.sender_email, receiver_email, msg.as_string())
        except Exception as e:
            print('Unable to connect to email server %s', e)
            return False
        finally:
            server.quit()
        return True


    def ai_response(
        self,
        name: str,
        receiver_email: str,
        message: str,
    ):
        '''If query is easy, let an AI Agent handle the job on behalf of admin
        '''