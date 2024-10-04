'''Attend to user emails
'''

import os
import logging
import datetime
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import dotenv
dotenv.load_dotenv()


def send_email(
    name: str,
    receiver_email: str,
    message: str,
    date: datetime=datetime.date.today(),
    sender_email: str=os.getenv('EMAIL_PASSWORD')
):
    '''In the front-end, contact us page, the user will send query
    This should be taken in by these arguments then we compute response, forward it to their email account
    '''
    # Set up the SMTP server
    smtp_server = "smtp.gmail.com"
    smtp_port = 587
    sender_password = os.getenv('EMAIL_PASSWORD')

    # Create the email message
    msg = MIMEMultipart()
    msg['From'] = sender_email.strip()
    msg['To'] = receiver_email.strip()
    msg['Subject'] = f"Response to Your Query - {name}"

    # Body of the email
    body = f"Dear {name},\n\nThank you for reaching out to us.\n\n{message}\n\nBest regards,\nSupport Team, Edusphere"
    msg.attach(MIMEText(body, 'plain'))

    try:
        # Set up the SMTP server connection
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(sender_email, sender_password)
        
        # Send the email
        server.sendmail(sender_email, receiver_email, msg.as_string())
        print(f"Email sent successfully to {receiver_email}")
    except Exception as e:
        logging.info('Unable to connect to email server %s', e)
    finally:
        server.quit()
