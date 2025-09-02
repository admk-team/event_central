import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Head, Link, useForm } from '@inertiajs/react';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import Layout from '../../../Layouts/Admin';
import DeleteModal from '../../../Components/Common/DeleteModal';
import DataTable, { ColumnDef } from '../../../Components/DataTable';
import DeleteManyModal from '../../../Components/Common/DeleteManyModal';
import { useLaravelReactI18n } from 'laravel-react-i18n';

function Index({ colorschemes }: any) {
    const { t } = useLaravelReactI18n();

    const [deleteTheme, setDeleteTheme] = useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] = useState(false);

    const { get } = useForm()

    const deleteForm = useForm({
        _method: 'DELETE'
    });
    const deleteManyForm = useForm<{ _method: string; ids: number[] }>({
        _method: 'DELETE',
        ids: [],
    });

    const editAction = (theme: any) => {
        get(route('admin.color-themes.edit', theme))
    }

    const deleteAction = (user: any) => {
        setDeleteTheme(user);
        setShowDeleteConfirmation(true);
    }

    const handleDelete = () => {
        deleteForm.post(route('admin.color-themes.destroy', deleteTheme.id));
        setShowDeleteConfirmation(false);
    }

    const deleteManyAction = (ids: number[]) => {
        deleteManyForm.setData(data => ({ ...data, ids: ids }));
        setShowDeleteManyConfirmation(true);
    }

    const handleDeleteMany = () => {
        deleteManyForm.delete(route('admin.color-themes.destroy.many'));
        setShowDeleteManyConfirmation(false);
    }

    const columns: ColumnDef<typeof colorschemes.data[0]> = [
        {
            header: () => t('ID'),
            cell: (theme) => theme.id,
            cellClass: "fw-medium"
        },
        {
            header: () => t('Title'),
            cell: (theme) => theme.title,
        },
        {
            header: () => t('Action'),
            cell: (theme) => (
                <div className="hstack gap-3 fs-15">
                    <span className="link-primary cursor-pointer" onClick={() => editAction(theme)}><i className="ri-edit-fill"></i></span>
                    <span className="link-danger cursor-pointer" onClick={() => deleteAction(theme)}>
                        <i className="ri-delete-bin-5-line"></i>
                    </span>
                </div>
            ),
        },
    ];

    return (
        <React.Fragment>
            <Head title={t('Color Themes Management')} />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title={t('Themes')} pageTitle={t("Dashboard")} />
                    <Row>
                        <Col xs={12}>
                            <DataTable
                                data={colorschemes}
                                columns={columns}
                                title={t("Themes")}
                                actions={[
                                    // Delete multiple
                                    {
                                        render: (dataTable) => (
                                            <Button className="btn-danger" onClick={() => deleteManyAction(dataTable.getSelectedRows().map(row => row.id))}>
                                                <i className="ri-delete-bin-5-line"></i> {t("Delete")} ({dataTable.getSelectedRows().length})
                                            </Button>
                                        ),
                                        showOnRowSelection: true,
                                    },
                                    // Add new
                                    {
                                        render: (
                                            <Link href={route('admin.color-themes.create')}>
                                                <Button><i className="ri-add-fill"></i> {t("Add New")}</Button>
                                            </Link>
                                        )
                                    },
                                ]}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>

            <DeleteModal
                show={showDeleteConfirmation}
                onDeleteClick={handleDelete}
                onCloseClick={() => setShowDeleteConfirmation(false)}
            />

            <DeleteManyModal
                show={showDeleteManyConfirmation}
                onDeleteClick={handleDeleteMany}
                onCloseClick={() => setShowDeleteManyConfirmation(false)}
            />
        </React.Fragment>
    )
}

Index.layout = (page: any) => <Layout children={page} />;

export default Index;
