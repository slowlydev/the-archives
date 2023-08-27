import httpRequest from "./apiService.js"

async function getInventory(playerID) {
	const { data } = await httpRequest.get("/player/" + playerID);
	return data.playerItems;
}

async function createInventory(newInventory) {
	const { data } = await httpRequest.post("/player-items", newInventory);
	return data;
}

async function updateInventory(newInventory) {
	const { data } = await httpRequest.put("/player-items", newInventory);
	return data;
}

export default {
	getInventory,
	createInventory,
	updateInventory,
}