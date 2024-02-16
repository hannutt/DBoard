from django.urls import path
from django.urls import path
from .views import FrontPage,postReply,postNew,likePost,deletePost,showEdit,login_user,loginView,logout_user,saveCsv,filterPost,webshop,productSelection,saveOrderToDb,discount,showAdminView,AddProducts,webshopAdmin,editProduct,updateProd,\
BanPage,SaveBannedIp

urlpatterns = [
    path("",loginView),
    path('login-form/',login_user),
    path('logout/',logout_user),
    path("index/",FrontPage),
    path('banIps/',BanPage),
    path('ban-form/',SaveBannedIp),
    #html-lomake ja funtio yhdistetään toisiinsa näin
    path('post-Reply/',postReply),
    path('post-New/',postNew),
    path('post-Like/',likePost),
    path('post-delete/',deletePost),
    #postid-muuttujaan talletetaan index.html sivulla saatu d.postid arvo
    path('post-edit-send/<int:postid>/',showEdit),
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
    #path('adminView/',webshopAdmin),
    #path('edit-product/<int:productId>/',editProduct)
]