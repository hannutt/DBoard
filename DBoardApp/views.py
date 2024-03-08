from django.shortcuts import render,redirect
from django.http import HttpResponse
import pymongo
from bson import ObjectId
from django import template
import clipboard
from datetime import date
from django import template
import random
from django.contrib.auth import authenticate,login,logout
from django.contrib import messages
import pandas as pd
import sqlite3
import socket
from datetime import datetime

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
     user = authenticate(username = username, password = password)
    #jos tiedot löytyvät/täsmäävät tietokannassa oleviin niin kirjataan käyttäjä sisälle
     if user:
        #login metodi käyttöön
        login(request,user)

        loginfo = "[Logged in]"
        context = {'name':user,'info':loginfo}

        return render (request,'login.html',context)
     else:
         
         return render(request,'login.html',context)
     
         
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
     
      return render(request,'index.html',{"data":data,"reply1":replydata,'deleted':deleted,'posted':posted,'replymessage':replymessage})

def postReply(request):
     data = []
     
     collection = dbname['posts']
     postid = request.POST['postIDval']
     msg = request.POST['reply']
     #postid tulee merkkijonona joten se täytyy muuntaa kokonaisluvuksi
     #että se voidaan tallentaa kantaan
     postidInt = int(postid)
     '''
     isEmpty = collection.find({"replymsg":{"$exists":"true","$eq":""}})
     if isEmpty:
         filter = {'postid':postidInt}
         replydata = {"$set":{"replymsg":msg}}
     else:
     '''
      #haetaan postid:llä ja talletetaan muuttujan replymsg kentässä jo oleva data
     previousData = collection.find({"postid":postidInt},{"_id":0,"replymsg":1})
     #previousdatan läpikäynti silmukassa että se saadaan lukukelpoiseen muotoon
     #ja tallennus data listaan
     for i in previousData:
         data.append(i)
         
     #data.append(previousData)
     #data.append(query)
    
     
     data.append(msg)
     
    
     #filtteri eli minkä dokumentin replymsg kenttääm vastaus tallennetaan
     filter = {'postid':postidInt}
     #datalista sijoitetaan replymsg kenttään
     replydata = {"$set":{"replymsg":data}}
   
     collection.update_one(filter,replydata)
    
      
     print(data)
     return render(request,'index.html')


    
    
    
'''
     #filtteri eli minkä dokumentin replymsg kenttääm vastaus tallennetaan
     filter = {'postid':postidInt}
     #lisätään muuttujan teksti dokumentin replymsg kenttään
     replydata = {"$set":{"replymsg":msg}}
   
     collection.update_one(filter,replydata)
       # print(postid)
     #print(isExist)
    
     return render(request,'index.html')
'''

def postNew(request):
      newPostid =2
      postId = random.randint(1,500)
      title = request.POST['postTitle']
      body = request.POST['bodyText'] 
      #postid = request.POST['postNumber']
      deletecol = dbname['deleted']
      Postcollection = dbname['posts']
      isPostidExist = Postcollection.count_documents({"postid":postId})
      if isPostidExist == 1:

        post = {"title":title,"body":body}
        Postcollection.insert_one(post)
        deletecol.update_one({"_id":newPostid},{'$inc':{"postCount":+1},'$set':{"postDate":todayStr}})

      elif isPostidExist == 0:

        post = {"title":title,"body":body,'postid':postId}
        Postcollection.insert_one(post)
        deletecol.update_one({"_id":newPostid},{'$inc':{"postCount":+1},'$set':{"postDate":todayStr}})        
    
      #newQuery = {"_id":newid,"postCount":1,"postDate":todayStr}
      #client = pymongo.MongoClient('mongodb://localhost:27017/')
      #dbname = client['DBoardDB']
     
      
      #col.insert_one(newQuery)
      #redirectillä palautetaan haluttu näkymä lisäksi html sivun formissa ja urls.pyssä täytyy lisätä / merkki
      return redirect (FrontPage)

