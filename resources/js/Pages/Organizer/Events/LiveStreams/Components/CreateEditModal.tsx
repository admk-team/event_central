import { useForm } from "@inertiajs/react";
import { Form, FormGroup, Modal, Spinner } from "react-bootstrap";
import Flatpickr from "react-flatpickr";
import { DateTime } from "luxon";
import { useLaravelReactI18n } from "laravel-react-i18n";

interface CreateEditModalProps {
    show: boolean;
    onHide: () => void;
    liveStream: any | null;
    eventTickets: any[] | null;
}

export default function CreateEditModal({
    show,
    onHide,
    liveStream,
    eventTickets,
}: CreateEditModalProps) {
    const isEdit = Boolean(liveStream);

    const { data, setData, post, processing, errors, reset } = useForm({
        _method: isEdit ? "PUT" : "POST",
        title: liveStream?.title ?? "",
        resolution: liveStream?.resolution ?? "1080p",
        start_time: liveStream?.start_time ?? "",
        eventTickets: liveStream?.event_ticket_id ?? "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const url = isEdit
            ? route("organizer.events.live-streams.update", liveStream.id)
            : route("organizer.events.live-streams.store");

        post(url, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onHide();
            },
        });
    };

    const handleDateChange = ([selectedDate]: Date[]) => {
        if (selectedDate) {
            const formattedDateTime = DateTime.fromJSDate(selectedDate, {
                zone: "America/New_York",
            }).toFormat("yyyy-LL-dd HH:mm:ss");

            setData("start_time", formattedDateTime);
        }
    };

    const getParsedDate = () => {
        if (!data.start_time) return null;

        const sqlDate = DateTime.fromSQL(data.start_time, {
            zone: "America/New_York",
        });

        return sqlDate.isValid
            ? sqlDate.toJSDate()
            : DateTime.fromISO(data.start_time, {
                zone: "America/New_York",
            }).toJSDate();
    };
         const { t } = useLaravelReactI18n();

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header className="bg-light p-3" closeButton>
                <h5 className="modal-title">
                    {isEdit ? t("Edit Live Stream") : t("Create Live Stream")}
                </h5>
            </Modal.Header>

            <Form onSubmit={handleSubmit} className="tablelist-form">
                <Modal.Body>
                    {/* Title */}
                    <FormGroup className="mb-3">
                        <Form.Label>{t("Title")}</Form.Label>
                        <Form.Control
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            isInvalid={!!errors.title}
                        />
                        {errors.title && (
                            <Form.Control.Feedback type="invalid">
                                {errors.title}
                            </Form.Control.Feedback>
                        )}
                    </FormGroup>

                    {/* Resolution - Only on Create */}
                    {!isEdit && (
                        <FormGroup className="mb-3">
                            <Form.Label>{t("Resolution")}</Form.Label>
                            <Form.Select
                                value={data.resolution}
                                onChange={(e) => setData("resolution", e.target.value)}
                            >
                                {[
                                    "240p",
                                    "360p",
                                    "480p",
                                    "540p",
                                    "720p",
                                    "1080p",
                                    "1440p",
                                ].map((res) => (
                                    <option key={res} value={res}>
                                        {res}
                                    </option>
                                ))}
                            </Form.Select>
                            {errors.resolution && (
                                <Form.Control.Feedback type="invalid">
                                    {errors.resolution}
                                </Form.Control.Feedback>
                            )}
                        </FormGroup>
                    )}

                    {/* Start Time */}
                    <FormGroup className="mb-3">
                        <Form.Label>{t("Start Time")}</Form.Label>
                        <Flatpickr
                            options={{
                                altInput: true,
                                enableTime: true,
                                altFormat: "d M Y, H:i",
                                dateFormat: "Y-m-d H:i:s",
                            }}
                            value={getParsedDate()}
                            onChange={handleDateChange}
                        />
                    </FormGroup>

                    {/* Event Ticket */}
                    <FormGroup className="mb-3">
                        <Form.Label>Event Ticket</Form.Label>
                        <Form.Select
                            value={data.eventTickets}
                            onChange={(e) => setData("eventTickets", e.target.value)}
                        >
                            <option value="">-- {t("Select Ticket")} --</option>
                            {eventTickets?.length ? (
                                eventTickets.map((ticket) => (
                                    <option key={ticket.id} value={ticket.id}>
                                        {ticket.name} (
                                        {ticket.price ? `$${ticket.price}` : "Free"})
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>
                                    {t("No tickets available")}
                                </option>
                            )}
                        </Form.Select>
                    </FormGroup>
                </Modal.Body>

                {/* Footer */}
                <div className="modal-footer">
                    <div className="hstack gap-2 justify-content-end">
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={onHide}
                        >
                            {t("Close")}
                        </button>

                        <button
                            type="submit"
                            className="btn btn-success"
                            disabled={processing}
                        >
                            {processing ? (
                                <span className="d-flex gap-1 align-items-center">
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    {isEdit ? t("Updating") : t("Creating")}
                                </span>
                            ) : (
                                <span>{isEdit ? t("Update") : t("Create")}</span>
                            )}
                        </button>
                    </div>
                </div>
            </Form>
        </Modal>
    );
}
