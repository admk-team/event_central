import { Head, useForm } from '@inertiajs/react';
import React from 'react';
import Layout from '../../../../Layouts/Event';
import { Button, Card, CardBody, CardHeader, Container } from 'react-bootstrap';
import BreadCrumb2 from '../../../../Components/Common/BreadCrumb2';
import Platforms from './Components/Platforms';
import CreateEditSessionModal from './Components/CreateEditSessionModal';
import toast from 'react-hot-toast';
import DatePickerModal from './Components/DatePickerModal';
import moment from 'moment';
import { ChevronDown } from 'lucide-react';
import Sessions from './Components/Sessions';
import DeleteModal from '../../../../Components/Common/DeleteModal';


function Index() {
    const [selectedDate, setSelectedDate] = React.useState<any>(null);
    const [selectedPlatform, setSelectedPlatform] = React.useState<any>(null);
    const [showSessionCreateEditModal, _setShowSessionCreateEditModal] = React.useState(false);
    const [editSession, setEditSession] = React.useState<any>(null);
    const [deleteSession, setDeleteSession] = React.useState<any>(null);
    const [showDeleteSessionConfirmation, setShowDeleteSessionConfirmation] = React.useState(false);
    const [showDatePickerModal, setShowDatePickerModal] = React.useState(false);

    const deleteForm = useForm({
        _method: 'DELETE'
    });

    const setShowSessionCreateEditModal = (state: boolean) => {
        if (selectedDate === null) {
            toast.error("Please add date first");
            return;
        }

        if (selectedPlatform === null) {
            toast.error("Please create platform first");
            return;
        }

        _setShowSessionCreateEditModal(state);
        if (state === false) {
            setEditSession(null);
        }
    }

    const editSessionAction = (session: any) => {
        setEditSession(session);
        setShowSessionCreateEditModal(true);
    }

    const deleteSessionAction = (session: any) => {
        setDeleteSession(session);
        setShowDeleteSessionConfirmation(true);
    }

    const handleSessionDelete = () => {
        deleteForm.delete(route('organizer.events.schedule.destroy', deleteSession.id));
        setShowDeleteSessionConfirmation(false);
    }

    return (
        <React.Fragment>
            <Head title='Schedule' />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb2
                        title="Schedule"
                    />
                    <Card className="schedule">
                        <CardHeader className="d-flex justify-content-between align-items-center">
                            <div className="fw-bold fs-5">
                                <Button variant="light" onClick={() => setShowDatePickerModal(true)} className="d-flex align-items-centers gap-2">
                                    <span>
                                        {selectedDate ? moment(selectedDate.date).format('MMMM D, YYYY') : moment(new Date()).format('MMMM D, YYYY')}
                                    </span>
                                    <ChevronDown size={18} />
                                </Button>
                                <DatePickerModal
                                    show={showDatePickerModal}
                                    onHide={() => setShowDatePickerModal(false)}
                                    onDateSelect={(date) => setSelectedDate(date)}
                                />
                            </div>
                            <Button onClick={() => setShowSessionCreateEditModal(true)}><i className="ri-add-fill"></i> New Session</Button>
                        </CardHeader>
                        <CardBody className="p-0 d-flex" style={{ height: '600px' }}>
                            <div className="sidebar">
                                <Platforms onPlatformChange={(platform: any) => setSelectedPlatform(platform)} />
                            </div>
                            <div className="flex-grow-1 overflow-x-hidden overflow-y-auto">
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
                onCloseClick={() => { setShowDeleteSessionConfirmation(false) }}
            />
        </React.Fragment>
    )
}

Index.layout = (page: any) => <Layout children={page} />;

export default Index;
