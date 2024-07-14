import React, { useContext, useEffect } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const Home = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.createAgenda();
        actions.getContacts();
    }, []);

    const alertDelete = (contact) => {
        Swal.fire({
            title: "Advertencia",
            text: "¿Desea eliminar el contacto?",
            position: "center",
            icon: "error",
            showDenyButton: true,
            denyButtonText: "No",
            confirmButtonText: "Si"
        }).then(click => {
            if (click.isConfirmed) {
                actions.deleteContacts(contact);
                Swal.fire('Éxito', 'El contacto se eliminó correctamente', 'success');
            } else {
                return;
            }
        });
    }

    return (
        <div className="container text-center mt-5">
            <div className="d-flex justify-content-end mb-2">
                <Link to={("/createContact")} className="btn btn-primary">
                    <i className="fas fa-plus-circle"> Agregar Nuevo Contacto</i>
                </Link>
            </div>
            {store.contacts.length > 0 ? store.contacts.map((contact) => {
                return (
                    <div className="card" key={contact.id}>
                        <div className="card-body fullCard d-flex justify-content-around">
                            <div className="col-sm d-flex justify-content-center">
                                <img
                                    src="https://previews.123rf.com/images/jemastock/jemastock1611/jemastock161104716/69134408-icono-de-perfil-de-cabeza-de-hombre-hombre-avatar-persona-y-personas-tema-dise%C3%B1o-aislado.jpg"
                                    className=""
                                    alt="..."
                                />
                            </div>
                            <div className="col-sm text-start">
                                <h5 className="card-title">{contact.name}</h5>
                                <i className="fas fa-phone me-2"></i>
                                <p className="card-text">{contact.phone}</p>
                                <i className="fas fa-at me-2"></i>
                                <p className="card-text">{contact.email}</p>
                                <i className="fas fa-map-marker-alt me-2"></i>
                                <p className="card-text">{contact.address}</p>
                            </div>
                            <div className="col-sm d-flex justify-content-end align-items-center">
                                <button
                                    className="btn btn-danger me-4"
                                    onClick={() => alertDelete(contact.id)}
                                >
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                                <Link to={(`/editContact/${contact.id}`)} className="btn btn-warning">
                                    <i className="fas fa-edit"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            }) : <h1>No hay contactos</h1>}
        </div>
    );
};