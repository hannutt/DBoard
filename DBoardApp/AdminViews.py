from django.shortcuts import render,redirect

import pymongo
import sqlite3

from DBoardApp import loginViews
client = pymongo.MongoClient('mongodb://localhost:27017/')
dbname = client['DBoardDB']

def showAdminView(request):


      fields=[]
      #jos käyttäjä ei ole kirjautunut tai käyttäjä on kijrautunut mutta ei ole merkitty staffiksi.
      if not request.user.is_authenticated or request.user.is_authenticated and not request.user.is_staff:
          return redirect(loginViews.loginView)
      #jos käyttäjä on kirjautunut ja kirjautunut käyttäjä on merkitty staffiksi
      if request.user.is_authenticated and request.user.is_staff:
        #user_id = request.user.id
   
          
        col = dbname['orders']
        Orders = col.find()
         #haetaan kenttien nimet
        fieldNames=col.find_one()
        for f in fieldNames:
            fields.append(f)
    
        numbers = []
        connection = sqlite3.connect('db.sqlite3')
        connection.row_factory = sqlite3.Row
        cursor = connection.cursor()
        cursor.execute("SELECT used FROM usedId")
        rows = cursor.fetchall()
        for used in rows: 
            numbers.append(used[0])
        collection = dbname['products']
        connection.close()
     
     #haetaan kannasta tuote, jota on eniten varastossa, eli instock arvo on suurin
        maxInstock = collection.find().sort('instock',-1).limit(1)
     #haetaan pienin instock arvo
        minInstock = collection.find().sort('instock',1).limit(1)
        stockTotal = collection.find().sort("instock",-1)
    
        collection = dbname['products']
        prods = collection.find()
        prodsDelete=collection.find()
     #for maxstock in maxInstock:
      #  maxiumStock={'maxiumStock':maxstock}
   
   
        return render(request,'adminView.html',{'prods':prods,"numbers":numbers,"maxInstock":maxInstock,'minInstock':minInstock,"stockTotal":stockTotal,'Orders':Orders,'prodsDelete':prodsDelete,"fields":fields})


def AddProducts(request):
    prodCollection = dbname['products']
    
    prodId = request.POST['prodId']
    prodIdint=int(prodId)
    #tarkistetaan löytyykö käyttäjän syöttämä arvo productid kentästä.
    if prodCollection.find_one({"productId": {"$eq": prodIdint}}):
        return render(request,"loginerror.html")
    else:
        connection = sqlite3.connect('db.sqlite3')
        cursor = connection.cursor()
        cursor.execute("INSERT INTO usedId (used) VALUES(?)",prodId)
        connection.commit()
        prodIdInt = int(prodId)
        prodName = request.POST['prodName']
        prodPrice = request.POST['prodPrice']
        prodStock = request.POST['prodStock']
        addQuery={'productId':prodIdInt,'name':prodName,'price':prodPrice,'instock':prodStock}
        prodCollection.insert_one(addQuery)
        connection.close()
        
        return redirect(showAdminView)

def deleteProduct(request,productId):
    prodCollection = dbname['products']
    delQuery={'productId':productId}
    prodCollection.delete_one(delQuery)
    

    return redirect(showAdminView)


def delivered(request):
    orders = dbname['orders']
    orderid = request.POST['orderid']
    orderIdInt = int(orderid)
    #vastaa sql WHERE ID = LAUSETTA
    filter = {'orderId':orderIdInt}
    #päivitys tapahtuu avain-arvo pareina. ensin tulee kentän nimi, sen jälkeen muuttuja jonka
    #arvo kenttään päivitetäänF
    updateData = {"$set":{"delivered":"yes"}}
    orders.update_one(filter,updateData)

    print(orderid)

    return redirect(showAdminView)

def orderEdit(request,orderid,name,city,zip,order,address,orderdate):
    context={'orderid':orderid,"name":name,"city":city,"zip":zip,"order":order,"address":address,"orderDate":orderdate}
    return render(request,"orderEdit.html",context)


def adminEditOrder(request):
    orders = dbname['orders']
    oid=request.POST['oid']
    oidInt=int(oid)
     #vastaa sql WHERE ID = LAUSETTA
    filter = {'orderId':oidInt}
    name=request.POST['customername']
    address=request.POST['customeradd']
    city=request.POST['customercity']
    zipcode=request.POST['customerzip']
    orderdate=request.POST['customerorderdate']
    order=request.POST['customerorder']
    updateOrder={"$set":{"orderDate":orderdate,"name":name,"address":address,"city":city,"zip":zipcode,"orderedOrod":order}}
    orders.update_one(filter,updateOrder)

    return render(request,"orderEdit.html")

def adminDeleteOrder(request,orderid):
    orders = dbname['orders']
    delQuery={'orderId':orderid}
    orders.delete_one(delQuery)
    return render(request,"adminView.html")

def searchData(request):
    #checkboksin value attribuutin haku
    selection = request.POST.getlist('relevantCB')
    results=[]
    field=request.POST['field']
    orders = dbname['orders']
    search=request.POST['search']
    searchQuery={field:search}
    #jos checkboksi on valittu _id ja order id kentät eivät näy tuloksessa
    if selection==['relevant']:
        
        showFields={"_id":0,"orderId":0}
        
        res = orders.find(searchQuery,showFields)
    else:
        res=orders.find(searchQuery)

    for r in res:
        results.append(r)
       
        content={"results":results}
    
    return render(request,"adminView.html",content)
