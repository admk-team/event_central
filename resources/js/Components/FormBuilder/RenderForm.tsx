import React, { createContext, useContext, useEffect } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import Text from "./Fields/ShortText";
import LongText from "./Fields/LongText";
import Choice from "./Fields/Choice";
import Dropdown from "./Fields/Dropdown";
import { useForm, usePage } from "@inertiajs/react";
import { fieldTypes } from "../../common/data/formBuilderFieldTypes";

const FormBuilderContext = createContext<any>({});

export const useFormBuilder = () => {
  return useContext(FormBuilderContext);
}

export default function RenderForm({ form, preview = false }: any) {
  const currentEvent = usePage().props.currentEvent as any;

  const { data, setData, post, processing, errors, reset } = useForm<Record<string, any>>(getDefaultFormData({}, form.fields));

  useEffect(() => {
    setData(getDefaultFormData({ ...data }, form.fields));
  }, [form]);

  const submit = (e: any) => {
    e.preventDefault();

    post(route('organizer.events.event-registration-form', {
      uuid: currentEvent.uuid,
      preview: preview ? 'true' : undefined,
    }), {
      preserveScroll: true,
      onSuccess: () => reset(),
    })
  }

  return (
    <FormBuilderContext.Provider value={{
      data: getDefaultFormData({ ...data }, form.fields),
      setData,
      processing,
      errors,
    }}>
      <Form onSubmit={submit}>
        <div className="mb-4">
          {form.fields.map((field: any) => {
            const name = `field_${field.id}`;
            const FieldComp = fieldTypes[field.type]?.render ?? null;
            return FieldComp ? <FieldComp key={field.id} name={name} field={field} /> : null;
          })}
        </div>
        <Button type="submit" disabled={processing}>
          {processing ? (
            <span className="d-flex gap-1 align-items-center">
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Submitting
            </span>
          ) : (
            <span>Submit</span>
          )}
        </Button>
      </Form>
    </FormBuilderContext.Provider>
  )
}

function getDefaultFormData(data: Record<string, any>, fields: any) {
  fields.map((field: any) => {
    if (data[`field_${field.id}`] === undefined) {
      data[`field_${field.id}`] = field.multi_selection ? [] : '';
    }
  });

  return data;
}