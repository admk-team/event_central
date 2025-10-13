import { useForm, usePage } from "@inertiajs/react";
import React from "react";
import { ListGroupItem, Button, Form } from "react-bootstrap";
import { useLaravelReactI18n } from "laravel-react-i18n";

export default function ChangeAfterEvent() {
    const { t } = useLaravelReactI18n();
    const afterEventDays = usePage().props.after_days as number | null;

    const { data, setData, post, processing, errors } = useForm({
        days_after_event: afterEventDays ?? "", // number or empty string
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Ensure it's sent as a number
        const payload = {
            after_days: parseInt(data.days_after_event.toString(), 10)
        };

        post(route("organizer.events.settings.event.after-event"), {
            data: payload,
            preserveScroll: true,
        });
    };

    return (
        <ListGroupItem>
            <Form onSubmit={handleSubmit}>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <div>{t("Send email After event")}</div>
                        <small className="text-muted">
                            {t("Set Send Email after event finished.")}
                        </small>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                        <Form.Control
                            type="number"
                            min={1}
                            placeholder={t("e.g. 3")}
                            value={data.days_after_event}
                            onChange={(e) => {
                                const value = e.target.value;
                                // Prevent leading zeros and only allow numbers
                                const cleaned = value.replace(/^0+/, '');
                                setData("days_after_event", cleaned);
                            }}
                            style={{ width: "80px" }}
                            isInvalid={!!errors.days_after_event}
                        />
                        <Button type="submit" disabled={processing}>
                            {t("Save")}
                        </Button>
                    </div>
                </div>
                {errors.days_after_event && (
                    <div className="text-danger mt-1">
                        {errors.days_after_event}
                    </div>
                )}
            </Form>
        </ListGroupItem>
    );
}
