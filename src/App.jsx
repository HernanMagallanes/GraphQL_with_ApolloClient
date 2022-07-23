import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { Persons } from "./Persons";
import { PersonForm } from "./PersonForm";
import { usePersons } from "./persons/custom-hooks";
import { Notify } from "./Notify";

function App() {
	const { data, loading, error } = usePersons();
	const [errorMessage, setErrorMessage] = useState(null);

	if (error) return <span style="color:red">{error}</span>;

	const notifyError = (message) => {
		setErrorMessage(message);
		setTimeout(() => setErrorMessage(null), 5000);
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
				<PersonForm notifyError={notifyError} />
			</header>
		</div>
	);
}

export default App;
