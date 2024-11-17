# Contact Management System

## Project Setup Instructions

### Prerequisites
1. Install **Node.js** (v16 or later).
2. Install **MongoDB** or set up a cloud database like **MongoDB Atlas**.
3. Ensure **npm** (Node Package Manager) is installed (comes with Node.js).

---

### 1. Clone the Repository
```bash
git clone https://github.com/MadhavBhattad/Contact-Management
cd Contact-Management
```

### 2. Setup Backend
```bash
    cd server
    npm install
```
### Configure MongoDB
Update the MongoDB connection string in server/index.js if needed.
```bash
    node index.js
    npm start
```
#### The backend will run on port 3001 by default.

### 3. Setup Frontend
```bash
    cd ../client
    npm install
    npm start
```
#### By default, the frontend will run on http://localhost:3000.

### Usage:
#### 1. Open a browser and visit http://localhost:3000 to access the application.
#### 2. The application will fetch and display contact details from the backend.
#### 3. Use the form to add new contacts. They will be saved in the MongoDB database.
#### 4. Use edit and delete functionalities as needed. Pop-ups will confirm actions.

### Troubleshooting:

#### 1. Ensure both backend and frontend servers are running.
#### 2. Verify that the MongoDB connection string in server/index.js is correct.
#### 3. If ports conflict, adjust the ports in the codebase or your local machine:
        Backend: server/index.js
        Frontend: client/package.json ("start" script with PORT environment variable).
