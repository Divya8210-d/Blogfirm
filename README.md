#  Blogfirm

- A blog management app where user can add , edit , delete and post blogs related to any topic. 
- This is a full stack app that includes a frontend with a interactive UI and a backend for handling the api request.

---

##  Technologies Used

### Frontend
- **React.js** – Component-based frontend UI
- **Axios** – For making HTTP requests
- **React Router DOM** – Client-side routing
- **Tailwind CSS** – For improving the UI of the frontend
- **Framer-motion**- For integrating animations
- **Toastify**- For alert messages
- **React-icons**-For various icons used

---

### Backend
- **Node.js** – Server-side JavaScript runtime
- **Express.js** – Lightweight Node.js web framework
- **MongoDB** – NoSQL database for storing blog content and users
- **Mongoose** – ODM for MongoDB to interact with the database
- **Nodemon**-For the monitoring the changes in the backend

### Authentication & Security
- **JWT (JSON Web Tokens)** – For secure authentication
- **bcrypt.js** – For hashing passwords
- **CORS / dotenv/ cookie-parser** – Security and environment config and cookies

---

##  Features

- User registration and login
- Create, edit, and delete blog posts
- View posts by all users
- Responsive design
- Auto-save after 5 seconds of inactivity
- Pagination and search by topics

---

## Project Setup Instructions

### 1. Clone the Repository


git clone https://github.com/yourusername/Blogfirm.git
cd Blogfirm


### Prerequisites
Make sure you have the following installed:
- **Node.js** (v14+)
- **MongoDB** (cloud instance  MongoDB Atlas)
- **npm**


##  MongoDB Atlas Setup Instructions

1. **Create an Account**
   - Visit [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and sign up.

2. **Create a Cluster**
   - Click on **"Build a Database"**
   - Choose the **Shared Tier** (free)
   - Select your preferred **cloud provider** and **region**
   - Click **Create Cluster**

3. **Create a Database User**
   - Go to **Database Access** in the sidebar
   - Click **Add New Database User**
   - Set a **username** and **password**
   - Give the user **Read and Write access** to any database

4. **Allow IP Access**
   - Go to **Network Access** in the sidebar
   - Click **Add IP Address**
   - Choose **Allow access from anywhere (0.0.0.0/0)**

5. **Get Your Connection String**
   - Go to **Clusters → Connect → Connect your application**
   - Copy the provided **connection string**

6. **Update Your `.env` File**
   - In your `Backend/.env` file, replace the placeholder with your actual **MongoDB connection string**
   - Make sure to include your **username** and **password** in the URI


 
###  Backend Setup

   1. Navigate to the Backend folder:
   
      - cd Backend
   2. Install dependencies
   
      - npm install

    
   
   3. Create a .env file in the root of the Backend folder and add the details as given in env.sample.txt file in the same format with your credential
   
   
   4. Start the server

      - npm run dev




 ### Frontend Setup

1. Navigate to the Frontend folder:
   
  - cd ./Frontend/blogfirm
   
2. Install dependencies:
   
  - npm install

3. Start the React App

  - npm run dev

**Visit the React app locally by clicking on the localhost link in your terminal**





