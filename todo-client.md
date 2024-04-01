# TODO: Frontend design architecture:

The front end designs should have two separate home index pages.

1. For the client (the usual site for the consumers)
2. For the admin (moderators or the owner of the business)

## TODO: Client-View:

The saloon webapp has sevaral functionalities. If we look at the website from the client-view perspective, a general user can visit the website, explore all the services and products. If the user wants to get the benefits of the services and other features, a user needs to sign in with a simple authorization.

Let's take a look at the few requirements below:

For an `Un-authorized` user

1. Home page
2. Service page
3. Products page
4. Gallery page
5. Contacts page

For an `Authorized` user

1. Home page
2. Service page
3. Reservation page

- If the user is signed in then the user can create or make a reservation for the service.

4. Products page
5. Shopping cart

- If user is signed in then the user can add to cart to go to checkout page.

6. Checkout page

- If the user is signed in then the user can checkout with the products listed for a payment method to place an order.
- Simulate at least 2 payment gateway method.

7. Gallery page
8. Contacts page

## TODO: Admin-View:

The saloon webapp is a dynamic website with many modern technologies included. This website serves as a full capabilities to work for both admin side moderations and the client side consumer experience. Always updated with your business to meet your all needs.

Let's take a look at the few requirements below:

For an `admin` role user

1. Dashboard page
2. Product management page (inventory)

- Product add
- Product edit
- Product delete
- Product quantity (add stock)

3. Category management page

- Category add
- Category edit
- category delete

4. Services management page

- Service add
- Service edit
- Service delete

5. Reservation management page

- Approve or Cancel a reservation (should notify the client with an email prompt)
- Show upcoming reservations
- Show completed reservations

6. User management page

- Should be able to delete an user or block them

7. Analytics page

- Show number of resistered users
- Show number of sells for products (profits, loss, cost)
- Show number of reservations created (completed, canceled, upcoming)
- Show which product was sold the most and the least
- Show which service was used the most and the least
- Implement webhooks to see how many users are currently logged in (optional)

Please feel free to make adjustments or add any other features.
