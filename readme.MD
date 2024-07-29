# E-commerce API

This is a RESTful API for an E-commerce platform built with Node.js and Express.js.

## Installation

Use npm to install the required dependencies:

```bash
npm install
```

## Usage

To start the server in development mode, run:

```bash
npm run dev
```

To start the server in production mode, run:

```bash
npm start
```

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```
PORT=8000
CLIENT_URL=127.0.0.1
MONGODB_URI=mongodb+srv://test_user:password@.........
SALT=number
JWT_TOKEN=string
```


## Dependencies

This project uses the following dependencies:

- bcryptjs: For hashing passwords.
- cors: For enabling Cross-Origin Resource Sharing.
- dotenv: For managing environment variables.
- express: The web framework for Node.js.
- jsonwebtoken: For generating and verifying JSON Web Tokens.
- mongoose: For interacting with MongoDB.