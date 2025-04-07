import { Head } from "@inertiajs/react"
import React from "react"
import Layout from "../../../Layouts/Attendee"
import "../../../css/passes.css"
import { useState } from "react";
import { Button, Form } from 'react-bootstrap';
import { router } from '@inertiajs/react';

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
    }
}

const PaymentSuccess = ({ eventApp, attendee, image }) => {
    // Format date similar to Carbon\Carbon::create($event->start_date)->format('d M, Y')
    const formatDate = (dateString) => {
        if (!dateString) return ""
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })
    }

    // Check if image is an array or convert it to an array if it's a single item
    const images = Array.isArray(image) ? image : [image]
    const [emails, setEmails] = useState(images.map(() => ""));

    return (
        <React.Fragment>
            <Head title="Attendee Pass" />
            <style>{`
    .passWrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      font-family: 'Figtree', sans-serif;
      overflow-x: hidden;
      flex-direction: column;
    }

    .passes-container {
      width: 100%;
      max-width: 100vw;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .pass {
      width: 100%;
      max-width: 400px;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      padding: 30px 20px;
      text-align: center;
      box-sizing: border-box;
    }

    .div-gradient {
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      color: white;
    }

    .heading-wraper {
      margin-bottom: 20px;
    }

    .circle {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid white;
      margin-bottom: 15px;
    }

    .event-name {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .event-date {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 20px;
    }

    .qrWrapper {
      background: white;
      padding: 20px;
      border-radius: 12px;
      display: inline-block;
      margin-bottom: 20px;
    }

    .qr-code-img {
      width: 100%;
      max-width: 200px;
      height: auto;
    }

    .attendee-details {
      margin-top: 15px;
    }

    .attendee-name {
      font-size: 20px;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    .form-label {
      color: white;
      margin-top: 1rem;
      display: block;
      font-weight: 500;
    }

    input[type="text"] {
      width: 100%;
      padding: 0.5rem;
      border-radius: 8px;
      border: none;
      margin-top: 0.25rem;
    }

    .btn-primary {
      width: 100%;
      max-width: 400px;
    }

    @media (max-width: 420px) {
      .passWrapper {
        padding: 10px;
      }

      .pass {
        padding: 20px 15px;
      }

      .qr-code-img {
        max-width: 150px;
      }
    }
  `}</style>

            <div className="passWrapper" style={{ marginTop: "100px" }}>
                <div className="passes-container mb-4">
                    {images.map((img, index) => (
                        <div key={index} className="pass div-gradient mt-4 mb-4">
                            <div className="heading-wraper">
                                <img
                                    className="circle"
                                    src={eventApp?.logo_img || "/placeholder.svg?height=80&width=80"}
                                    alt="event logo"
                                />
                                <p className="event-name">{eventApp?.name}</p>
                                <p className="event-date">{formatDate(eventApp?.start_date)}</p>
                            </div>

                            <div className="qrWrapper">
                                <img
                                    className="qr-code-img"
                                    src={img.qr_code}
                                    alt={`QR code ${index + 1}`}
                                />
                            </div>

                            <div className="attendee-details">
                                <p className="attendee-name">
                                    {attendee?.first_name} {attendee?.last_name}
                                </p>
                                <p className="ticket-label">Ticket {img.purchased_id + 1}</p>
                            </div>

                            <label htmlFor={`email-${index}`} className="form-label">
                                Transfer Ticket <span className="text-danger ms-1">*</span>
                            </label>
                            <input
                                id={`email-${img.purchased_id}`}
                                type="text"
                                name={`email-${img.purchased_id}`}
                                placeholder="Enter New Email"
                                value={emails[img.purchased_id]}
                                autoComplete="email"
                                onChange={(e) => {
                                    const newEmails = [...emails];
                                    newEmails[img.purchased_id] = e.target.value;
                                    setEmails(newEmails);
                                }}
                            />
                        </div>
                    ))}

                    <button
                        className="btn btn-primary mt-4 mb-4"
                        onClick={() => {
                            router.post(route("attendee.tickets.transfer"), {
                                emails: emails,
                            });
                        }}
                    >
                        Transfer Tickets
                    </button>
                </div>
            </div>
        </React.Fragment>

    )
}

PaymentSuccess.layout = (page: any) => <Layout children={page} />
export default PaymentSuccess

