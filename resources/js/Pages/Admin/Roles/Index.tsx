
import React, { useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Head, useForm, Link } from '@inertiajs/react';
import Layout from '../../../Layouts/Admin';
import DeleteModal from '../../../Components/Common/DeleteModal';
import DataTable, { ColumnDef } from '../../../Components/DataTable';
import BreadCrumb2 from '../../../Components/Common/BreadCrumb2';
import HasPermission from '../../../Components/HasPermission';
import { useLaravelReactI18n } from "laravel-react-i18n";

function Index({ roles }: any) {
    const [deleteRole, setDeleteRole] = React.useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
      const { t } = useLaravelReactI18n();

    const deleteForm = useForm({
        _method: 'DELETE'
    });

    const editAction = (role: any) => {
        // setEditRole(role);
        // setShowCreateEditModal(true);
    }

    const deleteAction = (role: any) => {
        setDeleteRole(role);
        setShowDeleteConfirmation(true);
    }

    const createAction = () => {

    }

    const handleDelete = () => {
        deleteForm.post(route('admin.roles.destroy', deleteRole.id));
        setShowDeleteConfirmation(false);
    }

    const columns: ColumnDef<typeof roles.data[0]> = [
        {
            header: () => t('ID'),
            cell: (role) => role.id,
            cellClass: "fw-medium",
        },
        {
            header: () => t('Name'),
            cell: (role) => role.name,
        },
        {
            header: () => t('Action'),
            cell: (role) => (
                <div className="hstack gap-3 fs-15">
                    <HasPermission permission="edit_roles">
                        <Link href={route('admin.roles.edit', role.id)}><span className="link-primary cursor-pointer"><i className="ri-edit-fill"></i></span></Link>
                    </HasPermission>
                    <HasPermission permission="delete_roles">
                        <span className="link-danger cursor-pointer" onClick={() => deleteAction(role)}>
                            <i className="ri-delete-bin-5-line"></i>
                        </span>
                    </HasPermission>
                </div>
            ),
        },
    ];

    return (
        <React.Fragment>
            <Head title='Roles - Admin' />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb2
                        title={t("Roles")}
                    />
                    <Row>
                        <Col xs={12}>
                            <DataTable
                                data={roles}
                                columns={columns}
                                title="Roles"
                                actions={[
                                    {
                                        render: (
                                            <HasPermission permission="create_roles">
                                                <Link href="/admin/roles/create"><Button>{t("Add New")}</Button></Link>
                                            </HasPermission>
                                        )
                                    }
                                ]}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>

            <DeleteModal
                show={showDeleteConfirmation}
                onDeleteClick={handleDelete}
                onCloseClick={() => { setShowDeleteConfirmation(false) }}
            />
        </React.Fragment>
    )
}

Index.layout = (page: any) => <Layout children={page} />;

export default Index;
