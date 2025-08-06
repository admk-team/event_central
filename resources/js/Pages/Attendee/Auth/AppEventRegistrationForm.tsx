
import RenderForm from "../../../Components/FormBuilder/RenderForm";
import { Head } from "@inertiajs/react";
import GuestLayout from "../../../Layouts/Attendee/GuestLayout";
import { Alert } from "react-bootstrap";

export default function AppEventRegistrationForm({ form, eventApp, token, formFilled }: any) {
  console.log(token);
  return (
    <>
        <Head title="Attendee Registration" />
        <div className="container">
          <div>
            <h5 className="text-primary">{form.title}</h5>
            <p className="text-muted">{form.description}</p>
          </div>

          <div className="mt-4">
            {!formFilled ? (
              <RenderForm 
                form={form}
                submitRoute={route('attendee.app-event-registration-form', {
                  eventApp: eventApp.id,
                  token,
                })} 
              />
            ) : (
              <Alert variant="success">Form submitted successfully</Alert>
            )}
          </div>
        </div>
    </>
  )
}
