import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import { gql, useQuery } from "@apollo/client";
import { Persons } from "./Persons";
import { PersonForm } from "./PersonForm";

export const ALL_PERSONS = gql`
	query {
		allPersons {
			id
			name
			phone
			address {
				street
				city
			}
		}
	}
`;

function App() {
	const { data, error, loading } = useQuery(ALL_PERSONS);

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
