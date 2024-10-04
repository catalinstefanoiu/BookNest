# BookNest

BookNest is a web application for managing hotel bookings, allowing users to register, log in, and reserve rooms. Built using Node.js and Express, it utilizes PostgreSQL for data storage and JWT for authentication.

![image](https://github.com/user-attachments/assets/70c3ba76-efc0-4807-a7d5-59e62afcbe54)


## Features

- User registration and login
 ![image](https://github.com/user-attachments/assets/90df7ac9-a868-44bc-bbfd-32f9543d11b6)
 ![image](https://github.com/user-attachments/assets/8bb27ae6-88d0-437f-9039-b5a967cc20e4)
- Hotel listing with reservation capabilities
  ![image](https://github.com/user-attachments/assets/f4d4e7cc-73a3-4cff-8650-6337db79b927)
- Room availability check
  ![image](https://github.com/user-attachments/assets/ba11d6cf-9763-4b2d-8802-469a160d90f6)
  ![image](https://github.com/user-attachments/assets/8090467a-fa99-4e0f-a047-84b968494475)
- User authentication with JWT
  ![image](https://github.com/user-attachments/assets/22b49c42-d93d-44cb-8fe9-c8adc3d551c4)
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

5. Start the server:
     ```bash
   - node server.mjs
  
6. Open your browser and go to:
     ```bash
    -http://localhost:3000.
