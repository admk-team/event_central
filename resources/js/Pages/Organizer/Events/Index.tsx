import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Head, Link, useForm } from '@inertiajs/react';
import Layout from '../../../Layouts/Organizer';

import CreateEditModal from './Components/CreateEditModal';
import DeleteModal from '../../../Components/Common/DeleteModal';

import DataTable, { ColumnDef } from '../../../Components/DataTable';
import BreadCrumb2 from '../../../Components/Common/BreadCrumb2';
import DeleteManyModal from '../../../Components/Common/DeleteManyModal';
import HasPermission from '../../../Components/HasPermission';
import moment from 'moment';

function Index({ events, recurring_types, event_category_types }: any) {

    const [showCreateEditModal, setShowCreateEditModal] = React.useState(false);
    const [currentEvent, setCurrentEvent] = React.useState<any>(null);
    const [deleteUser, setDeleteEvent] = React.useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] = useState(false);
    const [imageHash, setImageHash] = useState(Date.now());

    console.log(events);

    const deleteForm = useForm({
        _method: 'DELETE'
    });

    const deleteManyForm = useForm<{ _method: string; ids: number[] }>({
        _method: 'DELETE',
        ids: [],
    });

    const showModal = function (event: any) {
        setCurrentEvent(event);
        setShowCreateEditModal(true);
    }

    const deleteAction = (event: any) => {
        setDeleteEvent(event);
        setShowDeleteConfirmation(true);
    }

    const handleDelete = () => {
        deleteForm.post(route('organizer.events.destroy', deleteUser.id));
        setShowDeleteConfirmation(false);
    }

    const deleteManyAction = (ids: number[]) => {
        deleteManyForm.setData(data => ({ ...data, ids: ids }));
        setShowDeleteManyConfirmation(true);
    }

    const handleDeleteMany = () => {
        deleteManyForm.delete(route('organizer.events.destroy.many'));
        setShowDeleteManyConfirmation(false);
    }

    const columns: ColumnDef<typeof events.data[0]> = [
        {
            accessorKey: 'id',
            header: () => 'ID',
            cell: (event) => event.id,
            cellClass: "fw-medium",
            enableSorting: false
        },
        {
            accessorKey: 'logo',
            header: () => 'Logo',
            cell: (event) => (
                < img className='rounded-circle' src={(event.logo ? event.logo : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3ZWN0B_Nd0Jcp3vfOCQJdwYZBNMU-dotNw&s') + "?" + imageHash} alt="event logo" height={'35px'} />
            ),
            enableSorting: false
        },
        {
            accessorKey: 'category',
            header: () => 'Category',
            cell: (event) => event.category?.name ?? '',
            enableSorting: false
        },
        {
            accessorKey: 'name',
            header: () => 'Name',
            cell: (event) => event.name,
            enableSorting: false
        },
        {
            accessorKey: 'description',
            header: () => 'Description',
            cell: (event) => event.description,
            enableSorting: false
        },
        {
            accessorKey: 'start_date',
            header: () => 'Start Date',
            cell: (event) => moment(event.start_date).format('DD MMM, YYYY'),
            enableSorting: false
        },
        {
            accessorKey: 'is_recurring',
            header: () => 'Recurring',
            cell: (event) => <div className='d-flex justify-content-center w-50'>
                {event.is_recurring && <span className="badge bg-success-subtle text-success fs-6">Yes</span>}
                {!event.is_recurring && <span className="badge bg-secondary-subtle text-secondary fs-6">No</span>}
            </div>,
            enableSorting: false
        },
        {
            accessorKey: 'recurring_frequency',
            header: () => 'R.Frequency',
            cell: (event) => event.recurring_type ? event.recurring_type.name : '',
            enableSorting: false
        },
        {
            header: () => 'Action',
            cell: (event) => (
                <div className="hstack gap-3 fs-15 ">
                    <HasPermission permission="edit_users">
                        <Link title='Click to select this Event' href={route('organizer.events.select', { 'id': event.id, 'back': false })}><i className='bx bxs-hand-up'></i></Link>
                    </HasPermission>
                    {/* <Link href={route('organizer.events.select', { 'id': event.id, 'back': false })}>Open</Link> */}
                    <HasPermission permission="edit_users">
                        <span title='Click to Edit this Event' className="link-primary cursor-pointer" onClick={() => showModal(event)}><i className="ri-edit-fill"></i></span>
                    </HasPermission>
                    <HasPermission permission="edit_users">
                        <span className="link-danger cursor-pointer" onClick={() => deleteAction(event)}>
                            <i className="ri-delete-bin-5-line"></i>
                        </span>
                    </HasPermission>
                </div>
            ),
        },
    ];

    useEffect(() => {
        setImageHash(Date.now());
        console.log('changing hash');
    }, [showCreateEditModal]);

    return (
        <React.Fragment>
            <Head title='Events' />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb2
                        title="Events"
                    />
                    <Row>
                        <Col xs={12}>
                            <DataTable
                                data={events}
                                columns={columns}
                                title="Events"
                                actions={[
                                    // Delete multiple
                                    {
                                        render: (dataTable) => (
                                            <HasPermission permission="delete_users">
                                                <Button className="btn-danger" onClick={() => deleteManyAction(dataTable.getSelectedRows().map(row => row.id))}><i className="ri-delete-bin-5-line"></i> Delete ({dataTable.getSelectedRows().length})</Button>
                                            </HasPermission>
                                        ),
                                        showOnRowSelection: true,
                                    },
                                    // Add new
                                    {
                                        render: (
                                            <HasPermission permission="create_users">
                                                <Button onClick={() => showModal(null)}><i className="ri-add-fill"></i> Add New Event</Button>
                                            </HasPermission>
                                        )
                                    },
                                ]}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>

            {showCreateEditModal && (
                <CreateEditModal
                    show={showCreateEditModal}
                    hide={() => setShowCreateEditModal(false)}
                    onHide={() => setShowCreateEditModal(false)}
                    event={currentEvent}
                    event_category_types={event_category_types}
                    recurring_types={recurring_types}
                />
            )}

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
