# Automated Marketing Frontend Admin

Welcome to the **Automated Marketing Frontend Admin**! This is a React application designed to provide an intuitive interface for managing automated marketing campaigns, newsletters, and user interactions.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- User-friendly interface for managing newsletters and marketing campaigns.
- Generate newsletters using OpenAI's API.
- Edit and publish newsletters.
- Print newsletters or save them as PDF.
- View and manage pending newsletters.
- Approve or reject newsletters.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Axios**: For making HTTP requests to the backend API.
- **jsPDF**: For generating PDF documents.
- **React-to-print**: For printing components directly from the application.
- **OpenAI API**: For generating newsletter content.

## Installation

To get started with the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/automatedmarketingfrontendadmin

2. Navigate to the project directory:

    ##bash cd automatedmarketingfrontendadmin

3. Install the dependences

4. Create a 'env' file in the root directory and add your api key: - this is via a flask API - also open source

5. start the server
    npm start

##API Integration

This application integrates with a backend API to handle newsletter generation and management. Ensure that your backend is running and accessible. The API endpoints used in this application include:

POST /api/generate-newsletter: Generates a newsletter based on a provided prompt.
POST /api/newsletters: Publishes a new newsletter.
GET /api/pending_newsletters: Fetches pending newsletters for approval.

##Contact

For any inquiries or feedback, please reach out to:

Your Name - catherineearl8@gmail.com
GitHub: RubyCloud225