# Portfolio Platform

This project is a portfolio platform built using Node.js, Express, MongoDB, and JWT authentication. The platform allows users to register, log in, manage their portfolio, and interact with various external APIs for news, currency, and other data. It features role-based access control, allowing for different levels of authorization.

## Features

- **User Authentication**: Users can register, log in, and maintain session with JWT tokens.
- **User Roles**: Supports user roles, including 'user' and 'admin'.
- **Portfolio Management**: Users can manage their portfolio and associated items.
- **Books API**: Allows for the management of books, including CRUD operations.
- **External API Integrations**: Fetches data from external APIs for news and currency exchange rates.
- **Visualization**: Admin users can create visualizations based on data.
- **File Uploads**: Supports image uploads for books.

## Used frameworks

  "axios": "^1.7.7",
    "bcryptjs": "^2.4.3",
    "dotenv": "^16.4.5",
    "ejs": "^3.1.10",
    "express": "^4.21.1",
    "express-session": "^1.18.1",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.8.1",


## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/portfolio-platform.git
2.do the .env
MONGO_URI=
JWT_SECRET=
EMAIL_USER=
EMAIL_PASS=
NEWS_API_KEY=
CURRENCY_API_KEY=
PORT=
