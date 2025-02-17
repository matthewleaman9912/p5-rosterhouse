# RosterHouse

The following ReadMe file describes each aspect of the RosterHouse application. Starting with a brief explanation of the purpose of the app, followed by file breakdowns of the client and server and brief function explaantions.

## App Breakdown

This application uses a many-to-many relationship between coaches and teams, created through two one-to-many relationships between coaches and rosters, as well as between teams and rosters. Also, there is another one-to-many relationship between rosters and players in this application. This setup allows a user to create rosters which links coaches to teams through rosters, as well as link player to the rosters that coaches and teams are connected to. In the app, the user can view a list of coaches that have signed up with information about them, as well as a list of the teams, and a home screen. If the user logs in or signs up, the user then can access a personalized home screen, create new rosters, create new teams and view lists of each. There is also a log out screen. Each of these options have their own respective pages in the application.

## App Client

The client in this app is serving as the frontend of the application. Below are each of the components with a brief breakdown of what is in each file. 

    * App.js
        *This component calls on each of the routes and sets up all of the functions that update state variables to allow the app to run smoothly. This component is the parent component of the application.
    * Coach.js
        * This component creates the layout for the individual coach components to be rendered to the application
    * CoachList.js
        * This component takes all of the different coach components and forms them into a list. This list contains each of the coaches with brief information on a single page.
    * EditRoster.js
        * This component sets up a form through formik allowing the user to edit individual rosters attributes.
    * Home.js
        * This component renders the home page with a welcome message which changes based on if the user is logged in or not.
    * Login.js
        * This component sets up a for through formik that allows the user to login
    * Logout.js
        * This component sets up a form through formik that allows the user to logout and present a goodbye message afterwards.
    * Navbar.js
        * This component allows the user to have links to navigate to the different pages in the application when they are logged out or havent registered.
    * NavBarLogin.js
        * This component allows the user to have links to navigate to the different pages in the application when they are logged in or have signed up before.
    * NewPlayer.js
        * This component allows the user to create a new player through a form created from formik and this component calls a function to attach the player to a roster.
    * NewRoster.js
        * This component allows the user to create a new roster through a form created with formik and this component calls a function to show the new roster after creation.
    * NewTeam.js
        * This component allows the user to create a new team through a form created with formik and calls a function to show this new team after creation.
    * Player.js
        * This component creates the layout for individual player components to be rendered to the application.
    * PlayerList.js
        * This component creates a list of all of the individual player components and forms them into a list that can be accessed by the user through rosters or teams.
    * Roster.js
        * This component creates the layout for individual roster components to be rendered to the application.
    * RosterList.js
        * This component creates a list of all of the individual roster components and forms them into a list that can be accessed by the user.
    * SignUp.js
        * This component allows a user to sign up to access the components that require login. This component is prepared for users who have never visited rosterhouse before.
    * Team.js
        * This component creates the layout for individual team components to be rendered to the application.
    * TeamList.js
        * This component creates a list of all of the individual team components and forms them into a list that can be accessed by the user.
    * index.css
        * This component creates the styling for this application. Each classname that is attached to individual components of this application have their own styling in this file. 
    * index.js
        * This file creates a root for the application and creates the browser router that allows the navigation bar to navigate throughout the application.
    * README.md
        * This is the file that you are reading now! This creates a list of explanations for waht this application does.

## App Server

The server in this app is serving as the backend of this application. Below is a brief breakdown of each component and what is in each file.

    * app.py
        * This file creates the get, post, delete and update components for each of the models, allowing them to access the database.
    * config.py
        * This file instintiates the app and database, while also initializing the REST api and CORS.
    * models.py
        * This file creates each of the models and its individual attributes. This file is what allows the creation of the many-to-many relationship.
    * seed.py
        * This seeds the database with information fitting the stipulations of the models. This file uses faker and fake information to create the seed without having to individually type in information.

## Conclusion

This application is a great use of flask, flask_login, useContext, cors, react, python and formik to create an application usable to perform CRUD actions on the information in the database.