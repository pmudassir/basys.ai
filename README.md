# Basys AI
This project is a full-stack application consisting of a backend and frontend. The backend is built using Node.js, Express, and MongoDB, and the frontend is built using React and Vite.

## Table of Contents
- [Project Setup](#project-setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
  - [Full Setup](#full-setup)
- [API Documentation](#api-documentation)
  - [Endpoints](#endpoints)
- [Video Explanation](#video-explanation)
- [Tech Stack](#tech-stack)
- [License](#license)

## Project Setup

### Backend Setup
1. Clone the repository and navigate to the backend directory:
    ```bash
    git clone https://github.com/pmudassir/basys.ai.git
    cd backend
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add the following environment variable:
    ```bash
    MONGO_URI=<Your MongoDB connection string>
    ```

4. Run the backend server:
    ```bash
    npm start
    ```
    This will start the server using `nodemon`. If you want to run without `nodemon` in production, you can use:
    ```bash
    npm run dev
    ```

### Frontend Setup
1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Run the frontend development server:
    ```bash
    npm run dev
    ```
    The frontend will be served on [http://localhost:3000](http://localhost:3000) by default.

## Environment Variables
For the backend to connect to the MongoDB database, you must create a `.env` file in the `backend` directory and add the following:

```bash
MONGO_URI=<Your MongoDB connection string>
```

## API Documentation

### Endpoints
Here are the key API endpoints:

- **GET** `/patients` : Retrieves all patients.
  
- **GET** `/patients/:id` : Retrieves a specific patient by ID.

- **POST** `/patients` : Adds a new patient.

- **PUT** `/patients/:id` : Updates a patient's details.

- **GET** `/authRequests` : Retrieves all authorization requests.

- **POST** `/authRequests` : Creates a new authorization request.

## Video Explanation
[Link to Video Explanation](https://drive.google.com/file/d/1yU_DTdSYaKuQDtwDtJD8qtP7FhRYC8WJ/view?usp=sharing)

## Tech Stack
- **Backend**: Node.js, Express, MongoDB
- **Frontend**: React, Vite
