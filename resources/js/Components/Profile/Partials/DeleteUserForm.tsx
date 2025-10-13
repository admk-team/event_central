import React, { useRef, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button, Card, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { useLaravelReactI18n } from "laravel-react-i18n";

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState<boolean>(false);
    const passwordInput: any = useRef();
    const { t } = useLaravelReactI18n();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e: any) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <React.Fragment>
            <Row>
                <Col lg={12}>
                    <h2 >{t("Delete Account")}</h2>
                    <Card>
                        <p className="text-muted p-2">
                           {t("Delete Account Info")}
                        </p>
                        <Col lg={6}>
                            <Button variant="danger" onClick={confirmUserDeletion} type='submit' className='btn btn-danger mb-3 ms-3'>{t("Delete Account")}</Button>
                        </Col>
                    </Card>
                </Col>
            </Row >

            <Modal show={confirmingUserDeletion} onHide={closeModal} centered>
                <Modal.Header className="bg-light p-3" closeButton>
                    <h5 className='modal-title'>
                        {t("Confirm Delete Title")}
                    </h5>


                </Modal.Header>
                <Form onSubmit={deleteUser} className="p-6">
                    <Modal.Body>
                        <div className="mt-6">
                            <p className="mt-1 ">
                                {t("Confirm Delete Info")}
                            </p>
                            <Form.Label htmlFor="password" value="Password" className="sr-only" />

                            <Form.Control
                                id="password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e: any) => setData('password', e.target.value)}
                                className="mt-1 block w-3/4"
                                autoFocus
                                placeholder={t("Password")}
                            />
                            <Form.Control.Feedback type="invalid" className='d-block'> {errors.password} </Form.Control.Feedback>
                        </div>
                    </Modal.Body>
                    <div className="mt-6 flex justify-end mb-4">
                        <Button variant='light' onClick={closeModal} className='btn ms-2' type='submit'>{t("Cancel")}</Button>

                        <Button variant='danger' className="btn ml-3 ms-3" disabled={processing} type='submit'>
                            {t("Delete Account")}
                        </Button>
                    </div>
                </Form>
            </Modal>

        </React.Fragment >
    );
}