def likePost(request):
    collection = dbname['posts']
    postid = request.POST['postIDval']
    postidInt = int(postid)
    filter = {'postid':postidInt}
     #lisätään muuttujan teksti dokumentin replymsg kenttään
    likedata = {"$inc":{"likes":+1}}
    
     #kokoelman päivitys, insertillä luotaisiin vain uusi dokumentti
    collection.update_one(filter,likedata)
  
   
    #client = pymongo.MongoClient('mongodb://localhost:27017/')
    #dbname = client['DBoardDB']
    '''
    collection = dbname['likes']
    isExist = collection.count_documents({"_id":postNumInt})
    #b.collection.find({myFieldName: {$exists: 1}}).
    #tarkistus löytyykö id numero ja kannasta, jos on niin päivitetään löydetyn id:n likecount kenttää
    if isExist==1:
   
        #kasvatetaan likecount kentän arvoa yhdellä annetun id:n eli postnumInt perusteella (sql where)
        collection.update_one({"_id":postNumInt},{'$inc':{"likecount":+1}})
    #jos id:tä eilöydy niin lisätään tietokantaan käyttäjän syöttämä (postNumInt) id ja likecount kenttää numero 1
    else:
         query = {"_id":postNumInt,'likecount':1}
         collection.insert_one(query)
    '''
    print(postid)
    return render(request,'index.html')

def deletePost(request):
      
      deleteId = request.POST['deletePostId']
      deleteIdInt = int(deleteId)
      print(deleteIdInt)
      
      #options = ['title','body']
      #selection on index.html checkboksien name ominaisuuden arvo eli merkkijono
     
      collection = dbname['posts']
      updCollection = dbname['deleted']
      #txt = request.POST['delete']
      delquery = {"postid":deleteIdInt}
      postId = 1
      collection.delete_one(delquery)
      
     #päivitetään poistettujen dokumenttien lukumäärä
      updCollection.update_one({"_id":postId},{'$inc':{"count":+1},'$set':{"deldate":todayStr}})
      #updCollection.insert_one(delquery)
      #updCollection.insert_one({"_id":postId},{'$inc':{"count":+1}})
      #updCollection.update_one({"_id":dateIdStr},{'$set':{'deltime':todayStr}})
      #if bodychoice == 'body:':   
        #print('you selected bodyCB')
     
    
      return render(request,'index.html')

def filterPost(request):
    slc = ['title','body']
    collection = dbname['posts']
    titles = collection.find({},{'title':1,'postid':1})
    body = collection.find({},{'body':1,'postid':1})
    sel = request.POST.getlist('selection')
    
    #checkboksien valinnat, jos valittu cb jonka value on title haetaan otsikot 
    if sel == ['title']:
        print('title select')
        #optionin avulla toteutetaan if/else filtered.html sivulla. sen avulla
        #näytetään hausta riippuen joko title tai bodytext otsikko
        return render (request,'filtered.html',{'titles':titles,'option':'1'})
    #jos valittu cb jonka value on body haetaan bodytext
    elif sel == ['body']:
        return render (request,'filtered.html',{'body':body})
    else:
        
      return render(request,'filtered.html')
    
         #haetaan vain title kentät
      
    
        
    

def showEdit(request,postid):
    print(postid)
    collection = dbname['posts']
    #haku kannasta postid:n arvon perusteella
    data=collection.find({'postid':postid})
    return render(request,'edit.html',{'data':data})

def editProduct(request,productId):
    collection = dbname['products']
    prods = collection.find({'productId':productId})
    return render(request,'editProducts.html',{'prods':prods})

#tällä muokataan products kokoelman tuotteita
def updateProd(request):
    collection = dbname['products']
    prodId = request.POST['prodId']
    prodIdInt = int(prodId)
    prodName = request.POST['prodName']
    prodPrice = request.POST['prodPrice']
    instock = request.POST['instock']
    #vastaa sql WHERE ID = LAUSETTA
    filter = {'productId':prodIdInt}
    #päivitys tapahtuu avain-arvo pareina. ensin tulee kentän nimi, sen jälkeen muuttuja jonka
    #arvo kenttään päivitetäänF
    updateData = {"$set":{"name":prodName,"price":prodPrice,"instock":instock}}

    collection.update_one(filter,updateData)

    return render(request,'editProducts.html')

    

def saveCsv(request):
    collection = dbname['posts']
    #haetaan vain title kentät
    titles = collection.find({},{'title':1})
    for i in titles:  
      print (i)
    return render(request,'index.html')

def webshop(request):
    collection = dbname['products']
    
    
    #maxId = collection.find().sort({'productId':-1}).limit(1)
    prods = collection.find()
    #print(maxId)
    return render(request,'webshop.html',{'prods':prods})

def webshopAdmin(request):
    
    collection = dbname['products']
    prods = collection.find()
    return render(request,'adminView.html',{'prods':prods})

