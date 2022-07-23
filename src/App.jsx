import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { Persons } from "./Persons";
import { PersonForm } from "./PersonForm";
import { usePersons } from "./persons/custom-hooks";

function App() {
	const { data, loading, error } = usePersons();

	if (error) return <span style="color:red">{error}</span>;

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />

				<h1>GraphQL + React !</h1>

				{loading ? (
					<p>Loading ...</p>
				) : (
					<Persons persons={data?.allPersons}></Persons>
				)}
				<PersonForm />
			</header>
		</div>
	);
}

export default App;
