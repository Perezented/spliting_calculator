import { Container, Row, Col } from "react-bootstrap";

export const NumbersMatch = (props) => {
	const { totalAdded, totalAddedRounded, doNumbersMatch } = props;

	return (
		<Container className={"border-light mb-3 mt-5 pb-5" + doNumbersMatch()}>
			<Row>
				<Col sm={4}>Total added together + rounded:</Col>
				<Col className="d-flex">
					<h5>
						{" " +
							totalAddedRounded.toFixed(2) +
							" (" +
							totalAddedRounded +
							")"}
					</h5>
				</Col>
			</Row>
			<Row>
				<Col sm={4}>Total added together:</Col>
				<Col className="d-flex">
					<h5>
						{" " + parseFloat(totalAdded).toFixed(2) + " (" + totalAdded + ")"}
					</h5>
				</Col>
			</Row>
			{doNumbersMatch() === " text-success" && totalAdded !== 0 && (
				<h2 className="my-5 font-weight-bold blink">
					Numbers match and split evenly
				</h2>
			)}
		</Container>
	);
};
