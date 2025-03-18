import axios from "axios";
import React, { useState } from "react";

function Checkout() {
    const [sessionId, setSessionId] = useState(null);

    const handleCheckout = async () => {

        const response = await axios.post(route('attendee.payment.session'), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            console.log(response);
            let session = response.data.id;
            setSessionId(session);

            if (session) {
                window.location.href = `https://checkout.stripe.com/pay/${session}`;
            }
        })
    };

    return (
        <div>
            <h2>Stripe Checkout</h2>
            <button onClick={handleCheckout}>Pay Now</button>
        </div>
    );
}

export default Checkout;
