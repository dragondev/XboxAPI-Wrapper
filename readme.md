# XboxAPI

An API wrapper for Xbox API.
[![NPM](https://nodei.co/npm/@shadow/xbox.png)](https://nodei.co/npm/@shadow/xbox/)

# Installing

`npm i @shadow/xbox`

# Usage

```js
const XboxClient = require("@shadow/xbox");
const xbox = new XboxClient("Your API Key Goes Here");
```

# Example

```js
const XboxClient = require("@shadow/xbox");
const xbox = new XboxClient("Your API Key Goes Here");
async function find(query) {
  const req = await xbox.id(query);
  console.log(req)
  return req;
}
find("2535412670012736");
```

# Getting API Key

Go to [xapi.us](https://xapi.us/) and sign up for API key.

# Functions

- id
- self
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
- recent_players
- friends_playing
- gameclips
- screenshots
- activity_feed
- add_friend
- remove_friend
- add_favourite

# Notes

gameclips(id, true) will return saved clips
friends_playing(id, gameTitle ID)
activity(ID, true) will return recent

# RateLimits

![Ratelimit](https://i.imgur.com/mu5G5rK.png)

API requests are limited on a per API Key basis.
When making a request to the API, your limit information will be returned in the headers.

# Ratelimit Headers:
- I do not include ratelimits in the responses.
- X-RateLimit-Limit: Maximum usage allowed per timeframe
- X-Ratelimit-Remaining: Remaining requests that can be made during the timeframe
- X-RateLimit-Reset: Timestamp indicating when the ratelimit will reset in milliseconds.

# API Docs

**[Click Here](https://xapi.us/documentation)**
