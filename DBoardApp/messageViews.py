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


def likePost(request):
    collection = dbname['posts']
    postid = request.POST['postIDval']
    postidInt = int(postid)
    filter = {'postid':postidInt}
     #lisätään muuttujan teksti dokumentin replymsg kenttään
    likedata = {"$inc":{"likes":+1}}
    
     #kokoelman päivitys, insertillä luotaisiin vain uusi dokumentti
    collection.update_one(filter,likedata)
  
    return render(request,'index.html')

def updatePost(request):
    collection = dbname['posts']
    postId = request.POST['postid']
    postIdInt = int(postId)
    body = request.POST['body']
    title = request.POST['title']
    #vastaa sql WHERE ID = LAUSETTA
    filter = {'postid':postIdInt}
    #päivitys tapahtuu avain-arvo pareina. ensin tulee kentän nimi, sen jälkeen muuttuja jonka
    #arvo kenttään päivitetäänF
    updateData = {"$set":{"body":body,"title":title}}

    collection.update_one(filter,updateData)

    return redirect (loginViews.FrontPage)

def showEdit(request,postid):
    print(postid)
    collection = dbname['posts']
    #haku kannasta postid:n arvon perusteella
    data=collection.find({'postid':postid})
    return render(request,'edit.html',{'data':data})


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


    