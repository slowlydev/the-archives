export default function DescriptiveText(props) {
	return (
		<div className="desc-text">
			<p className="desc">{props.label}</p>
			<p>{props.children}</p>
		</div>
	)
}