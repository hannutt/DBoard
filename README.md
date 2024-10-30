# DBoard

Project keywords: AI, Python, Django, JavaScript, JQuery, NoSQL, MongoDB, SQLite, Bootstrap 5, Font Awesome.

This Python Django and JavaScript application simulates two things. An online store that uses artificial intelligence. OpenAI GPT 3.5 chatbot is integrated into the online store, where you can ask for more information about the products.

For security reasons, the chatbot's API key is stored in a local text file and retrieved from there using the JS fetch method.

Another thing that can be simulated is a discussion board that has similar functions to regular Internet discussion boards.

Start view

![alt text](DBoardApp/static/images/dboard.png)


Overview of the discussion board and its user interface. By default, the accordion/collapse divs are closed and only the topic of the conversation is shown. you can see the answer of those who entered the conversation by clicking on the arrow on the right when the div is open.

![alt text](DBoardApp/static/images/DboardUI.png)

Example picture of discussion forum text filtering when the user has selected "show only body text".

![alt text](DBoardApp/static/images/filtered.png)


Example picture where the user has clicked on the first question. clicking on the question activates a jquery function that saves the clicked text and sends it to a javascript function that communicates with the chat GPT-API. GPT's response is displayed in the alert window.

![alt text](DBoardApp/static/images/webshopAI.png)

An example picture of the banning page, where the user can view banned addresses and devices, add new ones or delete banned addresses and devices. If a prohibited address or device is found in the data, the user cannot log in to the service.

![alt text](DBoardApp/static/images/banned.png)

MAIN FEATURES:

CODE SPLIT 

All Python view codes are in their own .py files and are imported as modules in the original view.py file. The JavaScript code is also split into multiple .js files.

WEBSHOP

IN THE USER VIEW:

Simulates a purchase transaction in an online store. the user selects the desired products and quantity and fills in the address information. Then the entire order is stored in the database.
The selected products are stored in the localStorage in case you leave the online store and come back. Your order information can be retrieved easily with the localStorage feature later. This simulates a real-life online shopping experience. LocalStorage values ​​are retrieved using Object.values(localStorage); method

The webshop has a shopping cart made with HTML form. The user can open and close it with buttons. when the shopping cart is open, all products stored in localStorage are displayed in the organized list element of the Shopping Cart.

Each product in the Shopping Cart has a delete button, which can be pressed to remove the desired product from the shopping cart and local Storage. Buttons are created inside a for loop and each value attribute of the button gets the value of the corresponding local storage key.

Then, with the settAttribute method, an onclick event and a function that performs the deletion are set for the buttons. The delete function takes a this.value parameter, which in this case is the name of the localStorage key.

User experience is taken into account in the purchase transaction.
For example, when a product is added to the cart, the cart button gets a red border for a few seconds (Using the JavaScript setTimeout function and the style.className change) and the button also has a span element that contains a JavaScript variable that displays the number of items in the cart.

The variable is updated every time a new product is added to the shopping cart or a product is removed from the shopping cart.

The variable is also stored in localStorage, so the program remembers the number of products if the user leaves the page and returns later.
The purpose of these features is to give the user certainty that the product has been successfully added to the shopping cart.


IN THE ADMIN VIEW:

Perform CRUD operations on products. in the admin view you can also use Bootstrap's accordion/collapse features. All orders saved in the database are automatically displayed in the administrator view.
Inventory management, from the view you can quickly check which product is the most and which is the least in the database. The total amount of all products is also shown.

Attention color for the products that are most and least in stock.
the name of the product that is in short supply is shown in red and the name of the product with the most stock is shown in green.

ID CHECK in ADMIN VIEW

When the admin page is loaded, the python function also gets the values ​​from the used Id sql table. the id number of each added product is always stored in this table. When adding a new product to the id value input field, there is an onchange Hadler that checks the ids used with a javaScript function, which are imported to the html page with a Python function. If the ID given by the user already exists, the program displays a notification.

MARK DELIVERED IN ADMIN VIEW

The admin can change the delivery status by clicking the button. the order collection has a field name whose default value is no. On clicking the button, the Python function gets the subscription ID and changes the delivered status of the subscription to yes using the MongoDB update_one method.
The purpose of this feature is to facilitate the maintenance of order delivery information.

The delivered feature also uses Python and JavaScript functions to disable "delivered" buttons whose order is already marked as delivered. The supplied buttons appear as button elements that contain the Font Awesome Truck icon.

In Python code, this is done using the Django forloop.counter and forloop.last methods.
Initially, the program counts all the orders and uses the forloop.last command to get the final order count. 

Then the final amount is sent to the javascript function as a parameter and the javascript function uses a for loop to find where the entered text is yes. then set the Attribute to change the button's disbaled value to true.

REAL-TIME INVERTORY BALANCE UPDATING

Like real-world online stores, this app reduces inventory of ordered products in real-time.
When the user clicks the submit order button, the Python function receives the product ID and order quantity along with the order information. then the function decrements the value of the order collection's inventory field using the $inc method by converting the user-supplied number to a negative number and updates it using the update_one method.

CHATBOT IN ONLINE STORE

The chatbot uses the GPT 3.5 turbo API provided by OpenAI when answering questions. The code that implements the chatbot's operation is written in JavaScript and the answer is retrieved using JavaScript's Fetch method.

