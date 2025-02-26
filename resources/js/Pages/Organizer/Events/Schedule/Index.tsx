
import { Button, Col, Container, Dropdown, Row } from 'react-bootstrap';
import Layout from '../../../../Layouts/Organizer/Event';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import CreateEditModal from './Components/CreateEditModal';
import Platform from './Components/Platform';
import CreateEditPlatformModal from './Components/CreateOrEditPlatformModal';


function Index({ event_sessions, speakers, platforms, event_platforms }: any) {
    console.log('schedul', event_platforms);

    const [showCreateEditModal, _setShowCreateEditModal] = React.useState(false);
    const [showCreateEditPlatformModal, _setShowCreateEditPlatformModal] = React.useState(false);
    const [editSchedule, setEditSchedul] = React.useState<any>(null);
    const [editStage, setEditStage] = React.useState<any>(null);


    const setShowCreateEditModal = (state: boolean) => {
        _setShowCreateEditModal(state);
        if (state === false) {
            setEditSchedul(null);
        }
    }
    const setShowCreateEditPlatformModal = (state: boolean) => {
        _setShowCreateEditPlatformModal(state);
        if (state === false) {
            setEditStage(null);
        }
    }
    return (
        <React.Fragment>
            <Head title='Starter | Velzon - React Admin & Dashboard Template' />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Schedule" pageTitle="Dashboard" />
                    <Row>
                        <Col xs={12}>
                            <div className='mb-3'>
                                <div className="d-flex justify-content-between">
                                    <Button>Calendar</Button>
                                    <div>
                                        <Dropdown>
                                            <Dropdown.Toggle as="button" className="btn btn-secondary" id="dropdown.MenuButton">
                                                Stage
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item>
                                                    <div onClick={() => setShowCreateEditPlatformModal(true)}>
                                                        <i className="ri-add-fill"></i> Add Stage
                                                    </div>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    {/* <ScheduleHeader platforms={platforms} event_platforms={event_platforms} /> */}
                    <Platform platforms={platforms} event_platforms={event_platforms} speakers={speakers} event_sessions={event_sessions} />

                </Container>
            </div>

         
            {showCreateEditPlatformModal && (
                <CreateEditPlatformModal
                    show={showCreateEditPlatformModal}
                    hide={() => setShowCreateEditPlatformModal(false)}
                    onHide={() => setShowCreateEditPlatformModal(false)}
                    platforms={platforms}
                />
            )}
        </React.Fragment>
    )
}
Index.layout = (page: any) => <Layout children={page} />;
export default Index;

