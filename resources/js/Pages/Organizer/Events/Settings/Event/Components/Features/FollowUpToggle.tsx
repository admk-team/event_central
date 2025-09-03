import { useForm, usePage } from "@inertiajs/react";
import React from "react";
import { ListGroupItem } from "react-bootstrap";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import { useLaravelReactI18n } from "laravel-react-i18n";

export default function FollowUpToggle() {
    const { t } = useLaravelReactI18n();
    const follow_up_event = usePage().props.follow_up_event as boolean;

    const switchRef = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
        if (switchRef.current) {
            switchRef.current.checked = follow_up_event;
        }
    }, [follow_up_event]);

    const { post } = useForm();

    const toggleFeature = () => {
        post(route("organizer.events.settings.event.follow-up-event"), {
            preserveScroll: true,
        });
    };

    return (
        <ListGroupItem className="d-flex justify-content-between align-items-center">
            <div>
                <div>
                    {t("Toggle Follow Up")} {follow_up_event ? t("On") : t("Off")}
                </div>
            </div>

            <div className="form-check form-switch form-switch-lg" dir="ltr">
                <FormCheckInput
                    ref={switchRef}
                    type="checkbox"
                    className="form-check-input"
                    onChange={toggleFeature}
                />
            </div>
        </ListGroupItem>
    );
}
