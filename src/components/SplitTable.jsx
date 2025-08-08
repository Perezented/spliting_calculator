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
				{split?.value?.map(sp => {
					return <tr>
						<td>
							<span>{sp + "%"}</span>
						</td>
						<td>{fixNumberAndFindPercent(total, 2, sp)}</td>
						<td className="font-monospace d-flex justify-content-end pe-5">
							{fixNumberAndFindPercent(total, 6, sp)}
						</td>
					</tr>
				})}
			</tbody>
		</Table>
	);
};
