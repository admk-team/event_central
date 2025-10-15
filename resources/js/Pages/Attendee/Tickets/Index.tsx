import { Head, Link, router, useForm } from "@inertiajs/react";
import React, { useEffect, useState, CSSProperties, useRef } from "react";
import AttendeeLayout from "../../../Layouts/Attendee";
import EventLayout from "../../../Layouts/Event";
import {
    Button,
    Col,
    Container,
    Row,
    InputGroup,
    Form,
    Card,
    CardBody,
    Spinner,
    FormGroup,
} from "react-bootstrap";
import TicketCard from "./TicketCard";
import axios from "axios";
import toast from "react-hot-toast";
import Select, { StylesConfig } from "react-select";
import { useLaravelReactI18n } from "laravel-react-i18n";

const Index = ({
    eventApp,
    organizerView,
    attendees,
    attendee_id,
    lasteventDate,
    getCurrency,
}: any) => {
    const { t } = useLaravelReactI18n();
    const Layout = organizerView ? EventLayout : AttendeeLayout;

    // ✅ fixed: moved inside component
    const [applicableTickets, setApplicableTickets] = useState<number[]>([]);

    const hasAttendeeInRoute =
        attendee_id != null &&
        attendee_id !== undefined &&
        attendee_id !== "" &&
        !isNaN(parseInt(attendee_id)) &&
        parseInt(attendee_id) > 0;

    const foundAttendee = attendees.find(
        (attendee) => attendee.value === parseInt(attendee_id)
    );

    const [currentAttendee, setCurrentAttendee] = useState<any>(attendee_id);
    const [paymentMethod, setPaymentMethod] = useState<any>("stripe");
    const [paymnetNote, setPaymentNote] = useState<any>("");

    const [grandTotal, setGrandTotal] = useState(0);
    const [allTicketDetails, setAllTicketsDetails] = useState(Array<any>);

    const [codeError, setCodeError] = useState<string | boolean | any>(null);
    const [discountCode, setDiscountCode] = useState("");
    const [discountCodeApplied, setDiscountCodeApplied] = useState("");
    const [discount, setDiscount] = useState<{
        type: string;
        value: number;
    } | null>(null);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [processing, setProcessing] = useState(false);
    const paymentNoteRef = useRef(null);
    const [blockCheckout, setBlockCheckout] = useState(false);

    const getDiscountAmount = (discount: any, total: number) => {
        if (!discount) return 0;
        switch (discount.type) {
            case "fixed":
                return discount.value;
            case "percentage":
                return total * (discount.value / 100);
        }
    };

    const scrollToNoteField = () => {
        const offset = 120;
        const element = paymentNoteRef.current;
        const y =
            element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: y, behavior: "smooth" });
        paymentNoteRef.current?.focus();
    };

    const submitCheckOut = (e: any) => {
        e.preventDefault();

        if (
            (paymentMethod === "cash" || paymentMethod === "other") &&
            paymnetNote.length <= 0
        ) {
            toast.error(
                t(
                    "Payment Note is mandaory when paymnet method is cash or other, Enter Payment Note please"
                )
            );
            scrollToNoteField();
            return;
        }

        const data = {
            ticketsDetails: [...allTicketDetails],
            discount: discountAmount,
            discount_code: discountCodeApplied,
            subTotal: grandTotal,
            totalAmount: totalAmount,
            organizer_payment_note: paymnetNote,
        };

        setProcessing(true);
        if (organizerView && currentAttendee > 0) {
            if (totalAmount > 0 && paymentMethod === "stripe") {
                axios
                    .post(
                        route("organizer.events.tickets.checkout", [
                            currentAttendee,
                            paymentMethod,
                        ]),
                        data
                    )
                    .then((response) => {
                        router.visit(
                            route(
                                "organizer.events.tickets.checkout.page",
                                response.data.uuid
                            )
                        );
                    })
                    .catch((error) => {
                        toast.error(
                            t(
                                "Minimum amount required is 50 cents. Please increase the amount."
                            )
                        );
                    })
                    .finally(() => {
                        setProcessing(false);
                    });
            } else if (totalAmount === 0 || paymentMethod !== "stripe") {
                axios
                    .post(
                        route("organizer.events.tickets.checkout.free", [
                            currentAttendee,
                            paymentMethod,
                        ]),
                        data
                    )
                    .then((response) => {
                        router.visit(
                            route(
                                "organizer.events.payment.success",
                                response.data.uuid
                            )
                        );
                    })
                    .catch((error) => {
                        toast.error(
                            t(
                                "Minimum amount required is 50 cents. Please increase the amount."
                            )
                        );
                    })
                    .finally(() => {
                        setProcessing(false);
                    });
            }
        } else {
            if (totalAmount > 0) {
                axios
                    .post(route("attendee.tickets.checkout"), data)
                    .then((response) => {
                        router.visit(
                            route(
                                "attendee.tickets.checkout.page",
                                response.data.uuid
                            )
                        );
                    })
                    .catch((error) => {
                        toast.error(
                            t(
                                "Minimum amount required is 50 cents. Please increase the amount."
                            )
                        );
                    })
                    .finally(() => {
                        setProcessing(false);
                    });
            } else {
                axios
                    .post(route("attendee.tickets.checkout.free"), data)
                    .then((response) => {
                        router.visit(
                            route(
                                "attendee.payment.success",
                                response.data.uuid
                            )
                        );
                    })
                    .catch((error) => {
                        toast.error(
                            t(
                                "Minimum amount required is 50 cents. Please increase the amount."
                            )
                        );
                    })
                    .finally(() => {
                        setProcessing(false);
                    });
            }
        }
    };

    const validateCode = () => {
        setCodeError(false);
        let url = organizerView
            ? route("organizer.events.validateCode.post", discountCode)
            : route("attendee.validateCode.post", discountCode);

        axios
            .post(url)
            .then((response) => {
                const { code, applicable_ticket_ids } = response.data;

                // determine if the code applies to any currently selected ticket
                const currentTicketIds = allTicketDetails.map(
                    (detail) => detail.ticket.id
                );
                const applicable = applicable_ticket_ids || [];

                // check intersection
                const appliesToCurrent =
                    applicable.length === 0 ||
                    currentTicketIds.some((id) => applicable.includes(id));

                if (!appliesToCurrent) {
                    // code is valid but doesn't apply to selected tickets
                    toast.error(t("Invalid Code"));
                    setDiscount(null);
                    setApplicableTickets([]);
                    setDiscountCodeApplied("");
                    setDiscountAmount(0);
                    setTotalAmount(grandTotal);
                    return;
                }

                // valid and applicable
                setDiscount({
                    type: code.discount_type,
                    value: code.discount_value,
                });
                setDiscountCodeApplied(discountCode);
                setApplicableTickets(applicable);
                toast.success(t("Coupon Code applied successfully"));
            })
            .catch((error) => {
                setCodeError(error.response.data.message);
                setDiscount(null);
                setTotalAmount(grandTotal);
            });
    };

    useEffect(() => {
        updateGrandTotal();
    }, [allTicketDetails]);

    useEffect(() => {
        updateGrandTotal();
    }, [discount]);

    const updateGrandTotal = () => {
        let gTotal = 0;
        const noDiscountAddons: any[] = [];

        allTicketDetails.forEach((ticketDetail) => {
            const quantity = parseInt(ticketDetail.quantity ?? 1);

            // base price + fees (multiplied by quantity)
            gTotal +=
                (parseFloat(ticketDetail.ticket.base_price) +
                    parseFloat(ticketDetail.fees_sub_total)) *
                quantity;

            // Addon logic
            ticketDetail.addons.forEach((addon: any) => {
                const addonPrice = parseFloat(
                    addon.selectedVariant?.price ?? addon.price
                );
                if (addon.enable_discount) {
                    gTotal += addonPrice * quantity; // multiply addon price by quantity
                } else {
                    // keep no-discount addons for after discount calculation
                    noDiscountAddons.push({ ...addon, quantity });
                }
            });
        });

        // ✅ Apply discount only to applicable tickets
        let discountBase = 0;
        allTicketDetails.forEach((ticketDetail) => {
            const ticketId = ticketDetail.ticket.id;
            const quantity = parseInt(ticketDetail.quantity ?? 1);

            if (
                discount &&
                (applicableTickets.length === 0 ||
                    applicableTickets.includes(ticketId))
            ) {
                discountBase +=
                    (parseFloat(ticketDetail.ticket.base_price) +
                        parseFloat(ticketDetail.fees_sub_total)) *
                    quantity;

                ticketDetail.addons.forEach((addon: any) => {
                    if (addon.enable_discount) {
                        discountBase +=
                            parseFloat(
                                addon.selectedVariant?.price ?? addon.price
                            ) * quantity;
                    }
                });
            }
        });

        const discountAmt = getDiscountAmount(discount, discountBase);
        gTotal = gTotal - discountAmt;
        setDiscountAmount(discountAmt);

        // ✅ add no-discount addons after discount, multiplied by their quantity
        noDiscountAddons.forEach((addon) => {
            gTotal +=
                parseFloat(addon.selectedVariant?.price ?? addon.price) *
                addon.quantity;
        });

        gTotal = parseFloat(gTotal.toFixed(2));
        setGrandTotal(gTotal);
        setTotalAmount(gTotal);
    };

    const handleTicketCardChanged = (ticketDetails: any, removedIds: any) => {
        setAllTicketsDetails((prev) => {
            const objectMap = new Map(prev.map((obj) => [obj.id, obj]));
            removedIds.forEach((id: any) => objectMap.delete(id));
            ticketDetails.forEach((obj: any) => {
                objectMap.set(obj.id, obj);
            });
            let newList = Array.from(objectMap.values());
            newList.sort((a, b) => a.id - b.id);
            return newList;
        });
    };

    const customSelect2Styles = {
        control: (base: any) => ({
            ...base,
            fontWeight: "400",
            fontSize: "1.03125rem",
            border: "var(--vz- primary - border - subtle)",
        }),
        valueContainer: (base: any) => ({
            ...base,
            padding: "0 8px",
        }),
        indicatorsContainer: (base: any) => ({
            ...base,
            height: 49,
        }),
    };

    const formatted = (evnetDate: any) =>
        new Date(evnetDate).toLocaleDateString("en-GB").replace(/\//g, "-");

    return (
        <Layout>
            <React.Fragment>
                <Head title={t("Tickets")} />
                <section className="section bg-light" id="tickets">
                    <Container>
                        {organizerView && (
                            <Row className="justify-content-center mt-5 mb-2 mt-md-0">
                                <Col md={12} className="text-center">
                                    <h2>
                                        {hasAttendeeInRoute
                                            ? t("Assign Ticket to Attendee")
                                            : t(
                                                  "Purchase Ticket For Attendees"
                                              )}
                                    </h2>
                                    {hasAttendeeInRoute && foundAttendee && (
                                        <p className="text-muted fs-5">
                                            {t("Assigning ticket to")}:{" "}
                                            <strong>
                                                {foundAttendee.label}
                                            </strong>
                                        </p>
                                    )}
                                    <hr />
                                </Col>
                                {!hasAttendeeInRoute && (
                                    <Col>
                                        <FormGroup className="mb-3">
                                            <Form.Label
                                                htmlFor="attendee"
                                                className="form-label fs-4 text-start w-100"
                                            >
                                                {t("Attendee")}
                                            </Form.Label>
                                            <Select
                                                styles={customSelect2Styles}
                                                className="react-select-container15"
                                                value={foundAttendee}
                                                options={attendees}
                                                onChange={(option: any) => {
                                                    setCurrentAttendee(
                                                        option.value
                                                    );
                                                }}
                                            ></Select>
                                        </FormGroup>
                                    </Col>
                                )}
                                <Col>
                                    <FormGroup className="mb-3">
                                        <Form.Label
                                            htmlFor="payment_method"
                                            className="form-label fs-4 text-start w-100"
                                        >
                                            {t("Payment Method")}
                                        </Form.Label>
                                        <Form.Select
                                            size="lg"
                                            aria-label="Default select example"
                                            className="form-control"
                                            id="payment_method"
                                            onChange={(e) =>
                                                setPaymentMethod(e.target.value)
                                            }
                                        >
                                            <option key={22} value="stripe">
                                                {t("Stripe")}
                                            </option>
                                            <option key={23} value="cash">
                                                {t("Cash")}
                                            </option>
                                            <option key={24} value="other">
                                                {t("Other")}
                                            </option>
                                        </Form.Select>
                                    </FormGroup>
                                </Col>
                            </Row>
                        )}
                        {organizerView &&
                            (paymentMethod === "cash" ||
                                paymentMethod === "other") && (
                                <Row>
                                    <Col>
                                        <FormGroup className="mb-3">
                                            <Form.Label className="fs-4">
                                                {t("Paymnet Note")}
                                            </Form.Label>
                                            <Form.Control
                                                ref={paymentNoteRef}
                                                as="textarea"
                                                type="text"
                                                rows={4}
                                                maxLength={255}
                                                onChange={(e) =>
                                                    setPaymentNote(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            )}
                        {!organizerView && (
                            <Row className="justify-content-center mt-5 mt-md-0">
                                <Col lg={8}>
                                    <div className="text-center mb-5">
                                        <h1
                                            className="mb-3 fw-bold"
                                            style={{ fontSize: "30px" }}
                                        >
                                            {t(
                                                "Choose the Ticket that's right for you"
                                            )}
                                        </h1>
                                        <p className="text-muted mb-4">
                                            {t(
                                                "Simple pricing. No hidden fees."
                                            )}
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        )}
                        {(!organizerView || currentAttendee > 0) && (
                            <>
                                <div className="d-flex justify-content-end gap-3">
                                    <p>
                                        {t("Event Start :")}{" "}
                                        <span className="fw-bold">
                                            {" "}
                                            {formatted(eventApp.start_date)}
                                        </span>
                                    </p>
                                    <p>
                                        {t("Event End :")}{" "}
                                        <span className="fw-bold">
                                            {" "}
                                            {formatted(lasteventDate[0].date)}
                                        </span>
                                    </p>
                                </div>
                                <Row className=" justify-content-center gy-4">
                                    {organizerView &&
                                        eventApp.tickets.length > 0 &&
                                        eventApp.tickets.map((ticket: any) => (
                                            <TicketCard
                                                currency_symbol={
                                                    getCurrency.currency_symbol
                                                }
                                                ticket={ticket}
                                                key={ticket.id}
                                                ticket_array={allTicketDetails}
                                                onTicketDetailsUpdated={
                                                    handleTicketCardChanged
                                                }
                                                onBlockCheckout={
                                                    setBlockCheckout
                                                }
                                                attendee_id={attendee_id}
                                            ></TicketCard>
                                        ))}
                                    {!organizerView &&
                                        eventApp.public_tickets.length > 0 &&
                                        eventApp.public_tickets.map(
                                            (ticket: any) => (
                                                <TicketCard
                                                    currency_symbol={
                                                        getCurrency.currency_symbol
                                                    }
                                                    ticket={ticket}
                                                    key={ticket.id}
                                                    ticket_array={
                                                        allTicketDetails
                                                    }
                                                    submitCheckOut={
                                                        submitCheckOut
                                                    }
                                                    onTicketDetailsUpdated={
                                                        handleTicketCardChanged
                                                    }
                                                    onBlockCheckout={
                                                        setBlockCheckout
                                                    }
                                                    attendee_id={attendee_id}
                                                ></TicketCard>
                                            )
                                        )}
                                </Row>

                                <Card className="mt-4">
                                    <CardBody>
                                        <Row>
                                            <Col
                                                md={4}
                                                lg={4}
                                                className="d-flex align-items-center"
                                            >
                                                <h5 className="fw-bold mb-0">
                                                    {t("Coupon Code")}
                                                </h5>
                                            </Col>
                                            <Col md={4} lg={4}>
                                                <InputGroup>
                                                    <Form.Control
                                                        disabled={
                                                            allTicketDetails.length ===
                                                            0
                                                        }
                                                        id="ticket-discount-code"
                                                        type="text"
                                                        isInvalid={codeError}
                                                        name="coupon code"
                                                        placeholder={t(
                                                            "Enter Coupon Code Here"
                                                        )}
                                                        value={discountCode}
                                                        onChange={(e: any) =>
                                                            setDiscountCode(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <Button
                                                        disabled={
                                                            allTicketDetails.length ===
                                                            0
                                                        }
                                                        onClick={validateCode}
                                                    >
                                                        {t("Apply")}
                                                    </Button>
                                                </InputGroup>
                                                {codeError && (
                                                    <div className="invalid-feedback d-block">
                                                        {t(
                                                            "Invalid or Expired Code"
                                                        )}
                                                    </div>
                                                )}
                                            </Col>
                                            <Col
                                                md={4}
                                                lg={4}
                                                className="d-flex justify-content-end align-items-center"
                                            >
                                                <h5 className="mb-1 pt-2 pb-2 mr-2 text-end fs-4">
                                                    {t("Discount : ")}
                                                    <sup>
                                                        <small>
                                                            {
                                                                getCurrency.currency_symbol
                                                            }
                                                        </small>
                                                    </sup>
                                                    {Math.round(
                                                        discountAmount
                                                    ).toFixed(2)}
                                                </h5>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col md={4} lg={4}></Col>
                                            <Col md={4} lg={4}>
                                                <Button
                                                    disabled={
                                                        allTicketDetails.length ===
                                                            0 ||
                                                        processing ||
                                                        blockCheckout
                                                    }
                                                    onClick={submitCheckOut}
                                                    className="btn btn-success w-100"
                                                >
                                                    {t("Checkout")}
                                                    {processing && (
                                                        <Spinner
                                                            animation="border"
                                                            role="status"
                                                            className="ml-3"
                                                            size="sm"
                                                        >
                                                            <span className="visually-hidden">
                                                                {t(
                                                                    "Loading..."
                                                                )}
                                                            </span>
                                                        </Spinner>
                                                    )}
                                                </Button>
                                            </Col>
                                            <Col
                                                md={4}
                                                lg={4}
                                                className="d-flex justify-content-end align-items-center"
                                            >
                                                <h5 className="mb-1 pt-2 pb-2 mr-2 text-end fs-4">
                                                    {t("Total Payable :")}{" "}
                                                    <sup>
                                                        <small>
                                                            {
                                                                getCurrency.currency_symbol
                                                            }
                                                        </small>
                                                    </sup>
                                                    {totalAmount.toFixed(2)}
                                                </h5>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </>
                        )}
                    </Container>
                </section>
            </React.Fragment>
        </Layout>
    );
};

export default Index;
