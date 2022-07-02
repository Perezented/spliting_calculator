import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
	Container,
	Row,
	Col,
	InputGroup,
	FormControl,
	Table
} from "react-bootstrap";

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
    setTotal(0)
    setTotalAdded(brokenPercentages)
  }, [])

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
    setTotal(e.target.value);
  }

  const fixNumberAndFindPercent = (number, numberFix, percent) => {
    percent = percent * .01;
    return ((number * percent).toFixed(numberFix))
  }

  const doNumbersMatch = () => {
    return totalAdded === totalAddedRounded ? " text-success" : " text-danger"
  }

	return (
		<div className="App bg-gradient">
			<header className="App-header">
				<Container>
					<Row>
						<img src={logo} className="App-logo" alt="logo" />
						<h1>Alysa's Calculator</h1>
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
                onChange={e => handleOnChange(e)}
                type="number"
                placeholder="Dollar amount (with dot and two decimal places)"
                aria-label="Dollar amount (with dot and two decimal places)" />
						</InputGroup>
					</Col>
				</Row>
				<Table variant="dark" responsive striped={true} bordered={true} className="my-3">
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
							<td>{fixNumberAndFindPercent(total, 6, 10)}</td>
						</tr>
						<tr>
							<td>
								<span>10%</span>
							</td>
							<td>{fixNumberAndFindPercent(total, 2, 10)}</td>
							<td>{fixNumberAndFindPercent(total, 6, 10)}</td>
						</tr>
						<tr>
							<td>
								<span>30%</span>
							</td>
							<td>{fixNumberAndFindPercent(total, 2, 30)}</td>
							<td>{fixNumberAndFindPercent(total, 6, 30)}</td>
						</tr>
						<tr>
							<td>
								<span>50%</span>
							</td>
							<td>{fixNumberAndFindPercent(total, 2, 50)}</td>
							<td>{fixNumberAndFindPercent(total, 6, 50)}</td>
						</tr>
					</tbody>
				</Table>
			</Container>
			<Container className={"border-light mb-3 mt-5 pb-5" + doNumbersMatch()}>
        <h5>Total added together + rounded:{" " + totalAddedRounded}</h5>
				<h5>Total added together:{" " + totalAdded}</h5>
        {doNumbersMatch() === " text-success" && totalAdded !== 0
          && <h4 className="my-5 blink">Numbers match and split evenly</h4>}
        {doNumbersMatch() === " text-danger"
          && <h4 className="my-5 blink">Difference:  {(totalAddedRounded - totalAdded).toFixed(6)}</h4>}
			</Container>
		</div>
	);
}

export default App;
