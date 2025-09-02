import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Head, Link, useForm } from '@inertiajs/react';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import Layout from '../../../../Layouts/Event';
import DeleteModal from '../../../../Components/Common/DeleteModal';
import DeleteManyModal from '../../../../Components/Common/DeleteManyModal';
import DataTable, { ColumnDef } from '../../../../Components/DataTable';
import HasPermission from '../../../../Components/HasPermission';
import { useLaravelReactI18n } from "laravel-react-i18n";

function Index({ speakers }: any) {
    const [deletespeaker, setDeleteSpeaker] = useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] = useState(false);

    const { get } = useForm();
    const deleteForm = useForm({ _method: 'DELETE' });
    const deleteManyForm = useForm<{ _method: string; ids: number[] }>({ _method: 'DELETE', ids: [] });

    const { t } = useLaravelReactI18n();

    const editAction = (speaker: any) => {
        get(route('organizer.events.speaker.edit', speaker))
    }

    const deleteAction = (speaker: any) => {
        setDeleteSpeaker(speaker);
        setShowDeleteConfirmation(true);
    }

    const handleDelete = () => {
        deleteForm.post(route('organizer.events.speaker.destroy', deletespeaker.id));
        setShowDeleteConfirmation(false);
    }

    const deleteManyAction = (ids: number[]) => {
        deleteManyForm.setData(data => ({ ...data, ids: ids }));
        setShowDeleteManyConfirmation(true);
    }

    const handleDeleteMany = () => {
        deleteManyForm.delete(route('organizer.events.speakers.destroy.many'));
        setShowDeleteManyConfirmation(false);
    }

    const columns: ColumnDef<typeof speakers.data[0]> = [
        {
            header: () => t('ID'),
            cell: (speaker) => speaker.id,
            cellClass: "fw-medium"
        },
        {
            header: () => t('Avatar'),
            cell: (speaker) => (
                <img src={speaker.avatar} alt={speaker.name} width="50" height="50" className="rounded-circle" />
            ),
        },
        {
            header: () => t('Name'),
            cell: (speaker) => speaker.name,
        },
        {
            header: () => t('Company'),
            cell: (speaker) => speaker.company,
        },
        {
            header: () => t('Position'),
            cell: (speaker) => speaker.position,
        },
        {
            header: () => t('Action'),
            cell: (speaker) => (
                <div className="hstack gap-3 fs-15">
                    <HasPermission permission="edit_speakers">
                        <span className="link-primary cursor-pointer" onClick={() => editAction(speaker)}>
                            <i className="ri-edit-fill"></i>
                        </span>
                    </HasPermission>
                    <HasPermission permission="delete_speakers">
                        <span className="link-danger cursor-pointer" onClick={() => deleteAction(speaker)}>
                            <i className="ri-delete-bin-5-line"></i>
                        </span>
                    </HasPermission>
                </div>
            ),
        },
    ];

    return (
        <React.Fragment>
            <Head>
                <title>{t("Speakers Management | Organizer Dashboard")}</title>
                <meta name="description" content={t("Manage event speakers, edit details, and delete records from the organizer's dashboard.")} />
                <meta name="keywords" content={t("event speakers, speaker management, conference speakers, admin dashboard")} />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content={t("Speakers Management | Organizer Dashboard")} />
                <meta property="og:description" content={t("Manage event speakers, edit details, and delete records from the organizer's dashboard.")} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={route('organizer.events.speaker.index')} />
            </Head>

            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title={t("Speakers")} pageTitle={t("Dashboard")} />
                    <Row>
                        <Col xs={12}>
                            <HasPermission permission="view_speakers">
                                <DataTable
                                    data={speakers}
                                    columns={columns}
                                    title={t("Speakers")}
                                    actions={[
                                        {
                                            render: (dataTable) => (
                                                <HasPermission permission="delete_speakers">
                                                    <Button className="btn-danger" onClick={() => deleteManyAction(dataTable.getSelectedRows().map(row => row.id))}>
                                                        <i className="ri-delete-bin-5-line"></i> {t("Delete")} ({dataTable.getSelectedRows().length})
                                                    </Button>
                                                </HasPermission>
                                            ),
                                            showOnRowSelection: true,
                                        },
                                        {
                                            render: (
                                                <HasPermission permission="create_speakers">
                                                    <Link href={route('organizer.events.speaker.create')}>
                                                        <Button><i className="ri-add-fill"></i> {t("Add New")}</Button>
                                                    </Link>
                                                </HasPermission>
                                            )
                                        },
                                    ]}
                                />
                            </HasPermission>
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
