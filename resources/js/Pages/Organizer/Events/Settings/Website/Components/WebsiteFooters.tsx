import { Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import CreateEditFooterModal from './CreateEditFooterModal';
import DeleteModal from '../../../../../../Components/Common/DeleteModal';
import DeleteManyModal from '../../../../../../Components/Common/DeleteManyModal';
import DataTable, { ColumnDef } from '../../../../../../Components/DataTable';
import FooterDefaultSelector from './FooterDefaultSelector';

export default function WebsiteFooters() {
    const { t } = useLaravelReactI18n();
    const footers: any = usePage().props.footers;

    const [showCreateEditModal, _setShowCreateEditModal] = useState(false);
    const [editFooter, setEditFooter] = useState<any>(null);
    const [deleteFooter, setDeleteFooter] = useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] = useState(false);

    const setShowCreateEditModal = (state: boolean) => {
        _setShowCreateEditModal(state);
        if (!state) setEditFooter(null);
    };

    const deleteForm = useForm({ _method: 'DELETE' });
    const deleteManyForm = useForm<{ _method: string; ids: number[] }>({ _method: 'DELETE', ids: [] });

    const editAction = (footer: any) => {
        setEditFooter(footer);
        setShowCreateEditModal(true);
    };

    const deleteAction = (footer: any) => {
        setDeleteFooter(footer);
        setShowDeleteConfirmation(true);
    };

    const handleDelete = () => {
        deleteForm.delete(route('organizer.events.footers.destroy', deleteFooter.id));
        setShowDeleteConfirmation(false);
    };

    const deleteManyAction = (ids: number[]) => {
        deleteManyForm.setData(data => ({ ...data, ids }));
        setShowDeleteManyConfirmation(true);
    };

    const handleDeleteMany = () => {
        deleteManyForm.delete(route('organizer.events.footers.destroy.many'));
        setShowDeleteManyConfirmation(false);
    };

    const columns: ColumnDef<typeof footers.data[0]> = [
        {
            accessorKey: 'title',
            header: () => t('Title'),
            cell: footer => footer.title,
            enableSorting: true,
        },
        {
            accessorKey: 'is_default',
            header: () => t('Default'),
            cell: footer => <FooterDefaultSelector footer={footer} />,
            enableSorting: true,
        },
        {
            header: () => t('Action'),
            cell: footer => (
                <div className="hstack gap-3 fs-15">
                    <Link href={route('organizer.events.footers.builder', footer.id)}>
                        <Button size="sm">{t('Page Builder')}</Button>
                    </Link>
                    <span className="link-primary cursor-pointer" onClick={() => editAction(footer)}>
                        <i className="ri-edit-fill"></i> {t('Edit')}
                    </span>
                    <span className="link-danger cursor-pointer" onClick={() => deleteAction(footer)}>
                        <i className="ri-delete-bin-5-line"></i> {t('Delete')}
                    </span>
                </div>
            ),
        },
    ];

    return (
        <>
            <DataTable
                data={footers}
                columns={columns}
                title={t('Footers')}
                actions={[
                    // Delete multiple
                    {
                        render: dataTable => (
                            <Button
                                className="btn-danger"
                                onClick={() =>
                                    deleteManyAction(dataTable.getSelectedRows().map(row => row.id))
                                }
                            >
                                <i className="ri-delete-bin-5-line"></i> {t('Delete')} ({dataTable.getSelectedRows().length})
                            </Button>
                        ),
                        showOnRowSelection: true,
                    },
                    // Add new
                    {
                        render: <Button onClick={() => setShowCreateEditModal(true)}><i className="ri-add-fill"></i> {t('Add New')}</Button>,
                    },
                ]}
            />

            {showCreateEditModal && (
                <CreateEditFooterModal
                    show={showCreateEditModal}
                    hide={() => setShowCreateEditModal(false)}
                    onHide={() => setShowCreateEditModal(false)}
                    page={editFooter}
                />
            )}

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
        </>
    );
}
