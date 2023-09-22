# CERA Back-end Challenge

This repository contains the solution to a technical challenge that involves creating a MongoDB database and building an API in Node.js for user authentication and profile management.

## Table of Contents

- [Overview](#overview)
- [Key Technologies Used](#key-technologies-used)
- [API Documentation](#api-documentation)
- [Installation](#installation)
- [Usage](#usage)
- [How to run tests](#how-to-run-tests)

## Overview

The API is built using Node.js and Express.js with MongoDB and offers the following routes:

`POST /autenticacao/entrar` This route allows users to log in to the API.

`POST /autenticacao/registrar` This route allows users to register in the API.

`GET /perfil/{idUsuario}` This route allows users to retrieve profile information by ID.

`PATCH /perfil/senha/alterar/{idUsuario}` This route allows users to change their password.

### Key Technologies Used

- Node.js
- TypeScript
- Express.js
- MongoDB with Mongoose
- JsonWebToken
- Jest
- Other dependencies (listed in the `package.json` file)

## API Documentation

> Coming soon...

## Installation

Follow these steps to set up the project on your local machine:

1. Make sure you have MongoDB installed so that the API has access to the database. You can also use MongoDB Atlas if you prefer and change the `MONGO_URI` environment variable to the connection string of your database deployment.

2. Clone the repository:

   ```bash
   git clone https://github.com/leandro-eduardo/backend-cera.git
   ```

3. Navigate to the project directory:
   ```bash
    cd backend-cera
   ```
4. Install the dependencies
   ```bash
    npm install
   ```
5. Rename .env.example file to .env and fill in the environment variables. Example:

   ```bash
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/backend-cera
   JWT_SECRET=secret
   ```

## Usage

After installation, you can start the API server with the following command:

```bash
 npm run dev
```

This will start the back-end server at http://localhost:5000.

## How to run tests

After installation, you can run the API tests with the following command:

```bash
 npm test
```

This will run the application tests containing the description of each test run.

```bash
 npm run test:coverage
```

This will run the tests in the same way as the previous command, but will also show tests coverage.
