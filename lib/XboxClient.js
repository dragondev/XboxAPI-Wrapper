const req = require('centra');
const BASE_URL = 'https://xapi.us/v2';
class XboxClient {

	constructor(token) {
		if (!token) throw new SyntaxError('Missing API key');
		Object.defineProperty(this, 'token', { value: token });
	}
	checkJSON(str) {
		try {
			if (!str) throw new Error('Please input a JSON object');
			const parse = JSON.parse(str);
			if (parse) return true;
			return false;
		} catch (e) {
			return false;
		}
	}

	formatError(err) {
		if (this.checkJSON(err)) return JSON.parse(err);
		if (err.toString().startsWith('<!DOCTYPE html>')) return 'Html page error given';
		return err.toString();
	}
	cleanQuery(query) {
		if (!query) throw new Error('no query given to format');
		return query.replace(/[^\w\s]/gi, '');
	}
	async id(query) {
		if (!query) throw new Error('Please input a Gamertag');
		const id = await req(BASE_URL)
			.path('xuid')
			.path(this.cleanQuery(query))
			.header('X-AUTH', this.token)
			.send();
		if (id.statusCode !== 200) return this.formatError(id.body);
		return id.text();
	}
	async self() {
		const self = await req(BASE_URL)
			.path('accountXuid')
			.header('X-AUTH', this.token)
			.send();
		if (self.statusCode !== 200) return this.formatError(self.body);
		return self.text();
	}
	async messages() {
		let messages = await req(BASE_URL)
			.path('messages')
			.header('X-AUTH', this.token)
			.send();
		if (messages.statusCode !== 200) return this.formatError(messages.body);
		messages = JSON.parse(messages.body);
		return messages;
	}
	async conversations() {
		let conversations = await req(BASE_URL)
			.path('conversations')
			.header('X-AUTH', this.token)
			.send();
		if (conversations.statusCode !== 200) return this.formatError(conversations.body);
		conversations = JSON.parse(conversations.body);
		return conversations;
	}
	async gamertag(query) {
		if (!query) throw new Error('No XUID entered');
		const gamertag = await req(BASE_URL)
			.path('gamertag')
			.path(this.cleanQuery(query))
			.header('X-AUTH', this.token)
			.send();
		if (!gamertag.text().length) return 'No Gamertag found';
		if (gamertag.statusCode !== 200) return this.formatError(gamertag.body);
		return gamertag.text();
	}
	async profile(query) {
		if (query) return this.new_profile(query);
		let profile = await req(BASE_URL)
			.path('profile')
			.header('X-AUTH', this.token)
			.send();
		if (profile.statusCode !== 200) return this.formatError(profile.body);
		profile = JSON.parse(profile.body);
		return profile;
	}
	async new_profile(query) {
		if (!query) throw new Error('No XUID entered');
		let profile = await req(BASE_URL)
			.path(this.cleanQuery(query))
			.path('new-profile')
			.header('X-AUTH', this.token)
			.send();
		if (profile.statusCode !== 200) return this.formatError(profile.body);
		profile = JSON.parse(profile.body);
		if (profile.headers) return 'No profile found';
		return profile;
	}
	async gamercard(query) {
		if (!query) throw new Error('No XUID entered');
		let gamercard = await req(BASE_URL)
			.path(this.cleanQuery(query))
			.path('gamercard')
			.header('X-AUTH', this.token)
			.send();
		if (gamercard.statusCode !== 200) return this.formatError(gamercard.body);
		gamercard = JSON.parse(gamercard.body);
		return gamercard;
	}

