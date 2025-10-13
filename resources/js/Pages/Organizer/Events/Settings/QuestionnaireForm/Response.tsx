import Layout from "../../../../../Layouts/Event";
import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { Button, Col, Container, Row, Modal, Card } from "react-bootstrap";
import BreadCrumb from "../../../../../Components/Common/BreadCrumb";
import HasPermission from "../../../../../Components/HasPermission";
import DataTable, { ColumnDef } from "../../../../../Components/DataTable";
import DeleteModal from "../../../../../Components/Common/DeleteModal";
import DeleteManyModal from "../../../../../Components/Common/DeleteManyModal";
import RenderQuestionnaireResponse from "../../../../../Components/FormBuilder/RenderQuestionnaireResponse";
import moment from "moment";
import { useLaravelReactI18n } from 'laravel-react-i18n';
function Response({ form, submissions }: any) {
    const { t } = useLaravelReactI18n();
    const [deleteformSubmission, setDeleteformSubmission] = useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] = useState(false);
    const [viewSubmission, setViewSubmission] = useState<any>(null);
    const [showSubmissionModal, setShowSubmissionModal] = useState(false);

    const { get } = useForm();
    const deleteForm = useForm({ _method: "DELETE" });
    const deleteManyForm = useForm<{ _method: string; ids: number[] }>({
        _method: "DELETE",
        ids: [],
    });

    const editAction = (submission: any) => {
        get(route("organizer.events.formSubmission.edit", submission.id));
    };

    const deleteAction = (submission: any) => {
        setDeleteformSubmission(submission);
        setShowDeleteConfirmation(true);
    };

    const handleDelete = () => {
        deleteForm.post(
            route(
                "organizer.events.settings.questionnaire-form.destroy",
                deleteformSubmission.id
            )
        );
        setShowDeleteConfirmation(false);
    };

    const deleteManyAction = (ids: number[]) => {
        deleteManyForm.setData((data) => ({ ...data, ids }));
        setShowDeleteManyConfirmation(true);
    };

    const handleDeleteMany = () => {
        deleteManyForm.delete(
            route("organizer.events.settings.questionnaire-form.many")
        );
        setShowDeleteManyConfirmation(false);
    };

    const columns: ColumnDef<(typeof submissions)[0]> = [
        {
            header: () => t("ID"),
            cell: (submission) => submission.id,
            cellClass: "fw-medium",
        },
        {
            header: () => t("Name"),
            cell: (submission) => submission.attendee?.first_name ?? t("N/A"),
        },
        {
            header: () => t("Email"),
            cell: (submission) => submission.attendee?.email ?? t("N/A"),
        },
        {
            header: () => t("Responded At"),
            cell: (submission) =>
                moment(submission.created_at).format("MMM DD, YYYY") ?? t("N/A"),
        },
        {
            header: () => t("Action"),
            cell: (submission) => (
                <div className="hstack gap-3 fs-15">
                    <HasPermission permission="delete_questionnaire_response">
                        <span
                            className="link-danger cursor-pointer"
                            onClick={() => deleteAction(submission)}
                        >
                            <i className="ri-delete-bin-5-line"></i>
                        </span>
                    </HasPermission>
                    <HasPermission permission="questionnaire_response">
                        <span
                            className="link-info cursor-pointer"
                            onClick={() => {
                                setViewSubmission(submission);
                                setShowSubmissionModal(true);
                            }}
                        >
                            <i className="ri-eye-line"></i>
                        </span>
                    </HasPermission>
                </div>
            ),
        },
    ];

    return (
        <React.Fragment>
            <Head title={t("Event Questionnaire Response")} />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb
                        title={t("Event Questionnaire Response")}
                        pageTitle={t("Dashboard")}
                    />
                    <Row>
                        <Col xs={12}>
                            <HasPermission permission="questionnaire_response">
                                <DataTable
                                    data={submissions}
                                    columns={columns}
                                    title={t("Questionnaire Response")}
                                    actions={[
                                        {
                                            render: (dataTable) => (
                                                <HasPermission permission="delete_questionnaire_response">
                                                    <Button
                                                        className="btn-danger"
                                                        onClick={() =>
                                                            deleteManyAction(
                                                                dataTable
                                                                    .getSelectedRows()
                                                                    .map(
                                                                        (row) => row.id
                                                                    )
                                                            )
                                                        }
                                                    >
                                                        <i className="ri-delete-bin-5-line"></i>{" "}
                                                        {t("Delete")} (
                                                        {
                                                            dataTable.getSelectedRows()
                                                                .length
                                                        }
                                                        )
                                                    </Button>
                                                </HasPermission>
                                            ),
                                            showOnRowSelection: true,
                                        },
                                    ]}
                                />
                            </HasPermission>
                        </Col>
                    </Row>
                </Container>

                {/* Single Delete Confirmation */}
                <DeleteModal
                    show={showDeleteConfirmation}
                    onDeleteClick={handleDelete}
                    onCloseClick={() => setShowDeleteConfirmation(false)}
                />

                {/* Bulk Delete Confirmation */}
                <DeleteManyModal
                    show={showDeleteManyConfirmation}
                    onDeleteClick={handleDeleteMany}
                    onCloseClick={() => setShowDeleteManyConfirmation(false)}
                />

                {/* View Submission Modal */}
                <Modal
                    show={showSubmissionModal}
                    onHide={() => setShowSubmissionModal(false)}
                    size="lg"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{t("Submission Details")}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Card className="p-4">
                            <RenderQuestionnaireResponse
                                form={form}
                                submission={viewSubmission}
                            />
                        </Card>
                    </Modal.Body>
                </Modal>
            </div>
        </React.Fragment>
    );
}

Response.layout = (page: any) => <Layout children={page} />;
export default Response;
