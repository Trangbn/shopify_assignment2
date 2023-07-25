## Frontend

## Installation

```bash
# install
cd shopify-frontend

$ yarn install
```


```bash
# development
$ yarn run start
```

# Flow to use app
- Step 1: Registering new account
- Step 2: Adding new product if need
- Step 3: Can process further logic such as: editing product, placing order

# Completed
- [x] Product Listing / Form:
- Fetch and display a list of products from an API using a general Axios instance for
  network requests.
- Users should be able to create/update products (must include image upload).
- Display relevant information for each product, such as name, price, and image

- [x] User Authentication:
- Implement user registration and login functionality. 
- Products should be visible to all users (logged in/ logged out)
- Secure the shopping cart by requiring users to log in before adding items to the cart.
- [x] Shopping Cart:
- Implement a shopping cart functionality using Redux to manage the state of the cart. 
- Allow users to add products to the cart, update quantities, and remove items. 
- Display the current cart contents, including the total price and quantity of items.
- [x] User Orders, Feedback and Notifications:
- Users should be able to place an order with multiple products ( each order can have up
  to 6 products )
- Provide user feedback and notifications for cart actions, such as adding items, updating
  quantities, or placing orders. 
- Display success or error messages as appropriate. 
- Once an order has been placed send an email to the user with confirmation

===============
## Backend

- Node 16.x
- Yarn 1.x
- PostgreSQL 15.x

# Completed
- [x] Implement user authentication and authorization using a secure method such as JWT
(JSON Web Tokens).
- [x] Create API endpoints to handle user registration, login, and logout.
- [x] Logging
- [x] Use Winston to log events to a file or a database.
- [x] Database Integration
- [x] API Endpoints
- [x] Event Listeners
- [x] Swagger docs http://localhost:3000/api
- [x] Postman Collection (json)

## Installation

```bash
cd shopify-backend

$ yarn install
```

## Migration
Note: The TypeORM is not setting to auto synchronize between entity and DB table when application booting. If you wish to migration database, please using following command.
### Create new migration
```bash
$ yarn run migrate:create <migration name>
```
### Migrate database
```bash
$ yarn run migrate:up
```
## Running the app

```bash
# development
$ yarn run start

```
