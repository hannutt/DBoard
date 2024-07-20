from datetime import date
import socket
import pymongo
from django.shortcuts import render,redirect
from django.contrib.auth import authenticate,login,logout
global today
today = date.today()
global todayStr
todayStr =today.strftime('%d.%m.%y')
global client
client = pymongo.MongoClient('mongodb://localhost:27017/')
global dbname
dbname = client['DBoardDB']
status = 'True'
times = 0
amount = 0


def loginView(request):

     #myclient = pymongo.MongoClient('mongodb://localhost:27017/')
     #mydb = myclient['DBoardDB']
     collection = dbname['BannedIps']
     result= collection.find({},{ "_id": 0, "ip": 1})
     for i in result: 
        print(i)    

    
     global times
     times +=1
     loginfo = "[Not logged in]"
     hostname = socket.gethostname()
     ip = socket.gethostbyname(hostname)
     #ip = '192.90.45.73'
     #ltarkastetaan onko ip-osoite bannattu, eli löytyykö se kannasta
     isIpExist = collection.count_documents({"ip":ip})
     print(isIpExist)
     #existIp=mycol.find({"ip": ip},{'_id':0}).count()
     #jos ip-osoite löytyy
     if isIpExist == 1:
        result='banned!' 
        context = {'info':loginfo,'status':status,'times':times,'result':result}
     else:
        result=ip
        context = {'info':loginfo,'status':status,'times':times,'result':result}

    
   
   
     return render(request,'login.html',context)

def login_user(request):
     username = request.POST["username"]
     password = request.POST["password"]
    #authenticate metodi, joka saa parametreina tunnuksen ja salasanan
     global user
     user = authenticate(username = username, password = password)
    #jos tiedot löytyvät/täsmäävät tietokannassa oleviin niin kirjataan käyttäjä sisälle
     if user:
        #login metodi käyttöön
        login(request,user)

        loginfo = "[Logged in]"
        context = {'name':user,'info':loginfo}

        return render (request,'login.html',context)
     if not user:
         print("error")
         return render(request,'loginerror.html')

#uloskirjaus
def logout_user(request):
    
    logout(request)
    loginfo = "[Not logged in]"
    context = {'info':loginfo}
    return render(request,'login.html',context)




def FrontPage(request):
     #kirjautumisen tarkastus, jos käyttäjä ei ole kirjautunut näytetään login.html sivu
     if not request.user.is_authenticated:
        return render(request,'login.html')
     else:
         
      
      collection = dbname['posts']
      col2 = dbname['reply']
 
      col4 = dbname['deleted']
    #talletetaan data muuttujaan DBBoard tietokannan post collectionin kaikki tieto
      data=collection.find()
    #satunnaisluku?
      replydata = col2.find()
    #näytetään vain ne tietueet, joissa on replymsg kenttä.
      replymessage = collection.find({'replymsg':{'$exists':'true'}})
      #isZero = collection.find({"likes":{"$exists":"true"}})
      
      deleted = col4.find()
      posted =  col4.find({'_id':2})
     
      return render(request,'index.html',{"data":data,"reply1":replydata,'deleted':deleted,'posted':posted,'replymessage':replymessage,'user':user})

