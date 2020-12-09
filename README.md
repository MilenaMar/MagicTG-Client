# MagicTG Events



## Description
Web Applocation that allows the organizers of Magic the Gathering events, to post tournaments and players can 
confirm their participation on these events. 


## User Stories
Signup: As a guest I can sign up in the platform I can choose to be and Organizer or a Player
Login: As a registered user I can login to the platform 
My Profile: As a registered user I see and edit my own Profile.
Create New Event: As an Organizer I can create an event 
Edit event:  As an Organizer I can edit my own event 
List of Events: As a user I can see the events 
Attend Event: As a player I can decide to attend and event. 
Event Chat: As a User I can participate in the event chat
Logout: As a user I can logout from the platform 

## Backlog



## Client

### Routes

/- Homepage
/auth/signup - Signup form User can be a Player or Organizer
/auth/login - Login form
/User/profile - User profile can be Organizer or Player
/User/settings - User can edit his own profile
/User/delete-account -  User can delete his account
/User/event/new - Organizer can create an event
/User/event/edit - Organizer can edit his own event
/events - see all the posted events
/events/:id - see the details of the selected event


### Pages

Home Page     (public)
Sign in Page  (public)
Log in Page   (public)
My Profile Page   (user only)
My Settings       (user only)
Delete my account (user only)
New Event     (Organizer only)
Edit Event    (Organizer only)
Events        (public)
Event Detail Page (logged Users)


### Components

## Server

### Models

Player model

```
username - String //required & unique
email - String // required & unique
password - String // required
avatar: String
location: String

```

Organizer model

```
username - String //required & unique
email - String // required & unique
password - String // required
avatar: String
Location: String
```

Event model

```
location - String // required
date: String      // required
time: String      // required
completed: Boolean 
maxPlayers: Number // requeried
organizer: Array of Objects -Organizer Schema
attendes:  Array of Objects -Player Schema
```


### API Endpoints/Backend Routes

## Links

### Trello

### Git

### Deployment


### Slides


