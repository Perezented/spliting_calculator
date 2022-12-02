import { Table } from "react-bootstrap";

export const SplitTable = (props) => {
	const { split, fixNumberAndFindPercent, total } = props;

	return (
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
				{split ? (
					<>
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
								<span>40%</span>
							</td>
							<td>{fixNumberAndFindPercent(total, 2, 40)}</td>
							<td className="font-monospace d-flex justify-content-end pe-5">
								{fixNumberAndFindPercent(total, 6, 40)}
							</td>
						</tr>
					</>
				) : (
					<>
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
					</>
				)}
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
	);
};
