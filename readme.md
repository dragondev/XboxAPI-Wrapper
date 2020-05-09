# XboxAPI
An API wrapper for Xbox API.
[![NPM](https://nodei.co/npm/@shadow/xbox.png)](https://nodei.co/npm/@shadow/xbox/)

# Installing
`npm i @shadow/xbox`

# Usage
```js
const XboxClient = require('@shadow/xbox');
const xbox = new XboxClient('Your API Key Goes Here');
```

# Example
```js
const XboxClient = require('@shadow/xbox');
const xbox = new XboxClient('Your API Key Goes Here');
async function find(query) {
let req = await xbox.id(query)
return console.log(req)
}
find('2535412670012736')
```
# Getting API Key
Go to [xapi.us](https://xapi.us/) and sign up for API key.

# Functions
- id
- selfID
- messages
- conversations
- gamertag
- profile
- new_profile
- gamercard
- activity
- activity_recent
- friends
- followers
- recentplayers
- friendsplaying
- gameclips
- screenshots
- activityfeed
- addfriend
- removefriend
- addfavourite

# Notes
gameclips(id, true) will return saved clips
friendsPlaying(id, gameTitle ID) 
activity(ID, true) will return recent 

# RateLimits 
![Ratelimit](https://i.imgur.com/8JJEwlC.png)

API requests are limited on a per API Key basis.
When making a request to the API, your limit information will be returned in the headers. 

# Ratelimit Headers:
- X-RateLimit-Limit: Maximum usage allowed per timeframe
- X-Ratelimit-Remaining: Remaining requests that can be made during the timeframe
- X-RateLimit-Reset: Timestamp indicating when the ratelimit will reset in milliseconds.
# API Docs
**[Click Here](https://xapi.us/documentation)**
