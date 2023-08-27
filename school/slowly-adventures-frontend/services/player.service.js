import httpRequest from "./apiService.js"

async function getAllPlayers() {
	const { data } = await httpRequest.get("/player");
	return data;
}

async function getPlayer(playerID) {
	const { data } = await httpRequest.get("/player/" + playerID);
	return data;
}

async function updatePlayer(playerID, newPlayer) {
	const { data } = await httpRequest.put("/player" + playerID, newPlayer);
	return data;
}

export default {
	getAllPlayers,
	getPlayer,
	updatePlayer,
}