	async presence(query) {
		if (!query) throw new Error('No XUID entered');
		let presence = await req(BASE_URL)
			.path(this.cleanQuery(query))
			.path('presence')
			.header('X-AUTH', this.token)
			.send();
		if (presence.statusCode !== 200) return this.formatError(presence.body);
		presence = JSON.parse(presence.body);
		return presence;
	}
	async activity(query, recent) {
		if (recent === true) return this.activity_recent(query);
		if (!query) throw new Error('No XUID entered');
		let activity = await req(BASE_URL)
			.path(this.cleanQuery(query))
			.path('activity')
			.header('X-AUTH', this.token)
			.send();
		if (activity.statusCode !== 200) return this.formatError(activity.body);
		activity = JSON.parse(activity.body);
		return activity;
	}
	async activity_recent(query) {
		if (!query) throw new Error('No XUID entered');
		let activity = await req(BASE_URL)
			.path(this.cleanQuery(query))
			.path('activity')
			.path('recent')
			.header('X-AUTH', this.token)
			.send();
		if (activity.statusCode !== 200) return this.formatError(activity.body);
		activity = JSON.parse(activity.body);
		return activity;
	}
	async friends(query) {
		if (!query) throw new Error('No XUID entered');
		let friends = await req(BASE_URL)
			.path(this.cleanQuery(query))
			.path('friends')
			.header('X-AUTH', this.token)
			.send();
		if (friends.statusCode !== 200) return this.formatError(friends.body);
		friends = JSON.parse(friends.body);
		return friends;
	}
	async followers(query) {
		if (!query) throw new Error('No XUID entered');
		let followers = await req(BASE_URL)
			.path(this.cleanQuery(query))
			.path('followers')
			.header('X-AUTH', this.token)
			.send();
		if (followers.statusCode !== 200) return this.formatError(followers.body);
		followers = JSON.parse(followers.body);
		return followers;
	}
	async recent_players() {
		let recent_players = await req(BASE_URL)
			.path('recent-players')
			.header('X-AUTH', this.token)
			.send();
		if (recent_players.statusCode !== 200) return this.formatError(recent_players.body);
		recent_players = JSON.parse(recent_players.body);
		return recent_players;
	}
	async friends_playing(query, title) {
		if (!query) throw new Error('No XUID entered');
		if (!title) throw new Error('no Title ID entered');
		let friends_playing = await req(BASE_URL)
			.path(this.cleanQuery(query))
			.path('friends-playing')
			.path(title)
			.header('X-AUTH', this.token)
			.send();
		if (friends_playing.statusCode !== 200) { return this.formatError(friends_playing.body); }
		friends_playing = JSON.parse(friends_playing.body);
		if (friends_playing.headers) return 'No friends playing that game were found';
		return friends_playing;
	}
	async gameclips(query, saved) {
		if (saved === true) return this.gameclips_saved(query);
		let gameclips = await req(BASE_URL)
			.path(this.cleanQuery(query))
			.path('game-clips')
			.header('X-AUTH', this.token)
			.send();
		if (gameclips.statusCode !== 200) return this.formatError(gameclips.body);
		gameclips = JSON.parse(gameclips.body);
		if (gameclips.errorCode) return `Error code ${gameclips.errorCode} (User may not exist)`;
		return gameclips;
	}
	async gameclips_saved(query) {
		let gameclips = await req(BASE_URL)
			.path(this.cleanQuery(query))
			.path('game-clips')
			.path('saved')
			.header('X-AUTH', this.token)
			.send();
		if (gameclips.statusCode !== 200) return this.formatError(gameclips.body);
		gameclips = JSON.parse(gameclips.body);
		if (gameclips.errorCode) return `Error code ${gameclips.errorCode} (User may not exist)`;
		return gameclips;
	}
	async screenshots(query) {
		let screenshots = await req(BASE_URL)
			.path(this.cleanQuery(query))
			.path('screenshots')
			.header('X-AUTH', this.token)
			.send();
		if (screenshots.statusCode !== 200) return this.formatError(screenshots.body);
		screenshots = JSON.parse(screenshots.body);
		if (screenshots.errorCode) return `Error code ${screenshots.errorCode} (User may not exist)`;

		return screenshots;
	}
	async activity_feed() {
		let activity_feed = await req(BASE_URL)
			.path('activity-feed')
			.header('X-AUTH', this.token)
			.send();
		if (activity_feed.statusCode !== 200) return this.formatError(activity_feed.body);
		activity_feed = JSON.parse(activity_feed.body);
		return activity_feed;
	}
	async add_friend(query) {
		let add_friend = await req(BASE_URL)
			.path(this.cleanQuery(query))
			.path('add-as-friend')
			.header('X-AUTH', this.token)
			.send();
		if (add_friend.statusCode !== 200) return this.formatError(add_friend.body);
		add_friend = JSON.parse(add_friend.body);
		return add_friend;
	}
	async remove_friend(query) {
		let remove_friend = await req(BASE_URL, 'DELETE')
			.path(this.cleanQuery(query))
			.path('remove-friend')
			.header('X-AUTH', this.token)
			.send();
		if (remove_friend.statusCode !== 200) return this.formatError(remove_friend.body);
		remove_friend = JSON.parse(remove_friend.body);
		return remove_friend;
	}
	async add_favourite(query) {
		let add_favourite = await req(BASE_URL)
			.path(this.cleanQuery(query))
			.path('add-as-favourite')
			.header('X-AUTH', this.token)
			.send();
		if (add_favourite.statusCode !== 200) return this.formatError(add_favourite.body);
		add_favourite = JSON.parse(add_favourite.body);
		return add_favourite;
	}

}
module.exports = XboxClient;
