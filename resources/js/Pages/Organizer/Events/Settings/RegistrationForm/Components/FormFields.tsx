import { Ellipsis, Plus, Text } from 'lucide-react'
import { useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Dropdown, DropdownToggle, ListGroup, ListGroupItem } from 'react-bootstrap'
import CreateEditFieldModal from './CreateEditFieldModal';
import FieldTypesModal from './FieldTypesModal';
import { FieldType, fieldTypes } from '../../../../../../common/data/formBuilderFieldTypes';
import { usePage } from '@inertiajs/react';

export default function FormFields() {
    const form = usePage().props.form as any;

    const [showFieldsModal, setShowFieldsModal] = useState(false);
    const [selectedFieldType, setSelectedFieldType] = useState<FieldType | null>(null);
    const [showCreateEditFieldModal, _setShowCreateEditFieldModal] = useState(false);

    const setShowCreateEditFieldModal = (state: boolean) => {
        _setShowCreateEditFieldModal(state);
        if (state === false) {
            setSelectedFieldType(null);
        }
    }

    const onFieldTypeSelect = (fieldType: FieldType) => {
        setSelectedFieldType(fieldType);
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
                        {form.fields.map((field: any) => (
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
                        ))}
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

            {selectedFieldType && (
                <CreateEditFieldModal
                    show={showCreateEditFieldModal}
                    onHide={() => setShowCreateEditFieldModal(false)}
                    fieldType={selectedFieldType}
                />
            )}
        </>
    )
}
