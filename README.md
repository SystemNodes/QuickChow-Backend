
# QuickChow Backend API

QuickChow is a backend API for a food delivery and restaurant management system.  
It provides endpoints for authentication, user management, carts, products, orders, restaurants, categories, and transactions.

---

## Base URL
https://quickchow-backend.onrender.com

---

## Features
- User Authentication (Signup, Login with JWT)
- Restaurant Management (Add, view, update restaurants)
- Product Management (CRUD operations for products)
- Cart System (Add, remove, clear cart items)
- Order Management (Create, fetch, and manage orders)
- Transactions (Track payments and statuses)
- Categories (Organize products and restaurants)

---

## Installation & Setup

1. Clone the repository:
```
git clone https://github.com/your-username/quickchow-backend.git
cd quickchow-backend
```

2. Install dependencies:
```
npm install
```

3. Create a `.env` file with the following:
```
PORT=5000
MONGO_URI=your_mongo_db_uri
JWT_SECRET=your_jwt_secret
```

4. Start the server:
```
npm start
```

The API will run on: http://localhost:5000

---

## Authentication
- Uses JWT (JSON Web Token).
- For all protected routes, include in headers:
```
Authorization: Bearer <your_token>
```

---

## API Endpoints

Users:
- POST /signup → Register a new user
- POST /login → Login and get JWT token

Cart:
- POST /cart/add → Add item to cart
- GET /carts → Fetch user’s cart
- DELETE /cart/remove → Remove item from cart
- DELETE /cart/clear → Clear cart

Orders:
- POST /orders/create → Create a new order
- GET /orders → Fetch user’s orders

Restaurants:
- GET /restaurants → Fetch all restaurants
- POST /restaurants → Add a new restaurant (admin)

Products:
- GET /products → Fetch all products
- POST /products → Add a new product (admin)

Categories:
- GET /categories → Fetch all categories
- POST /categories → Add a category (admin)

Transactions:
- GET /transactions → Fetch transaction history
- POST /transactions → Create new transaction

---

## Testing
Run the API using Postman or cURL.
Example:
```
curl -X POST https://quickchow-backend.onrender.com/login -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"123456"}'
```

---

## Contributing
1. Fork the repo
2. Create a feature branch
3. Commit changes
4. Push and create a Pull Request

---

## License
MIT License

---

### Author
Patrick Njoku
