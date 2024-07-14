import React from "react";
import FormCreateContact from "./FormCreateContact.jsx";

const EditContactModal = ({ contact }) => {
    return (
        <>
            <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#edit-contact-${contact.id}`}>
                <i className="fas fa-edit"></i>
            </button>
            <div className="modal fade" id={`edit-contact-${contact.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Editar Contacto
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <FormCreateContact
                                createContacts={"Editar"}
                                id={contact.id}
                            />
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
export default EditContactModal