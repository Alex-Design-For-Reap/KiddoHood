# KiddoHood

is a dynamic and interactive platform designed for parents to find and share activities, locate parks and playgrounds, and discover local events suitable for children. The application aims to enhance the parenthood experience by providing a centralized resource where parents can easily access and contribute to child-friendly activities and events.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Models](#models)
- [Technologies and Dependencies](#technologies-and-dependencies)
- [Contributing](#contributing)
- [Other ways to contribute and questions](#other-ways-to-contribute-and-questions)
- [License](#license)

## Installation

1. **Clone the repository:**

   ```bash
    git clone https://github.com/Alex-Design-For-Reap/KiddoHood.git
    cd KiddoHood

   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up MongoDB and environment variables:**

   Ensure you have MongoDB installed and running locally.

   Create a .env file in the root directory and add your MongoDB URI, JWT secret, and any other necessary configuration.

4. **Run the application:**

   ```
   npm run start
   ```

   Run this command from the project root. The server will start on http://localhost:3000.

## Usage

Once the application is running, you can explore its features:

- **Home Page:** View an overview of the platform and its features.
- **User Authentication:** Register or log in to access personalized features.
- **Event Management:** Create, view, and manage events related to children's activities.
<!-- - **Park and Playground Locator:** Find nearby parks and playgrounds using integrated maps. // comming soon -->
- **Favorites:** Save your favorite activities and locations for easy access.

## Models

### Users

- username: String, Unique, Required, Trimmed
- email: String, Required, Unique, Must match a valid email address
- password: String, Required
- events: Array of event IDs the user has created
- friends: Array of user IDs referencing friends

### Events

- title: String, Required
- description: String, Required
- date: Date, Required
- location: String, Required
- createdBy: User ID, Required
- comments: Array of comment IDs

### Comment

- text: String, Required
- createdAt: Date, Default to current timestamp
- event: Event ID, Required
- createdBy: User ID, Required

## Access the deployed application here

👉 👉 👉 👉 👉 https://kiddohood.onrender.com/

## Technologies and Dependencies

### Frontend:

- React
- CSS-in-JS (styled-components/Emotion)
- Ant Design

### Backend:

- Node.js
- Express.js
- GraphQL with Apollo Server
- MongoDB with Mongoose ODM

### Authentication:

- JWT for user authentication

### Deployment:

- Render.com

## Features

- User Authentication: Secure login and registration with JWT.
- Event Management: Create, update, and delete child-friendly events.
- Social Interaction: Comment on events and connect with other parents.
- Favorites: Save and organize favorite activities and locations.
- Responsive Design: Mobile-friendly and responsive user interface

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature/YourFeature
   ```
3. Make your changes.
4. Commit your changes:
   ```sh
   git commit -m 'Add YourFeature'
   ```
5. Push to the branch:
   ```sh
   git push origin feature/YourFeature
   ```
6. Open a pull request.

## Other ways to contribute and questions

Contributions are welcome!
If you want to contribute or have any questions, here are my channels:
gitHub: https://github.com/Alex-Design-For-Reap

email: s.alexsilva@gmail.com

Author: Alex Da Silva https://github.com/Alex-Design-For-Reap/KiddoHood

## License

This project is licensed under the MIT License - see the LICENSE file for details.
