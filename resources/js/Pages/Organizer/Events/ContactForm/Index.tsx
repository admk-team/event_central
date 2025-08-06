import React, { useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Head, Link, router, useForm } from '@inertiajs/react';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import Layout from '../../../../Layouts/Event';
import DeleteModal from '../../../../Components/Common/DeleteModal';
import DataTable, { ColumnDef } from '../../../../Components/DataTable';
import DeleteManyModal from '../../../../Components/Common/DeleteManyModal';
import HasPermission from '../../../../Components/HasPermission';
import { Check, CircleCheck, CircleX } from 'lucide-react';

function Index({ contactForm }: any) {

    const [deleteContactForm, setDeleteContactForm] = React.useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] = useState(false);


    const deleteForm = useForm({
        _method: 'DELETE'
    });
    const deleteManyForm = useForm<{ _method: string; ids: number[] }>({
        _method: 'DELETE',
        ids: [],
    });


    const deleteAction = (contactForm: any) => {
        setDeleteContactForm(contactForm);
        setShowDeleteConfirmation(true);
    }
    const handleDelete = () => {
        deleteForm.post(route('organizer.events.contact-forms.destroy', {id: deleteContactForm.id}));
        setShowDeleteConfirmation(false);
    }
    const deleteManyAction = (ids: number[]) => {
        deleteManyForm.setData(data => ({ ...data, ids: ids }));
        setShowDeleteManyConfirmation(true);
    }
    const handleDeleteMany = () => {
        deleteManyForm.delete(route('organizer.events.contact-forms.destroy.many'));
        setShowDeleteManyConfirmation(false);
    }

  
    const columns: ColumnDef<typeof contactForm.data[0]> = [
        {
            header: () => 'ID',
            headerStyle: { width: '200px' },
            cell: (contactForm) => contactForm.id,
        },
        {
            header: () => 'Name',
            headerStyle: { width: '200px', textWrap: 'wrap' },
            cell: (contactForm) => contactForm.attendee.first_name + " " +contactForm.attendee.last_name,
            cellStyle: { width: '200px', textWrap: 'wrap' },
        },
        {
            header: () => 'Email',
            headerStyle: { width: '200px', textWrap: 'wrap' },
            cell: (contactForm) => contactForm.attendee.email,
            cellStyle: { width: '200px', textWrap: 'wrap' },
        },
        {
            header: () => 'Subject',
            headerStyle: { width: '200px', textWrap: 'wrap' },
            cell: (contactForm) => contactForm.subject,
            cellStyle: { width: '200px', textWrap: 'wrap' },
        },
        {
            header: () => 'Contant',
            headerStyle: { width: '200px', textWrap: 'wrap' },
            cell: (contactForm) => contactForm.content,
            cellStyle: { width: '200px', textWrap: 'wrap' },
        },
        {
            header: () => "Actions",
            cell: (contactForm) => (
                <div className="hstack gap-4 fs-15 text-center">
                    <a className="link-red cursor-pointer" onClick={() => deleteAction(contactForm)}>
                        <i className="ri-delete-bin-5-line"></i>
                    </a>
                </div>
            ),
        },
    ];


    return (
        <React.Fragment>
            <Head>
                <title>Contact Forms</title>
                <meta name="description" content="Manage event Contact Form records from the organizer's dashboard." />
                <meta name="keywords" content="event attendees, attendee management, conference attendees, admin dashboard" />
                <meta name="robots" content="index, follow" />

                {/* Open Graph Meta Tags */}
                <meta property="og:title" content="Contact Form Management | Organizer Dashboard" />
                <meta property="og:description" content="Manage event Contact Form, delete records from the organizer's dashboard." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={route('organizer.events.contact-forms.index')} />
            </Head>

            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Contact Form" pageTitle="Dashboard" />
                    <Row>
                        <Col xs={12}>
                            <HasPermission permission="view_contact_form">
                                <DataTable
                                    data={contactForm}
                                    columns={columns}
                                    title="Contact Forms"
                                    actions={[
                                        // Delete multiple
                                        {
                                            render: (dataTable) => (
                                                <HasPermission permission="delete_attendees">
                                                    <Button className="btn-danger" onClick={() => deleteManyAction(dataTable.getSelectedRows().map(row => row.id))}><i className="ri-delete-bin-5-line"></i> Delete ({dataTable.getSelectedRows().length})</Button>
                                                </HasPermission>
                                            ),
                                            showOnRowSelection: true,
                                        },
                                    ]}
                                />
                            </HasPermission>
                        </Col>
                    </Row>
                </Container>
            </div>


            <DeleteModal
                show={showDeleteConfirmation}
                onDeleteClick={handleDelete}
                onCloseClick={() => { setShowDeleteConfirmation(false) }}
            />

            <DeleteManyModal
                show={showDeleteManyConfirmation}
                onDeleteClick={handleDeleteMany}
                onCloseClick={() => { setShowDeleteManyConfirmation(false) }}
            />

        </React.Fragment>
    )
}

Index.layout = (page: any) => <Layout children={page} />;

export default Index;
