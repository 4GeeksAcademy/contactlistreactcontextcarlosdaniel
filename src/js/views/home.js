import React, { useContext, useEffect } from "react";
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
                    <div className="card mb-3" key={contact.id}>
                        <div className="row g-0">
                            <div className="col-md-2">
                                <div className="d-flex align-items-center justify-content-center" style={{ height: "100%" }}>
                                    <div className="text-center">
                                        Aquí irá la foto del contacto
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-10">
                                <div className="card-body">
                                    <h5 className="card-title">{contact.name}</h5>
                                    <p className="card-text">
                                        <i className="fas fa-phone me-2"></i>
                                        {contact.phone}
                                    </p>
                                    <p className="card-text">
                                        <i className="fas fa-at me-2"></i>
                                        {contact.email}
                                    </p>
                                    <p className="card-text">
                                        <i className="fas fa-map-marker-alt me-2"></i>
                                        {contact.address}
                                    </p>
                                    <div className="d-flex justify-content-end">
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
                        </div>
                    </div>
                );
            }) : <h1>No hay contactos</h1>}
        </div>
    );
};
