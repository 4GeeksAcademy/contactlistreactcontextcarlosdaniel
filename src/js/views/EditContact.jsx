import React from "react";
import FormCreateContact from '../component/FormCreateContact.jsx';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
const EditContact = () => {
    const {contactId} = useParams();  
    console.log(contactId);


    return (
        <>
            <div className="mb-3">
                <h1 className="text-center">
                    Editar contacto
                </h1>
            </div>
            <div className="d-flex justify-content-center align-items-center">
                <div className="card w-75">

                    <FormCreateContact editContacts={"Save"} 
                        id= {contactId}
                        />
                </div>
            </div>
            <div>
                <Link to="/">
                    <h3 className="text-center">
                        or get back to contacts
                    </h3>
                </Link>
            </div>
        </>

    )
}
export default EditContact