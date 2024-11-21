# Auth-API
Authentication with MFA

This project is a RESTful Authentication API built with Node.js and TypeScript, designed to support **Multi-Factor Authentication (MFA)** via email. It handles core authentication features such as user registration, login, sending MFA codes, and verifying them.

---

## Features

- **User Registration**: Securely register new users with hashed passwords.
- **Login**: Log a user in.
- **Multi-Factor Authentication (MFA)**:
  - Send a time-sensitive MFA code to the user's email.
  - Verify the MFA code for secure access.

---

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Minimalist web framework for building APIs.
- **TypeScript**: Provides type safety and improved developer experience.
- **JWT**: JSON Web Tokens for user authentication and session management.
- **Bcrypt.js**: Used to hash passwords securely.
- **Nodemailer**: Handles email notifications for MFA.
- **Zod**: Schema validation for user input.

---

## Setup and Installation

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your system.
- [Yarn](https://yarnpkg.com/) as your package manager.

### Steps to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/Sorphy/Auth-API.git
   cd Auth-API
   
2. Install dependencies:
   ```bash
   npm install

3. Create a .env file in the root directory with the following configurations
    ```
    JWT_SECRET_KEY=your_jwt_secret_key
    BREVO_USER=your_brevo_user
    BREVO_PASSWORD=your_brevo_password

4. Compile the typescript code
    ```bash
    npm run buil
    OR
    yarn build

5. Start the server:
    ```bash
    npm run start
    OR
    yarn start

## API Endpoints

| HTTP Method | Endpoint        | Description                          |
|-------------|-----------------|--------------------------------------|
| `POST`      | `/signup`       | Registers a new user.                |
| `POST`      | `/login`        | Logs in a user .     |
| `POST`      | `/verify-mfa`   | Verifies the MFA code and issues a jwt. |

---

## Testing the API

### Using Postman
You can test the API using **Postman**. 
## URL is https://auth-api-8lrk.onrender.com 

### Sample Workflow

#### Register a User:
- **Endpoint**: `POST /api/auth/signup`
- **Body**:
  ```json
  {
    "name": "Sofiyyah Abidoye",
    "email": "sorphyat@gmail.com",
    "phone": "08101695397",
    "password": "password123",
    "confirmPassword": "password123"
  }
#### Login a User:
- **Endpoint**: `POST /api/auth/login`
- **Body**:
  ```json
  {
    "email": "sorphyat@gmail.com",
    "password": "password123"
  }
  
#### MFA:
- **Endpoint**: `POST /api/auth/verify-mfa`
- **Body**:
  ```json
  {
    "email": "sorphyat@gmail.com",
    "otp": 123456
  }
