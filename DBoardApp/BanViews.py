from datetime import datetime
import pymongo
from django.shortcuts import render,redirect

client = pymongo.MongoClient('mongodb://localhost:27017/')

dbname = client['DBoardDB']

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