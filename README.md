# Node.js Authentication Application

## Project Overview
This is a secure Node.js Authentication Application featuring Login and Signup functionality. It provides a robust validation system for user inputs and is integrated with a CI/CD pipeline using Jenkins.

## Tech Stack
- **Backend:** Node.js, Express
- **Frontend:** EJS (Embedded JavaScript templates), CSS
- **Testing:** Mocha, Chai, Supertest
- **CI/CD:** Jenkins
- **Other:** Body-parser (for input handling), path (module for file path management)

## Testing Purpose
The testing suite ensures that all parts of the authentication system work correctly and safely.
- **Unit Tests:** Test the individual validation functions for email format, password strength (length), and username patterns.
- **Integration Tests:** Verify the complete flow of signing up and logging in, including handling edge cases like duplicate accounts, wrong passwords, and missing input fields.
- **Page Object Model (POM):** A structured approach to organizing test data and page details, improving code reusability and maintenance.

## Running the Project
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Access the application at `http://localhost:3000`.

## Testing the Project
- Run all tests: `npm test`
- Run unit tests only: `npm run test:unit`
- Run integration tests only: `npm run test:integration`

## Jenkins Pipeline Explanation
The project includes a `Jenkinsfile` that defines a three-stage automated pipeline:
1. **Install Dependencies:** Installs necessary packages from npm.
2. **Unit Tests:** Runs the logic tests to ensure validation functions are accurate.
3. **Integration Tests:** Runs the server-based tests to confirm the entire authentication flow works as expected.

## Author
Mahnoor
