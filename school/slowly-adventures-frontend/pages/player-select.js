import { motion } from "framer-motion";
import { useRouter } from "next/router";

import DescriptiveText from "../components/Common/DescriptiveText";
import Container from "../components/Container/Container";

import playerService from "../services/player.service";

export default function PlayerSelect({ players }) {
	const router = useRouter()

	return (
		<Container>
			<h1>Choose Your Player</h1>

			<div className="player-selector">
				{players.map((player) => (
					<motion.div className="player-card"
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={() => router.push("/player/" + player.id)} key={player.id}>
						<p className="text-title">{player.nickname}</p>
						<DescriptiveText label="Character">
							{player.character.name}
						</DescriptiveText>

						<DescriptiveText label="Weapon">
							{player.weapon.name}
						</DescriptiveText>

						<DescriptiveText label="Clothing">
							{player.clothing.name}
						</DescriptiveText>
					</motion.div>
				))}
			</div>
		</Container>
	)
}

export async function getServerSideProps(context) {
	try {
		const players = await playerService.getAllPlayers();

		return {
			props: { players },
		}
	} catch (error) {
		return { error };
	}
}