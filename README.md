# DBoard
Python Django and javascript application with Bootstrap and Jquery effects.
Project keywords: Python,Django,JavaScript,JQuery,NoSQL,Bootstrap

MAIN FEATURES:

USER AUTHENTICATION:
Basic Log-in and Log-out features

VISITOR COUNTER:
Visitor counter with Python and javascript. The Python code counts the visits and the javascript code displays the number graphically using the ChartJS library.

DISCUSSION BOARD
Simulates an online discussion board. You can post a new thread, reply to an existing message,delete the messages and like messages.
All messages are stored in a MongoDB NoSQL database.
Message statistics. See the number of deleted and new messages, as well as the date of the last deletion and the date of the most recent message.

IP-ADDRESS BLOCKING
save the IP address you want to block in the database. A Python function checks if the address is in the database. 
If the address is found, the javaScript function blocks the login option

WEBSHOP
in the user view:
simulates a purchase transaction in an online store. the user selects the desired products and quantity and fills in the address information.
then the entire order is stored in the database.

in the admin view:
Perform CRUD operations on products. in the admin view you can also use Bootstrap's accordion/collapse features.
Coming soon to the admin view: Automatic email every time a new order is saved in the database.
