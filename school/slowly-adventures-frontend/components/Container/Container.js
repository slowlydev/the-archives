import { useRouter } from "next/router"

export default function Container(props) {

	const router = useRouter();

	return (
		<>
			<div className="navbar">
				<p onClick={() => router.back()}>Go back</p>
			</div>

			<div className={`main-container${props.className ? ` ${props.className}` : ""}`}>

				{props.children}

			</div>
		</>
	)
}