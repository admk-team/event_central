
import RenderForm from "../../../Components/FormBuilder/RenderForm";
import { Head } from "@inertiajs/react";
import GuestLayout from "../../../Layouts/Attendee/GuestLayout";

export default function EventRegistrationForm({ form }: any) {
  return (
    <>
      <GuestLayout>
        <Head title="Attendee Registration" />
        <div>
          <h5 className="text-primary">{form.title}</h5>
          <p className="text-muted">{form.description}</p>
        </div>

        <div className="mt-4">
          <RenderForm form={form} />
        </div>
      </GuestLayout>
    </>
  )
}
