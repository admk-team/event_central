import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
    "pk_test_51R3iHCPNcWTtCzebbzvUsG7XMmMnTqUxbs4NE9v8CH5IJxtaMXDgz5FMA96HnS93ZQw9DN6wHLlxgtFW90XW0Q4z004QlcW5Z8"
);

const StripeProvider = ({ children }: { children: React.ReactNode }) => {
    return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeProvider;
