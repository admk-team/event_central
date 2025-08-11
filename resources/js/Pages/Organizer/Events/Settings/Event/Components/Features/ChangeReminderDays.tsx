import { useForm, usePage } from "@inertiajs/react";
import React from "react";
import { ListGroupItem, Button, Form } from "react-bootstrap";

export default function ChangeReminderDays() {
    const reminderDays = usePage().props.reminderDays as number | null;

    const { data, setData, post, processing, errors } = useForm({
        days_before_event: reminderDays ?? "", // number or empty string
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Ensure it's sent as a number
        const payload = {
            reminder_days: parseInt(data.days_before_event.toString(), 10)
        };

        post(route("organizer.events.settings.event.reminder-closer"), {
            data: payload,
            preserveScroll: true,
        });
    };

    return (
        <ListGroupItem>
            <Form onSubmit={handleSubmit}>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <div>Send email reminder before event</div>
                        <small className="text-muted">
                            Set how many days before the event start.
                        </small>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                        <Form.Control
                            type="number"
                            min={1}
                            placeholder="e.g. 3"
                            value={data.days_before_event}
                            onChange={(e) => {
                                const value = e.target.value;
                                // Prevent leading zeros and only allow numbers
                                const cleaned = value.replace(/^0+/, '');
                                setData("days_before_event", cleaned);
                            }}
                            style={{ width: "80px" }}
                            isInvalid={!!errors.days_before_event}
                        />
                        <Button type="submit" disabled={processing}>
                            Save
                        </Button>
                    </div>
                </div>
                {errors.days_before_event && (
                    <div className="text-danger mt-1">
                        {errors.days_before_event}
                    </div>
                )}
            </Form>
        </ListGroupItem>
    );
}
