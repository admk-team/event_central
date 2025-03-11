import { Head } from '@inertiajs/react';
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


function Index() {
    const [selectedDate, setSelectedDate] = React.useState<any>(null);
    const [selectedPlatform, setSelectedPlatform] = React.useState<any>(null);
    const [showSessionCreateEditModal, _setShowSessionCreateEditModal] = React.useState(false);
    const [editSession, setEditSession] = React.useState<any>(null);
    const [showDatePickerModal, setShowDatePickerModal] = React.useState(false);

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
                        <CardBody className="p-0 d-flex" style={{ height: '400px' }}>
                            <div className="sidebar">
                                <Platforms onPlatformChange={(platform: any) => setSelectedPlatform(platform)} />
                            </div>
                            <div className="flex-grow-1">
                                {selectedPlatform?.name}
                                {selectedDate?.date}
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
                    eventPlatformId={selectedPlatform.id}
                />
            )}
        </React.Fragment>
    )
}

Index.layout = (page: any) => <Layout children={page} />;

export default Index;
