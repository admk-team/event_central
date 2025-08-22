import { useForm, usePage } from "@inertiajs/react";
import React from "react";
import { ListGroupItem } from "react-bootstrap";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";

export default function FollowUpToggle() {
    const follow_up_event = usePage().props.follow_up_event as boolean;

    const switchRef = React.useRef<HTMLInputElement | null>(null);
    console.log('testing...........', follow_up_event);


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
                <div>Toggle Follow Up {follow_up_event ? "On" : "Off"}</div>
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