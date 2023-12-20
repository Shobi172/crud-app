# User Management App

This project is a simple user management application built with React on the frontend and Node.js/Express on the backend.

## Features

- View a list of users
- Register and login new users
- Update existing user details
- Delete users

## Installation

### Frontend

1. Clone the repository:

   ```bash
   git clone https://github.com/Shobi172/user-management-app.git
   ```

2. Navigate to the frontend directory:

   ```bash
   cd user-management-app/frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the frontend:

   ```bash
   npm start
   ```

   The app will run on `http://localhost:3000`.

### Backend

1. Ensure you have Node.js and MongoDB installed.

2. Navigate to the backend directory:

   ```bash
   cd user-management-app/backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:

   Create a `.env` file in the `backend` directory and add the following:

   ```plaintext
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_secret
   ```


5. Run the backend:

   ```bash
   npm start
   ```

   The server will run on `http://localhost:5000`.

## Usage

- Access the app in your browser at `http://localhost:3000`.
- Interact with the user management interface to view, add, update, and delete users.

## API Routes

- `GET /api/users` - Retrieve all users
- `GET /api/users/:id` - Retrieve a specific user by ID
- `PUT /api/users/:id` - Update a user by ID
- `DELETE /api/users/:id` - Delete a user by ID

## Contributing

Feel free to contribute by opening issues or submitting pull requests.
