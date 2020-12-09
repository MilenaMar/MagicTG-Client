# MagicTG Events

## Description

Web Application that allows the organizers of Magic the Gathering events to post tournaments and players can
confirm their participation on these events.

## User Stories

User = Organizer || Player

- Signup: As a guest I can sign up in the platform I can choose to be and Organizer or a Player
- Login: As a registered user I can login to the platform
- My Profile: As a registered user I see and edit my own Profile.
- Create New Event: As an Organizer I can create an event
- Edit event: As an Organizer I can edit my own event
  - As an Organizer I can set the winners of the event
- List of Events: As a user I can see the events
- Attend Event: As a player I can decide to attend and event.
- Logout: As a user I can logout from the platform

\*\* Nice to have

- Event Map:
- Event Notifications
- Event Chat: As a User I can participate in the event chat

## Backlog

## Client

### Routes

- /- Homepage
- /auth/signup - Signup form User can be a Player or Organizer
- /auth/login - Login form
- /user/:username - User profile can be Organizer or Player
- /user/:username/edit-profile - User can edit his own profile
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
- location: String

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
- date: String      // required
- time: String      // required
- completed: Boolean
- maxPlayers: Number // requeried
- organizer: Array of Objects -Organizer Schema
- attendes:  Array of Objects -Player Schema
```

### API Endpoints/Backend Routes

- / - Homepage - (GET)
- /auth/signup - (POST) - Signup form User can be a Player or Organizer
- /auth/login - (POST) - Login form
- /user/:username - (GET) - User profile can be Organizer or Player
- /user/:username/edit-profile - (PUT) - User can edit his own profile
- /user/:username/delete - (POST) - User can delete his own account
- /user/event/new - (POST) - Organizer can create a new event
- /user/event/:\_id/edit - (PUT) - Organizer can edit his own event
- /events - (GET) see all the posted events
- /events/:\_id - (GET) - see the details of the selected event
- /events/:\_id/attend - (POST) - Player attends an event
- /events/:\_id/unattend - (POST) - Player unattends an event

## Links

### Trello

### Git

### Deployment

### Slides
