import React, { useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Head, Link, router, useForm } from '@inertiajs/react';
import BreadCrumb from '../../../../../Components/Common/BreadCrumb';
import Layout from '../../../../../Layouts/Event';
// import Pagination2 from '../../../Pages/Admin/';
import DeleteModal from '../../../../../Components/Common/DeleteModal';
import DataTable, { ColumnDef } from '../../../../../Components/DataTable';
import DeleteManyModal from '../../../../../Components/Common/DeleteManyModal';
import ImportModal from '../../Components/ImportModal';
import EditAttendee from './Component/EditAttendee';
import Profile from './AttendeeProfile/Profile';
import AddAttendee from './Component/AddAttendee';

function Index({ attendees }: any) {

    const [deleteAttendee, setDeleteAttendee] = React.useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowEddModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const { get } = useForm()


    const deleteForm = useForm({
        _method: 'DELETE'
    });
    const deleteManyForm = useForm<{ _method: string; ids: number[] }>({
        _method: 'DELETE',
        ids: [],
    });

    const [importAttendeesModal, setImportAttendeesModal] = useState(false);
    function showModal() {
        setImportAttendeesModal(!importAttendeesModal);
    }

    const editAction = (attendee: any) => {
        get(route('organizer.events.attendees.edit', attendee))
    }
    const deleteAction = (attendee: any) => {
        setDeleteAttendee(attendee);
        setShowDeleteConfirmation(true);
    }
    const handleDelete = () => {

        deleteForm.post(route('organizer.events.attendees.destroy', deleteAttendee.id));
        setShowDeleteConfirmation(false);
    }
    const deleteManyAction = (ids: number[]) => {
        deleteManyForm.setData(data => ({ ...data, ids: ids }));
        setShowDeleteManyConfirmation(true);
    }
    const handleDeleteMany = () => {
        deleteManyForm.delete(route('organizer.events.attendees.destroy.many'));
        setShowDeleteManyConfirmation(false);
    }

    const columns: ColumnDef<typeof attendees.data[0]> = [
        {
            header: () => 'ID',
            cell: (attendee) => attendee.id,
            cellClass: "fw-medium"
        },
        {
            header: () => 'Avatar',
            cell: (attendee) => (
                <img src={attendee.avatar_img} alt={attendee.name} width="50" height="50" className="rounded-circle" />
            ),
        },
        {
            header: () => 'QR Code',
            cell: (attendee) => (
                <img src={attendee.qr_code_img} alt="qr_code" width="50" height="50" />
            ),
        },
        {
            header: () => 'Name',
            cell: (attendee) => attendee.first_name + " " + attendee.last_name,
        },
        {
            header: () => 'Email',
            cell: (attendee) => attendee.email,
        },
        {
            header: () => 'Event Pass',
            cell: (attendee) => attendee.event_pass,
        },
        {
            header: () => 'Phone',
            cell: (attendee) => attendee.phone,
        },
        {
            header: () => 'Action',
            cell: (attendee) => (
                <div className="hstack gap-3 fs-15">
                    <span className="link-primary cursor-pointer" onClick={() => setShowEditModal(true)} ><i className="ri-edit-fill"></i></span>
                    <EditAttendee 
                        show={showEditModal} 
                        handleClose={() => setShowEditModal(false)} 
                        user={attendee}
                        isEdit={isEdit}
                    />
                    <span className="link-danger cursor-pointer" onClick={() => deleteAction(attendee)}>
                        <i className="ri-delete-bin-5-line"></i>
                    </span>
                    <Link href={route('organizer.events.attendee.info', { id: attendee.id })} className="link-primary cursor-pointer"><i className="ri-information-line"></i></Link>
                </div>
            ),
        },
    ];


    return (
        <React.Fragment>
            <Head>
                <title>Attendees Management | Organizer Dashboard</title>
                <meta name="description" content="Manage event attendees, edit details, and delete records from the organizer's dashboard." />
                <meta name="keywords" content="event attendees, attendee management, conference attendees, admin dashboard" />
                <meta name="robots" content="index, follow" />

                {/* Open Graph Meta Tags */}
                <meta property="og:title" content="attendees Management | Organizer Dashboard" />
                <meta property="og:description" content="Manage event attendees, edit details, and delete records from the organizer's dashboard." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={route('organizer.events.attendees.index')} />
            </Head>

            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Attendees" pageTitle="Dashboard" />
                    <Row>
                        <Col xs={12}>
                            <DataTable
                                data={attendees}
                                columns={columns}
                                title="Attendees"
                                actions={[
                                    // Delete multiple
                                    {
                                        render: (dataTable) => <Button className="btn-danger" onClick={() => deleteManyAction(dataTable.getSelectedRows().map(row => row.id))}><i className="ri-delete-bin-5-line"></i> Delete ({dataTable.getSelectedRows().length})</Button>,
                                        showOnRowSelection: true,
                                    },

                                    // import events
                                    {
                                        render: <Button className='btn btn-outline-primary' onClick={() => showModal()}><i className="ri-login-box-line"></i> Import</Button>
                                    },
                                    // Add new
                                    {
                                        render: <Button onClick={()=> setShowEddModal(true)}><i className="ri-add-fill"></i> Add New</Button>
                                    },
                                   

                                ]}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>

            <AddAttendee
                show={showAddModal} 
                handleClose={() => setShowEddModal(false)} 
            />
            
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

            <ImportModal importAttendeesModal={importAttendeesModal} availableAttributes={['name','email','phone']} importType='attendees' showModal={showModal} />

        </React.Fragment>
    )
}

Index.layout = (page: any) => <Layout children={page} />;

export default Index;
