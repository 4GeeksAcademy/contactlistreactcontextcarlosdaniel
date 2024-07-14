import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import Swal from 'sweetalert2'
import { useNavigate, useParams } from "react-router-dom";
const FormCreateContact = ({ createContacts, editContacts, id }) => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    const [contact, setContact] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
    })

    function handleChange(event) {
        setContact({ ...contact, [event.target.name]: event.target.value })
    }
    async function handleSubmit(event) {
        event.preventDefault();
        if (contact.name == "" || contact.email == "" || contact.phone == "" || contact.address == "") {
            Swal.fire('Advertencia', 'Todos los campos son requeridos', 'info')
            return
        }
        if (id) {
            const response = await actions.editContacts(id, contact);
            if (response) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Contacto Editado",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/")
            }

        } else {
            const response = await actions.addContacts(contact)
            if (response) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Contacto Creado",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/");
                return
            }

            Swal.fire({
                position: "center",
                icon: "error",
                title: "A ocurrido un error",
                showConfirmButton: false,
                timer: 1000
            });
        }
    }
    useEffect(() => {
        if (id && store.contacts.length > 0) {
            const edit = store.contacts.find((item) => item.id == id)
            if (!edit) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "A ocurrido un error",
                    showConfirmButton: false,
                    timer: 1000
                });
                navigate("/");
                return
            }
            setContact(edit);
        }
    }, [id, store.contacts])
    return (
        <form className="card-body d-flex flex-column gap-2" onSubmit={handleSubmit}>
            <div>
                <label className="mb-2">
                    Name
                </label>
                <input className="form-control"
                    name="name"
                    value={contact.name}
                    onChange={(event) => handleChange(event)}
                    placeholder="Full Name"
                />
            </div>
            <div>
                <label className="mb-2">
                    Phone
                </label>
                <input
                    name="phone"
                    value={contact.phone}
                    onChange={(event) => handleChange(event)}
                    className="form-control" placeholder="Enter Phone"
                />
            </div>
            <div>
                <label className="mb-2">
                    Email
                </label>
                <input
                    name="email"
                    value={contact.email}
                    onChange={(event) => handleChange(event)}
                    className="form-control" placeholder="Enter Email"
                />
            </div>
            <div>
                <label className="mb-2">
                    Address
                </label>
                <input
                    name="address"
                    value={contact.address}
                    onChange={(event) => handleChange(event)}
                    className="form-control" placeholder="Enter Address"
                />
            </div>
            <button className="btn btn-primary">
                {createContacts} {editContacts}
            </button>
        </form>
    )
}
export default FormCreateContact