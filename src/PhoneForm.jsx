import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { EDIT_NUMBER } from "./persons/graphql-mutations";

export const PhoneForm = () => {
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");

	// const [createPerson] = useMutation(CREATE_PERSON, {
	// 	refetchQueries: [{ query: ALL_PERSONS }],
	// 	onError: (error) => {
	// 		notifyError(error.graphQLErrors[0].message);
	// 	},
	// });

	const [changeNumber] = useMutation(EDIT_NUMBER);

	const handleSubmit = (e) => {
		e.preventDefault();

		changeNumber({ variables: { name, phone } });

		setName("");
		setPhone("");
	};

	return (
		<div>
			<h2>Edit phone number</h2>
			<form onSubmit={handleSubmit}>
				<input
					placeholder="Name"
					value={name}
					onChange={(evt) => setName(evt.target.value)}
				/>

				<input
					placeholder="Phone"
					value={phone}
					onChange={(evt) => setPhone(evt.target.value)}
				/>

				<button>Change Phone</button>
			</form>
		</div>
	);
};
