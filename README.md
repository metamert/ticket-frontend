![akdeniz](https://user-images.githubusercontent.com/58224943/103657347-d8fd1080-4f7a-11eb-93d0-3a45a70b4520.gif)

# Akdeniz University Web dev Assigment Apartment Management 

## Instructer => MELIH GUNAY


## Student => Orkun Mert YİĞİT 20170808005

## Technologies I have used:

Front end => React, Redux ,Stripe (payment component),Lottie Animation, Axios ,HTML,CSS

Back end => POSTGRE SQL ,  Node.js ,Express.js, Stripe gateway, Restful Api , JWT token for private routes for admin

## the requirements

2 different user types for admin and user

credit card integration for payments

edit delete view and update for user and admin

set monthly rate

dynamic due to extra services such as fitness and swimming for each user
invoices should be renewed automatically at the beginning of the month
Paid and unpaid due dates should be easily controlled

user should be notified with automatic announce when updating new rate
admin should be able to see which apartments are available
The admin should be able to view the monthly income of the apartment


## problems i have encountered

Since each of them has only 1 owner of the apartment, when creating a new user, I had to show only the appropriate ones in the selection of apartments on both the admin side and the user register side.

The payment part must be secure.I can store my credit card information with the guarantee of stripe, and also admin can mark it with cash payment.

The user should not reach the admin sections .I used jwt token for the protected route, it was protected against such scripts.

It should be checked whether the user has paid the debt, the user should be displayed in user friendly way, moved_date should change auto when the user moves.





Example Images from app :




![image](https://user-images.githubusercontent.com/58224943/103658194-f383b980-4f7b-11eb-8fd2-056b409b885f.png)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## POSTGRE SQL DIAGRAM
![image](https://user-images.githubusercontent.com/58224943/103662872-7e1ae780-4f81-11eb-938c-0af53d801ec4.png)

