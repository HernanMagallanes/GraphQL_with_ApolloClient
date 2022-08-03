import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";

import { EDIT_NUMBER } from "./persons/graphql-mutations";

export const PhoneForm = ({ notifyError }) => {
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");

	const [changeNumber, result] = useMutation(EDIT_NUMBER);

	useEffect(() => {
		if (result.data && result.data.editNumber === null) {
			console.error("Person not found");
			notifyError("Person not found");
		}
	}, [result.data]);

	const handleSubmit = (e) => {
		e.preventDefault();

		changeNumber({ variables: { name, phone } });

		setName("");
		setPhone("");
	};

	return (
		<div
			style={{
				width: "50vw",
				height: "20vh",
			}}
		>
			<h3>Edit phone number</h3>
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
