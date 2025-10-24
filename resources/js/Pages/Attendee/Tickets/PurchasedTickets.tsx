import { Head, router } from "@inertiajs/react";
import React, { useState } from "react";
import Layout from "../../../Layouts/Attendee";
import { Button, Modal, Form } from "react-bootstrap";
import "../../../css/passes.css";
import CancelTicketButton from "./Components/CancelTicket";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { Pencil } from "lucide-react"; // icon for edit

interface TicketImage {
    qr_code: string;
    purchased_id: number;
    event_app_ticket_id: number;
    transfer_check: boolean;
    ticket_name: string;
    ticket_type_name: string;
    attendee_name?: string;
    attendee_position?: string;
    attendee_location?: string;
}

interface EventApp {
    logo_img: string;
    name: string;
    description: string;
    start_date: string;
    location_base?: string;
}

interface Attendee {
    id: number;
    name: string;
    position?: string;
    location?: string;
}

interface PaymentSuccessProps {
    eventApp: EventApp;
    attendee: Attendee;
    image: TicketImage[];
    hasTickets: boolean;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({
    eventApp,
    attendee,
    image = [],
    hasTickets,
}) => {
    const { t } = useLaravelReactI18n();

    const [tickets, setTickets] = useState<TicketImage[]>(image);
    const [emails, setEmails] = useState<Record<number, string>>({});
    const [showModal, setShowModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState<TicketImage | null>(null);

    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const handleOpenModal = (ticket: TicketImage) => {
        setSelectedTicket({ ...ticket });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedTicket(null);
        setShowModal(false);
    };

    const handleSaveChanges = () => {
        if (!selectedTicket) return;

        router.post(route("attendee.tickets.update"), {
            id: selectedTicket.purchased_id,
            attendee_name: selectedTicket.attendee_name,
            attendee_position: selectedTicket.attendee_position,
            attendee_location: selectedTicket.attendee_location,
        });

        const updated = tickets.map((t) =>
            t.purchased_id === selectedTicket.purchased_id ? selectedTicket : t
        );
        setTickets(updated);
        handleCloseModal();
    };

    const handleTransferTickets = () => {
        router.post(route("attendee.tickets.transfer"), {
            emails,
        });
    };

    return (
        <React.Fragment>
            <Head title={t("Attendee Pass")} />
            <div className="passWrapper" style={{ marginTop: "100px" }}>
                <div className="passes-container mb-4">
                    {!hasTickets ? (
                        <div className="text-center mt-5">
                            <h4>{t("No tickets purchased yet.")}</h4>
                            <p>{t("Please check back later or contact support.")}</p>
                        </div>
                    ) : (
                        <>
                            {tickets.map((img, index) => (
                                <div
                                    key={index}
                                    className="pass div-gradient mt-4 mb-4 position-relative"
                                >
                                    {/* Edit Icon */}
                                    <Button
                                        variant="link"
                                        className="position-absolute top-0 end-0 m-2 text-white"
                                        onClick={() => handleOpenModal(img)}
                                        style={{
                                            background: "transparent",
                                            border: "none",
                                            padding: 0,
                                        }}
                                    >
                                        <Pencil size={22} />
                                    </Button>

                                    <div className="heading-wraper text-center">
                                        <img
                                            style={{
                                                height: "160px",
                                                width: "160px",
                                                objectFit: "cover",
                                                margin: "0 auto",
                                            }}
                                            className="circle"
                                            src={
                                                eventApp?.logo_img ||
                                                "/placeholder.svg?height=80&width=80"
                                            }
                                            alt={t("event logo")}
                                        />

                                        <p className="event-location">
                                            {formatDate(eventApp?.start_date)}{" "}
                                            {eventApp?.start_date && eventApp?.location_base
                                                ? " | "
                                                : ""}{" "}
                                            {eventApp?.location_base}
                                        </p>

                                        <h1 className="attendee-name">
                                            {img.attendee_name || attendee.name}
                                        </h1>
                                        <h3 className="attendee-name">
                                            {img.attendee_position || attendee.position}
                                        </h3>
                                    </div>

                                    <div className="qrWrapper">
                                        <img
                                            className="qr-code-img"
                                            src={img.qr_code}
                                            alt={`${t("QR code")} ${index + 1}`}
                                        />
                                    </div>

                                    <div className="attendee-details text-center">
                                        <span className="location">
                                            {img.attendee_location || attendee.location}
                                        </span>
                                        <p className="attendee-name">{img.ticket_type_name}</p>
                                    </div>

                                    {/* Transfer + Cancel section (unchanged) */}
                                    {!img.transfer_check && (
                                        <>
                                            <label
                                                htmlFor={`email-${index}`}
                                                className="form-label-pass"
                                            >
                                                {t("Transfer Ticket")}{" "}
                                                <span className="text-danger ms-1">*</span>
                                            </label>
                                            <input
                                                className="input-email-qrcode mb-3"
                                                id={`email-${img.purchased_id}`}
                                                type="text"
                                                name={`email-${img.purchased_id}`}
                                                placeholder={t("Enter New Email")}
                                                value={emails[img.purchased_id] || ""}
                                                autoComplete="email"
                                                onChange={(e) =>
                                                    setEmails({
                                                        ...emails,
                                                        [img.purchased_id]: e.target.value,
                                                    })
                                                }
                                            />
                                            <CancelTicketButton purchased_id={img.purchased_id} />
                                        </>
                                    )}
                                </div>
                            ))}

                            {tickets.some((img) => !img.transfer_check) && (
                                <Button
                                    className="btn btn-primary btn-primary-pass mt-4 mb-4"
                                    onClick={handleTransferTickets}
                                >
                                    {t("Transfer Tickets")}
                                </Button>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Edit Modal */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{t("Edit Attendee Information")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedTicket && (
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>{t("Attendee Name")}</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={selectedTicket.attendee_name || ""}
                                    onChange={(e) =>
                                        setSelectedTicket({
                                            ...selectedTicket,
                                            attendee_name: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>{t("Position")}</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={selectedTicket.attendee_position || ""}
                                    onChange={(e) =>
                                        setSelectedTicket({
                                            ...selectedTicket,
                                            attendee_position: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>{t("Location")}</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={selectedTicket.attendee_location || ""}
                                    onChange={(e) =>
                                        setSelectedTicket({
                                            ...selectedTicket,
                                            attendee_location: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        {t("Cancel")}
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        {t("Save Changes")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
};

PaymentSuccess.layout = (page: any) => <Layout children={page} />;
export default PaymentSuccess;
