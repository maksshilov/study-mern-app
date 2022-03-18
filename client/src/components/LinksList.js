import React from "react"
import { Link } from "react-router-dom"

export const LinksList = ({ links }) => {
	if (!links.length) {
		return <p className="center">No links yet</p>
	}

	return (
		<table className="striped">
			<thead>
				<tr>
					<th>#</th>
					<th>Original</th>
					<th>Short</th>
					<th>Open</th>
				</tr>
			</thead>

			<tbody>
				{links.map((link, idx) => {
					return (
						<tr key={link._id}>
							<td>{idx + 1}</td>
							<td>{link.from}</td>
							<td>{link.to}</td>
							<td>
								<Link to={`/detail/${link._id}`}>Open</Link>
							</td>
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}
