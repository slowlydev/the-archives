import httpRequest from "./apiService.js"

async function getAllWeapons() {
	const { data } = await httpRequest.get("/weapon");
	return data;
}

async function getWeapon(weaponID) {
	const { data } = await httpRequest.get("/weapon/" + weaponID);
	return data;
}

export default {
	getAllWeapons,
	getWeapon,
}