import React, { useState } from "react";
import Layout from '../../Layouts/Attendee';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./Checkout"
import { Head, Link } from "@inertiajs/react";
import { Container } from "react-bootstrap";



const stripePromise = loadStripe("pk_test_51Py6kWHInNTlTUGPM5l30Odo4AOb48C48enPnOsKrw9xhueHWeYlC0lpnRRvtbwMNosFC3UWEZY4c48MsuohS5F700Lyxn0hSm");

const Payment = () => {


    return (
        <React.Fragment>
            <Head title="Checkout" />
            <div className="page-content">
                <Container fluid>
                    <Elements stripe={stripePromise}>
                        <Checkout />
                    </Elements>
                </Container>
            </div>
        </React.Fragment>
    );
};
Payment.layout = (page: any) => <Layout children={page} />
export default Payment;
