import { useRouter } from 'next/router'

import Button from "../components/Common/Button";
import Container from "../components/Container/Container";

export default function Home() {
	const router = useRouter()

	return (
		<Container>
			<div className="center-hero">
				<h1>Slowly-Adventures</h1>

				<div className="play-button-container">
					<Button onClick={() => { router.push("/player-select") }}>Play</Button>
				</div>
			</div>
		</Container>
	)
}