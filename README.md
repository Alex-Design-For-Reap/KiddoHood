# KiddoHood

KiddoHood is a parents portal platform where parents can find and share activities, locate parks and playgrounds, and discover local events suitable for children. This platform will integrate various APIs to provide comprehensive information and features to enhance the parenthood experience.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Walk Through Demo Video](#walk-through-demo-video)
- [API Routes](#api-routes)
- [Models](#models)
- [Technologies and Dependencies](#technologies-and-dependencies)
- [Contributing](#contributing)
- [Other ways to contribute and questions](#other-ways-to-contribute-and-questions)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Alex-Design-For-Reap/social-network-api.git
   cd social-network-api

   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up MongoDB:**

   Ensure you have MongoDB installed and running locally.

4. **Seeding the Database (optional)**

   ```bash
   node seed.js
   ```

   This will populate the database with sample users and thoughts.

5. **Run the application**
   ```bash
   npm start
   ```
   The server will start on http://localhost:3001.

## Usage

Use Insomnia, Postman, or any other API client to test the API routes.

## API Routes

### Users

#### GET all users

/api/users

#### Get a single user by its \_id and populated thought and friend data

/api/users/:userId

#### POST a new user

/api/users

JSON body example:

```bash
{
  "username": "Alex",
  "email": "alex.silva@gmail.com"
}
```

#### PUT (update a new user by its \_id)

/api/users/:userId

JSON body example:

```bash
{
  "username": "AlexUpdated",
  "email": "alex.silva@gmail.com"
}
```

#### DELETE a user by its \_id

/api/users/:userId

#### POST to add a new friend to a user's friend list

/api/users/friends/:friendId

- add your own `:friendId` like "6698f3e690f98a2352a04b8f"

### DELETE a friend from a user's friend list

/api/users/friends/:friendId

### Thoughts

#### GET all thoughts

/api/thoughts

#### Get a single thought by its \_id

/api/users/:thoughtId

#### POST a new thought

/api/thoughts

JSON body example:

```bash
{
	"thoughtText": "Here's a NEW thought...",
	"username": "Alex",
	"userId": "6698f3e690f98a2352a04b8f"
}
```

#### PUT (update a new thought by its \_id)

/api/thoughts/:thoughtId

JSON body example:

```bash
{
	"thoughtText": "Here's a UPDATED thought...",
}
```

#### DELETE a thought by its \_id

/api/thoughts/:thoughtId

### Reactions

#### POST to Create a reaction stored in a single thought's reactions array field

/api/thoughts/:thoughtId/reactions/

### DELETE a reaction by the reaction's reactionId value

/api/thoughts/:thoughtId/reactions/:reactionId

## Walk Through Demo Video

👉 👉 👉 👉 👉

## Models

### User

- username: String, Unique, Required, Trimmed
- email: String, Required, Unique, Must match a valid email address
- thoughts: Array of \_id values referencing the Thought model
- friends: Array of \_id values referencing the User model (self-reference)

#### Schema Settings

Virtual friendCount that retrieves the length of the user's friends array field on query.

### Thought

- thoughtText: String, Required, Must be between 1 and 280 characters
- createdAt: Date, Set default value to the current timestamp, Use a getter method to format the timestamp on query
- username: String, Required
- reactions: Array of nested documents created with the reactionSchema

#### Schema Settings

Virtual reactionCount that retrieves the length of the thought's reactions array field on query.

### Reaction (Schema Only)

- reactionId: Use Mongoose's ObjectId data type, Default value is set to a new ObjectId
- reactionBody: String, Required, 280 character maximum
- username: String, Required
- createdAt: Date, Set default value to the current timestamp, Use a getter method to format the timestamp on query

## Technologies and Dependencies

- HTML, CSS, JavaScript
- Express.js
- MongoDB
- Mongoose ODM
- moment

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

#

#

#

#

# Project requirement

# 23 Final Project: MERN Stack Single-Page Application

Projects have played a key role in your journey to becoming a full-stack web developer. As you apply for development jobs, your portfolio is absolutely vital to opening doors to opportunities. Your portfolio showcases high-quality deployed examples of your work, and you can use your finished projects for that very purpose.

This project is a fantastic opportunity to show employers your collaborative skills and coding abilities, especially in the context of a scalable, user-focused MERN app. Remember that employers want to see what you can do, but they also want to see how you work with other developers. The more examples of deployed collaborative work you have in your portfolio, the more likely you are to get an interview and a job.

## Project Requirements

Your group will use everything you’ve learned throughout this course to create a MERN stack single-page application that works with real-world data to solve a real-world challenge, with a focus on data and user demand. This project will provide you with the best opportunity to demonstrate your problem-solving skills, which employers will want to see during interviews. Once again, the user story and acceptance criteria will depend on the project that you create, but your project must fulfill the following requirements:

- Use React for the front end.
- Use GraphQL with a Node.js and Express.js server.
- Use MongoDB and the Mongoose ODM for the database.
- Use queries and mutations for retrieving, adding, updating, and deleting data.
- Be deployed using Render (with data).
- Have a polished UI.
- Be responsive.
- Be interactive (i.e., accept and respond to user input).
- Include authentication (JWT).
- Protect sensitive API key information on the server.
- Have a clean repository that meets quality coding standards (file structure, naming conventions, best practices for class and id naming conventions, indentation, high-quality comments, etc.).
- Have a high-quality README (with unique name, description, technologies used, screenshot, and link to deployed application).

### CSS Styling

Instead of using a CSS library like Bootstrap, consider one of the following suggestions:

- Look into the concept of CSS-in-JS, which abstracts CSS to the component level, using JavaScript to describe styles in a declarative and maintainable way. Some popular libraries include styled-components and Emotion.
- Try using a component library, such as Semantic UI, Chakra UI, or Ant Design.
- Create all the CSS for your application just using CSS.

Ultimately, it doesn't matter which of these options you choose—it just needs to look professional and be mobile-friendly.

### Payment Platform

Consider integrating the Stripe payment platform. Even if you don’t create an e-commerce application, you could set up your site to accept charitable donations.

### Bonus

Although this is not a requirement for your project, see if you can also implement functionality to meet the minimum requirements of a PWA:

- Uses a web manifest
- Uses a service worker for offline functionality
- Is installable

## Presentation Requirements

Use this project presentation template to address the following:

- Elevator pitch: a one minute description of your application
- Concept: What is your user story? What was your motivation for development?
- Process: What were the technologies used? How were tasks and roles broken down and assigned? What challenges did you encounter? What were your successes?
- Demo: Show your stuff!
- Directions for Future Development
- Links to the deployed application and the GitHub repository. Use the [Deploy MERN Stack with Render and MongoDB Atlas](#) guide on The Full-Stack Blog if you need a reminder on how to deploy to Render.

## Grading Requirements

This project is graded based on the following criteria:

- **Technical Acceptance Criteria:** 25%
  - Satisfies the following code requirements:
    - Application uses React for the front end.
    - Application has a GraphQL API with a Node.js and Express.js server, and uses queries and mutations for retrieving, adding, updating, and deleting data.
    - Application uses MongoDB and the Mongoose ODM for the database and protects sensitive API key information on the server.
    - Application includes user authentication using JWT.
- **Concept:** 10%
  - Application should be a unique and novel idea.
  - Your group should clearly and concisely articulate your project idea.
- **Deployment:** 20%
  - Application deployed at live URL on Render and loads with no errors.
  - Application GitHub URL submitted.
- **Repository Quality:** 10%
  - Repository has a unique name.
  - Repository follows best practices for file structure and naming conventions.
  - Repository follows best practices for class and id naming conventions, indentation, quality comments, etc.
  - Repository contains multiple descriptive commit messages.
  - Repository contains a high-quality README file with description, screenshot, and link to deployed application.
- **Application Quality:** 15%
  - Application user experience is intuitive and easy to navigate.
  - Application user interface style is clean and polished.
  - Application is responsive.
- **Presentation:** 10%
  - Your group should present using a slide deck.
  - Every group member should speak during the presentation.
  - Your presentation should follow the Project Presentation Template.
- **Collaboration:** 10%
  - There are no major disparities in the number of GitHub contributions between group members.
- **Bonus:** 10%
  - Fulfilling all three of the following requirements to turn your app into a PWA will add 10 points to your grade. Note that the highest grade you can achieve is still a 100:
    - Uses a web manifest
    - Uses a service worker for offline functionality
    - Is installable

## How to Submit Your MERN Stack Single-Page Application

Each member of your group is required to submit the following for review:

- The URL of the deployed application.
- The URL of the GitHub repository, with a unique name and a README describing the project.
