import { useForm, router, usePage } from "@inertiajs/react";
import React, { Fragment } from "react";
import { ListGroupItem, Button, Form, Row, Col } from "react-bootstrap";
import { useLaravelReactI18n } from "laravel-react-i18n";

export default function ChangeReminderDays() {
    const { t } = useLaravelReactI18n();
    const reminderDays = usePage().props.reminderDays || [];

    const { data, setData, processing, errors } = useForm({
        days_before_event: reminderDays.map((r: any) => ({
            id: r.id,
            days_before_event: r.days,
        })),
    });

    const handleSubmit = (index: number) => {
        const payload = {
            id: data.days_before_event[index].id,
            days_before_event: parseInt(data.days_before_event[index].days_before_event.toString(), 10),
        };

        console.log("Submitting payload:", payload);

        router.post(route("organizer.events.settings.event.reminder-closer"), payload, {
            preserveScroll: true,
        });
    };

    const handleAddReminder = () => {
        setData("days_before_event", [
            ...data.days_before_event,
            {  id: null, days_before_event: "" },
        ]);
    };

    const handleMinusReminder = (index: number) => {

        const removedReminder = data.days_before_event[index];
        const updated = [...data.days_before_event];
        updated.splice(index, 1);
        setData("days_before_event", updated);
        if (removedReminder.id) {
            router.get(
                route("organizer.events.settings.event.remove-reminder-closer"),
                { id: removedReminder.id },
                { preserveScroll: true }
            );
        }
    };

    const makeEmailReminderScrollable = {
        maxHeight: data.days_before_event.length > 3 ? "300px" : "auto",
        overflowY: data.days_before_event.length > 3 ? "auto" : "visible",
    };

    return (
        <Fragment>
            <Row>
                <Col lg="8">
                    <div>
                        <div>{t("Send email reminder before event")}</div>
                        <small className="text-muted">
                            {t("Set how many days before the event start.")}
                        </small>
                    </div>
                </Col>
                <Col lg="4" className="mb-3 d-flex justify-content-end">
                    <Button onClick={handleAddReminder}>
                        <i className="bx bx-plus"></i>
                    </Button>
                </Col>
            </Row>

            <div style={makeEmailReminderScrollable}>
                {data.days_before_event.map((reminder: any, index: number) => (
                    <ListGroupItem key={index} className="mb-3">
                        <Col lg="12">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center gap-2">
                                    <Form.Control
                                        type="number"
                                        placeholder={t("e.g. 3")}
                                        value={reminder.days_before_event}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/^0+/, "");
                                            const updated = [...data.days_before_event];
                                            updated[index] = {
                                                ...updated[index],
                                                days_before_event: value,
                                            };
                                            setData("days_before_event", updated);
                                        }}
                                        isInvalid={!!errors.days_before_event}
                                    />
                                    <Button onClick={() => handleMinusReminder(index)}>
                                        <i className="bx bx-minus"></i>
                                    </Button>

                                    <Button
                                        type="button"
                                        onClick={() => handleSubmit(index)}
                                        disabled={processing}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </ListGroupItem>
                ))}
            </div>
        </Fragment>
    );
}
