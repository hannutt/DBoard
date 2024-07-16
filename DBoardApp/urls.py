from django.urls import path
from django.urls import path
from DBoardApp import loginViews
from DBoardApp import messageViews
from DBoardApp import BanViews
from .views import saveCsv,filterPost,webshop,productSelection,saveOrderToDb,discount,showAdminView,AddProducts,webshopAdmin,editProduct,updateProd,\
delivered,backToWebShop


urlpatterns = [
    path("",loginViews.loginView,name='loginView'),
    path('login-form/',loginViews.login_user,name='login_user'),
    path('logout/',loginViews.logout_user),
    path("index/",loginViews.FrontPage),
    path('banIps/',BanViews.BanPage),
    path('ban-form/',BanViews.SaveBannedIp),
    path('del-ban/',BanViews.DeleteFromBan),
    #path('img-form/',DBimages),
    #html-lomake ja funtio yhdistetään toisiinsa näin
    path('post-Reply/',messageViews.postReply),
    path('post-New/',messageViews.postNew),
    path('post-Like/',messageViews.likePost),
    path('post-delete/',messageViews.deletePost),
    #postid-muuttujaan talletetaan index.html sivulla saatu d.postid arvo
    path('post-edit-send/<int:postid>/',messageViews.showEdit),
    path('edit-post/',messageViews.updatePost),
     #siirtyminen editoinitisivulle, id täytyy myös lähettää sinne
    path('post-edit-product-send/<int:productId>/',editProduct),
    #varsinainen editointi tapahtuu tässä
    path('edit-product/',updateProd),
    path('save-to-csv/',saveCsv),
    path('post-filter/',filterPost),
    path('webshop/',webshop),
    
    path('select-product-send/<int:productId>/',productSelection),
    path('save-order/',saveOrderToDb),
    path('adminView/',showAdminView),
    path('add-product/',AddProducts),
    path('mark-delivered/',delivered),
    #path('adminView/',webshopAdmin),
    #path('edit-product/<int:productId>/',editProduct)
    path('back-to-shop/',backToWebShop),
   
]