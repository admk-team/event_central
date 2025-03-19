import React, { createContext, useContext } from "react";
import { Container } from "react-bootstrap";
import Text from "./Fields/Text";
import LongText from "./Fields/LongText";
import Choice from "./Fields/Choice";
import Dropdown from "./Fields/Dropdown";
import { useForm } from "@inertiajs/react";

const FormBuilderContext = createContext<any>({});

export const useFormBuilder = () => {
  return useContext(FormBuilderContext);
}

export default function RenderForm({ form }: any) {
  const {data, setData} = useForm(getDefaultFormData(form.fields));

  return (
    <FormBuilderContext.Provider value={{
      data,
      setData,
    }}>
      <Container>
        {form.fields.map((field: any) => (
          <RenderField key={field.id} field={field} />
        ))}
      </Container>
    </FormBuilderContext.Provider>
  )
}

function RenderField({ field }: any) {  
  switch (field.type) {
    case 'text':
      return <Text field={field} />
    case 'long_text':
      return <LongText field={field} />
    case 'choice':
      return <Choice field={field} />
    case 'dropdown':
      return <Dropdown field={field} />
  }
}

function getDefaultFormData(fields: any) {
  const data: Record<string, any> = {};

  fields.map((field: any) => {
    data[`field_${field.id}`] = ''
  })

  return data;
}