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
// import Profile from './AttendeeProfile/Profile';
import AddAttendee from './Component/AddAttendee';
import HasPermission from '../../../../../Components/HasPermission';

function Index({ attendees }: any) {

    const [deleteAttendee, setDeleteAttendee] = React.useState<any>(null);
    const [updateAttendee, setUpdateAttendee] = React.useState<any>(null);
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
    function showImportModal() {
        setImportAttendeesModal(!importAttendeesModal);
    }

    const editAction = (attendee: any) => {
        setUpdateAttendee(attendee);
        setShowEditModal(true);
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

    // const exportSchema: any = [
    //     {
    //         column: 'Name',
    //         type: String,
    //         value: attendee => attendee.first_name
    //     },
    //     {
    //         column: 'Email',
    //         type: String,
    //         value: attendee => attendee.email
    //     },
    //     {
    //         column: 'Phone',
    //         type: String,
    //         value: attendee => attendee.email
    //     }
    // ];

    // const handleExport = async () => {
    //     // console.log(attendees.data);
    //     // let list: any = [];
    //     // attendees.data.forEach((obj) => {
    //     //     var result = Object.keys(obj).map((key) => [key, obj[key]]);
    //     //     list.push(result);
    //     // });
    //     // console.log(list);
    //     await writeXlsxFile(attendees.data, {
    //         exportSchema,
    //         fileName: 'file.xlsx'
    //     });
    // }
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
            header: () => 'First Name',
            cell: (attendee) => attendee.first_name,
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
            header: () => 'Actions',
            cell: (attendee) => (
                <div className="hstack gap-3 fs-15">
                    <HasPermission permission="edit_attendees">
                        <span className="link-primary cursor-pointer" onClick={() => editAction(attendee)} ><i className="ri-edit-fill"></i></span>
                    </HasPermission>
                    <HasPermission permission="delete_attendees">
                        <span className="link-danger cursor-pointer" onClick={() => deleteAction(attendee)}>
                            <i className="ri-delete-bin-5-line"></i>
                        </span>
                    </HasPermission>
                    <HasPermission permission="view_attendees">
                        <Link href={route('organizer.events.attendee.info', { id: attendee.id })} className="link-primary cursor-pointer"><i className="ri-information-line"></i></Link>
                    </HasPermission>
                </div>
            ),
        },
    ];


    return (
        <React.Fragment>
            <Head>
                <title>Attendees Management </title>
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
                            <HasPermission permission="view_attendees">
                                <DataTable
                                    data={attendees}
                                    columns={columns}
                                    title="Attendees"
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

                                        // import Attendees
                                        {
                                            render: (
                                                <HasPermission permission="create_attendees">
                                                    <Button className='btn btn-outline-primary' onClick={() => showImportModal()}><i className="ri-login-box-line"></i> Import</Button>
                                                </HasPermission>
                                            )
                                        },
                                        // // Export Attendees
                                        // {
                                        //     render: <Button className='btn btn-outline-primary' onClick={handleExport}><i className="ri-login-box-line"></i> Export</Button>
                                        // },
                                        // Add new Attendee
                                        {
                                            render: (
                                                <HasPermission permission="create_attendees">
                                                    <Button onClick={() => setShowEddModal(true)}><i className="ri-add-fill"></i> Add New</Button>
                                                </HasPermission>
                                            )
                                        },
                                    ]}
                                />
                            </HasPermission>
                        </Col>
                    </Row>
                </Container>
            </div>

            <AddAttendee
                show={showAddModal}
                handleClose={() => setShowEddModal(false)}
            />

            <EditAttendee
                show={showEditModal}
                handleClose={() => setShowEditModal(false)}
                user={updateAttendee}
                isEdit={isEdit}
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

            <ImportModal importAttendeesModal={importAttendeesModal} availableAttributes={['name', 'email', 'phone']} importType='attendees' showModal={showImportModal} />

        </React.Fragment>
    )
}

Index.layout = (page: any) => <Layout children={page} />;

export default Index;
