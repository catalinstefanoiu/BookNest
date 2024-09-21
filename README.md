# BookNest

BookNest is a web application for managing hotel bookings, allowing users to register, log in, and reserve rooms. Built using Node.js and Express, it utilizes PostgreSQL for data storage and JWT for authentication.

## Features

- User registration and login
- Hotel listing with reservation capabilities
- Room availability check
- User authentication with JWT
- Error handling for user actions

## Getting Started

### Prerequisites

- Node.js (version >= 14)
- PostgreSQL
- dotenv package for environment variables

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/BookNest.git
   
2. Navigate to the project directory:

   ```bash
   - cd BookNest
4. Install dependecies:

 ```bash
   - npm install
6. Create a .env file in the root directory with the following variables:

```bash
   - B_USR=your_db_user
   - DB_HOST=localhost
   - DB_PWD=your_db_password
   - AUTH_KEYS='{"private": "your_private_key", "public": "your_public_key"}'
   - NODE_ENV=development

5.Start the server:

```bash
- node server.mjs
  
6.Open your browser and go to:
```bash
 http://localhost:3000.


   
   
