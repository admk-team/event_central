import { Ellipsis, Plus, Text } from 'lucide-react'
import { useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Dropdown, DropdownToggle, ListGroup, ListGroupItem } from 'react-bootstrap'
import FieldTypesModal from './FieldTypeSModal';
import CreateEditFieldModal from './CreateEditFieldModal';

export default function FormFields() {
    const [showFieldsModal, setShowFieldsModal] = useState(false);
    const [selectedFieldType, setSelectedFieldType] = useState<string | null>(null);
    const [showCreateEditFieldModal, _setShowCreateEditFieldModal] = useState(false);

    const setShowCreateEditFieldModal = (state: boolean) => {
        _setShowCreateEditFieldModal(state);
        if (state === false) {
            setSelectedFieldType(null);
        }
    }

    const onFieldTypeSelect = (type: string) => {
        setSelectedFieldType(type);
        setShowCreateEditFieldModal(true);
    }

    return (
        <>
            <Card className="form-fields">
                <CardHeader>
                    <CardTitle className="mb-0">Fields</CardTitle>
                </CardHeader>
                <CardBody style={{maxHeight: '400px', overflowY: 'auto'}}>
                    <ListGroup className="mb-1">
                        <ListGroupItem className="list-group-item-action d-flex align-items-center justify-content-between cursor-pointer">
                            <div className="d-flex align-items-center gap-2">
                                <Text size={18} />First Name
                            </div>
                            <Dropdown onClick={e => e.stopPropagation()}>
                                <Dropdown.Toggle
                                    variant="light"
                                    size="sm"
                                    className="btn-icon"
                                >
                                    <Ellipsis size={14} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item> Edit</Dropdown.Item>
                                    <Dropdown.Item
                                        className="text-danger fw-semibold"
                                    >
                                        Delete
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </ListGroupItem>
                    </ListGroup>
                </CardBody>
                <CardFooter>
                    <Button 
                        variant="primary" 
                        className="d-block w-100 d-flex align-items-center justify-content-center"
                        onClick={() => setShowFieldsModal(true)}
                    >
                        <Plus size={18} />Add Field
                    </Button>
                </CardFooter>
            </Card>

            <FieldTypesModal
                show={showFieldsModal}
                onHide={() => setShowFieldsModal(false)}
                onSelect={onFieldTypeSelect}
            />

            <CreateEditFieldModal
                show={showCreateEditFieldModal}
                onHide={() => setShowCreateEditFieldModal(false)}
                fieldType={selectedFieldType}
            />
        </>
    )
}
