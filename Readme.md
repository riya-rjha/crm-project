# CRM App - Client & Server Setup

This CRM app enables managers to authenticate via Google, manage customers, create personalized campaigns, and view message statistics with AI insights.

### 🧑‍💻 Project Setup

For client setup, view this [README](./client/Client_Setup.md).

For server setup, view this [README](./server/Server_Setup.md).

## Project Approach

1. **Setting up Google Authentication**: I have used Auth0's library to integrate Google account authentication for seamless user authentication, enabling managers to securely sign in to the app using their Google accounts. The managers can add customers, create campaigns or view segments only if they are authorized. Once authorized, the button on Home page changes to Logout and after logging out, the manager won't be able to access the data.

2. **Customer Data Ingestion**: In order to create a CRM app, there needs to be a lot of customers. So, a manager can add customers with 3-4 field parameters, like expenditure, their visits on the website, activeDays etc. 

3. **Campaign Creation**: Through Campaign creation, the manager can make segments of customer data based on query logic. Eg. e.g., spend > INR 10,000 AND visits < 3 OR inactive for 90 days. This data is being sent from client to the server, the manager will enter the value of field and will choose from options like greater than, lesser than or equal to the value. Based on which customers will be filtered and requests will be sent to the backend. The manager will also have to add a message which will be common for all these users.

4. **Segments & Delivery Receipt**: The delivery receipt or statistics page on the client side uses Chart.js to show a visual representation of all users who successfully received the message & those who didn't. This is based through a Vendor API that handles a simple Mathematical logic to handle sent & failed requests. 

5. **AI Integration**: 

    - **_AI Integration in Campaign Posts & Messages_**: On a successful campaign post, every user in that campaign will be give a personalized AI Generated message through the server side and will be created as a receipt on the delivery backend. The users will have the message based on the campaign message and their field parameters. 

    - **_Summary Generation on Segments Page_**: Through Gemini Flash API, a human readable summary insight is created based on the total successful & failed attempts of sending message beside the pie-chart visualization.

## Possible Limitations

**High DB Load** : Since every request is associated with the request of one another through DB, this can increase the DB Load. Every single API hit triggers an immediate write to the database. This increases the number of DB operations and can slow performance under high load.

**Scalability Issues** : Since there is no usage of a Redis Queue that could possibly help reduce distribution overload, this may lead to scalability issues when multiple users would be working on the same website, sending requests every now and then. 