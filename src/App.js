import { useState, useEffect, useRef } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  InputGroup,
  ToggleButton,
  ButtonGroup
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalculator } from "@fortawesome/free-solid-svg-icons";

import Typed from "typed.js";
import { CompareSlider } from "./components/CompareSlider";
import { SplitTable } from "./components/SplitTable";
import { NumbersMatch } from "./components/NumbersMatch";
import { NumbersDoNotMatch } from "./components/NumbersDoNotMatch";

function App() {
	const [total, setTotal] = useState(0);
	let brokenPercentages = {};
	const [totalAdded, setTotalAdded] = useState(brokenPercentages);
	const [totalAddedRounded, setTotalAddedRounded] = useState(0);
	const splits = [
		{ name: "50-50", value: [50, 50] },
		{ name: "50-40-10", value: [50, 40, 10] }
	];
	const [split, setSplit] = useState(splits[0]);
	// Create reference to store the DOM element containing the animation
	const el = useRef(null);
	// Create reference to store the Typed instance itself
	const typed = useRef(null);
	useEffect(() => {
    const allStrings = [
      "Alysa's Calculator",
      "Alysa helps you split bills fast.",
      "Choose your split ratio.",
      "Alysa makes splitting easy!",
      "Alysa's Calculations in progress...",
      "Let's crunch those numbers!",
      "Alysa's Calculating numbers...",
      "Enter your total and split!",
      "Alysa's Calculations in progress...",
      "Alysa's Calculator: always accurate.",
      "Alysa's Calculator: fairness first.",
      "Alysa's Calculator: teamwork made simple.",
      "Alysa's magic for your bills.",
      "Alysa's math, your peace of mind.",
      "Alysa's numbers, your solution.",
      "Alysa's tool for perfect splits.",
      "Alysa's way to fair splits.",
      "Fast, accurate calculations.",
      "Alysa's Calculator: the smart way to split.",
      "Alysa's Calculator: trusted by friends.",
      "Alysa's Calculator: your bill buddy.",
      "Get your results instantly.",
      "Precision with every calculation.",
      "Alysa's Calculations in progress...",
      "Simple. Reliable. Alysa's Calculator.",
      "Alysa's Calculator: split, save, smile.",
      "Alysa's Calculator: split with confidence.",
      "Splitting bills made easy!",
      "Try different split options!",
      "Your bill, your way.",
      "Alysa's Calculator 🔢🧮",
    ];
    // Shuffle the strings array
    const shuffledStrings = allStrings
      .map(str => ({ str, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ str }) => str);

    const options = {
      strings: shuffledStrings,
      typeSpeed: 50,
      backSpeed: 80,
      cursorChar: "",
      backDelay: 30000,
      loop: true,
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
		brokenPercentages = {};
		let ttlAdded = 0;
		let ttlAddedRounded = 0;
		split.value.map(s => {
			brokenPercentages[s] = total * (s / 100);
			ttlAdded += total * (s / 100);
			ttlAddedRounded += parseFloat(fixNumberAndFindPercent(total, 2, s))

		})
		setTotalAdded(ttlAdded);
		setTotalAddedRounded(ttlAddedRounded);
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
    const result = number * percent;
    if (numberFix === 2) {
      return result.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }
    return result.toFixed(numberFix);
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
				<ButtonGroup className="my-2">
					{splits.map((sp, idx) => (
						<ToggleButton
							key={idx}
							id={`split-${idx}`}
							type="split"
							className={split.name !== sp.name && 'fw-bold'}
							variant={split.name === sp.name ? 'primary' : 'outline-primary'}
							name="split"
							value={sp.value}
							checked={split.name === sp.name}
							onClick={() => { setSplit(sp) }}
						>
							{sp.name}
						</ToggleButton>
					))}
				</ButtonGroup>
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
