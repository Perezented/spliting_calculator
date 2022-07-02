import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, InputGroup, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalculator } from "@fortawesome/free-solid-svg-icons";
import tool from "./images/tool.jpg"
import blurchart from "./images/blurchart.jpg"
import {
	ReactCompareSlider,
	ReactCompareSliderImage
} from "react-compare-slider";

function App() {
	const [total, setTotal] = useState(0);
	const brokenPercentages = {
		tenPercent: 0,
		thirtyPercent: 0,
		fiftyPercent: 0
	};
	const [totalAdded, setTotalAdded] = useState(brokenPercentages);
	const [totalAddedRounded, setTotalAddedRounded] = useState(0);

	useEffect(() => {
		setTotal(0);
		setTotalAdded(brokenPercentages);
	}, []);

	useEffect(() => {
		brokenPercentages.tenPercent = total * 0.1;
		brokenPercentages.thirtyPercent = total * 0.3;
		brokenPercentages.fiftyPercent = total * 0.5;
		setTotalAdded(
			brokenPercentages.tenPercent +
				brokenPercentages.tenPercent +
				brokenPercentages.thirtyPercent +
				brokenPercentages.fiftyPercent
		);
		setTotalAddedRounded(
			parseFloat(fixNumberAndFindPercent(total, 2, 50)) +
				parseFloat(fixNumberAndFindPercent(total, 2, 30)) +
				parseFloat(fixNumberAndFindPercent(total, 2, 10)) +
				parseFloat(fixNumberAndFindPercent(total, 2, 10))
		);
	}, [total]);

	const handleOnChange = (e) => {
		if (
			e.target.value.includes(".") &&
			e.target.value.split(".")[1].length > 2
		) {
			return;
		}
		setTotal(e.target.value);
	};

	const fixNumberAndFindPercent = (number, numberFix, percent) => {
		percent = percent * 0.01;
		return (number * percent).toFixed(numberFix);
	};

	const doNumbersMatch = () => {
		return Math.fround(totalAdded) === Math.fround(totalAddedRounded)
			? " text-success"
			: " text-danger";
	};

	const posOrNeg = (number) => {
		return number >= 0 ? " text-danger" : " text-success";
	};

	return (
		<div className="App bg-gradient">
			<header className="App-header">
				<Container>
					<Row>
						<h1>
							<FontAwesomeIcon icon={faCalculator} /> Alysa's Calculator
						</h1>
					</Row>
				</Container>
			</header>
			<Container className="my-3">
				<Row className="d-flex bg-gradient py-3 border">
					<Col sm={3} className="my-auto">
						<span>Total entered: </span>
					</Col>
					<Col>
						<InputGroup className="my-auto">
							<InputGroup.Text>$</InputGroup.Text>
							<input
								className="form-control"
								value={total}
								pattern="[0-9]*"
								onChange={(e) => handleOnChange(e)}
								type="number"
								step=".01"
								placeholder="Dollar amount (with dot and two decimal places)"
								aria-label="Dollar amount (with dot and two decimal places)"
							/>
						</InputGroup>
					</Col>
				</Row>
				<Table
					variant="dark"
					responsive
					striped={true}
					bordered={true}
					className="my-3">
					<thead>
						<tr>
							<th>Percentage Amount</th>
							<th>Cleanly Total Divided</th>
							<th>Total Divided</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<span>10%</span>
							</td>
							<td>{fixNumberAndFindPercent(total, 2, 10)}</td>
							<td className="font-monospace d-flex justify-content-end pe-5">
								{fixNumberAndFindPercent(total, 6, 10)}
							</td>
						</tr>
						<tr>
							<td>
								<span>10%</span>
							</td>
							<td>{fixNumberAndFindPercent(total, 2, 10)}</td>
							<td className="font-monospace d-flex justify-content-end pe-5">
								{fixNumberAndFindPercent(total, 6, 10)}
							</td>
						</tr>
						<tr>
							<td>
								<span>30%</span>
							</td>
							<td>{fixNumberAndFindPercent(total, 2, 30)}</td>
							<td className="font-monospace d-flex justify-content-end pe-5">
								{fixNumberAndFindPercent(total, 6, 30)}
							</td>
						</tr>
						<tr>
							<td>
								<span>50%</span>
							</td>
							<td>{fixNumberAndFindPercent(total, 2, 50)}</td>
							<td className="font-monospace d-flex justify-content-end pe-5">
								{fixNumberAndFindPercent(total, 6, 50)}
							</td>
						</tr>
					</tbody>
				</Table>
			</Container>
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
							{" " +
								parseFloat(totalAdded).toFixed(2) +
								" (" +
								totalAdded +
								")"}
						</h5>
					</Col>
				</Row>
				{doNumbersMatch() === " text-success" && totalAdded !== 0 && (
					<h2 className="my-5 font-weight-bold blink">
						Numbers match and split evenly
					</h2>
				)}
			</Container>
			<Container className="mb-50vh">
				{doNumbersMatch() === " text-danger" &&
					(totalAddedRounded - totalAdded).toFixed(2) !== "0.00" && (
						<div
							className={
								"my-5 blink" + posOrNeg(totalAddedRounded - totalAdded)
							}>
							<h4>
								Difference:
								{" " +
									(totalAddedRounded - totalAdded).toFixed(2) +
									" (" +
									(totalAddedRounded - totalAdded).toFixed(6) +
									")"}
							</h4>
							{totalAddedRounded.toFixed(2) !=
								parseFloat(totalAdded).toFixed(2) && (
								<h3>
									{totalAddedRounded.toFixed(2)} of the{" "}
									<span className="text-white">
										{parseFloat(totalAdded).toFixed(2)} original total
									</span>{" "}
									was used
								</h3>
							)}
						</div>
					)}
			</Container>
			<Container className="p-5">
				<div
        className="pb-5"
					style={{
						display: "flex",
						flexDirection: "column",
						flexGrow: 1
					}}>
					<ReactCompareSlider
						boundsPadding={80}
            changePositionOnHover
						itemOne={
							<ReactCompareSliderImage
								alt="Image one"
								src={blurchart}
								style={{ filter: "blur(1rem) grayscale(1)" }}
                />
              }
              itemTwo={
                <ReactCompareSliderImage
								alt="Image two"
								src={blurchart}
                style={{ filter: "contrast(120%)" }}
							/>
						}
						position={50}
						style={{
							flexGrow: 1,
							width: "100%"
						}}
					/>
				</div>
			</Container>
		</div>
	);
}

export default App;
