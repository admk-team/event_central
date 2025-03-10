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

export default function WebsitePages() {
    const pages: any = usePage().props.pages;
    const homePageSelected: boolean = usePage().props.homePageSelected;
    
    const [showCreateEditModal, _setShowCreateEditModal] = useState(false);
    const [editPage, setEditPage] = useState<any>(null);
    const [deletePage, setDeletePage] = useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] = useState(false);

    const setShowCreateEditModal = (state: boolean) => {
        _setShowCreateEditModal(state);
        if (state === false) {
            setEditPage(null);
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
        setEditPage(user);
        setShowCreateEditModal(true);
    }

    const deleteAction = (user: any) => {
        setDeletePage(user);
        setShowDeleteConfirmation(true);
    }

    const handleDelete = () => {
        deleteForm.delete(route('organizer.events.pages.destroy', deletePage.id));
        setShowDeleteConfirmation(false);
    }

    const deleteManyAction = (ids: number[]) => {
        deleteManyForm.setData(data => ({...data, ids: ids}));
        setShowDeleteManyConfirmation(true);
    }

    const handleDeleteMany = () => {
        deleteManyForm.delete(route('organizer.events.pages.destroy.many'));
        setShowDeleteManyConfirmation(false);
    }

    const columns: ColumnDef<typeof pages.data[0]> = [
        {
            accessorKey: 'title',
            header: () => 'Title',
            cell: (page) => page.title,
            enableSorting: true,
        },
        {
            accessorKey: 'is_home_page',
            header: () => 'Home Page',
            cell: (page) => <HomePageSelector page={page} />,
            enableSorting: true,
        },
        {
            accessorKey: 'is_published',
            header: () => 'Published',
            cell: (page) => <PageStatus page={page} />,
            enableSorting: true,
        },
        {
            header: () => 'Action',
            cell: (page) => (
                <div className="hstack gap-3 fs-15">
                    <Link href={route('organizer.events.pages.builder', page.id)}>
                        <Button size="sm">Page Builder</Button>
                    </Link>
                    <span className="link-primary cursor-pointer" onClick={() => editAction(page)}><i className="ri-edit-fill"></i></span>
                    <span className="link-danger cursor-pointer" onClick={() => deleteAction(page)}>
                        <i className="ri-delete-bin-5-line"></i>
                    </span>
                </div>
            ),
        },
    ];

    return (
        <>
            {homePageSelected || (
                <Alert variant="warning" className="d-flex gap-2 align-items-center">
                    <AlertCircleIcon />
                    <div>Select <b>Home Page</b> to avoid <b>404</b> error</div>
                </Alert>
            )}
            <DataTable
                data={pages}
                columns={columns}
                title="Pages"
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
                <CreateEditPageModal
                    show={showCreateEditModal}
                    hide={() => setShowCreateEditModal(false)}
                    onHide={() => setShowCreateEditModal(false)}
                    page={editPage}
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
