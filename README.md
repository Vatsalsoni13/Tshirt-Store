# Tshirt-Store
This is a MERN(MongoDB, Express, React, NodeJS) stack project with two payment gateways *Stripe* and *PayPal*.</br>
I have made this as an application of what I have learnt and learning in this stack.

### Installation
Make sure you have <a href="https://nodejs.org/en/download/">NodeJS</a> and <a href="https://www.mongodb.com/try/download/community" >MongoDB</a>.

Clone the repository.
```
git clone https://github.com/Vatsalsoni13/Tshirt-Store.git
````
Go inside projbackend folder.
```
npm install && npm start
```
Open another terminal or CMD. Go inside projfrontend folder. __Note: Make sure your projbackend is running.__
```
npm install && npm start
```

### Map for the project 

<img src = "./projbackend/compressed images/map.png" height="50%" width="100%" alt ="Map" />


### Description
As its one of the e-commerce its a never ending thing, I have tried to apply the best I can, still I know many things can be added.

#### ADMIN 
This is the admin section of the store or the part where owner has authorities.
It is protected by middlewares so, no normal user can can login in. The admin can do following tasks:

Create catagories, Create Products, Manage catagories, Manage Products and Manage Orders.


GO and try out these features.

#### __USER__

Like any other store website i have also implemented the basic fundamentals as it is.
You will be redirected to Dashboard where your orderstatuses will be displayed, if any(Admins change the status of order).

For buying the product there are two payment gateways Stripe and PayPal.
Since, this project is not for production below there I have provided test credentials for payments.

__Credentials for Stripe:__
```
Card number: 4242 4242 4242 4242
Expiry Date: 12/21
CVV: 123
```

__Credentials for PayPal:__
```
Card number: 378282246310005
Expiry Date: 12/21
```


Thnaks for reading through hope you like it and find it useful.
