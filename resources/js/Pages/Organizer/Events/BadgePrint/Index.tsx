import Layout from "../../../../Layouts/Event";
import React, { useState } from "react";
import { Head, router, useForm } from "@inertiajs/react";
import { Col, Container, Form, Row } from "react-bootstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import "../../../../css/passes.css";
import { useLaravelReactI18n } from "laravel-react-i18n";
function Index({
    attendees,
    eventApp,
    customBadgeDesign,
    startDate,
    endDate,
}: {
    attendees: any;
    eventApp: any;
    customBadgeDesign: any;
    startDate: any;
    endDate: any;
}) {
    const { t } = useLaravelReactI18n();
    const [search, setSearch] = useState("");
    const [isFlipped, setIsFlipped] = useState(false);
    const [passSize, setPassSize] = useState("pass"); // default size

    const filteredAttendees = attendees.filter((attendee: any) => {
        const ticketTypes = attendee.qr_codes
            .map((qr: any) => qr.ticket_type_name)
            .join(" ");
        const searchString = (
            attendee.name +
            attendee.position +
            ticketTypes
        ).toLowerCase();
        return searchString.includes(search.toLowerCase());
    });

    const [showLogo, setShowLogo] = useState(true);
    const [showGradient, setShowGradient] = useState(true);

    const printBadge = () => {
        // if (customBadgeDesign && customBadgeDesign.mail_content) {
        //     const url = route('organizer.events.print.badge.design', { search });
        //     window.open(url, '_blank');
        // } else {
        window.print();
        // }
    };

    return (
        <React.Fragment>
            <Head title={t("Badge Printing")} />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb
                        title={t("Badge Printing")}
                        pageTitle={t("Dashboard")}
                    />

                    <Row className="mb-4 justify-between">
                        <Col md={4}>
                            <Form.Label className="text-black">
                                {t("Search Attendee")}
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Search by name or position"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Form.Group
                                controlId="passSizeSelect"
                                className="mb-3 mt-2"
                            >
                                <Form.Label className="text-black">
                                    {t("Select Pass Size")}
                                </Form.Label>
                                <Form.Select
                                    value={passSize}
                                    onChange={(e) =>
                                        setPassSize(e.target.value)
                                    }
                                >
                                    <option value="pass">Default</option>
                                    <option value="pass-4x6">4 x 6</option>
                                    <option value="pass-3_5x5_5">
                                        3.5 x 5.5
                                    </option>
                                    <option value="pass-3x5">3 x 5</option>
                                    <option value="pass-4x4">4 x 4</option>
                                    <option value="pass-2_5x3_5">
                                        2.5 x 3.5
                                    </option>
                                    <option value="pass-cr80">
                                        CR80 (ID Card)
                                    </option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={8} className="mt-4">
                            <div className="d-flex flex-column flex-md-row justify-content-md-end align-items-stretch gap-2">
                                <button
                                    type="button"
                                    className="btn btn-success w-100 w-md-auto"
                                    onClick={printBadge}
                                >
                                    🖨️ {t("Search Attendee")}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary w-100 w-md-auto"
                                    onClick={() => setShowLogo((prev) => !prev)}
                                >
                                    {showLogo
                                        ? "🙈" + t("Hide Logo")
                                        : "👁️ " + "Show Logo"}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary w-100 w-md-auto"
                                    onClick={() =>
                                        setShowGradient((prev) => !prev)
                                    }
                                >
                                    {showGradient
                                        ? "🧼" + t("White Background")
                                        : "🌈" + t("Gradient Background")}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-info w-100 w-md-auto"
                                    onClick={() =>
                                        setIsFlipped((prev) => !prev)
                                    }
                                >
                                    {isFlipped
                                        ? "↩️" + t("Unflip")
                                        : "🔄" + t("Flip")}
                                </button>

                                <button
                                    className="btn btn-primary w-100 w-md-auto"
                                    onClick={() =>
                                        router.visit(
                                            route(
                                                "organizer.events.badge-template.index"
                                            )
                                        )
                                    }
                                >
                                    {t("Badge Template")}
                                </button>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12}>
                            <div className="border p-3 rounded bg-light">
                                <h5 className="mb-3">
                                    {t("Attendees & QR Codes")}
                                </h5>
                                {filteredAttendees.length === 0 ? (
                                    <div>{t("No results found.")}</div>
                                ) : (
                                    filteredAttendees.map(
                                        (attendee: any, index: number) => (
                                            <React.Fragment key={index}>
                                                <div
                                                    key={index}
                                                    className="mb-4 p-3 border rounded bg-transparent shadow-sm"
                                                >
                                                    <Row>
                                                        <Col md={4}>
                                                            <strong>
                                                                {t("Name")}:
                                                            </strong>{" "}
                                                            {attendee.name}{" "}
                                                            <br />
                                                            <strong>
                                                                {t("Position")}:
                                                            </strong>{" "}
                                                            {attendee.position}{" "}
                                                            <br />
                                                            <strong>
                                                                {t(
                                                                    "Ticket Type"
                                                                )}
                                                                :
                                                            </strong>{" "}
                                                            {attendee
                                                                .qr_codes[0]
                                                                ?.ticket_type_name ??
                                                                "N/A"}
                                                        </Col>
                                                        <Col md={8}>
                                                            <strong>
                                                                {t("QR Codes")}:
                                                            </strong>
                                                            <div className="d-flex flex-wrap gap-2 mt-2">
                                                                {attendee.qr_codes.map(
                                                                    (
                                                                        qr: string,
                                                                        idx: number
                                                                    ) => (
                                                                        <img
                                                                            key={
                                                                                idx
                                                                            }
                                                                            src={
                                                                                qr.qr_code
                                                                            }
                                                                            alt="QR Code"
                                                                            width="100"
                                                                            height="100"
                                                                        />
                                                                    )
                                                                )}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </React.Fragment>
                                        )
                                    )
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Printable Badges */}
            {customBadgeDesign == "Default" && (
                <div className="printable">
                    {filteredAttendees.map((attendee: any, index: number) =>
                        attendee.qr_codes.map((qr: string, idx: number) => (
                            <div
                                key={idx}
                                className="passWrapper print-page-break"
                                style={{
                                    transform: isFlipped
                                        ? "rotate(180deg)"
                                        : "none",
                                }}
                            >
                                <div className="passes-container">
                                    <div
                                        className={`${passSize} ${
                                            showGradient
                                                ? "div-gradient"
                                                : "bg-transparent"
                                        } mt-4 mb-4`}
                                    >
                                        <div className="heading-wraper">
                                            {showLogo ? (
                                                <img
                                                    className="circle"
                                                    src={
                                                        eventApp?.logo_img ||
                                                        "/placeholder.svg?height=80&width=80"
                                                    }
                                                    alt="event logo"
                                                />
                                            ) : (
                                                <div className="eventlogodiv"></div>
                                            )}
                                            <p className="event-location">
                                                {eventApp?.location_base}
                                            </p>
                                            <h1 className="attendee-name">
                                                {attendee?.name}
                                            </h1>
                                            <h3 className="attendee-name">
                                                {attendee?.position}
                                            </h3>
                                        </div>

                                        <div className="qrWrapper">
                                            <img
                                                className="qr-code-img"
                                                src={qr.qr_code}
                                                alt={`QR code ${idx + 1}`}
                                            />
                                        </div>

                                        <div className="attendee-details">
                                            <span className="location">
                                                {attendee?.location}
                                            </span>
                                            <p className="attendee-name">
                                                {qr.ticket_type_name}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
            {customBadgeDesign == "Design1" && (
                <div className="printable">
                    {filteredAttendees.map((attendee: any, index: number) =>
                        attendee.qr_codes.map((qr: string, idx: number) => (
                            <div
                                key={idx}
                                className="passWrapper print-page-break"
                                style={{
                                    transform: isFlipped
                                        ? "rotate(180deg)"
                                        : "none",
                                }}
                            >
                                <div className="passes-container">
                                    <div
                                        className={`${passSize} ${
                                            showGradient
                                                ? "div-gradient"
                                                : "bg-transparent"
                                        } mt-4 mb-4`}
                                    >
                                        <div className="attendee-details">
                                            {attendee?.avatar && (
                                                <div className="avatarWrapper">
                                                    <img
                                                        className="avatar-img"
                                                        src={attendee?.avatar}
                                                        alt={`Profile ${
                                                            idx + 1
                                                        }`}
                                                    />
                                                </div>
                                            )}
                                            <h6 className="attendee-name1">
                                                {attendee?.name}
                                            </h6>
                                            <h6 className="attendee-name1">
                                                {attendee?.position}
                                            </h6>

                                            <span className="location1">
                                                {attendee?.location}
                                            </span>
                                            <p className="attendee-name1">
                                                {qr.ticket_type_name}
                                            </p>
                                        </div>

                                        <div className="qrWrapper">
                                            <img
                                                className="qr-code-img"
                                                src={qr.qr_code}
                                                alt={`QR code ${idx + 1}`}
                                            />
                                        </div>
                                        <div className="footer-wraper">
                                            {/* {showLogo ? (
                                                <img
                                                    className="circle"
                                                    src={
                                                        eventApp?.logo_img ||
                                                        "/placeholder.svg?height=80&width=80"
                                                    }
                                                    alt="event logo"
                                                />
                                            ) : (
                                                <div className="eventlogodiv"></div>
                                            )} */}
                                            <h1 className="attendee-name1">
                                                {eventApp?.name}
                                            </h1>
                                            <span className="location1">
                                                {eventApp?.location_base}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
            {customBadgeDesign == "Design2" && (
                <div className="printable">
                    {filteredAttendees.map((attendee: any, index: number) =>
                        attendee.qr_codes.map((qr: string, idx: number) => (
                            <div
                                key={idx}
                                className="passWrapper print-page-break"
                                style={{
                                    transform: isFlipped
                                        ? "rotate(180deg)"
                                        : "none",
                                }}
                            >
                                <div className="passes-container">
                                    <div
                                        className={`${passSize} ${
                                            showGradient
                                                ? "div-gradient"
                                                : "bg-transparent"
                                        } mt-4 mb-4`}
                                    >
                                        <div className="heading-wraper">
                                            {showLogo ? (
                                                <img
                                                    className="circle"
                                                    src={
                                                        eventApp?.logo_img ||
                                                        "/placeholder.svg?height=80&width=80"
                                                    }
                                                    alt="event logo"
                                                />
                                            ) : (
                                                <div className="eventlogodiv"></div>
                                            )}

                                            <span className="attendee-name1">
                                                {eventApp?.location_base}
                                            </span>
                                            <span className="location">
                                                {startDate}{" "}
                                                {endDate && <>➡️ {endDate}</>}
                                            </span>
                                        </div>

                                        <div className="qrWrapper">
                                            <img
                                                className="qr-code-img"
                                                src={qr.qr_code}
                                                alt={`QR code ${idx + 1}`}
                                            />
                                        </div>

                                        <div className="attendee-details">
                                            <p className="attendee-name">
                                                {qr.ticket_type_name}
                                            </p>
                                            <h6 className="attendee-name1">
                                                {attendee?.name}
                                            </h6>
                                            <h6 className="attendee-name1">
                                                {attendee?.position}
                                            </h6>
                                            <div className="location">
                                                {attendee?.facebook_link && (
                                                    <div>
                                                        {attendee.facebook_link}
                                                    </div>
                                                )}
                                                {attendee?.linkedin_link && (
                                                    <div>
                                                        {attendee.linkedin_link}
                                                    </div>
                                                )}
                                                {attendee?.twitter_link && (
                                                    <div>
                                                        {attendee.twitter_link}
                                                    </div>
                                                )}
                                                {attendee?.other_link && (
                                                    <div>
                                                        {attendee.other_link}
                                                    </div>
                                                )}
                                            </div>
                                            <span className="attendee-name1">
                                                {attendee?.location}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
            {customBadgeDesign == "Design3" && (
                <div className="printable">
                    {filteredAttendees.map((attendee: any, index: number) =>
                        attendee.qr_codes.map((qr: string, idx: number) => (
                            <div
                                key={idx}
                                className="passWrapper print-page-break"
                                style={{
                                    transform: isFlipped
                                        ? "rotate(180deg)"
                                        : "none",
                                }}
                            >
                                <div className="passes-container">
                                    <div
                                        className={`${passSize} ${
                                            showGradient
                                                ? "div-gradient"
                                                : "bg-transparent"
                                        } mt-4 mb-4`}
                                    >
                                        <div className="qrWrapper">
                                            <img
                                                className="qr-code-img"
                                                src={qr.qr_code}
                                                alt={`QR code ${idx + 1}`}
                                            />
                                        </div>
                                        <div className="heading-wraper">
                                            <p className="attendee-name mt-2">
                                                {qr.ticket_type_name}
                                            </p>
                                            <span className="attendee-name1">
                                                {eventApp?.location_base}
                                            </span>
                                            <span className="location">
                                                {startDate}{" "}
                                                {endDate && <>➡️ {endDate}</>}
                                            </span>
                                        </div>
                                        {attendee?.avatar && (
                                            <img
                                                className="mt-2 mb-2"
                                                width={160}
                                                height={160}
                                                style={{
                                                    borderRadius: "100%",
                                                    marginLeft: "25%",
                                                }}
                                                src={
                                                    attendee?.avatar ||
                                                    "/placeholder.svg?height=80&width=80"
                                                }
                                                alt="event logo"
                                            />
                                        )}
                                        <div className="attendee-details">
                                            <h6 className="attendee-name1">
                                                {attendee?.name}
                                            </h6>
                                            <h6 className="attendee-name1">
                                                {attendee?.position}
                                                
                                            </h6>
                                              <div className="location">
                                                {attendee?.facebook_link && (
                                                    <div>
                                                        {attendee.facebook_link}
                                                    </div>
                                                )}
                                                {attendee?.linkedin_link && (
                                                    <div>
                                                        {attendee.linkedin_link}
                                                    </div>
                                                )}
                                                {attendee?.twitter_link && (
                                                    <div>
                                                        {attendee.twitter_link}
                                                    </div>
                                                )}
                                                {attendee?.other_link && (
                                                    <div>
                                                        {attendee.other_link}
                                                    </div>
                                                )}
                                            </div>
                                            <span className="attendee-name1">
                                                {attendee?.location}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
            {customBadgeDesign == "Design4" && (
                <div className="printable">
                    {filteredAttendees.map((attendee: any, index: number) =>
                        attendee.qr_codes.map((qr: string, idx: number) => (
                            <div
                                key={idx}
                                className="passWrapper print-page-break"
                                style={{
                                    transform: isFlipped
                                        ? "rotate(180deg)"
                                        : "none",
                                }}
                            >
                                <div className="passes-container">
                                    <div
                                        className={`${passSize} ${
                                            showGradient
                                                ? "div-gradient"
                                                : "bg-transparent"
                                        } mt-4 mb-4`}
                                    >
                                        <div className="attendee-details">
                                            <p className="attendee-name">
                                                {qr.ticket_type_name}
                                            </p>
                                            <h6 className="attendee-name1">
                                                {attendee?.name}
                                            </h6>
                                            <h6 className="attendee-name1">
                                                {attendee?.position}
                                            </h6>
                                             <div className="location">
                                                {attendee?.facebook_link && (
                                                    <div>
                                                        {attendee.facebook_link}
                                                    </div>
                                                )}
                                                {attendee?.linkedin_link && (
                                                    <div>
                                                        {attendee.linkedin_link}
                                                    </div>
                                                )}
                                                {attendee?.twitter_link && (
                                                    <div>
                                                        {attendee.twitter_link}
                                                    </div>
                                                )}
                                                {attendee?.other_link && (
                                                    <div>
                                                        {attendee.other_link}
                                                    </div>
                                                )}
                                            </div>
                                            <span className="attendee-name1">
                                                {attendee?.location}
                                            </span>
                                        </div>

                                        <div className="qrWrapper4">
                                            <img
                                                className="qr-code-img"
                                                src={qr.qr_code}
                                                alt={`QR code ${idx + 1}`}
                                            />
                                        </div>
                                        <div className="heading-wraper">
                                            {showLogo ? (
                                                <img
                                                    className="circle"
                                                    src={
                                                        eventApp?.logo_img ||
                                                        "/placeholder.svg?height=80&width=80"
                                                    }
                                                    alt="event logo"
                                                />
                                            ) : (
                                                <div className="eventlogodiv"></div>
                                            )}
                                          <span className="location">
                                                {startDate}{" "}
                                                {endDate && <>➡️ {endDate}</>}
                                            </span>
                                            <span className="attendee-name1">
                                                {eventApp?.location_base}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </React.Fragment>
    );
}

Index.layout = (page: any) => <Layout children={page} />;
export default Index;