def productSelection(request,productId):
    #codeword='xyzzy'
    #discountCodes = dbname['discount']
    collection = dbname['products']
    data = collection.find({'productId':productId})
    orders = dbname['order']
    prods = collection.find()
    orderData = orders.find()
   #isExist = discountCodes.count_documents({"code":codeword})
    #print(isExist)
    #if isExist == 1:
     #   code = {codeword}
   
    #mongodb lauseke jossa kerrotaan amount ja multiply kenttien arvot keskenään
    #total = orders.aggregate([{'$project':{'total':{'$multiply':['$amount','$unitPrice']}}}])
    data = collection.find({'productId':productId})
    return render(request,'webshop.html',{'data':data,'orderData':orderData,'prods':prods})

def saveOrderToDb(request):
    orderId = random.randint(1,1500)
    collection = dbname['order']
    prodCollection = dbname['products']
    prod = request.POST['prod']
    Unitprice = request.POST['price']
    amount = request.POST['amount']
    str = request.POST['strength']
    total = request.POST['total']
    orderQuery = {'orderId':orderId,'product':prod,'unitPrice':Unitprice,'amount':amount,'total':total,'strength':str,'orderDate':todayStr}
    collection.insert_one(orderQuery)
    
    return render (request,'webshop.html')

def discount(request):
    collection = dbname['discount']
    
    code = request.POST['code']
    #JOS KOODI LÖYTYY COLLECTIONISTA KENTÄSTÄ CODE, 1 ON YHTÄ KUIN TRUE JA 0 ON FALSE
    isExist = collection.count_documents({"code":code})
    if isExist == 1:
        print(code,' found')
    elif isExist == 0:
        print('not found')
  
  
    return render(request,'webshop.html')

def showAdminView(request):
     numbers = []
     connection = sqlite3.connect('db.sqlite3')
     connection.row_factory = sqlite3.Row
     cursor = connection.cursor()
     cursor.execute("SELECT used FROM usedId")
     rows = cursor.fetchall()
     for used in rows: 
        numbers.append(used[0])
     collection = dbname['products']
     print(numbers)
     
     #haetaan kannasta tuote, jota on eniten varastossa, eli instock arvo on suurin
     maxInstock = collection.find().sort('instock',-1).limit(1)
     #haetaan pienin instock arvo
     minInstock = collection.find().sort('instock',1).limit(1)
     stockTotal = collection.find().sort("instock",-1)
    
     collection = dbname['products']
     prods = collection.find()
     #for maxstock in maxInstock:
      #  maxiumStock={'maxiumStock':maxstock}
     print(maxInstock)
   
     return render(request,'adminView.html',{'prods':prods,"numbers":numbers,"maxInstock":maxInstock,'minInstock':minInstock,"stockTotal":stockTotal})

def BanPage(request):

    collection = dbname['BannedIps']
    result= collection.find({},{ "_id": 0, "ip": 1,"BanDate":1})
    dateInfo = collection.find({},{"_id":0,"ip":0,"BanDate":1})
    #lasketaan BannedIps kokoelman dokumenttien määrä
    counter = collection.count_documents({})
    print(counter)
    context={'result':result,'counter':counter}
    dateContext = {'dateInfo':dateInfo}
    print(dateInfo)
    
    return render(request,'banIps.html',context)


def SaveBannedIp(request):
    
    Dnow = datetime.now()
    formatted = Dnow.strftime("%d.%m.%Y")
    #print(formatted)
    ipCol = dbname['BannedIps']
    ip = request.POST['ipadd']
    saveData = {'ip':ip,'BanDate':formatted}
    ipCol.insert_one(saveData)
    #palautetaan BanPage näkymä, eli funktio voi palauttaa myös toisessa funktiossa luodun näkymän
    return BanPage(request)

def DeleteFromBan(request):
    ipCol = dbname['BannedIps']

    address = request.POST['ip']
    delData = {'ip':address}
    ipCol.delete_one(delData)
    print(address)

    return BanPage(request)

def AddProducts(request):
    prodCollection = dbname['products']
    prodId = request.POST['prodId']
    prodName = request.POST['prodName']
    prodPrice = request.POST['prodPrice']
    prodStock = request.POST['prodStock']
    addQuery={'productId':prodId,'name':prodName,'price':prodPrice,'instock':prodStock}
    prodCollection.insert_one(addQuery)
    prodId = prodId +1
    return render(request,'adminView.html')
       
     


# Create your views here.
