from django.shortcuts import render,redirect

import pymongo
import sqlite3
client = pymongo.MongoClient('mongodb://localhost:27017/')
dbname = client['DBoardDB']

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
     prodsDelete=collection.find()
     #for maxstock in maxInstock:
      #  maxiumStock={'maxiumStock':maxstock}
     print(maxInstock)
   
     return render(request,'adminView.html',{'prods':prods,"numbers":numbers,"maxInstock":maxInstock,'minInstock':minInstock,"stockTotal":stockTotal,'Orders':Orders,'prodsDelete':prodsDelete})


def AddProducts(request):
    prodCollection = dbname['products']
    prodId = request.POST['prodId']
    prodIdInt = int(prodId)
    prodName = request.POST['prodName']
    prodPrice = request.POST['prodPrice']
    prodStock = request.POST['prodStock']
    addQuery={'productId':prodIdInt,'name':prodName,'price':prodPrice,'instock':prodStock}
    prodCollection.insert_one(addQuery)
  
    return redirect(showAdminView)

def deleteProduct(request,productId):
    prodCollection = dbname['products']
    delQuery={'productId':productId}
    prodCollection.delete_one(delQuery)
    

    return redirect(showAdminView)