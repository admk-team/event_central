import { useForm, usePage } from "@inertiajs/react";
import React from "react";
import { ListGroupItem } from "react-bootstrap";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import { useLaravelReactI18n } from "laravel-react-i18n";

export default function CheckIn() {
    const { t } = useLaravelReactI18n();
    const enableOrganizerChat = usePage().props.organizer_chat as boolean;

    const switchRef = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
        if (switchRef.current) {
            switchRef.current.checked = enableOrganizerChat;
        }
    }, [enableOrganizerChat]);

    const { post } = useForm();

    const toggleFeature = () => {
        post(route("organizer.events.settings.event.organizer-chat"), {
            preserveScroll: true,
        });
    };

    return (
        <ListGroupItem className="d-flex justify-content-between align-items-center">
            <div>{t("Allow attendees to chat with Event organizers/Staff")}</div>
            <div className="d-flex align-items-center gap-3">
                <div
                    className="form-check form-switch form-switch-lg"
                    dir="ltr"
                >
                    <FormCheckInput
                        ref={switchRef}
                        type="checkbox"
                        className="form-check-input"
                        onChange={toggleFeature}
                    />
                </div>
            </div>
        </ListGroupItem>
    );
}
