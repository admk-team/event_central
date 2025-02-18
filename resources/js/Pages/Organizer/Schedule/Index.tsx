
import { Button, Col, Container, Row } from 'react-bootstrap';
import Layout from '../../../Layouts/Organizer';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import DataTable, { ColumnDef } from '../../../Components/DataTable';
import DeleteModal from '../../../Components/Common/DeleteModal';
import DeleteManyModal from '../../../Components/Common/DeleteManyModal';
import HasPermission from '../../../Components/HasPermission';
import CreateEditModal from './CreateEditModal';


function Index({ schedule }: any) {
    const [showCreateEditModal, _setShowCreateEditModal] = React.useState(false);
    const [editUser, setEditSchedul] = React.useState<any>(null);

    const [deleteschedule, setDeleteSchedule] = React.useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] = useState(false);

    const setShowCreateEditModal = (state: boolean) => {
        _setShowCreateEditModal(state);
        if (state === false) {
            setEditSchedul(null);
        }
    }

    const deleteForm = useForm({
        _method: 'DELETE'
    });
    const deleteManyForm = useForm<{ _method: string; ids: number[] }>({
        _method: 'DELETE',
        ids: [],
    });
    const editAction = (user: any) => {
        setEditSchedul(user);
        setShowCreateEditModal(true);
    }

    const deleteAction = (user: any) => {
        setDeleteSchedule(user);
        setShowDeleteConfirmation(true);
    }
    const handleDelete = () => {

        deleteForm.post(route('organizer.schedule.destroy', deleteschedule.id));
        setShowDeleteConfirmation(false);
    }
    const deleteManyAction = (ids: number[]) => {
        deleteManyForm.setData(data => ({ ...data, ids: ids }));
        setShowDeleteManyConfirmation(true);
    }
    const handleDeleteMany = () => {
        deleteManyForm.delete(route('organizer.speakers.destroy.many'));
        setShowDeleteManyConfirmation(false);
    }
    const columns: ColumnDef<typeof schedule.data[0]> = [
        {
            header: () => 'ID',
            cell: (schedule) => schedule.id,
            cellClass: "fw-medium"
        },
        {
            header: () => 'Name',
            cell: (schedule) => schedule.name,
        },
        {
            header: () => 'Type',
            cell: (schedule) => schedule.company,
        },

        {
            header: () => 'Action',
            cell: (schedule) => (
                <div className="hstack gap-3 fs-15">
                    <span className="link-primary cursor-pointer" onClick={() => editAction(schedule)}><i className="ri-edit-fill"></i></span>
                    <span className="link-danger cursor-pointer" onClick={() => deleteAction(schedule)}>
                        <i className="ri-delete-bin-5-line"></i>
                    </span>
                </div>
            ),
        },
    ];
    return (
        <React.Fragment>
            <Head title='Starter | Velzon - React Admin & Dashboard Template' />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Schedule" pageTitle="Dashboard" />

                    <Row>
                        <Col xs={12}>
                            <DataTable
                                data={schedule}
                                columns={columns}
                                title="Schedule"
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
                    user={editUser}
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

