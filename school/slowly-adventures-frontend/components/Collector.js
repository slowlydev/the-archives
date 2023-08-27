import { motion } from "framer-motion";

export default function Collector(props) {

	function determineItem() {
		const randomCatagory = Math.random()

		//Item - find
		//Weapon - find 
		//Clothing - find, buy?

		//Home - buy
		//Ability - buy
		//Character - buy


		if (randomCatagory < 0.3) {
			props.value("item." + Math.floor(Math.random() * props.amountOfItems));
		}

		else if (randomCatagory < 0.4) {
			props.value("weapon." + Math.floor(Math.random() * props.amountOfWeapons));
		}

		else if (randomCatagory < 0.45) {
			props.value("clothing." + Math.floor(Math.random() * props.amountOfClothings));
		}
	}

	return (
		<div className="collect-button-container">
			<motion.button className="collect-button" onClick={determineItem}
				whileTap={{ scale: 0.8 }} whileHover={{ scale: 1.1 }}>
				<p>Collect</p>
			</motion.button>
		</div>
	)
}