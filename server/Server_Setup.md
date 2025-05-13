## Server Setup Instructions

##### Install Dependencies:

```bash
cd server
npm install
```

##### Environment Variables:

Create a `.env` file in the `server/` directory and add the following:

```env
PORT=XXXX
MONGO_DB_URL="YOUR_MONGODB_URL"
API_KEY="GEMINI_API_KEY"
```

##### Run Development Server:

```bash
npm start
```

## 📦 Dependencies Used

1. @google/generative-ai: To use Gemini for AI Personalized message generation & summary
2. dotenv: To store secret keys in .env file
3. cors: To allow requests from other sites
4. nodemon: To monitor for any changes in code
5. mongoose & mongodb: To establish connection with MongoDB and create Schemas