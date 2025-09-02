import { Dropdown, ListGroupItem } from "react-bootstrap";
import { fieldTypes } from "../../../../../../common/data/formBuilderFieldTypes";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import DeleteModal from "../../../../../../Components/Common/DeleteModal";
import { router } from "@inertiajs/react";
import CreateEditFieldModal from "./CreateEditFieldModal";
import { useLaravelReactI18n } from "laravel-react-i18n";

export default function FormField({ field }: any) {
    const { t } = useLaravelReactI18n();
    const Icon = fieldTypes[field.type]?.icon;
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showEditFieldModal, setShowEditFieldModal] = useState(false);

    const handleDelete = () => {
        router.delete(
            route(
                "organizer.events.settings.questionnaire-form-fields.destroy",
                field.id
            ),
            {
                preserveScroll: true,
            }
        );
    };

    return (
        <ListGroupItem
            className="list-group-item-action d-flex align-items-center justify-content-between cursor-pointer"
            onClick={() => setShowEditFieldModal(true)}
        >
            <div className="d-flex align-items-center gap-2 flex-grow-1">
                {Icon && <Icon size={18} />} {t(field.label)}
            </div>
            <Dropdown onClick={(e) => e.stopPropagation()}>
                <Dropdown.Toggle
                    variant="light"
                    size="sm"
                    className="btn-icon"
                >
                    <Ellipsis size={14} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setShowEditFieldModal(true)}>
                        {t("Edit")}
                    </Dropdown.Item>
                    <Dropdown.Item
                        className="text-danger fw-semibold"
                        onClick={() => setShowDeleteConfirmation(true)}
                    >
                        {t("Delete")}
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <div onClick={(e) => e.stopPropagation()}>
                <CreateEditFieldModal
                    show={showEditFieldModal}
                    onHide={() => setShowEditFieldModal(false)}
                    field={field}
                />
                <DeleteModal
                    show={showDeleteConfirmation}
                    onDeleteClick={handleDelete}
                    onCloseClick={() => setShowDeleteConfirmation(false)}
                />
            </div>
        </ListGroupItem>
    );
}
