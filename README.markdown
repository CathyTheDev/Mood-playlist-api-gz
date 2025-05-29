# Mood-Based Playlist Generator API

## Overview
The Mood-Based Playlist Generator API is a RESTful API built with Node.js, Express, and MongoDB, designed to generate playlists based on a user’s mood. Users can register, log in, add songs with mood tags (e.g., "happy," "sad"), and generate playlists tailored to their current mood. The API includes JWT-based authentication, ensuring secure access to user-specific features.

This project was created to demonstrate proficiency in backend web development, including API design, MongoDB data management, and user authentication, while keeping my skills sharp during my job search.

## Objectives
- Build a secure and user-focused API for generating mood-based playlists.
- Implement JWT authentication for user security.
- Support features like adding songs, tagging them with moods, and generating playlists.
- Ensure a clean and modular code structure.

## Tech Stack
- **Node.js** with **Express.js**: For building the RESTful API.
- **MongoDB** with **Mongoose**: For data storage and management.
- **JWT (jsonwebtoken)**: For user authentication.
- **bcrypt**: For password hashing.
- **express-validator**: For input validation.
- **dotenv**: For managing environment variables.

## Requirements
- Node.js (v14 or higher)
- MongoDB (running locally or via MongoDB Atlas)
- npm (Node Package Manager)

## Setup Instructions

### 1. Clone the Repository
Clone this project to your local machine:
```bash
git clone <repository-url>
cd mood-playlist-api
```

### 2. Install Dependencies
Install the required npm packages:
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add the following:
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/mood-playlist-api
JWT_SECRET=your_jwt_secret_key_here
```
- `PORT`: The port where the server will run (default: 4000).
- `MONGODB_URI`: Your MongoDB connection string (update if using MongoDB Atlas).
- `JWT_SECRET`: A secure random string for JWT signing (generate one using `openssl rand -base64 32`).

### 4. Start MongoDB
Ensure MongoDB is running:
- For local MongoDB: Start the server with `mongod`.
- For MongoDB Atlas: Ensure your `MONGODB_URI` is correct.

### 5. Run the Server
Start the development server:
```bash
node server.js
```
You should see:
```
Server running on port 4000
Connected to MongoDB
```

## API Endpoints

### Authentication
- **POST /api/auth/signup**  
  Register a new user.  
  - **Body**:
    ```json
    {
      "username": "atharv",
      "email": "atharv@example.com",
      "password": "password123"
    }
    ```
  - **Response** (201):
    ```json
    { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
    ```

- **POST /api/auth/login**  
  Log in and get a JWT token.  
  - **Body**:
    ```json
    {
      "email": "atharv@example.com",
      "password": "password123"
    }
    ```
  - **Response** (200):
    ```json
    { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
    ```

### Songs
- **POST /api/songs** (Authenticated)  
  Add a new song with mood tags.  
  - **Headers**: `Authorization: Bearer <token>`  
  - **Body**:
    ```json
    {
      "title": "Happy",
      "artist": "Pharrell Williams",
      "genre": "Pop",
      "moodTags": ["happy", "energetic"]
    }
    ```
  - **Response** (201):
    ```json
    {
      "_id": "60c72b2f9b1e8b3b4c8d1234",
      "title": "Happy",
      "artist": "Pharrell Williams",
      "genre": "Pop",
      "moodTags": ["happy", "energetic"],
      "createdAt": "2025-05-24T16:00:00.000Z",
      "__v": 0
    }
    ```

### Playlists
- **POST /api/playlists/generate** (Authenticated)  
  Generate a playlist based on a mood.  
  - **Headers**: `Authorization: Bearer <token>`  
  - **Body**:
    ```json
    { "mood": "happy" }
    ```
  - **Response** (201):
    ```json
    {
      "_id": "60c72b3a9b1e8b3b4c8d5678",
      "userId": "60c72b1f9b1e8b3b4c8d0000",
      "mood": "happy",
      "songs": [
        { "_id": "60c72b2f9b1e8b3b4c8d1234", "title": "Happy", "artist": "Pharrell Williams", "genre": "Pop", "moodTags": ["happy", "energetic"] }
      ],
      "createdAt": "2025-05-24T16:06:00.000Z",
      "__v": 0
    }
    ```

- **GET /api/playlists/my-playlists** (Authenticated)  
  Get all playlists for the authenticated user.  
  - **Headers**: `Authorization: Bearer <token>`  
  - **Response** (200):
    ```json
    [
      {
        "_id": "60c72b3a9b1e8b3b4c8d5678",
        "userId": "60c72b1f9b1e8b3b4c8d0000",
        "mood": "happy",
        "songs": [
          { "_id": "60c72b2f9b1e8b3b4c8d1234", "title": "Happy", "artist": "Pharrell Williams", "genre": "Pop", "moodTags": ["happy", "energetic"] }
        ],
        "createdAt": "2025-05-24T16:06:00.000Z",
        "__v": 0
      }
    ]
    ```

## Testing the API
Use a tool like **Postman** or **Thunder Client** to test the endpoints:
1. Start the server (`node server.js`).
2. Sign up or log in to get a JWT token.
3. Use the token in the `Authorization: Bearer <token>` header for authenticated endpoints.
4. Test adding songs and generating playlists as shown above.

## Project Structure
```
mood-playlist-api/
├── middleware/
│   └── auth.js            # JWT authentication middleware
├── models/
│   ├── user.js            # User model
│   ├── song.js            # Song model
│   └── playlist.js        # Playlist model
├── routes/
│   ├── auth.js            # Auth routes (signup, login)
│   ├── songs.js           # Song routes
│   └── playlists.js       # Playlist routes
├── .env                   # Environment variables
├── server.js              # Main server file
├── package.json           # Project dependencies
└── README.md              # Project documentation
```



## License
This project is licensed under the MIT License.
