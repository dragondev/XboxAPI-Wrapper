const req = require('@aero/centra');
const BASE_URL = 'https://xapi.us/v2';

class XboxClient {
	constructor(token) {
		if (!token) throw new SyntaxError('Missing API key');
		Object.defineProperty(this, 'token', { value: token }); // hides it from util.inspect, e.g. in eval
}
    async id(query) {
        if(!query) throw new Error('Please input a Gamertag')
        let id = await req(BASE_URL).path('xuid').path(query).header('X-AUTH', this.token).send()
        if(id.statusCode !== 200) return JSON.parse(id.text)
        return id.text
    }
    async selfID() {
        let self = await req(BASE_URL).path('accountXuid').header('X-AUTH', this.token).send()
        if(self.statusCode !== 200) return JSON.parse(self.text)
        self = JSON.parse(self.text)
        return self
    }
    async messages() {
        let messages = await req(BASE_URL).path('messages').header('X-AUTH', this.token).send()
        if(messages.statusCode !== 200) return JSON.parse(messages.text)
        messages = JSON.parse(messages.text)
        return messages
    }
    async conversations() {
        let conversations = await req(BASE_URL).path('conversations').header('X-AUTH', this.token).send()
        if(conversations.statusCode !== 200) return JSON.parse(conversations.text)
        conversations = JSON.parse(conversations.text)
        return conversations
    }
    async gamertag(query) {
        if(!query) throw new Error('No XUID entered')
        let gamertag = await req(BASE_URL).path('gamertag').path(query).header('X-AUTH', this.token).send()
        if(gamertag.statusCode !== 200) return JSON.parse(gamertag.text)
        return gamertag.text
    }
    async profile(query) {
        if(query) return this.new_profile(query)
        let profile = await req(BASE_URL).path('profile').header('X-AUTH', this.token).send()
        if(profile.statusCode !== 200) return JSON.parse(profile.text)
        profile = JSON.parse(profile.text)
        return profile 
    }
    async new_profile(query) {
        if(!query) throw new Error('No XUID entered')
        let profile = await req(BASE_URL).path(query).path('new-profile').header('X-AUTH', this.token).send()
        if(profile.statusCode !== 200) return JSON.parse(profile.text)
        profile = JSON.parse(profile.text)
        return profile  
    }
    async gamercard(query) {
        if(!query) throw new Error('No XUID entered')
        let gamercard = await req(BASE_URL).path(query).path('gamercard').header('X-AUTH', this.token).send()
        if(gamercard.statusCode !== 200) return JSON.parse(gamercard.text)
        gamercard = JSON.parse(gamercard.text)
        return gamercard  
    }

    async presence(query) {
        if(!query) throw new Error('No XUID entered')
        let presence = await req(BASE_URL).path(query).path('presence').header('X-AUTH', this.token).send()
        if(presence.statusCode !== 200) return JSON.parse(presence.text)
        presence = JSON.parse(presence.text)
        return presence  
    }
    async activity(query, recent) {
        if(recent === true) return this.activity_recent(query)
        if(!query) throw new Error('No XUID entered')
        let activity = await req(BASE_URL).path(query).path('activity').header('X-AUTH', this.token).send()
        if(activity.statusCode !== 200) return JSON.parse(activity.text)
        activity = JSON.parse(activity.text)
        return activity  
    }
    async activity_recent(query) {
        if(!query) throw new Error('No XUID entered')
        let activity = await req(BASE_URL).path(query).path('activity').path('recent').header('X-AUTH', this.token).send()
        if(activity.statusCode !== 200) return JSON.parse(activity.text)
        activity = JSON.parse(activity.text)
        return activity  
    }
    async friends(query) {
        if(!query) throw new Error('No XUID entered')
        let friends = await req(BASE_URL).path(query).path('friends').header('X-AUTH', this.token).send()
        if(friends.statusCode !== 200) return JSON.parse(friends.text)
        friends = JSON.parse(friends.text)
        return friends  
    }
    async followers(query) {
        if(!query) throw new Error('No XUID entered')
        let followers = await req(BASE_URL).path(query).path('followers').header('X-AUTH', this.token).send()
        if(followers.statusCode !== 200) return JSON.parse(followers.text)
        followers = JSON.parse(followers.text)
        return followers  
    }
    async recentplayers() {
        let recentPlayers = await req(BASE_URL).path('recent-players').header('X-AUTH', this.token).send()
        if(recentPlayers.statusCode !== 200) return JSON.parse(recentPlayers.text)
        recentPlayers = JSON.parse(recentPlayers.text)
        return recentPlayers  
    }
    async friendsplaying(query, title) {
        if(!query) throw new Error('No XUID entered')
        if(!title) throw new Error('no Title ID entered')
        let friendsPlaying = await req(BASE_URL).path(query).path('friends-playing').path(title).header('X-AUTH', this.token).send()
        if(friendsPlaying.statusCode !== 200) return JSON.parse(friendsPlaying.text)
        friendsPlaying = JSON.parse(friendsPlaying.text)
        return friendsPlaying  
    }
    async gameclips(query, saved) {
        if(saved === true) return this.gameclips_saved(query)
        let gameclips = await req(BASE_URL).path(query).path('game-clips').header('X-AUTH', this.token).send()
        if(gameclips.statusCode !== 200) return JSON.parse(gameclips.text)
        gameclips = JSON.parse(gameclips.text)
        return gameclips  
    }
    async gameclips_saved(query) {
        let gameclips = await req(BASE_URL).path(query).path('game-clips').path('saved').header('X-AUTH', this.token).send()
        if(gameclips.statusCode !== 200) return JSON.parse(gameclips.text)
        gameclips = JSON.parse(gameclips.text)
        return gameclips  
    }
    async screenshots(query) {
        let screenshots = await req(BASE_URL).path(query).path('screenshots').header('X-AUTH', this.token).send()
        if(screenshots.statusCode !== 200) return JSON.parse(screenshots.text)
        screenshots = JSON.parse(screenshots.text)
        return screenshots       
    }
    async activityfeed() {
        let activityfeed = await req(BASE_URL).path('activity-feed').header('X-AUTH', this.token).send()
        if(activityfeed.statusCode !== 200) return JSON.parse(activityfeed.text)
        activityfeed = JSON.parse(activityfeed.text)
        return activityfeed  
    }
    async addfriend(query) {
        let friend = await req(BASE_URL).path(query).path('add-as-friend').header('X-AUTH', this.token).send()
        if(friend.statusCode !== 200) return JSON.parse(friend.text)
        friend = JSON.parse(friend.text)
        return friend  
    }
    async removefriend(query) {
        let friend = await req(BASE_URL).path(query).path('remove-friend').header('X-AUTH', this.token).send()
        if(gamfriendeclips.statusCode !== 200) return JSON.parse(friend.text)
        friend = JSON.parse(friend.text)
        return friend  
    }
    async addfavourite(query) {
        let addfavourite = await req(BASE_URL).path(query).path('add-as-favourite').header('X-AUTH', this.token).send()
        if(addfavourite.statusCode !== 200) return JSON.parse(addfavourite.text)
        addfavourite = JSON.parse(addfavourite.text)
        return addfavourite  
    }
}
module.exports = XboxClient;
