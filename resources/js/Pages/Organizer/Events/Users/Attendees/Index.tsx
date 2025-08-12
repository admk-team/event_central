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
import ImportFromEvent from './Component/ImportFromEvent';
import HasPermission from '../../../../../Components/HasPermission';
import { Check, CircleCheck, CircleX } from 'lucide-react';
import EventCheckinButton from './Component/EventCheckinButton';
import AssignTicketButton from './Component/AssignTicketButton';
import axios from 'axios';

function Index({ attendees, eventList }: any) {

    const [deleteAttendee, setDeleteAttendee] = React.useState<any>(null);
    const [updateAttendee, setUpdateAttendee] = React.useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowEddModal] = useState(false);
    const [showImportAttendeeModal, setShowImportAttendeeModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const { get } = useForm()


    const deleteForm = useForm({
        _method: 'DELETE'
    });
    const chatForm = useForm({
        _method: 'POST'
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

    const initiateChat = (attendee: any) => {
        chatForm.post(route('organizer.events.attendee.chat.initiate', attendee.id));
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
            headerStyle: { width: '70px' },
            cell: (attendee) => attendee.id,
            cellClass: "fw-medium"
        },
        {
            header: () => 'Avatar',
            headerStyle: { width: '90px' },
            cell: (attendee) => (
                <img src={attendee.avatar_img} alt={attendee.name} width="50" height="50" className="rounded-circle" />
            ),
        },
        {
            accessorKey: 'first_name',
            header: () => 'First Name',
            headerStyle: { width: '100px', textWrap: 'wrap' },
            cell: (attendee) => attendee.first_name,
            cellStyle: { width: '100px', textWrap: 'wrap' },
            searchable: true,
        },
        {
            accessorKey: 'last_name',
            header: () => 'Last Name',
            headerStyle: { width: '100px', textWrap: 'wrap' },
            cell: (attendee) => attendee.last_name,
            cellStyle: { width: '100px', textWrap: 'wrap' },
            searchable: true,
        },
        {
            accessorKey: 'email',
            header: () => 'Email',
            headerStyle: { width: '150px', textWrap: 'wrap' },
            cell: (attendee) => attendee.email,
            cellStyle: { width: '150px', textWrap: 'wrap' },
            searchable: true,
        },
        // {
        //     header: () => 'Event Pass',
        //     cell: (attendee) => attendee.event_pass,
        // },
        // {
        //     header: () => 'Company',
        //     cell: (attendee) => attendee.company,
        // },
        {
            header: () => 'Position',
            headerStyle: { width: '200px', textWrap: 'wrap' },
            cell: (attendee) => attendee.position,
            cellStyle: { width: '200px', textWrap: 'wrap' },
        },
        // {
        //     header: () => 'Phone',
        //     cell: (attendee) => attendee.phone,
        // },
        {
            header: () => 'Checked In',
            headerStyle: { width: '100px', textWrap: 'wrap' },
            cell: (attendee) => attendee.event_checkin ? <CircleCheck color='green' /> : <CircleX color='red' />,
            cellClass: 'ps-4',
            cellStyle: { width: '100px', textWrap: 'wrap' },
        },
        {
            header: () => "Actions",
            cell: (attendee) => (
                <div className="hstack gap-4 fs-15 text-center">
                    <HasPermission permission="scan_events">
                        <EventCheckinButton attendee={attendee} />
                    </HasPermission>
                    {/* <AssignTicketButton attendee={attendee} /> */}
                    <Link title='View attendee details' href={route('organizer.events.attendee.info', { id: attendee.id })} className="link-primary cursor-pointer"><i className="ri-eye-fill"></i></Link>
                    <Link title='View QR Code attendee' href={route('organizer.events.attendee.qrcode', { id: attendee.id })} className="link-primary cursor-pointer"><i className="ri-qr-code-line"></i></Link>
                    <Link title='Purchase ticket for this attendee' href={route('organizer.events.attendee.tickets.assign', attendee.id)} className="link-primary cursor-pointer">
                        <i className="bx bxs-coupon"></i>
                    </Link>
                    <a className="link-primary cursor-pointer" onClick={() => editAction(attendee)} ><i className="ri-edit-fill"></i></a>
                    <a className="link-primary cursor-pointer" onClick={() => initiateChat(attendee)}><i className="bx bx-message-rounded-dots"></i></a>
                    <a className="link-red cursor-pointer" onClick={() => deleteAction(attendee)}>
                        <i className="ri-delete-bin-5-line"></i>
                    </a>
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
                                    tableLayoutFixed={true}
                                    searchCombinations={[['first_name', 'last_name']]}
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
                                        {
                                            render: (
                                                <HasPermission permission="create_attendees">
                                                    <Button onClick={() => setShowEddModal(true)}><i className="ri-add-fill"></i> Add New</Button>
                                                </HasPermission>
                                            )
                                        },
                                        {
                                            render: (
                                                <HasPermission permission="create_attendees">
                                                    <Button onClick={() => setShowImportAttendeeModal(true)}><i className="ri-add-fill"></i> Import From Event</Button>
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

            <ImportFromEvent
                show={showImportAttendeeModal}
                eventList={eventList}
                handleClose={() => setShowImportAttendeeModal(false)}
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

            <ImportModal importAttendeesModal={importAttendeesModal} availableAttributes={['first_name', 'last_name', 'email', 'phone', 'position', 'location']} importType='attendees' showModal={showImportModal} />

        </React.Fragment>
    )
}

Index.layout = (page: any) => <Layout children={page} />;

export default Index;
