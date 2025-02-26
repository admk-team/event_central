import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import CreateEditPlatformModal from "./CreateOrEditPlatformModal";

function Platform({ platforms, event_platforms }: any) {
    const [showCreateEditPlatformModal, _setShowCreateEditPlatformModal] = React.useState(false);
    const [editPlatform, setEditPlatform] = React.useState<any>(null);

    const setShowCreateEditPlatformModal = (state: boolean) => {
        _setShowCreateEditPlatformModal(state);
        if (state === false) {
            setEditPlatform(null);
        }
    };

    const editAction = (platform: any) => {
        setEditPlatform(platform);
        setShowCreateEditPlatformModal(true);
    }
    return (
        <React.Fragment>
            <div className="overflow-auto">
                <Container fluid>
                    <Row className="d-flex justify-content-center">
                        <div className="d-flex justify-content-center gap-4 rounded">
                            {event_platforms.map((eventPlatform: any, index: any) => (
                                <div key={index} className="bg-white p-3 d-inline-block" style={{ maxWidth: '450px', width: '100%' ,borderRadius:'10px' }}>
                                    <div className="d-flex justify-content-between align-items-center px">
                                        <h5>{eventPlatform.name}</h5>
                                        <Button onClick={() => editAction(eventPlatform)}>
                                            <i className="ri-pencil-fill fs-5"></i>
                                        </Button>
                                    </div>

















                                    
                                </div>
                            ))}

                        </div>
                    </Row>
                </Container>
            </div>

            {showCreateEditPlatformModal && (
                <CreateEditPlatformModal
                    show={showCreateEditPlatformModal}
                    hide={() => setShowCreateEditPlatformModal(false)}
                    onHide={() => setShowCreateEditPlatformModal(false)}
                    platforms={platforms}
                    event_platforms={editPlatform}
                />
            )}
        </React.Fragment>
    )

}
export default Platform;