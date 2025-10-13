import React, { useEffect, useState } from "react";
import Layout from "../../../../Layouts/Event";
import { Head, useForm } from "@inertiajs/react";
import { Button, Col, Container, Card, CardBody, CardHeader } from "react-bootstrap";
import BreadCrumb2 from "../../../../Components/Common/BreadCrumb2";
import { ChevronDown, Menu, X } from "lucide-react";
import Sessions from "./Components/Sessions";
import DeleteModal from "../../../../Components/Common/DeleteModal";
import HasPermission from "../../../../Components/HasPermission";
import CreateEditSessionModal from "./Components/CreateEditSessionModal";
import DatePickerModal from "./Components/DatePickerModal";
import toast from "react-hot-toast";
import moment from "moment";
import { useLaravelReactI18n } from 'laravel-react-i18n';

// ✅ Import the Platforms component
import Platforms from "./Components/Platforms";

function Index() {
    const [selectedDate, setSelectedDate] = useState<any>(null);
    const [selectedPlatform, setSelectedPlatform] = useState<any>(null);
    const [showSessionCreateEditModal, _setShowSessionCreateEditModal] = useState(false);
    const [editSession, setEditSession] = useState<any>(null);
    const [deleteSession, setDeleteSession] = useState<any>(null);
    const [showDeleteSessionConfirmation, setShowDeleteSessionConfirmation] = useState(false);
    const [showDatePickerModal, setShowDatePickerModal] = useState(false);
    const [showPlatformsSidebar, setShowPlatformsSidebar] = useState(false);

    const { t } = useLaravelReactI18n();
    const deleteForm = useForm({
        _method: "DELETE",
    });

    const setShowSessionCreateEditModal = (state: boolean) => {
        if (selectedDate === null) {
            toast.error(t("Please add date first"));
            return;
        }

        if (selectedPlatform === null) {
            toast.error(t("Please create platform first"));
            return;
        }

        _setShowSessionCreateEditModal(state);
        if (state === false) {
            setEditSession(null);
        }
    };

    const editSessionAction = (session: any) => {
        setEditSession(session);
        setShowSessionCreateEditModal(true);
    };

    const deleteSessionAction = (session: any) => {
        setDeleteSession(session);
        setShowDeleteSessionConfirmation(true);
    };

    const handleSessionDelete = () => {
        deleteForm.delete(route("organizer.events.schedule.destroy", deleteSession.id));
        setShowDeleteSessionConfirmation(false);
    };

    return (
        <React.Fragment>
            <Head title={t("Schedule")} />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb2 title={t("Schedule")} />

                    <Card className="schedule">
                        <CardHeader className="d-flex justify-content-between align-items-center">
                            <Button
                                variant="light"
                                className="btn-icon d-sm-none"
                                aria-label={t("Toggle platform sidebar")}
                                onClick={() => setShowPlatformsSidebar(!showPlatformsSidebar)}
                                title={t("Toggle platform sidebar")}
                            >
                                {showPlatformsSidebar ? <X size={18} /> : <Menu size={18} />}
                            </Button>

                            <div>
                                <Button
                                    variant="light"
                                    onClick={() => setShowDatePickerModal(true)}
                                    className="d-flex align-items-centers gap-2"
                                    aria-label={t("Pick date")}
                                    title={t("Pick date")}
                                >
                                    <span>
                                        {selectedDate
                                            ? moment(selectedDate.date).format("MMMM D, YYYY")
                                            : moment(new Date()).format("MMMM D, YYYY")}
                                    </span>
                                    <ChevronDown size={18} />
                                </Button>

                                <DatePickerModal
                                    show={showDatePickerModal}
                                    onHide={() => setShowDatePickerModal(false)}
                                    onDateSelect={(date) => setSelectedDate(date)}
                                />
                            </div>

                            <HasPermission permission="create_event_sessions">
                                <Button onClick={() => setShowSessionCreateEditModal(true)}>
                                    <i className="ri-add-fill"></i> {t("New Session")}
                                </Button>
                            </HasPermission>
                        </CardHeader>

                        <CardBody className={`p-0 d-flex ${showPlatformsSidebar ? "show-platform-sidebar" : ""}`}>
                            <div className="sidebar">
                                <Platforms
                                    onPlatformChange={(platform: any) => {
                                        setSelectedPlatform(platform);
                                        setTimeout(() => setShowPlatformsSidebar(false), 300);
                                    }}
                                />
                            </div>

                            <div className="sessions flex-grow-1 overflow-x-hidden overflow-y-auto">
                                <Sessions
                                    selectedDate={selectedDate}
                                    selectedPlatform={selectedPlatform}
                                    onEdit={editSessionAction}
                                    onDelete={deleteSessionAction}
                                />
                            </div>
                        </CardBody>
                    </Card>
                </Container>
            </div>

            {showSessionCreateEditModal && (
                <CreateEditSessionModal
                    show={showSessionCreateEditModal}
                    hide={() => setShowSessionCreateEditModal(false)}
                    onHide={() => setShowSessionCreateEditModal(false)}
                    eventSession={editSession}
                    selectedDate={selectedDate}
                    selectedPlatform={selectedPlatform}
                />
            )}

            <DeleteModal
                show={showDeleteSessionConfirmation}
                onDeleteClick={handleSessionDelete}
                onCloseClick={() => setShowDeleteSessionConfirmation(false)}
            />
        </React.Fragment>
    );
}

Index.layout = (page: any) => <Layout children={page} />;

export default Index;
