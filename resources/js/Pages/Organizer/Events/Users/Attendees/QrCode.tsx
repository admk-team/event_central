import { Head } from "@inertiajs/react"
import React from "react"
import Layout from '../../../../../Layouts/Event';
import BreadCrumb2 from '../../../../../Components/Common/BreadCrumb2';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { useState } from "react";
import "../../../../../css/passes.css"
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

const QrCode = ({ eventApp, attendee, image = [], hasTickets }) => {

    console.log(image);

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
        });
    };

    const images = Array.isArray(image) ? image : [image];
    const [showLogo, setShowLogo] = useState(true);
    const [showGradient, setShowGradient] = useState(true);
    const [isFlipped, setIsFlipped] = useState(false);
      const { t } = useLaravelReactI18n();

    return (
        <React.Fragment>
            <Head>
                <title>Attendees Management </title>
                <meta name="description" content="Manage event attendees, edit details, and delete records from the organizer's dashboard." />
                <meta name="keywords" content="event attendees, attendee management, conference attendees, admin dashboard" />
                <meta name="robots" content="index, follow" />

                {/* Open Graph Meta Tags */}
                <meta property="og:title" content="attendees Management | Organizer Dashboard" />
                <meta property="og:description" content="Manage event attendees, edit details, and delete records from the organizer's dashboard." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={route('organizer.events.attendees.index')} />
            </Head>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb2
                        title={t('Attendee Qr Codes')}
                        items={[
                            { title: "Dashboard", link: route('organizer.events.dashboard') },
                            { title: "Attendees", link: route('organizer.events.attendees.index') }
                        ]}
                    />
                    <Row className="">
                        <Col sm={8}>
                            <h1>{t("Attendee Qr Codes")}</h1>
                        </Col>
                        <Col md={6} className="mt-4">
                            <div className="d-flex flex-column flex-md-row justify-content-md-end align-items-stretch gap-2">
                                <button type="button" className="btn btn-success w-100 w-md-auto" onClick={() => window.print()}>
                                    🖨️ {t("Print All Badges")}
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-secondary w-100 w-md-auto"
                                    onClick={() => setShowLogo((prev) => !prev)}
                                >
                                    {showLogo ? t("🙈 Hide Logo") : t("👁️ Show Logo")}
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-secondary w-100 w-md-auto"
                                    onClick={() => setShowGradient((prev) => !prev)}
                                >
                                    {showGradient ? t("🧼 White Background") : t("🌈 Gradient Background")}
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-info w-100 w-md-auto"
                                    onClick={() => setIsFlipped((prev) => !prev)}
                                >
                                    {isFlipped ? r("↩️ Unflip") : t("🔄 Flip")}
                                </button>
                            </div>
                        </Col>
                    </Row>
                    <div className="passWrapper">
                        <div className="passes-container mb-4">
                            {!hasTickets ? (
                                <div className="text-center mt-5">
                                    <h4>{t("No tickets purchased yet")}</h4>
                                    <p>{t("Please check back later or contact support")}</p>
                                </div>
                            ) : (
                                <>
                                    {images.map((img, index) => (
                                        <div key={index} className="pass div-gradient mt-4 mb-4">
                                            <div className="heading-wraper">
                                                <img
                                                    className="circle"
                                                    src={eventApp?.logo_img || "/placeholder.svg?height=80&width=80"}
                                                    alt="event logo"
                                                />
                                                <p className="event-location">{formatDate(eventApp?.start_date)} {eventApp?.start_date && eventApp?.location_base ? ' | ' : ''} {eventApp?.location_base}</p>
                                                <h1 className="attendee-name">{attendee?.first_name + ' ' + attendee?.last_name}</h1>
                                                <h3 className="attendee-name">{attendee?.position}</h3>
                                            </div>

                                            <div className="qrWrapper">
                                                <img
                                                    className="qr-code-img"
                                                    src={img.qr_code}
                                                    alt={`QR code ${index + 1}`}
                                                />
                                            </div>

                                            <div className="attendee-details">
                                                <span className="location">{attendee?.location}</span>
                                                <p className="attendee-name">{img.ticket_type_name}</p>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="printable">
                        {images.map((img: any, index: number) => (
                            <div key={index} className="passWrapper print-page-break" style={{ transform: isFlipped ? "rotate(180deg)" : "none" }}>
                                <div className="passes-container">
                                    <div className={`pass ${showGradient ? "div-gradient" : "bg-white"} mt-4 mb-4`}>
                                        <div className="heading-wraper">
                                            {showLogo ? (
                                                <img
                                                    className="circle"
                                                    src={eventApp?.logo_img || "/placeholder.svg?height=80&width=80"}
                                                    alt="event logo"
                                                />
                                            ) : (
                                                <div className="eventlogodiv"></div>
                                            )}
                                            <p className="event-location">{eventApp?.location_base}</p>
                                            <h1 className="attendee-name">{attendee?.first_name + ' ' + attendee?.last_name}</h1>
                                            <h3 className="attendee-name">{attendee?.position}</h3>
                                        </div>

                                        <div className="qrWrapper">
                                            <img
                                                className="qr-code-img"
                                                src={img.qr_code}
                                                alt={`QR code ${index + 1}`}
                                            />
                                        </div>

                                        <div className="attendee-details">
                                            <span className="location">{attendee?.location}</span>
                                            <p className="attendee-name">{img.ticket_type_name}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </Container>
            </div>
        </React.Fragment>

    )
}

QrCode.layout = (page: any) => <Layout children={page} />
export default QrCode