The use of the chatbot is started by clicking the question mark button. when the button is clicked the hidden div will show. The div element has ready-made questions that, when clicked, execute a jQuery function that sends the clicked text to a JavaScript function that communicates with the chat-GPT API. The API response is displayed in the alert window.


USER AUTHENTICATION:

Log-in and Log-out features. Made with Django Authenticate library.

VOICE-ASSISTED LOGIN (EXPIREMENTAL)

The user can also log in by saying the username and password into the microphone of the computer. Voice-assisted login is started by clicking the "voice login" button. after clicking, the user has 10 seconds to say the username and password.  After 10 seconds, the JavaScript timeout function stops speech recognition and adds the username and password stored in the list to the username and password input fields on the login page. The voice-assisted login feature is made with the JavaScript Web Speech API speech recognition library.


NEW USER REGISTRATION 

Unlike normal registration on most sites, in this program the user enters the email address in the html input field and clicks the submit button.

when the button is pressed, two python functions are executed. the first function retrieves the admin's email address from the sqlite 3 database and returns it to the second function, which in turn sends an email to the administrator informing them of the new user's willingness to register.

The idea is that the administrator can control the number of new users and, if desired, create a username and password and send them to the e-mail address provided by the user.

Email is sent using Python smtplib, mime libraries and Yahoo Mail mail server.
The identification information needed by Yahoo email is stored in a local environment variable for security reasons and delivered to the Python function using the os.getenv method.

GRAPHIC VISITOR COUNTER:

Visitor counter with Python and javascript. The Python code counts the visits and the javascript code displays the number graphically using the PlotlyJS library. Visitor counting takes place every time the homepage is reloaded. The LoginView function always updates the variable with +1 when calling the function and sends the value of the variable to the html page. then a javaScript function grabs the variable and passes it to PlotlyJS, which makes a graph of the number of visits.
The direction of the bar chart can be changed between horizontal and vertical using the check box

DISCUSSION BOARD

Simulates an online discussion board. You can post a new thread, reply to an existing message,delete the messages and like messages. Each message sent has a Mongo table in the collection where the responses are stored. This way, the topic and its answers can be clearly seen.
The conversation text can be translated into different languages. this is done using the Google Translate API. Messages are stored to the MongoDB NoSQL database.

All posts are wrapped in the Bootstrap 5 accordion/collapse element, so you can close or open posts.

TEXT FILTERING IN DISCUSSION BOARD

Bootstrap 5's html checkboxes allow you to choose whether to display only the message title, body, or message replies This works with Python and JavaScript functions. 
Checkboxes have an onclick method, which calls a JavaScript function that receives information about the option selected by the user as a parameter.

The Python function retrieves the user's selection using the request.post.getlist method and makes a new database query with the selected option. The search results are displayed in the html table element.


In the show reply message option, extra characters are automatically cleaned up by a JavaScript function that includes a replace method. The function is called in the body tag of the html page with the load event.
the extra characters are because the response messages are stored in a MongoDB array, they show the extra characters when you fetch the results to see them.

USER RESTRICTIONS

Only an administrator can delete messages. when the forum page is loaded, the JavaScript function gets the Django forloop.counter.last value. This is because delete buttons are created for a loop and each button's ID is deleteBtn and the current value of forloop.counter.

The total value of the for loop is used in the javascript function to tell how many buttons to hide. below is a screenshot to clarify the idea.

The buttons are hidden if the logged in user is someone other than the system administrator. the username of the logged in user is sent to the top of the page using a Python function and the javaScript function retrieves this value.

![alt text](DBoardApp/static/images/forloop.png)



MESSAGE STATISTICS

See the number of deleted and posted messages, as well as the date of the last deletion and the date of the most recent message. The number of sent and deleted messages is also shown in the bar graphs.
values ​​are stored in own Mongo collections from which they are retrieved with Python code.

TEXT CENSORSHIP ON THE DISCUSSION BOARD

You can hide forum texts with administrator credentials. The JavaScript function runs automatically and checks if an administrator is logged in. if so, the jQuery function becomes available. With the jquery function, you can hide the texts by double-clicking

IP-ADDRESS BLOCKING

save the IP address you want to block in the database. Initially, the Python function determines the user's IP address using a websocket. Then the function checks if the address is in the database. If the address is found, the javaScript function blocks the login option.

The banned ip addresses are displayed in the table element and the user can show and hide the table using Jquery show/hide methods. The page also has a JavaScript function that automatically counts how many days each IP address in the list has been blocked. The page also has a JavaScript function that automatically counts how many days each IP address in the list has been blocked. this is made with JS date objects and getTime methods.

When you enter an IP address to block, you can add dots automatically using the Jquery Mask plugin.
The feature is for addresses in the format 000.000.00.00 and 000.00.00.000, which are two common formats for IP addresses.

The feature can be activated by selecting the desired format from the drop-down menu. 
the menu uses the onchange and this methods, which call a standard JavaScript function that receives the selected format as a parameter. The function contains the Jquery mask plugin and the definition of the input field where the property is used.

BAN BY DEVICE NAME

The ban can also be made with the name of the device. It works almost the same as denying an IP address. After the home page is loaded, the Python function uses the socket.gethostname method to get the device name. Then the function checks the database and if the device name is found in the database, the login button is disabled.






