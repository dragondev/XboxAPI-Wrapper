const { XboxClient } = require('./index');
const xbox = new XboxClient('Token');
const user = 'djekl';
const id = '2533274813081462';

async function self() {
	const self = await xbox.self();
	return self;
}
async function _id() {
	const _id = await xbox.id(user);
	console.log(_id);
	return _id;
}
async function messages() {
	const messages = await xbox.messages();
	console.log(messages);
	return messages;
}
async function conversations() {
	const conversations = await xbox.conversations();
	console.log(conversations);
	return conversations;
}
async function gamertag() {
	const gamertag = await xbox.gamertag(id);
	console.log(gamertag);
	return gamertag;
}
async function self_profile() {
	const self_profile = await xbox.self_profile(id);
	console.log(self_profile);
	return self_profile;
}
async function profile() {
	const profile = await xbox.profile(id);
	console.log(profile);
	return profile;
}
async function presence() {
	const presence = await xbox.presence(id);
	console.log(presence);
	return presence;
}
async function activity() {
	const activity = await xbox.activity(id);
	console.log(activity);
	return activity;
}
async function activity_recent(id) {
	const activity_recent = await xbox.activity_recent(id);
	console.log(activity_recent);
	return activity_recent;
}
async function friends() {
	const friends = await xbox.friends(id);
	console.log(friends);
	return friends;
}
async function followers() {
	const followers = await xbox.followers(id);
	console.log(followers);
	return followers;
}
async function recent_players() {
	const recent_players = await xbox.recent_players(id);
	console.log(recent_players);
	return recent_players;
}
async function friends_playing() {
	const friends_playing = await xbox.friends_playing(id, '950328474');
	console.log(friends_playing);
	return friends_playing;
}
async function gameclips() {
	const gameclips = await xbox.gameclips(id);
	console.log(gameclips);
	return gameclips;
}
async function gameclips_saved() {
	const gameclips_saved = await xbox.gameclips_saved(id);
	console.log(gameclips_saved);
	return gameclips_saved;
}
async function screenshots() {
	const screenshots = await xbox.screenshots;
	console.log(screenshots);
	return screenshots;
}
async function activity_feed() {
	const activity_feed = await xbox.activity_feed();
	console.log(activity_feed);
	return activity_feed;
}
async function add_friend() {
	const add_friend = await xbox.add_friend(id);
	return add_friend;
}
async function add_favourite() {
	const add_favourite = await xbox.add_favourite(id);
	return add_favourite;
}
async function remove_friend() {
	const remove_friend = await xbox.remove_friend(id);
	return remove_friend;
}
