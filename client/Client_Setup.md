## Client Setup Instructions

This is the **frontend React client** built using **Vite**. It supports **Auth0 authentication**, API communication using **Axios**, and renders beautiful charts using **Chart.js**.

#### 1. **Clone the Repository**

```bash
git clone "https://github.com/riya-rjha/crm-project.git"
cd client
```

#### 2. **Install Dependencies**

```bash
npm install
```

#### 3. **Setup Environment Variables**

Create a `.env` file in the root of the `client/` directory and add the following:

```env
VITE_CLIENT_ID=""
VITE_DOMAIN=""
```

> These are used by **Auth0** API Key for handling authentication. Create an account on Auth0 to get free client ID & domain and use it in your .env file to authenticate users with their google IDs.

---

### 🚀 Run the Development Server

```bash
npm run dev
```

---

## 📦 Dependencies Used

1. @auth0/auth0-react: To handle google authentication
2. axios: To handle server requests & processing of data from client to server (POST, GET Requests)
3. chart.js: To provide a visual depiction of charts & data of campaigns & messages successfully delivered or failed