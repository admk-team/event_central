
import { Button, Col, Container, Row } from 'react-bootstrap';
import Layout from '../../../../Layouts/Event';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import DataTable, { ColumnDef } from '../../../../Components/DataTable';
import DeleteModal from '../../../../Components/Common/DeleteModal';
import DeleteManyModal from '../../../../Components/Common/DeleteManyModal';
import HasPermission from '../../../../Components/HasPermission';
import CreateEditModal from './CreateEditModal';


function Index({ tickets, sessions }: any) {
    // console.log('tickets', tickets);
    // console.log('sessions', sessions);


    const [showCreateEditModal, _setShowCreateEditModal] = React.useState(false);
    const [editTicket, setEditTicket] = React.useState<any>(null);

    const [deleteschedule, setDeleteSchedule] = React.useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] = useState(false);

    const setShowCreateEditModal = (state: boolean) => {
        _setShowCreateEditModal(state);
        if (state === false) {
            setEditTicket(null);
        }
    }

    const deleteForm = useForm({
        _method: 'DELETE'
    });
    const deleteManyForm = useForm<{ _method: string; ids: number[] }>({
        _method: 'DELETE',
        ids: [],
    });
    const editAction = (ticket: any) => {
        // console.log(ticket);
        setEditTicket(ticket);
        setShowCreateEditModal(true);
    }

    const deleteAction = (ticket: any) => {
        // console.log(ticket);
        setDeleteSchedule(ticket);
        setShowDeleteConfirmation(true);
    }
    const handleDelete = () => {
        deleteForm.post(route('organizer.events.tickets.destroy', deleteschedule.id));
        setShowDeleteConfirmation(false);
    }
    const deleteManyAction = (ids: number[]) => {
        // console.log(ids);
        deleteManyForm.setData(data => ({ ...data, ids: ids }));
        setShowDeleteManyConfirmation(true);
    }
    const handleDeleteMany = () => {
        // console.log(deleteManyForm);
        deleteManyForm.delete(route('organizer.events.tickets.destroy.many'));
        setShowDeleteManyConfirmation(false);
    }
    const columns: ColumnDef<typeof tickets.data[0]> = [
        {
            header: () => 'ID',
            cell: (ticket) => ticket.id,
            cellClass: "fw-medium"
        },
        {
            header: () => 'Event Name',
            cell: (ticket) => (<span key={ticket.event.id} className="badge bg-secondary-subtle text-secondary fs-6" style={{ marginRight: '3px' }}>{ticket.event.name}</span>),
        },
        {
            header: () => 'Name',
            cell: (ticket) => ticket.name,
        },
        {
            header: () => 'Description',
            cell: (ticket) => ticket.description,
        },
        {
            header: () => 'Type',
            cell: (ticket) => ticket.type,
        },
        {
            header: () => 'Price',
            cell: (ticket) => ticket.price,
        },
        {
            header: () => 'Sessions',
            cell: (ticket) => (
                ticket.sessions.map((session: any) =>
                    <span key={session.id} className="badge bg-secondary-subtle text-secondary fs-6" style={{ marginRight: '3px' }}>{session.name}</span>
                )
            ),
        },
        {
            header: () => 'Increment By',
            cell: (ticket) => ticket.increment_by,
        },
        {
            header: () => 'Increment Rate',
            cell: (ticket) => ticket.increment_rate,
        },
        {
            header: () => 'Start Increment',
            cell: (ticket) => ticket.start_increment,
        },
        {
            header: () => 'End Increment',
            cell: (ticket) => ticket.end_increment,
        },
        {
            header: () => 'Action',
            cell: (ticket) => (
                <div className="hstack gap-3 fs-15">
                    <span className="link-primary cursor-pointer" onClick={() => editAction(ticket)}><i className="ri-edit-fill"></i></span>
                    <span className="link-danger cursor-pointer" onClick={() => deleteAction(ticket)}>
                        <i className="ri-delete-bin-5-line"></i>
                    </span>
                </div>
            ),
        },
    ];
    return (
        <React.Fragment>
            <Head title='Tickets' />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Tickets" pageTitle="Dashboard" />
                    <Row>
                        <Col xs={12}>
                            <DataTable
                                data={tickets}
                                columns={columns}
                                title="tickets"
                                actions={[
                                    // Delete multiple
                                    {
                                        render: (dataTable) => <Button className="btn-danger" onClick={() => deleteManyAction(dataTable.getSelectedRows().map(row => row.id))}><i className="ri-delete-bin-5-line"></i> Delete ({dataTable.getSelectedRows().length})</Button>,
                                        showOnRowSelection: true,
                                    },

                                    // Add new

                                    {
                                        render: (
                                            <HasPermission permission="create_schedule">
                                                <Button onClick={() => setShowCreateEditModal(true)}><i className="ri-add-fill"></i> Add New</Button>
                                            </HasPermission>
                                        )
                                    },
                                    // {
                                    //     render: <Link href={route('admin.color-themes.create')}><Button><i className="ri-add-fill"></i> Add New</Button></Link>
                                    // },
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
                    ticket={editTicket}
                    sessions={sessions}
                />
            )}
            <DeleteManyModal
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

