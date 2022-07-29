import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { Persons } from "./Persons";
import { PersonForm } from "./PersonForm";
import { usePersons } from "./persons/custom-hooks";
import { Notify } from "./Notify";
import { PhoneForm } from "./PhoneForm";
import LoginForm from "./LoginForm";
// import { ALL_PERSONS } from "./persons/graphql-queries";

import { useApolloClient } from "@apollo/client/react";

function App() {
	const { data, loading, error } = usePersons();
	const [errorMessage, setErrorMessage] = useState(null);
	const [token, setToken] = useState(() => {
		localStorage.getItem("phonenumbers-user-token");
	});

	const client = useApolloClient();

	if (error) return <span style="color:red">{error}</span>;

	const notifyError = (message) => {
		setErrorMessage(message);
		setTimeout(() => setErrorMessage(null), 5000);
	};

	const logout = () => {
		setToken(null);
		localStorage.clear();
		client.clearStore();
	};

	return (
		<div className="App">
			<Notify errorMessage={errorMessage} />

			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />

				<h1>GraphQL + React !</h1>

				{loading ? (
					<p>Loading ...</p>
				) : (
					<Persons persons={data?.allPersons}></Persons>
				)}

				{token ? (
					<button onClick={logout}> Logout </button>
				) : (
					<LoginForm notifyError={notifyError} setToken={setToken} />
				)}

				<PersonForm notifyError={notifyError} />
				<PhoneForm notifyError={notifyError} />
			</header>
		</div>
	);
}

export default App;
