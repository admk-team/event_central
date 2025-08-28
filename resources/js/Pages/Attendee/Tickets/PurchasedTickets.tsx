import { Head, router } from "@inertiajs/react";
import React, { useMemo, useState } from "react";
import Layout from "../../../Layouts/Attendee";
import { Button } from "react-bootstrap";
import "../../../css/passes.css";
import CancelTicketButton from "./Components/CancelTicket";
import ChangeTicketDetailsModal from "./Components/ChangeTicketDetailsModal";

interface ImageTicket {
    qr_code: string;
    ticket_type_name: string;
    transfer_check: boolean;
    purchased_id: number | string;
    ticket_name: string | null;
    name_on_ticket: string | null;
    position_on_ticket: string | null;
    location_on_ticket: string | null;
}

interface PaymentSuccessProps {
    eventApp: {
        logo_img?: string;
        start_date?: string;
        location_base?: string;
    };
    attendee: {
        name?: string;
        position?: string;
        location?: string;
    };
    image?: ImageTicket[] | ImageTicket;
    hasTickets: boolean;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({
    eventApp,
    attendee,
    image = [],
    hasTickets,
}) => {
    // tickets array normalized
    const images: ImageTicket[] = useMemo(
        () => (Array.isArray(image) ? image : [image]).filter(Boolean) as ImageTicket[],
        [image]
    );

    // Map purchased_id -> { name, position, location } for inline preview
    const [detailsByTicket, setDetailsByTicket] = useState<
        Record<string | number, { name: string; position: string; location: string }>
    >(() => {
        const initial: Record<
            string | number,
            { name: string; position: string; location: string }
        > = {};
        images.forEach((img) => {
            initial[img.purchased_id] = {
                name: attendee?.name ?? "",
                position: attendee?.position ?? "",
                location: attendee?.location ?? "",
            };
        });
        return initial;
    });

    // Map purchased_id -> email string (for transfer flow)
    const [emailsByTicket, setEmailsByTicket] = useState<
        Record<string | number, string>
    >(() => {
        const initial: Record<string | number, string> = {};
        images.forEach((img) => (initial[img.purchased_id] = ""));
        return initial;
    });

    // Change details modal state
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedPurchasedId, setSelectedPurchasedId] = useState<
        string | number | null
    >(null);

    const formatDate = (dateString?: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const onOpenDetails = (purchased_id: string | number) => {
        setSelectedPurchasedId(purchased_id);
        setShowDetailsModal(true);
    };

    const onSavedDetails = (vals: {
        name: string;
        position: string;
        location: string;
    }) => {
        if (selectedPurchasedId == null) return;
        setDetailsByTicket((prev) => ({ ...prev, [selectedPurchasedId]: vals }));
        setShowDetailsModal(false);
        setSelectedPurchasedId(null);
    };

    return (
        <React.Fragment>
            <Head title="Attendee Pass" />
            <div className="passWrapper" style={{ marginTop: "100px" }}>
                <div className="passes-container mb-4">
                    {!hasTickets ? (
                        <div className="text-center mt-5">
                            <h4>No tickets purchased yet.</h4>
                            <p>Please check back later or contact support.</p>
                        </div>
                    ) : (
                        <>
                            {images.map((img, index) => {
                                console.log(img);
                                const d =
                                    detailsByTicket[img.purchased_id] ?? ({
                                        name: img.name_on_ticket ? img.name_on_ticket : attendee?.name,
                                        position: img.position_on_ticket ? img.position_on_ticket : attendee?.position,
                                        location: img.location_on_ticket ? img.location_on_ticket : attendee?.location,
                                    } as const);

                                return (
                                    <div key={String(img.purchased_id)} className="pass div-gradient mt-4 mb-4">
                                        <div className="heading-wraper">
                                            <img
                                                className="circle"
                                                src={
                                                    eventApp?.logo_img ||
                                                    "/placeholder.svg?height=80&width=80"
                                                }
                                                alt="event logo"
                                            />
                                            <p className="event-location">
                                                {formatDate(eventApp?.start_date)}
                                                {eventApp?.start_date && eventApp?.location_base ? " | " : ""}{" "}
                                                {eventApp?.location_base}
                                            </p>
                                            <h1 className="attendee-name">{d.name}</h1>
                                            <h3 className="attendee-name">{img.position_on_ticket ? img.position_on_ticket : attendee?.position}</h3>
                                        </div>

                                        <div className="qrWrapper">
                                            <img
                                                className="qr-code-img"
                                                src={img.qr_code}
                                                alt={`QR code ${index + 1}`}
                                            />
                                        </div>

                                        <div className="attendee-details">
                                            <span className="location">{d.location}</span>
                                            <p className="attendee-name">{img.ticket_type_name}</p>
                                        </div>

                                        {/* Only show transfer + change actions if not locked (transfer_check === false) */}
                                        {!img.transfer_check && (
                                            <>
                                                <label
                                                    htmlFor={`email-${img.purchased_id}`}
                                                    className="form-label-pass"
                                                >
                                                    Transfer Ticket{" "}
                                                    <span className="text-danger ms-1">*</span>
                                                </label>
                                                <input
                                                    className="input-email-qrcode mb-3"
                                                    id={`email-${img.purchased_id}`}
                                                    type="text"
                                                    name={`email-${img.purchased_id}`}
                                                    placeholder="Enter New Email"
                                                    value={emailsByTicket[img.purchased_id] ?? ""}
                                                    autoComplete="email"
                                                    onChange={(e) =>
                                                        setEmailsByTicket((prev) => ({
                                                            ...prev,
                                                            [img.purchased_id]: e.target.value,
                                                        }))
                                                    }
                                                />

                                                <div className="d-flex justify-content-between">
                                                    <CancelTicketButton purchased_id={img.purchased_id} />
                                                    <Button
                                                        size="sm"
                                                        variant="secondary"
                                                        onClick={() => onOpenDetails(img.purchased_id)}
                                                    >
                                                        Change Ticket Details
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                );
                            })}

                            {/* Transfer Tickets (posts all entered emails keyed by purchased_id) */}
                            {images.some((img) => !img.transfer_check) && (
                                <button
                                    className="btn btn-primary btn-primary-pass mt-4 mb-4"
                                    onClick={() => {
                                        router.post(route("attendee.tickets.transfer"), {
                                            emails: emailsByTicket,
                                        });
                                    }}
                                >
                                    Transfer Tickets
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Change Ticket Details Modal */}
            {showDetailsModal && selectedPurchasedId != null && (
                <ChangeTicketDetailsModal
                    show={showDetailsModal}
                    onHide={() => setShowDetailsModal(false)}
                    purchasedId={selectedPurchasedId}
                    initial={{
                        name:
                            detailsByTicket[selectedPurchasedId]?.name ??
                            attendee?.name ??
                            "",
                        position:
                            detailsByTicket[selectedPurchasedId]?.position ??
                            attendee?.position ??
                            "",
                        location:
                            detailsByTicket[selectedPurchasedId]?.location ??
                            attendee?.location ??
                            "",
                    }}
                    onSaved={onSavedDetails}
                />
            )}
        </React.Fragment>
    );
};

(PaymentSuccess as any).layout = (page: any) => <Layout children={page} />;
export default PaymentSuccess;
