import httpRequest from "./apiService.js"

async function getAllClothings() {
	const { data } = await httpRequest.get("/clothing");
	return data;
}

async function getClothing(clothingID) {
	const { data } = await httpRequest.get("/clothing/" + clothingID);
	return data;
}

export default {
	getAllClothings,
	getClothing,
}