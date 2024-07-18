# DBoard
Python Django and javascript application with Bootstrap and Jquery.

Project keywords: Python, Django, JavaScript, JQuery, NoSQL, MongoDB, Bootstrap.

MAIN FEATURES:

CODE SPLIT 

Since the original view.py file became too large, the code has started to be divided into separate .py files. for now, the login/logout and message sending and reply codes as well as the IP address blocking codes are in their own files. The JavaScritp code is also split into multiple .js files.

USER AUTHENTICATION:

Log-in and Log-out features. Made with Django Authenticate library.

GRAPHIC VISITOR COUNTER:

Visitor counter with Python and javascript. The Python code counts the visits and the javascript code displays the number graphically using the ChartJS library. Visitor counting takes place every time the homepage is reloaded. The LoginView function always updates the variable with +1 when calling the function and sends the value of the variable to the html page. then a javaScript function grabs the variable and passes it to ChartJS, which makes a graph of the number of visits.

DISCUSSION BOARD

Simulates an online discussion board. You can post a new thread, reply to an existing message,delete the messages and like messages. The conversation text can be translated into different languages. this is done using the Google Translate API. Messages are stored to the MongoDB NoSQL database.

All posts are wrapped in the Bootstrap 5 accordion/collapse element, so you can close or open posts.

Text filtering, with the html checkboxes you can choose whether only the title or body text of the message is displayed. This works with a Python function that gets the user's selection using the request.post.getlist method and makes a new database query with the selected option.

Message statistics. See the number of deleted and new messages, as well as the date of the last deletion and the date of the most recent message.

TEXT CENSORSHIP ON THE DISCUSSION BOARD

You can hide forum texts with administrator credentials. The JavaScript function runs automatically and checks if an administrator is logged in. if so, the jQuery function becomes available. With the jquery function, you can hide the texts by double-clicking

IP-ADDRESS BLOCKING

save the IP address you want to block in the database. Initially, the Python function determines the user's IP address using a websocket. Then the function checks if the address is in the database. If the address is found, the javaScript function blocks the login option.

The banned ip addresses are displayed in the table element and the user can show and hide the table using Jquery show/hide methods. The page also has a JavaScript function that automatically counts how many days each IP address in the list has been blocked. The page also has a JavaScript function that automatically counts how many days each IP address in the list has been blocked. this is made with JS date objects and getTime methods.

WEBSHOP

IN THE USER VIEW:

simulates a purchase transaction in an online store. the user selects the desired products and quantity and fills in the address information. Then the entire order is stored in the database.
The selected products are stored in the localStorage in case you leave the online store and come back. Your order information can be retrieved easily with the localStorage feature later. This simulates a real-life online shopping experience. LocalStorage values ​​are retrieved using Object.values(localStorage); method

The webshop has a shopping cart made with HTML form. The user can open and close it with buttons. when the shopping cart is open, all products stored in localStorage are displayed in the organized list element of the Shopping Cart.

Each product in the Shopping Cart has a delete button, which can be pressed to remove the desired product from the shopping cart and local Storage. Buttons are created inside a for loop and each value attribute of the button gets the value of the corresponding local storage key.

Then, with the settAttribute method, an onclick event and a function that performs the deletion are set for the buttons. The delete function takes a this.value parameter, which in this case is the name of the localStorage key.

User experience is taken into account in the purchase transaction.
For example, when a product is added to the cart, the cart button gets a red border for a few seconds (JavaScript setTimeout function) and the button also has a span element that contains a JavaScript variable that displays the number of items in the cart.
The variable is updated every time a new product is added to the shopping cart.

The purpose of these features is to give the user certainty that the product has been successfully added to the shopping cart.


IN THE ADMIN VIEW:

Perform CRUD operations on products. in the admin view you can also use Bootstrap's accordion/collapse features. All orders saved in the database are automatically displayed in the administrator view.
Inventory management, from the view you can quickly check which product is the most and which is the least in the database. The total amount of all products is also shown

Attention color for the products that are most and least in stock.
the name of the product that is in short supply is shown in red and the name of the product with the most stock is shown in green.

ID CHECK in ADMIN VIEW

When the admin page is loaded, the python function also gets the values ​​from the used Id sql table. the id number of each added product is always stored in this table. When adding a new product to the id value input field, there is an onchange Hadler that checks the ids used with a javaScript function, which are imported to the html page with a Python function. If the ID given by the user already exists, the program displays a notification.