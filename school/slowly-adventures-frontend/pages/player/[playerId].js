import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";

import playerService from "../../services/player.service";
import itemService from "../../services/item.service";

import Container from "../../components/Container/Container";
import DescriptiveText from "../../components/Common/DescriptiveText";
import Collector from "../../components/Collector";
import weaponService from "../../services/weapon.service";
import clothingService from "../../services/clothing.service";


export default function Player({ player, items, weapons, clothings }) {

	const [collectedItems, setCollectedItems] = useState([]);
	const [playerItems, setPlayerItems] = useState(player.playerItems)

	function addToCollectedItems(item) {
		setCollectedItems(oldArray => [...oldArray, item]);
	}

	async function determineAction(value) {
		const args = value.split(".");

		switch (args[0]) {
			case "item": {
				addToCollectedItems({ ...items[args[1]], type: "item" });

				const itemDoesExsist = playerItems.find((playerItem) => playerItem.item.id === parseInt(items[args[1]].id));

				if (itemDoesExsist) {
					await axios.put("http://localhost:4000/api/player-items", { id: itemDoesExsist.id, player: player.id, item: itemDoesExsist.item.id, amount: itemDoesExsist.amount + 1 })
					//await inventoryService.updateInventory({ id: playerItem.id, player: player.id, item: playerItem.item.id, amount: playerItem.amount + 1 });
				} else {
					await axios.post("http://localhost:4000/api/player-items", { player: player.id, item: parseInt(items[args[1]].id), amount: 1 })
					//await inventoryService.createInventory({ player: player.id, item: parseInt(items[args[1]].id), amount: 1 });
				}

				const { data } = await axios.get("http://localhost:4000/api/player/" + player.id);
				setPlayerItems(data.playerItems);

				break;
			}
			case "weapon": {
				addToCollectedItems({ ...weapons[args[1]], type: "weapon" });
				break;
			}
			case "clothing": {
				addToCollectedItems({ ...clothings[args[1]], type: "clothing" });
				break;
			}
			default: {
				console.log("nothing")
			}
		}
	}

	return (
		<Container className="center">
			<h1>{player.nickname}</h1>

			<div className="player-options margin-v">
				<motion.div className="player-option-card">
					<DescriptiveText label="Character">
						{player.character.name}
					</DescriptiveText>
				</motion.div>

				<motion.div className="player-option-card">
					<DescriptiveText label="Clothing">
						{player.clothing.name}
					</DescriptiveText>
				</motion.div>

				<motion.div className="player-option-card">
					<DescriptiveText label="Weapon">
						{player.weapon.name}
					</DescriptiveText>
				</motion.div>
			</div>

			<Collector
				amountOfItems={items.length}
				amountOfWeapons={weapons.length}
				amountOfClothings={clothings.length}
				value={(val) => determineAction(val)}
			/>

			<div className="collected-items-container margin-v">
				{collectedItems.map((collectedItem, index) => (
					<div className="collected-item-card" key={collectedItem.id + "." + index}>
						<p>{collectedItem.name}</p>
						{collectedItem.type !== "item" && (
							<button>Add</button>
						)}
					</div>
				))}
			</div>


		</Container>
	)
}

export async function getServerSideProps(context) {
	try {
		const player = await playerService.getPlayer(context.query.playerId);
		const items = await itemService.getAllItems();
		const weapons = await weaponService.getAllWeapons();
		const clothings = await clothingService.getAllClothings();

		return {
			props: { player, items, weapons, clothings },
		}
	} catch (error) {
		return { error };
	}
}