import base64
from django.shortcuts import render,redirect
from django.http import HttpResponse
import pymongo
from pymongo import MongoClient
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
from bson.binary import Binary
from PIL import Image
import io

from DBoardApp import loginViews

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


def filterPost(request):
    slc = ['title','body']
    collection = dbname['posts']
    titles = collection.find({},{'title':1,'postid':1})
    body = collection.find({},{'body':1,'postid':1})
    sel = request.POST.getlist('selection')
    print(sel)
    
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

def backToWebShop(request):
    return redirect (webshop)

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
    name = request.POST['flname']
    address = request.POST['address']
    city = request.POST['city']
    zip = request.POST['zip']
    prod = request.POST['prod']
    Unitprice = request.POST['price']
    amount = request.POST['amount']
    str = request.POST['strength']
    total = request.POST['total']
    orderQuery = {'orderId':orderId,'product':prod,'unitPrice':Unitprice,'amount':amount,'total':total,'strength':str,'orderDate':todayStr,'name':name,'address':address,'city':city,'zip':zip}
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

def delivered(request):
    isDelivered = request.POST.getlist('delivered')
    print(isDelivered)

    return redirect(showAdminView)

def showAdminView(request):
     col = dbname['order']
     Orders = col.find()
    
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
   
     return render(request,'adminView.html',{'prods':prods,"numbers":numbers,"maxInstock":maxInstock,'minInstock':minInstock,"stockTotal":stockTotal,'Orders':Orders})



def AddProducts(request):
    prodCollection = dbname['products']
    prodId = request.POST['prodId']
    prodIdInt = int(prodId)
    prodName = request.POST['prodName']
    prodPrice = request.POST['prodPrice']
    prodStock = request.POST['prodStock']
    addQuery={'productId':prodIdInt,'name':prodName,'price':prodPrice,'instock':prodStock}
    prodCollection.insert_one(addQuery)
    #prodId = prodId +1
    return render(request,'adminView.html')
       
     


# Create your views here.
