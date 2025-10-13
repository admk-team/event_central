import { Ellipsis, Plus, Text } from 'lucide-react'
import { useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Dropdown, DropdownToggle, ListGroup, ListGroupItem } from 'react-bootstrap'
import CreateEditFieldModal from './CreateEditFieldModal';
import FieldTypesModal from './FieldTypesModal';
import { FieldType, fieldTypes } from '../../../../../../common/data/formBuilderFieldTypes';
import { usePage } from '@inertiajs/react';
import FormField from './FormField';
import { useLaravelReactI18n } from 'laravel-react-i18n';
export default function FormFields() {
    const form = usePage().props.form as any;
    const { t } = useLaravelReactI18n();

    const [showFieldsModal, setShowFieldsModal] = useState(false);
    const [selectedFieldType, setSelectedFieldType] = useState<FieldType | null>(null);
    const [showCreateFieldModal, _setShowCreateFieldModal] = useState(false);

    const setShowCreateFieldModal = (state: boolean) => {
        _setShowCreateFieldModal(state);
        if (state === false) {
            setSelectedFieldType(null);
        }
    }

    const onFieldTypeSelect = (fieldType: FieldType) => {
        setSelectedFieldType(fieldType);
        setShowCreateFieldModal(true);
    }

    return (
        <>
            <Card className="form-fields">
                <CardHeader>
                    <CardTitle className="mb-0">{t('Fields')}</CardTitle>
                </CardHeader>
                <CardBody style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <ListGroup className="mb-1">
                        {form.fields.map((field: any) => <FormField key={field.id} field={field} />)}
                    </ListGroup>
                </CardBody>
                <CardFooter>
                    <Button
                        variant="primary"
                        className="d-block w-100 d-flex align-items-center justify-content-center"
                        onClick={() => setShowFieldsModal(true)}
                    >
                        <Plus size={18} />{t('Add Field')}
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
                    show={showCreateFieldModal}
                    onHide={() => setShowCreateFieldModal(false)}
                    fieldType={selectedFieldType}
                />
            )}
        </>
    )
}
