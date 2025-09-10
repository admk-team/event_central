// resources/js/Pages/Attendee/EventBooth/Payment/components/StripeCheckoutForm.tsx
import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { router } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";

export default function CheckoutForm({ payment, currency, getCurrency }: any) {
  const stripe = useStripe();
  const elements = useElements();
  const { t } = useLaravelReactI18n();

  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: route("attendee.booth.checkout.success"),
        },
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          const payment_update_url = route("attendee.booth.update", payment.id);
          const payment_success_url = route("attendee.booth.checkout.success");

          axios
            .post(payment_update_url)
            .then(() => {
              router.visit(payment_success_url);
            })
            .catch((errorPost) => {
              console.error(errorPost);
              setMessage(t("Unable to finalize booth assignment."));
            })
            .finally(() => setIsProcessing(false));
        } else {
          if (result.error.type === "card_error" || result.error.type === "validation_error") {
            setMessage(result.error.message as string);
          } else {
            setMessage(t("An unexpected error occurred."));
          }
          setIsProcessing(false);
        }
      });
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />

      {!(stripe && elements) && (
        <div className="d-flex justify-content-center mt-3">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">{t("Loading...")}</span>
          </Spinner>
        </div>
      )}

      <div className="d-flex justify-content-center">
        {stripe && elements && (
          <Button className="mt-3 btn btn-success mt-2 w-75 rounded-pill" disabled={isProcessing} type="submit">
            <span id="button-text">
              {isProcessing ? t("Processing...") : `${getCurrency} ${payment.total_amount}`}
            </span>
          </Button>
        )}
      </div>

      {message && <div id="payment-message" className="mt-2 text-danger">{message}</div>}
    </form>
  );
}
