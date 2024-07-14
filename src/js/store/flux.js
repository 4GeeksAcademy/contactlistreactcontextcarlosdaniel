import Swal from "sweetalert2";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [],
		},
		actions: {
			// Use getActions to call a function within a function
			getContacts: async () => {
				const store = getStore();
				const action = getActions();
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/carlosdaniel236")
					const data = await response.json();
					if (response.ok) {
						setStore({ contacts: data.contacts });
					} else if (response.status == 404) {
						action.createAgenda();
					}
				} catch (error) {
					console.log(error);
				}
			},

			createAgenda: async () => {
				const store = getStore();
				const action = getActions();
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/carlosdaniel236", {
						method: "POST",
						headers: {
							'Content-type': 'application/json'
						}
					});
					if (response.ok) {
						Swal.fire('Agenda creada', '', 'success')
						action.getContacts();
					}
					
				} catch (error) {
					console.log(error);
				}
			},

			addContacts: async (contact) => {
				const store = getStore();
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/carlosdaniel236/contacts", {
						method: "POST",
						body: JSON.stringify({
							...contact
						}),
						headers: {
							'Content-type': 'application/json'
						}
					});
					if (response.ok) {
						const data = await response.json();
						setStore({ contacts: [...store.contacts, data] });
						return true;
					}
				} catch (error) {
					return false;
				}
			},

			editContacts: async (id, contact) => {
				const action = getActions();
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/carlosdaniel236/contacts" + `/${id}`, {
						method: "PUT",
						body: JSON.stringify(contact),
						headers: {
							'Content-type': 'application/json'
						},
					});
					const data = await response.json();
					if (response.ok) {
						action.getContacts();
						return true;
					}
				} catch (error) {
					console.log(error);
					return false;
				}
			},

			deleteContacts: async (id) => {
				try {
					const store = getStore();
					
					const response = await fetch("https://playground.4geeks.com/contact/agendas/carlosdaniel236/contacts" + `/${id}`, {
						method: "DELETE",
					});
					if (!response.ok) {
						alert("No se puede borrar :(");
					} else {
						const filteredContacts = store.contacts.filter((contact) => contact.id !== id);
						setStore({ contacts: filteredContacts });
					}
				} catch (error) {
					console.log(error);
				}
			},
		}
	};
};

export default getState;
