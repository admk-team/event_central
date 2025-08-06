import { useForm, usePage } from "@inertiajs/react";
import React from "react";
import { ListGroupItem } from "react-bootstrap";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";

export default function CheckIn() {
    const enableCheckIn = usePage().props.enableCheckIn as boolean;

    const switchRef = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
        if (switchRef.current) {
            switchRef.current.checked = enableCheckIn;
        }
    }, [enableCheckIn]);

    const { post } = useForm();

    const toggleFeature = () => {
        post(route("organizer.events.settings.event.toggle-checkin"), {
            preserveScroll: true,
        });
    };

    return (
        <ListGroupItem className="d-flex justify-content-between align-items-center">
            <div>Prevent session check-in without an event Check-in</div>
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
