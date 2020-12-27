# MagicTG Events

## Description

Web Application that allows the organizers of Magic the Gathering events to post tournaments and players can
confirm their participation on these events and participe in a share their comments with another players attending the same event. 

## User Stories

User = Organizer || Player

- Signup: As a guest I can sign up in the platform I can choose to be and Organizer or a Player
- Login: As a registered user I can login to the platform
- My Profile: As a registered user I see and edit my own Profile.
- Create New Event: As an Organizer I can create an event
- Edit event: As an Organizer I can edit my own event
- List of Events: As a user I can see the events
- Attend Event: As a player I can decide to attend and event.
- Logout: As a user I can logout from the platform
- As a user I can see the map with the tournaments information 
- Event dialog: As a User I can participate in the event dialog 

## Client

### Routes

- /- Homepage
- /auth/signup - Signup form User can be a Player or Organizer
- /auth/login - Login form
- /user/organizer/:username - User profile Organizer
- /user/player/:username - User profile   Player
- /user/organizer/:username/edit-profile - User can edit his own profile
- /user/player/:username/edit-profile - User can edit his own profile
- /user/event/new - Organizer can create an event
- /user/event/:\_id/edit - Organizer can edit his own event
- /events - see all the posted events
- /events/:\_id - see the details of the selected event

### Pages

- Home Page (public)
- Sign in Page (public)
- Log in Page (public)
- My Profile Page (all logged Users)
- My Settings (current user)
- Delete my account (current user)
- New Event (all logged organizer)
- Edit Event (current organizer)
- Events (public)
- Event Detail Page (all logged users)

### Components

Pages

- Homepage.jsx
- Signup.jsx
- Login.jsx
- Profile.jsx -> Conditional render Organizer/Player
- EditProfile.jsx
- CreateEvent.jsx
- EditEvent.jsx
- AllEvents.jsx
 
 Components
 
- Navbar.jsx
- EventRow.jsx
- SubmitButton.jsx

## Server

### Models

Player model

```
- username - String //required & unique
- email - String // required & unique
- password - String // required
- avatar: String
- location: Strin

```

Organizer model

```
- username - String //required & unique
- email - String // required & unique
- password - String // required
- avatar: String
- location: String
```

Event model

```
- location - String // required
- date: Date      // required
- completed: Boolean
- maxPlayers: Number // requeried
- organizer:  Object.Id
- players:  Array of Objects -Player Schema
```

Post model

```
- author: String // requeried 
- body : String // requeried
- event: Object.Id Event Schema
```

Session model

```
- player: Object.Id Player Schema 
- organizer: Object.Id organizer Schema 
- createdAt: Object.Id Event Schema
```

### API Endpoints/Backend Routes

- / - Homepage - (GET)
- /auth/session - (GET)-  User Session 
- /auth/signup/organizer - (POST) - Signup form User can be a Player or Organizer
- /auth/login/organizer - (POST) - Login form
- /auth/signup/player - (POST) - Signup form User can be a Player or Organizer
- /auth/login/player - (POST) - Login form
- /auth/logout - (DELETE) - User Logout
- /user/organizer/:username - (GET) - User profile can be Organizer or Player
- /user/:username/edit-profile - (PUT) - User can edit his own profile
- /user/:username/delete - (POST) - User can delete his own account
- /user/organizer/:username/edit-profile - (POST) - User can delete his own account
- /user/organizer/:username/delete - (POST) - User can delete his own account


- /event - (GET) see all the posted events
- /event/new - (POST) - Organizer can create a new event
- /event/:id - (GET) - see the details of the selected event
- /event/edit/_:id - (PUT) - Organizer can edit his own event
- /event/:username/events - (GET) - get all the events a Player is attending
- /event/:id/attend - (POST) - Player attends an event
- /event/:id/unattend - (POST) - Player unattends an event

- /event/allcomments/:id - (GET) - comments for a specific event
- /event/addcomment -(POST) - an User can add a comment/ post to the event


## Links

### Server Deployment

 https://magictherealgathering.herokuapp.com/api
 
 
### Client Deployment
 
Client : https://magictherealgathering.netlify.app/
