import { Link, useForm } from '@inertiajs/react'
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function CancelTicketButton({ purchased_id }: { purchased_id: any }) {
    const { post, processing } = useForm();
    console.log('tsting attend data', purchased_id);

    const submit = () => {
        post(route('attendee.tickets.cancel', purchased_id), {
            preserveScroll: true,
            preserveState: true
        });
    }
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        // <Button size="sm" variant="secondary" onClick={submit} disabled={processing}>Cancel Ticket </Button>
        <>
            <Button variant="secondary" onClick={handleShow}>
                Cancel Ticket
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>You Are Sure!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to cancel this ticket?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        submit();
                        handleClose();
                    }} disabled={processing}>
                        Cancel Anyway
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        <Link className='text-white' href={route('attendee.tickets.refund')}>Refund</Link>
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
