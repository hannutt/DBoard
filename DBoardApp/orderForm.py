
import random
from django.shortcuts import render
import pymongo

def orderFormPage(request):
    return render(request,"orderForm.html")


def saveOrderToDatabase(request):
    orrderid=random.randint(1,5000)
    client = pymongo.MongoClient('mongodb://localhost:27017/')
    dbname = client['DBoardDB']
    collection = dbname['orders']
    name=request.POST['names']
    address=request.POST['address']
    city = request.POST['city']
    zipcode=request.POST['zip']
    order=request.POST["orderRow"]


    orderDetails = {"orderId":orrderid,"name":name,"address":address,"city":city,"zip":zipcode,"orderedOrod":order,"delivered":"no"}
    collection.insert_one(orderDetails)
    return render(request,"orderForm.html")
