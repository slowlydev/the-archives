import Container from "./container";

export default function Loading(props) {
    return (
        <Container pageName={props.pageName}>
            <h1>Loading...</h1>
        </Container>
    )
}