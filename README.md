# Study Helper

A comprehensive study tracking and learning management system that helps you organize your learning journey, track progress, and access relevant resources.

## Features

- Track study topics and progress
- Organize learning resources
- Daily study logging
- Resource management
- Progress tracking
- Achievement system

## Tech Stack

- Frontend: React.js
- Backend: Node.js with Express
- Database: MongoDB
- Styling: Tailwind CSS

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the backend directory
   - Add the following variables:
     ```
     MONGODB_URI=your_mongodb_uri
     PORT=5000
     ```

4. Start the development servers:
   ```bash
   # Start backend server
   cd backend
   npm run dev

   # Start frontend server
   cd ../frontend
   npm start
   ```

## Project Structure

```
study_help/
├── frontend/          # React frontend application
├── backend/           # Node.js backend server
└── README.md         # Project documentation
``` 