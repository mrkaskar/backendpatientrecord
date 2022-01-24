# Node Backend Integration with Google Drive 
This project shows how to use google drive files create, read, update, delete by using node js with express. 
## Shwe La Won Dental Patient Record Project 
This is a backend project for dental doctor's patient record project.
## Tech Stack
> Javascript

> Express JS

> Google oAuth

> MongoDB

> Google Drive Storage

### Features
✅ Express API routes

✅ Passport Authentication System with Google

✅ Google Drive file create, read, update and delete

✅ MongoDB for persistent data

### Challenges
1. Google drive integration with backend
2. Google drive file serving to front end 
3. Cookie-Session authentication with front-end (different domain)

Solving above challenges are described below. 

### How challenges are solved
1. Implementing functional components for google drive system and consumed by backend
2. Downloading the google drive file to the server as cache and serve to the front-end.
3. Different domain cannot be performed seperately with cookie based authentication. It only works in localhost. In production, the backend and front are merged for the same domain. 

