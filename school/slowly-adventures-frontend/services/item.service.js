import httpRequest from "./apiService.js"

async function getAllItems() {
	const { data } = await httpRequest.get("/item");
	return data;
}

async function getItem(itemID) {
	const { data } = await httpRequest.get("/item/" + itemID);
	return data;
}

export default {
	getAllItems,
	getItem,
}