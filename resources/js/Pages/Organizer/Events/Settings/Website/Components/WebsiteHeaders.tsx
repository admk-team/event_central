import { Link, useForm, usePage } from '@inertiajs/react'
import React, { useState } from 'react'
import { Alert, AlertHeading, Button, Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap'
import CreateEditPageModal from './CreateEditPageModal';
import DeleteModal from '../../../../../../Components/Common/DeleteModal';
import DataTable, { ColumnDef } from '../../../../../../Components/DataTable';
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput';
import PageStatus from './PageStatus';
import DeleteManyModal from '../../../../../../Components/Common/DeleteManyModal';
import HomePageSelector from './HomePageSelector';
import { AlertCircle, AlertCircleIcon } from 'lucide-react';
import CreateEditHeaderModal from './CreateEditHeaderModal';
import HeaderDefaultSelector from './HeaderDefaultSelector';

export default function WebsiteHeaders() {
    const headers: any = usePage().props.headers;
    
    const [showCreateEditModal, _setShowCreateEditModal] = useState(false);
    const [editHeader, setEditHeader] = useState<any>(null);
    const [deleteHeader, setDeleteHeader] = useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] = useState(false);

    const setShowCreateEditModal = (state: boolean) => {
        _setShowCreateEditModal(state);
        if (state === false) {
            setEditHeader(null);
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
        setEditHeader(user);
        setShowCreateEditModal(true);
    }

    const deleteAction = (user: any) => {
        setDeleteHeader(user);
        setShowDeleteConfirmation(true);
    }

    const handleDelete = () => {
        deleteForm.delete(route('organizer.events.headers.destroy', deleteHeader.id));
        setShowDeleteConfirmation(false);
    }

    const deleteManyAction = (ids: number[]) => {
        deleteManyForm.setData(data => ({...data, ids: ids}));
        setShowDeleteManyConfirmation(true);
    }

    const handleDeleteMany = () => {
        deleteManyForm.delete(route('organizer.events.headers.destroy.many'));
        setShowDeleteManyConfirmation(false);
    }

    const columns: ColumnDef<typeof headers.data[0]> = [
        {
            accessorKey: 'title',
            header: () => 'Title',
            cell: (header) => header.title,
            enableSorting: true,
        },
        {
            accessorKey: 'is_default',
            header: () => 'Default',
            cell: (header) => <HeaderDefaultSelector header={header} />,
            enableSorting: true,
        },
        {
            header: () => 'Action',
            cell: (header) => (
                <div className="hstack gap-3 fs-15">
                    <Link href={route('organizer.events.headers.builder', header.id)}>
                        <Button size="sm">Page Builder</Button>
                    </Link>
                    <span className="link-primary cursor-pointer" onClick={() => editAction(header)}><i className="ri-edit-fill"></i></span>
                    <span className="link-danger cursor-pointer" onClick={() => deleteAction(header)}>
                        <i className="ri-delete-bin-5-line"></i>
                    </span>
                </div>
            ),
        },
    ];

    return (
        <>
            <DataTable
                data={headers}
                columns={columns}
                title="Headers"
                actions={[
                    // Delete multiple
                    {
                        render: (dataTable) => (
                            <Button className="btn-danger" onClick={() => deleteManyAction(dataTable.getSelectedRows().map(row => row.id))}><i className="ri-delete-bin-5-line"></i> Delete ({dataTable.getSelectedRows().length})</Button>
                        ),
                        showOnRowSelection: true,
                    },
                    // Add new
                    {
                        render: (
                            <Button onClick={() => setShowCreateEditModal(true)}><i className="ri-add-fill"></i> Add New</Button>
                        )
                    },
                ]}
            />

            {showCreateEditModal && (
                <CreateEditHeaderModal
                    show={showCreateEditModal}
                    hide={() => setShowCreateEditModal(false)}
                    onHide={() => setShowCreateEditModal(false)}
                    page={editHeader}
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
        </>
    )
}
