import { Head } from "@inertiajs/react"
import React, { useState } from "react"
import Layout from "../../../Layouts/Attendee"
import { Button, Form } from 'react-bootstrap';
import { router } from '@inertiajs/react';
import '../../../css/passes.css';
import CancelTicketButton from "./Components/CancelTicket";
import { useLaravelReactI18n } from "laravel-react-i18n";

interface AttendeePassProps {
    event: {
        logo_img: string
        name: string
        description: string
        start_date: string
    }
    attendee: {
        id: string
        first_name: string
        last_name: string
        location: string
    }
}

const PaymentSuccess = ({ eventApp, attendee, image = [], hasTickets }) => {
    const { t } = useLaravelReactI18n();

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const images = Array.isArray(image) ? image : [image];
    const [emails, setEmails] = useState(images.map(() => ""));

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
                            {images.map((img, index) => (
                                <div key={index} className="pass div-gradient mt-4 mb-4">
                                    <div className="heading-wraper">
                                        <img
                                            className="circle"
                                            src={eventApp?.logo_img || "/placeholder.svg?height=80&width=80"}
                                            alt={t("event logo")}
                                        />
                                        <p className="event-location">
                                            {formatDate(eventApp?.start_date)}{" "}
                                            {eventApp?.start_date && eventApp?.location_base ? " | " : ""}{" "}
                                            {eventApp?.location_base}
                                        </p>
                                        <h1 className="attendee-name">{attendee?.name}</h1>
                                        <h3 className="attendee-name">{attendee?.position}</h3>
                                    </div>

                                    <div className="qrWrapper">
                                        <img
                                            className="qr-code-img"
                                            src={img.qr_code}
                                            alt={`${t("QR code")} ${index + 1}`}
                                        />
                                    </div>

                                    <div className="attendee-details">
                                        <span className="location">{attendee?.location}</span>
                                        <p className="attendee-name">{img.ticket_type_name}</p>
                                    </div>

                                    {!img.transfer_check && (
                                        <>
                                            <label htmlFor={`email-${index}`} className="form-label-pass">
                                                {t("Transfer Ticket")} <span className="text-danger ms-1">*</span>
                                            </label>
                                            <input
                                                className="input-email-qrcode mb-3"
                                                id={`email-${img.purchased_id}`}
                                                type="text"
                                                name={`email-${img.purchased_id}`}
                                                placeholder={t("Enter New Email")}
                                                value={emails[img.purchased_id]}
                                                autoComplete="email"
                                                onBlur={(e) => {
                                                    const newEmails = [...emails];
                                                    newEmails[img.purchased_id] = e.target.value;
                                                    setEmails(newEmails);
                                                }}
                                            />
                                            <CancelTicketButton purchased_id={img.purchased_id} />
                                        </>
                                    )}
                                </div>
                            ))}
                            {images.some((img) => !img.transfer_check) && (
                                <button
                                    className="btn btn-primary btn-primary-pass mt-4 mb-4"
                                    onClick={() => {
                                        router.post(route("attendee.tickets.transfer"), {
                                            emails: emails,
                                        });
                                    }}
                                >
                                    {t("Transfer Tickets")}
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </React.Fragment>
    )
}

PaymentSuccess.layout = (page: any) => <Layout children={page} />
export default PaymentSuccess
