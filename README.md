# Notification System - README

This project is a simple **Notification System** that allows users to send SMS and Email notifications using **Twilio** for SMS and **SendGrid** for Email. The system also allows users to view the history of notifications sent.

## Project Overview

The **Notification System** consists of two parts:

1. **Frontend**: A React-based web interface that allows users to select a notification method (SMS or Email), enter message details, select a template, and send the notification.
2. **Backend**: An Express-based API server that handles the sending of SMS and emails via Twilio and SendGrid. It also stores the notification history, which can be accessed via an API.

### Features:
- Send SMS via Twilio
- Send Email via SendGrid
- Notification history retrieval
- Template-based messages for notifications
- Create and manage custom templates

---

## Technologies Used

### Backend:
- **Node.js**: JavaScript runtime for the server-side logic
- **Express.js**: Web framework for building the API
- **Twilio**: Service to send SMS
- **SendGrid**: Service to send emails
- **Dotenv**: For managing environment variables
- **CORS**: To allow cross-origin requests from the frontend

### Frontend:
- **React**: JavaScript library for building the user interface
- **Material UI**: React component library for UI components
- **Axios**: HTTP client for making API requests
- **React Hooks**: For managing state and side effects in React

---

## Prerequisites

Before running the project, make sure you have the following installed:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **npm** or **yarn**: Package managers to install dependencies

You also need accounts with **Twilio** and **SendGrid** to use their APIs for sending SMS and emails.

---

## Setting Up the Project

### 1. Clone the Repository

```bash
git clone <repository_url>
cd <project_directory>
```

### 2. Backend Setup

1. **Navigate to the backend folder** (if the project has separate folders for frontend and backend).
   ```bash
   cd backend
   ```

2. **Install the required dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file** and add the required environment variables. The `.env` file should include the following:

   `.env` file:
   ```env
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone_number
   SENDGRID_API_KEY=your_sendgrid_api_key
   SENDGRID_FROM_EMAIL=your_sendgrid_verified_email
   ```

4. **Run the backend server**:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000`.

### 3. Frontend Setup

1. **Navigate to the frontend folder** (if the project has separate folders for frontend and backend).
   ```bash
   cd frontend
   ```

2. **Install the required dependencies**:
   ```bash
   npm install
   ```

3. **Start the frontend application**:
   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000`.

### 4. Running the Full Application

1. Make sure both the **frontend** and **backend** servers are running on the respective ports.
2. Open your browser and go to `http://localhost:3000` to interact with the **Notification Form** where you can send SMS and email notifications.

---

## Folder Structure

```
root/
│
├── backend/
│   ├── .env               # Environment variables for Twilio and SendGrid
│   ├── server.js          # Backend server
│   └── package.json       # Backend dependencies and scripts
│
├── frontend/
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── components/    # Reusable UI components like NotificationForm, TemplateSelection, etc.
│   │   └── index.js       # Entry point of the React app
│   ├── public/
│   │   └── index.html     # HTML template for the frontend
│   └── package.json       # Frontend dependencies and scripts
│
└── README.md              # Project documentation
```

---

## API Endpoints

### 1. POST `/send-sms`

- **Request Body**:
  ```json
  {
    "phoneNumber": "recipient_phone_number",
    "message": "Your message content"
  }
  ```

- **Response**:
  ```json
  {
    "message": "SMS sent successfully",
    "sid": "Twilio_message_sid",
    "status": "sent"
  }
  ```

### 2. POST `/send-email`

- **Request Body**:
  ```json
  {
    "emailTo": "recipient_email",
    "emailSubject": "Subject of the email",
    "emailMessage": "Body of the email"
  }
  ```

- **Response**:
  ```json
  {
    "message": "Email sent successfully",
    "notificationId": "unique_notification_id",
    "status": "sent"
  }
  ```

### 3. GET `/api/notifications`

- **Response**:
  ```json
  {
    "message": "Notification history fetched successfully",
    "history": [
      {
        "id": 1,
        "phoneNumber": "recipient_phone_number",
        "message": "Your message content",
        "status": "sent"
      },
      {
        "id": 2,
        "email": "recipient_email",
        "subject": "Email Subject",
        "message": "Email body",
        "status": "sent"
      }
    ]
  }
  ```

---

## Important Notes

1. **Environment Variables**: Make sure to replace the placeholders in the `.env` file with your actual **Twilio** and **SendGrid** credentials.
2. **Error Handling**: In case of any errors while sending SMS or email, the API will return an error response with an appropriate message.
3. **Notification History**: The notifications sent (SMS or Email) will be logged in memory and can be viewed by calling the `/api/notifications` endpoint.

---

## Conclusion

This **Notification System** allows users to send SMS and email notifications easily with template support. It uses **Twilio** for SMS and **SendGrid** for emails, along with a user-friendly **React** frontend and **Express** backend.

---

