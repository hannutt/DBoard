# DBoard
Python Django and javascript application with Bootstrap and Jquery effects.
Project keywords: Python, Django, JavaScript, JQuery, NoSQL, Bootstrap.

MAIN FEATURES:

USER AUTHENTICATION:
Basic Log-in and Log-out features

VISITOR COUNTER:
Visitor counter with Python and javascript. The Python code counts the visits and the javascript code displays the number graphically using the ChartJS library.

DISCUSSION BOARD
Simulates an online discussion board. You can post a new thread, reply to an existing message,delete the messages and like messages.
All messages are stored in a MongoDB NoSQL database.
Message statistics. See the number of deleted and new messages, as well as the date of the last deletion and the date of the most recent message.

TEXT CENSORSHIP ON THE DISCUSSION BOARD
You can hide forum texts with administrator credentials. The JavaScript function runs automatically and checks if an administrator is logged in. if so, the jQuery function becomes available. With the jquery function, you can hide the texts by double-clicking

IP-ADDRESS BLOCKING
save the IP address you want to block in the database. A Python function checks if the address is in the database. 
If the address is found, the javaScript function blocks the login option

WEBSHOP

IN THE USER VIEW:

simulates a purchase transaction in an online store. the user selects the desired products and quantity and fills in the address information. Then the entire order is stored in the database.

IN THE ADMIN VIEW:

Perform CRUD operations on products. in the admin view you can also use Bootstrap's accordion/collapse features.
All orders stored in the database are displayed in the administrator's view.
Inventory management, from the view you can quickly check which product is the most and which is the least in the database. The total amount of all products is also shown

Attention color for the products that are most and least in stock.
the name of the product that is in short supply is shown in red and the name of the product with the most stock is shown in green.