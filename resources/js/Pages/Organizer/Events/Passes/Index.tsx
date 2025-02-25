
import { Button, Col, Container, Row } from 'react-bootstrap';
import Layout from '../../../../Layouts/Organizer/Event';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import DataTable, { ColumnDef } from '../../../../Components/DataTable';
import DeleteModal from '../../../../Components/Common/DeleteModal';
import DeleteManyModal from '../../../../Components/Common/DeleteManyModal';
import HasPermission from '../../../../Components/HasPermission';
import CreateEditModal from './CreateEditModal';


function Index({ passes, event_sessions }: any) {
    // console.log('passes', passes);
    const [showCreateEditModal, _setShowCreateEditModal] = React.useState(false);
    const [editPass, setEditPass] = React.useState<any>(null);

    const [deleteschedule, setDeleteSchedule] = React.useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] = useState(false);

    const setShowCreateEditModal = (state: boolean) => {
        _setShowCreateEditModal(state);
        if (state === false) {
            setEditPass(null);
        }
    }

    const deleteForm = useForm({
        _method: 'DELETE'
    });
    const deleteManyForm = useForm<{ _method: string; ids: number[] }>({
        _method: 'DELETE',
        ids: [],
    });
    const editAction = (pass: any) => {
        // console.log(pass);
        setEditPass(pass);
        setShowCreateEditModal(true);
    }

    const deleteAction = (pass: any) => {
        // console.log(pass);
        setDeleteSchedule(pass);
        setShowDeleteConfirmation(true);
    }
    const handleDelete = () => {
        deleteForm.post(route('organizer.events.passes.destroy', deleteschedule.id));
        setShowDeleteConfirmation(false);
    }
    const deleteManyAction = (ids: number[]) => {
        // console.log(ids);
        deleteManyForm.setData(data => ({ ...data, ids: ids }));
        setShowDeleteManyConfirmation(true);
    }
    const handleDeleteMany = () => {
        // console.log(deleteManyForm);
        deleteManyForm.delete(route('organizer.events.passes.destroy.many'));
        setShowDeleteManyConfirmation(false);
    }
    const columns: ColumnDef<typeof passes.data[0]> = [
        {
            header: () => 'ID',
            cell: (pass) => pass.id,
            cellClass: "fw-medium"
        },
        {
            header: () => 'Event Session',
            cell: (pass) => pass.session.name,
        },
        {
            header: () => 'Name',
            cell: (pass) => pass.name,
        },
        {
            header: () => 'Description',
            cell: (pass) => pass.description,
        },
        {
            header: () => 'Type',
            cell: (pass) => pass.type,
        },
        {
            header: () => 'Price',
            cell: (pass) => pass.price,
        },
        {
            header: () => 'Increament By',
            cell: (pass) => pass.increament_by,
        },
        {
            header: () => 'Increament Rate',
            cell: (pass) => pass.increament_rate,
        },
        {
            header: () => 'Start Increament',
            cell: (pass) => pass.start_increament,
        },
        {
            header: () => 'End Increament',
            cell: (pass) => pass.end_increament,
        },
        {
            header: () => 'Action',
            cell: (pass) => (
                <div className="hstack gap-3 fs-15">
                    <span className="link-primary cursor-pointer" onClick={() => editAction(pass)}><i className="ri-edit-fill"></i></span>
                    <span className="link-danger cursor-pointer" onClick={() => deleteAction(pass)}>
                        <i className="ri-delete-bin-5-line"></i>
                    </span>
                </div>
            ),
        },
    ];
    return (
        <React.Fragment>
            <Head title='Passes' />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Passes" pageTitle="Dashboard" />
                    <Row>
                        <Col xs={12}>
                            <DataTable
                                data={passes}
                                columns={columns}
                                title="Passes"
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
                    pass={editPass}
                    event_sessions={event_sessions}
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

