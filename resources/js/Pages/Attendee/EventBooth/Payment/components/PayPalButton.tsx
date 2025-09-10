// resources/js/Pages/Attendee/EventBooth/Payment/components/PayPalButton.tsx
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "axios";

const PayPalButton = ({ amount, client_id }: any) => {
  const createOrder = async () => {
    try {
      const response = await axios.post("/attendee/paypal/create-order", { amount });
      return response.data.id;
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const captureOrder = async (orderId: any) => {
    try {
      const response = await axios.post("/attendee/paypal/capture-order", { orderId });
      console.log("Payment Successful:", response.data);
    } catch (error) {
      console.error("Error capturing order:", error);
    }
  };

  return (
    <PayPalScriptProvider options={{ clientId: client_id }}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={(data) => captureOrder((data as any).orderID)}
        onError={(err) => console.error("PayPal Checkout Error:", err)}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
