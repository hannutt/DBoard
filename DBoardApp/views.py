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
import time
from DBoardApp import loginViews


client = pymongo.MongoClient('mongodb://localhost:27017/')
global dbname
dbname = client['DBoardDB']

times = 0
amount = 0
   
    
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





       
     


