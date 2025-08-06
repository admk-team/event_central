import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { useForm } from "@inertiajs/react"; // or '@inertiajs/react' based on your setup
import axios from 'axios';

const TicketAddonsModal = ({ show, onHide, puchasedTicketId }: any) => {

    const [addons, setAddons] = useState([]);
    const [fetchingAddons, setFetchingAddons] = useState(false);

    useEffect(() => {
        if (puchasedTicketId) {
            setFetchingAddons(true);
            axios.get('/organizer/events/get-attendee-puchased-addons/' + puchasedTicketId).then((response) => {
                console.log(response);
                setAddons(response.data.addons);
            }).catch((error) => {
                console.error(error);
            }).finally(() => {
                setFetchingAddons(false);
            })
        }
    }, [puchasedTicketId])

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton >
                <Modal.Title>Puchased Addons</Modal.Title>
            </Modal.Header>
            <hr className='mb-0' />
            <Modal.Body>
                <div className="">
                    {!fetchingAddons && addons && addons.map((addon, index) => (
                        <div className="mb-3" key={index}>
                            <p className='m-2'>{(index + 1) + ". " + addon.full_name}</p>
                            <div className="ps-4">
                                {Object.entries<[string, string]>(addon.attributes ?? {}).map(([attribute, value]) => (
                                    <div key={attribute}><b>{attribute}: </b>{value}</div>
                                ))}
                            </div>
                        </div>
                    ))}
                    {fetchingAddons && <div className='d-flex w-100 h-100 justify-content-center'>
                        <Spinner
                            animation="border"
                            role="status"
                        >
                            <span className="visually-hidden">
                                Loading...
                            </span>
                        </Spinner>
                    </div>}
                </div>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button variant="light" onClick={onHide}>Close</Button>
            </Modal.Footer> */}
        </Modal>
    );
};

export default TicketAddonsModal;
