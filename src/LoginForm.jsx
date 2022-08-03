import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client/react";

import { LOGIN } from "./login/graphql-queries";

const LoginForm = ({ notifyError, setToken }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [login, result] = useMutation(LOGIN, {
		onError: (error) => {
			notifyError(error.graphQLErrors[0].message);
		},
	});

	useEffect(() => {
		if (result.data) {
			const { value: token } = result.data.login;
			setToken(token);
			localStorage.setItem("phonenumbers-user-token", token);
		}
	}, [result.data]);

	const handleSubmit = (event) => {
		event.preventDefault();
		login({ variables: { username, password } });
	};

	return (
		<div
			style={{
				width: "50vw",
				height: "20vh",
			}}
		>
			<h3>User login</h3>

			<div>
				<form onSubmit={handleSubmit}>
					<div>
						<input
							placeholder="username"
							value={username}
							onChange={({ target }) => setUsername(target.value)}
						/>
					</div>
					<div>
						<input
							placeholder="password"
							type="password"
							value={password}
							onChange={({ target }) => setPassword(target.value)}
						/>
					</div>
					<button type="submit">Login</button>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
