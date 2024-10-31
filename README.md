# Deliver Jokes Microservice

The **Deliver Jokes Microservice** is a REST API built with **Nest.js** that provides jokes to users based on the selected type. This service interacts with a MySQL database to store and retrieve joke data and communicates with other microservices as part of a larger joke management ecosystem.

## Overview

This microservice is part of a multi-service architecture for managing jokes. It handles requests for retrieving random jokes and integrates with:

- **Moderate Jokes Microservice**: Receives approved jokes for distribution.
- **Submit Jokes Microservice**: Originates jokes submitted by users for approval.

## Features

- **Retrieve Approved Jokes**: Serve approved jokes based on type.
- **Joke Type Selection**: Provide jokes filtered by specific types.
- **Data Management**: Store and manage joke data in a MySQL database.
- **API Communication**: Communicates with other microservices to ensure up-to-date data.

## Technologies Used

- **Nest.js**: Framework for building efficient, reliable, and scalable server-side applications.
- **MySQL**: Relational database for storing jokes.
- **Axios**: HTTP client for making requests to other microservices.

## Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **MySQL**: Set up and running for data storage

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RuzbihanZaleek/deliver-jokes-microservice.git
2. Navigate to the project directory:
   ```bash
   cd deliver-jokes-microservice
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. Configure environment variables:
   - Create a .env file and set the .env.example file variables
6. Set up the MySQL database:
   - Run the migrations or seed the database if needed.
8. Start the development server:
   ```bash
   npm run start:dev
   ```

## API Documentation

This service includes interactive API documentation powered by **Swagger**. You can view and test all available endpoints through the Swagger UI.

- **Swagger UI**: [http://localhost:3002/api](http://localhost:3002/api)

> Make sure the service is running locally on port 3002 to access the documentation.
