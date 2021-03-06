import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"

import useHttp from "../hooks/http.hook"
import useMessage from "../hooks/message.hook"

export default function AuthPage() {
	const auth = useContext(AuthContext)
	const { loading, request, error, clearError } = useHttp()
	const message = useMessage()
	const [form, setForm] = useState({ email: "", password: "" })

	useEffect(() => {
		message(error)
		clearError()
	}, [error, message, clearError])

	useEffect(() => {
		window.M.updateTextFields()
	}, [])

	const changeHandler = (event) => {
		setForm({ ...form, [event.target.name]: event.target.value })
	}

	const signupHandler = async () => {
		try {
			const data = await request("api/auth/signup", "POST", { ...form })
			message(data.message)
		} catch (error) {}
	}

	const loginHandler = async () => {
		try {
			const data = await request("api/auth/login", "POST", { ...form })
			auth.login(data.token, data.userId)
		} catch (error) {}
	}

	return (
		<div className="row">
			<div className="col s6 offset-s3">
				<h1>Сократи ссылку</h1>
				<div className="card blue darken-1">
					<div className="card-content white-text">
						<span className="card-title">Authentication</span>
						<div>
							<div className="input-field">
								<input
									placeholder="Type email"
									id="email"
									type="text"
									name="email"
									className="yellow-input"
									value={form.email}
									onChange={changeHandler}
								/>
								<label htmlFor="email">E-mail</label>
							</div>
							<div className="input-field">
								<input
									placeholder="Type password"
									id="password"
									type="password"
									name="password"
									className="yellow-input"
									value={form.password}
									onChange={changeHandler}
								/>
								<label htmlFor="password">Password</label>
							</div>
						</div>
					</div>
					<div className="card-action">
						<button
							className="btn yellow darken-4"
							style={{ marginRight: "10px" }}
							onClick={loginHandler}
							disabled={loading}
						>
							Log in
						</button>
						<button className="btn grey lighten-1 black-text" onClick={signupHandler} disabled={loading}>
							Sign up
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
