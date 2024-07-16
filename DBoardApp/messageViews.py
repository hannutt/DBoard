from datetime import date
import random
import pymongo
from django.shortcuts import render,redirect

from DBoardApp import loginViews

global today
today = date.today()
global todayStr
todayStr =today.strftime('%d.%m.%y')
client = pymongo.MongoClient('mongodb://localhost:27017/')
dbname = client['DBoardDB']

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


     return redirect (loginViews.FrontPage)

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
      return redirect (loginViews.FrontPage)
    