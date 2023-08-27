import playerService from "../../services/player.service";

import Container from "../../components/Container/Container";


export default function Player({ player }) {

	return (
		<Container className="center">
			<h1>{player.nickname}</h1>

			<div className="collected-items-container margin-v">
				{player.playerItems.map((collectedItem, index) => (
					<div className="collected-item-card" key={collectedItem.id + "." + index}>
						<p>{collectedItem.item.name}</p>
						<p>{collectedItem.amount}x</p>
					</div>
				))}
			</div>

		</Container>
	)
}

export async function getServerSideProps(context) {
	try {
		const player = await playerService.getPlayer(context.query.playerId);

		return {
			props: { player },
		}
	} catch (error) {
		return { error };
	}
}