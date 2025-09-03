import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Head, useForm } from '@inertiajs/react';
import Layout from '../../../Layouts/Admin';
import DeleteModal from '../../../Components/Common/DeleteModal';
import DeleteManyModal from '../../../Components/Common/DeleteManyModal';
import DataTable, { ColumnDef } from '../../../Components/DataTable';
import BreadCrumb2 from '../../../Components/Common/BreadCrumb2';
import { useLaravelReactI18n } from 'laravel-react-i18n';

function Index({ country }: any) {
    const { t } = useLaravelReactI18n();

    const [deleteCountry, setDeleteCountry] = useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] = useState(false);

    const deleteForm = useForm({
        _method: 'DELETE'
    });

    const deleteManyForm = useForm<{ _method: string; ids: number[] }>({
        _method: 'DELETE',
        ids: [],
    });

    const deleteAction = (country: any) => {
        setDeleteCountry(country);
        setShowDeleteConfirmation(true);
    }

    const handleDelete = () => {
        deleteForm.delete(route('admin.event-category.destroy', deleteCountry.id));
        setShowDeleteConfirmation(false);
    }

    const deleteManyAction = (ids: number[]) => {
        deleteManyForm.setData(data => ({ ...data, ids: ids }));
        setShowDeleteManyConfirmation(true);
    }

    const handleDeleteMany = () => {
        deleteManyForm.delete(route('admin.event.category.destroy.many'));
        setShowDeleteManyConfirmation(false);
    }

    const columns: ColumnDef<typeof country.data[0]> = [
        {
            accessorKey: 'id',
            header: () => t('ID'),
            cell: (country) => country.id,
            cellClass: "fw-medium",
            enableSorting: true,
        },
        {
            accessorKey: 'code',
            header: () => t('Code'),
            cell: (country) => country.code,
            cellClass: "fw-medium",
            enableSorting: true,
        },
        {
            accessorKey: 'title',
            header: () => t('Name'),
            cell: (country) => country.title,
            cellClass: "fw-medium",
            enableSorting: true,
        },
    ];

    return (
        <React.Fragment>
            <Head title={t('Countries Management')} />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb2 title={t('Countries')} />
                    <Row>
                        <Col xs={12}>
                            <DataTable
                                data={country}
                                columns={columns}
                                title={t('Countries')}
                                actions={[
                                    // Delete multiple
                                    {
                                        render: (dataTable) => (
                                            <Button className="btn-danger" onClick={() => deleteManyAction(dataTable.getSelectedRows().map(row => row.id))}>
                                                <i className="ri-delete-bin-5-line"></i> {t('Delete')} ({dataTable.getSelectedRows().length})
                                            </Button>
                                        ),
                                        showOnRowSelection: true,
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
