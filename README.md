# goWhere Mobile Application

  - [Level of Achievement](#level-of-achievement)
  - [Motivation](#motivation)
  - [User Stories](#user-stories)
  - [Project Scope and Ideation](#project-scope-and-ideation)
  - [Installation and Startup](#installation-and-startup)
    - [For Developers](#for-developers)
    - [For Users](#for-users)
  - [Tech Stack](#tech-stack)
  - [Features and Program Flow](#features-and-program-flow)
    - [Webflow of Features](#webflow-of-features)
    - [Create Account and Login Features](#create-account-and-login-features)
    - [Choose Optimal Location](#choose-optimal-location)
    - [One Time Use Account](#one-time-use-account)
    - [Change Clique Settings\*](#change-clique-settings)
    - [Update Travel Log](#update-travel-log)
    - [Account Settings Features](#account-settings-features)
    - [Database Overview](#database-overview)
  - [Further Documentations](#further-documentations)
  - [Credits](#credits)

## Level of Achievement

Apollo

## Motivation

You’re about to have an outing with your usual group of friends, but even after discussing for hours, nobody seems to come to a conclusion on where to meet up. Some of them preferred going to new and uncommon places, while others wanted to meet up at convenient locations near them. Does this scenario sound familiar to you?

## User Stories

1. As a member of a picky group of friends who can never decide on a location to have an outing at.

2. As a group of friends who would like to explore Singapore, but always decide on meetups at the same location for convenience.

3. As a large group of friends who are each located at different parts of Singapore, and are unable to choose a location equidistant from everybody.

4. As a group of friends who prefer to frequent less crowded areas in Singapore to skip the queues.

5. As a group of friends who only frequent places with high ratings to meet their high standards.

## Project Scope and Ideation

Mobile Application Development using React Native and Firebase.

goWhere decides on preferred location for an outing within a clique. Preferred location can be based on distance from members of the clique, crowd and rating levels, as well as the travel log of the clique. Users can create accounts for their cliques and personalise them by adding home or work locations of each member, as well as their travel log as a clique.

## Installation and Startup

### For Developers

Only supported in iOS for Milestone #2.

1. Ensure NodeJS and Expo has been downloaded.

2. Clone the [repository](https://github.com/Bryanleongys/goWhere) into your local machine

3. Open your preferred IDE. Run the following code in terminal to install missing dependencies.

```bash
npm install
```

4.  Ensure you have iOS Simulator installed. Under the root directory, run the following code in terminal to run our application.

```bash
expo start
```

5.  Under backend folder, run the following code in terminal to run the backend locally.

```bash
npm start
```

6.  You're all set!

### For Users

Our application is only available on iOS for Milestone #2.

1. Download Expo Go on the App Store.

2. Launch Expo Go and login into Expo Go with the following account:  
   Email: goWhere99@gmail.com  
   Password: @Pass!1234  

3. Close Expo Go. Use another device and go to https://exp.host/@bryanleongys/gowhere.

4. Open QR Code Scanner/Camera on phone to scan QR code in website. Application should open.

4. You're all set!

## Tech Stack

For our tech stack, we have decided to use MERN Stack to develop our application.

### React Native

We have chosen to use React Native, an open-source mobile application framework, to develop our frontend. With React Native around for many years, we believe React Native allows us to access an abundance of libraries and community support. Libraries include Native Base and React Navigation.

### NodeJS

We have chosen to use NodeJS as it runs single-threaded and is asynchronously programmed, making this an efficient choice.

### MongoDB

MongoDB is an open-source, document-based database. It stores data in JSON-like documents, ensuring flexible yet highly diverse data availability.

### ExpressJS

We have chosen ExpressJS due to the fast and minimalist web framework used for NodeJS.

## Features and Program Flow

### Webflow of Features

![Features of goWhere](https://user-images.githubusercontent.com/69454147/123666665-019bfe00-d86c-11eb-8936-7d1735cb9266.png)

### Create Account and Login Features

- Create an account for your clique using an email and password
- Reset password if forgotten

### Choose Optimal Location

<img src="https://user-images.githubusercontent.com/69454147/123538802-088e1800-d769-11eb-9568-8bf1001c69e6.png" width="500" height="1000">

1. Select the members of your clique that you would like to go out with (minimum two members)
2. Select their respective locations or input a specific location
3. Select location preferences:
   - Lower crowd levels
   - Higher ratings
   - Have not visited before
4. A meetup location is suggested. If the location is unsatisfactory, reroll for another location

### One Time Use Account

- A substitute for users that only seldom use the app and have no use for a clique account
- Select number of pax and input their locations induvidually for the app to suggest an optimal meetup location
- Select location preferences:
  - Lower crowd levels
  - Higher ratings
- A meetup location is suggested. If the location is unsatisfactory, reroll for another location

### Change Clique Settings\*

<img src="https://user-images.githubusercontent.com/69454147/123540105-e2b84180-d76f-11eb-9cc2-630265629cb8.png" width = "450" height = "500">

- View existing members in the clique
- Add members and their respective locations to the clique
- Delete members that are not part of the clique anymore
- Edit member details if needed

### Update Travel Log

<img src="https://user-images.githubusercontent.com/69454147/123538822-307d7b80-d769-11eb-9b68-e0130436535e.png" width = "500" height = "500">

- Maintain travel log based on travel history in the app
- Add locations to travel log in order to be filtered out while finding optimal meetup location
- Add locations from travel log to favorites if your clique wants to revisit them while rolling for location

### Account Settings Features

- Change Password
- Change email
- Delete account

### Database Overview

<img src="https://user-images.githubusercontent.com/69454147/123540166-3a56ad00-d770-11eb-84b6-0948e957b835.png" width = "700" height = "450">

## Further Documentations

You can read more on our goWhere Proposal (includes our testing documentations, project log and development plan) [here](https://docs.google.com/document/d/1P--Yg5Lm07k7BCNmae_dq1bYh14ATlRPQIxb1i1GbPA/edit?usp=sharing).

## Credits

Orbital 2021 by Bryan L. and Mukund
