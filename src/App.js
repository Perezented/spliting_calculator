import { useState, useEffect, useRef } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
	Container,
	Row,
	Col,
	InputGroup,
	ToggleButton,
	Button
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalculator } from "@fortawesome/free-solid-svg-icons";
import tool from "./images/tool.jpg";

import Typed from "typed.js";
import { CompareSlider } from "./components/CompareSlider";
import { SplitTable } from "./components/SplitTable";
import { NumbersMatch } from "./components/NumbersMatch";
import { NumbersDoNotMatch } from "./components/NumbersDoNotMatch";

function App() {
	const [total, setTotal] = useState(0);
	const brokenPercentages = {
		tenPercent: 0,
		twentyPercent: 0,
		thirtyPercent: 0,
		fiftyPercent: 0
	};
	const currentDateTime = new Date();
	const month = currentDateTime.toString().split(" ")[1];
	const year = currentDateTime.toString().split(" ")[3];
	const [totalAdded, setTotalAdded] = useState(brokenPercentages);
	const [split, setSplit] = useState();
	const [totalAddedRounded, setTotalAddedRounded] = useState(0);

	useEffect(() => {
		if (month === "Jul" && year === "2022") {
			setSplit(true);
		}
	}, [month, year]);

	// Create reference to store the DOM element containing the animation
	const el = useRef(null);
	// Create reference to store the Typed instance itself
	const typed = useRef(null);
	useEffect(() => {
		const options = {
			strings: [
				"Alysa's Calculator",
				"Alysa's Calculating numbers...",
				"Alysa's Calculations in progress...",
				"Alysa's Calculator"
			],
			typeSpeed: 50,
			backSpeed: 80,
			loopCount: 2,
			cursorChar: "",
			backDelay: 30000
		};

		// elRef refers to the <span> rendered below
		typed.current = new Typed(el.current, options);

		return () => {
			// Make sure to destroy Typed instance during cleanup
			// to prevent memory leaks
			typed.current.destroy();
		};
	}, []);

	useEffect(() => {
		setTotal(0);
		setTotalAdded(brokenPercentages);
	}, []);

	useEffect(() => {
		brokenPercentages.thirtyPercent = total * 0.3;
		brokenPercentages.fiftyPercent = total * 0.5;
		if (split) {
			brokenPercentages.twentyPercent = total * 0.2;
			setTotalAdded(
				brokenPercentages.twentyPercent +
					brokenPercentages.thirtyPercent +
					brokenPercentages.fiftyPercent
			);
			setTotalAddedRounded(
				parseFloat(fixNumberAndFindPercent(total, 2, 50)) +
					parseFloat(fixNumberAndFindPercent(total, 2, 30)) +
					parseFloat(fixNumberAndFindPercent(total, 2, 20))
			);
		} else {
			brokenPercentages.tenPercent = total * 0.1;
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
		}
	}, [total, split]);

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
							<FontAwesomeIcon icon={faCalculator} />{" "}
							<span style={{ whiteSpace: "pre" }} ref={el} />
						</h1>
					</Row>
				</Container>
			</header>
			<Container>
				<ToggleButton
					className="mb-2"
					id="toggle-check"
					type="checkbox"
					variant="primary"
					checked={split}
					value="1"
					onChange={(e) => setSplit(e.currentTarget.checked)}>
					{split ? "50-30-20 Split" : "50-30-10-10 Split"}
				</ToggleButton>
				<Button
					className="mb-2 no-hover"
					variant="outline-primary"
					checked={split}
					onClick={(e) => setSplit(!split)}>
					{!split ? "50-30-20 Split" : "50-30-10-10 Split"}
				</Button>
			</Container>
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
				<SplitTable
					split={split}
					fixNumberAndFindPercent={fixNumberAndFindPercent}
					total={total}
				/>
			</Container>
			<NumbersMatch
				totalAdded={totalAdded}
				totalAddedRounded={totalAddedRounded}
				doNumbersMatch={doNumbersMatch}
			/>
			<NumbersDoNotMatch
				totalAdded={totalAdded}
				totalAddedRounded={totalAddedRounded}
				doNumbersMatch={doNumbersMatch}
				posOrNeg={posOrNeg}
			/>
			<CompareSlider />
		</div>
	);
}

export default App;
