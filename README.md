# DBoard
Python Django and javascript application with Bootstrap and Jquery.

Project keywords: Python, Django, JavaScript, JQuery, NoSQL, Bootstrap.

MAIN FEATURES:

CODE SPLIT 

Since the original view.py file became too large, the code has started to be divided into separate .py files. For now, the login/logout and message sending and reply codes are in their own files.

USER AUTHENTICATION:

Log-in and Log-out features. Made with Django Authenticate library.

VISITOR COUNTER:
Visitor counter with Python and javascript. The Python code counts the visits and the javascript code displays the number graphically using the ChartJS library.

DISCUSSION BOARD

Simulates an online discussion board. You can post a new thread, reply to an existing message,delete the messages and like messages. The conversation text can be translated into different languages. this is done using the Google Translate API. Messages are stored to the MongoDB NoSQL database.

All posts are wrapped in the Bootstrap 5 accordion/collapse element, so you can close or open posts.

Text filtering, with the html checkboxes you can choose whether only the title or body text of the message is displayed. This works with a Python function that gets the user's selection using the request.post.getlist method and makes a new database query with the selected option.

Message statistics. See the number of deleted and new messages, as well as the date of the last deletion and the date of the most recent message.

TEXT CENSORSHIP ON THE DISCUSSION BOARD

You can hide forum texts with administrator credentials. The JavaScript function runs automatically and checks if an administrator is logged in. if so, the jQuery function becomes available. With the jquery function, you can hide the texts by double-clicking

IP-ADDRESS BLOCKING

save the IP address you want to block in the database. A Python function checks if the address is in the database. If the address is found, the javaScript function blocks the login option.

WEBSHOP

IN THE USER VIEW:

simulates a purchase transaction in an online store. the user selects the desired products and quantity and fills in the address information. Then the entire order is stored in the database.
The selected products are stored in the localStorage in case you leave the online store and come back. Your order information can be retrieved easily with the localStorage feature later. This simulates a real-life online shopping experience. LocalStorage values ​​are retrieved using Object.values(localStorage); method

Products can also be deleted before saving by pressing the button. The items are in a JavaScript array, so the pop method removes the items one by one with a click.

IN THE ADMIN VIEW:

Perform CRUD operations on products. in the admin view you can also use Bootstrap's accordion/collapse features. All orders saved in the database are automatically displayed in the administrator view.
Inventory management, from the view you can quickly check which product is the most and which is the least in the database. The total amount of all products is also shown

Attention color for the products that are most and least in stock.
the name of the product that is in short supply is shown in red and the name of the product with the most stock is shown in green.