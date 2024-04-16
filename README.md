# Cloud Function Documentation for `sendEmailNotification`

## Overview
This cloud function facilitates sending email notifications. It is built to receive POST requests with email details and utilizes the `nodemailer` library to dispatch emails via Gmail.

## Prerequisites
- Node.js environment with npm.
- Google Cloud project with the Functions Framework (`@google-cloud/functions-framework`).
- `nodemailer` library for sending emails.
- Gmail credentials (email and password) set in the environment variables `EMAIL_HOST` and `EMAIL_PASS`.

## API Endpoint: `sendEmailNotification`

### Request
- **Method:** POST
- **Headers:**
  - Content-Type: application/json
- **Body Parameters:**
  - `html_content`: String containing the HTML content of the email.
  - `heading`: String containing the subject of the email.
  - `emails`: Array of strings containing the recipient email addresses.

### Response
- **Success:**
  - Status Code: `200`
  - Body: `"Email sent"`
- **Errors:**
  - `405 Method Not Allowed`: If the HTTP method is not POST.
  - `400 Bad Request`: If any required field (`html_content`, `heading`, `emails`) is missing.
  - `500 Internal Server Error`: Details of any server-side issues encountered during execution.

### Error Handling
The function strictly checks for the HTTP method and required fields in the request body, ensuring that all necessary data is provided before proceeding to send an email.

## Example

### Request Example
```json
{
  "html_content": "<h1>Your HTML Content Here</h1>",
  "heading": "Your Email Subject",
  "emails": ["example1@gmail.com", "example2@gmail.com"]
}
```

### Response Example
```json
Email sent
```

### Curl Command
```bash
curl -X POST https://us-central1-your-project.cloudfunctions.net/sendEmailNotification \
-H "Content-Type: application/json" \
-d '{"html_content": "<h1>Hello World</h1>", "heading": "Greetings", "emails": ["example1@gmail.com", "example2@gmail.com"]}'
```
