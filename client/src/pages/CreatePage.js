import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import useHttp from "../hooks/http.hook"

export default function CreatePage(params) {
	const navigate = useNavigate()
	const auth = useContext(AuthContext)
	const { request } = useHttp()
	const [link, setLink] = useState("")

	useEffect(() => {
		window.M.updateTextFields()
	}, [])

	const pressHandler = async (event) => {
		if (event.key === "Enter") {
			try {
				const data = await request(
					"/api/link/generate",
					"POST",
					{ from: link },
					{ Authorization: `Bearer ${auth.token}` }
				)
				navigate(`/detail/${data.link._id}`)
				console.log(data)
			} catch (error) {}
		}
	}

	return (
		<div className="row">
			<div className="col s8 offset-s2" style={{ marginTop: "20px" }}>
				<div className="input-field">
					<input
						placeholder="Type link"
						id="link"
						type="text"
						name="email"
						value={link}
						onChange={(e) => setLink(e.target.value)}
						onKeyPress={pressHandler}
					/>
					<label htmlFor="link">Type link</label>
				</div>
			</div>
		</div>
	)
}
