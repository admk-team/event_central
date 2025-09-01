import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "axios";

const PayPalButton = ({currency_code ,amount, client_id }: any) => {
    const createOrder = async () => {
        try {
            const response = await axios.post("/attendee/paypal/create-order", {
                amount,currency_code
            });
            return response.data.id; // Return order ID
        } catch (error) {
            console.error("Error creating order:", error);
        }
    };

    const captureOrder = async (orderId: any) => {
        try {
            const response = await axios.post(
                "/attendee/paypal/capture-order",
                {
                    orderId,
                }
            );
            console.log("Payment Successful:", response.data);
        } catch (error) {
            console.error("Error capturing order:", error);
        }
    };

    return (
        <PayPalScriptProvider
            options={{
                clientId: client_id,
                currency: currency_code,
            }}
        >
            <PayPalButtons
                createOrder={createOrder}
                onApprove={(data) => captureOrder(data.orderID)}
                onError={(err) => console.error("PayPal Checkout Error:", err)}
            />
        </PayPalScriptProvider>
    );
};

export default PayPalButton;
