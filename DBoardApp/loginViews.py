from datetime import date
import socket
import pymongo
from django.shortcuts import render,redirect
from django.contrib.auth import authenticate,login,logout,get_user
import speech_recognition as sr

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
    
     global times
     times +=1
     loginfo = "[Not logged in]"
     #laitenimi
     hostname = socket.gethostname()
     #ip-osoite
     ip = socket.gethostbyname(hostname)
     #ip = '192.90.45.73'
     #ltarkastetaan onko ip-osoite bannattu, eli löytyykö se kannasta
     isIpExist = collection.count_documents({"ip":ip})
     isDeviceExist=collection.count_documents({"deviceName":hostname})
     #existIp=mycol.find({"ip": ip},{'_id':0}).count()
     #jos ip-osoite löytyy
     if isIpExist == 1 or isDeviceExist==1:
        result='banned!'
        
        context = {'info':loginfo,'status':status,'times':times,'result':result}
     elif request.user.is_authenticated:
         #kirjautuneen käyttäjän ktunnus
         usr=request.user
         loginfo = "[logged in]"
         context = {'info':loginfo,'status':status,'times':times,'usr':usr}
     else:
        result=ip
        context = {'info':loginfo,'status':status,'times':times,'result':result}
   
     return render(request,'login.html',context)

def login_user(request):
     username = request.POST["username"]
     password = request.POST["password"]
    #authenticate metodi, joka saa parametreina tunnuksen ja salasanan
    
     user = authenticate(username = username, password = password)
    #jos tiedot löytyvät/täsmäävät tietokannassa oleviin niin kirjataan käyttäjä sisälle
     if user:
        #login metodi käyttöön
        login(request,user)

        loginfo = "[Logged in]"
        #context = {'name':user}

        #return render (request,'login.html',context)
        return redirect(FrontPage)
     if not user:
         return render(request,'loginerror.html')

#uloskirjaus
def logout_user(request):
    
    logout(request)
    loginfo = "[Not logged in]"
    context = {'info':loginfo}
    return redirect (loginView)


def goToFrontPage(request):

   if request.user.is_authenticated:
       loginfo = "[logged in]"
       context = {'info':loginfo}
        
    #tämän avulla pysytään kirjautuneena.
      
       return render(request,'login.html',context)



#username eli urls.py:ssä määritelty /index/<username> parametri otetaan tässä funktiossa vastaan.
def FrontPage(request):
   
     #kirjautumisen tarkastus, jos käyttäjä ei ole kirjautunut näytetään login.html sivu
     if not request.user.is_authenticated:
        return redirect(loginView)
     else:

      postCollection = dbname['posts']
      #replyCol = dbname['reply']

     
      col4 = dbname['deleted']
    #talletetaan data muuttujaan DBBoard tietokannan post collectionin kaikki tieto
      data=postCollection.find()
    #satunnaisluku?
      #replydata = replyCol.find()
    #näytetään vain ne tietueet, joissa on replymsg kenttä.
      replymessage = postCollection.find({'replymsg':{'$exists':'true'}})
      replies = postCollection.find({},{'replymsg':1,'_id':0})
      for r in replies:
          print(len(r))
      #isZero = collection.find({"likes":{"$exists":"true"}})
      deleted = col4.find()
      posted =  col4.find({'_id':2})
     
      return render(request,'index.html',{"data":data,'deleted':deleted,'posted':posted})

