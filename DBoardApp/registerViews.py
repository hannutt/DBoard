from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import os
import sqlite3
import ssl
from django.shortcuts import render,redirect
import smtplib
from dotenv import load_dotenv
load_dotenv("c:/codes/DBoard/DBoardApp/.env")

def showRegisteringPage(request):
    getAdminEmail()
    return render(request,'register.html')

def getAdminEmail():
    connection_obj = sqlite3.connect('db.sqlite3') 
    cursor_obj = connection_obj.cursor() 
    statement = '''SELECT email FROM auth_user WHERE id=1'''
  
    cursor_obj.execute(statement) 
  
    
    output = cursor_obj.fetchall() 
    for row in output: 
        print(row) 
    
    rowAdmin=str(row)
    connection_obj.commit() 
    connection_obj.close()
    return rowAdmin



def sendEmail(request):
     adminMail = getAdminEmail()
     adminMailFinal = adminMail.replace("(","").replace(")","").replace(",","").replace("'","").replace("'","")
     print("admins mail ",adminMailFinal)
     
     subject = "DBoard"
     body = request.POST['email']+" want to become a user."
     sender_email = os.getenv("yahoo_mail")
     
     
     yahoopsw = os.getenv("yahoo_psw")
     print(yahoopsw)
    
   
     message = MIMEMultipart()
     message["From"] = sender_email
     message["To"] = adminMailFinal
     message["Subject"] = subject

     message.attach(MIMEText(body, "plain"))
     text = message.as_string()
     
     context = ssl.create_default_context()

     with smtplib.SMTP_SSL("smtp.mail.yahoo.com", 465, context=context) as server:

        server.login(sender_email, yahoopsw)
        server.sendmail(sender_email, adminMailFinal,text)
        return redirect(showRegisteringPage)
    





