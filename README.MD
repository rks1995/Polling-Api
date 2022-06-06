# API POLLING SYSTEM

Api where user can create a question as well as add an options to a particular question even more
user can make a vote to an option.

## Screen Shots

![PostMan ScreenShot](./assets/Screenshot%202022-06-05%20at%207.32.41%20PM.png)

## installation guide

1.git clone https://github.com/rks1995/Polling-Api.git
2.Navigate to Polling-Api directory.
3.use npm install and npm start
4.use postman

## Tech Used
1. Nodejs
2. Express
3. MongoAtlas
4. PostMan

## Routes and features

url -> http://localhost/5000/

1. creating a question -> url/api/v1/questions/create
2. create an option -> url/api/v1/questions/:id/options/create
3. add vote to option -> url/api/v1/options/:id/add_vote
4. Delete a question -> url/api/v1/questions/:id/delete
5. Delete an option -> url/api/v1/options/:id/delete
6. view a question -> url/api/v1/questions/:id
7. Get All Question -> url/api/v1/list/questions
8. Get All Options -> url/api/v1/list/options

# Folder Structure

|-assets  
|-controllers  
|-db  
|-error  
|-model  
|-routes  
|-gitignore  
|-app.js  
|-package-lock-json  
|-package.json  
|-README.MD
