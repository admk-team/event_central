import { useForm, usePage } from "@inertiajs/react";
import React from "react";
import { ListGroupItem } from "react-bootstrap";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";

export default function PrivateToggleRegister() {
    const enablePrivateRegistraion = usePage().props
        .enablePrivateRegistraion as boolean;

    const switchRef = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
        if (switchRef.current) {
            switchRef.current.checked = enablePrivateRegistraion;
        }
    }, [enablePrivateRegistraion]);

    const { post } = useForm();

    const toggleFeature = () => {
        post(route("organizer.events.settings.event.toggle-register"), {
            preserveScroll: true,
        });
    };

    return (
        <ListGroupItem className="d-flex justify-content-between align-items-center">
            <div>
                <div>Toggle Private Registration via Email</div>
                <small className="text-muted">
                    {enablePrivateRegistraion
                        ? "Private registration (share-link via email)."
                        : "Public registration (anyone with the link can register)."}
                </small>
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
