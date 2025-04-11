import React, { useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { fieldTypes } from "../../common/data/formBuilderFieldTypes";
import { FormBuilderContext } from "../../hooks/useFormBuilder";

export default function RenderQuestionnaireResponse({ form, submission }: any) {
  const currentEvent = usePage().props.currentEvent as any;

  // Convert field_values array to usable object like: { field_11: "abc", field_12: "xyz" }
  const defaultData = mapFieldValuesToFormData(submission?.field_values || [], form.fields);

  const { data, setData, processing, errors } = useForm<Record<string, any>>(defaultData);

  useEffect(() => {
    setData(mapFieldValuesToFormData(submission?.field_values || [], form.fields));
  }, [form, submission]);

  return (
    <FormBuilderContext.Provider
      value={{
        data,
        setData,
        processing,
        errors,
        previewMode: true,
      }}
    >
      {form.fields.length > 0 && (
        <div className="mb-4">
          {form.fields.map((field: any) => {
            const name = `field_${field.id}`;
            const FieldComp = fieldTypes[field.type]?.render ?? null;
            return FieldComp ? (
              <FieldComp
                key={field.id}
                name={name}
                field={field}
              />
            ) : null;
          })}
        </div>
      )}
    </FormBuilderContext.Provider>
  );
}

// Map field_values to data object like: { field_11: "abc", field_12: "xyz" }
function mapFieldValuesToFormData(fieldValues: any[], fields: any[]) {
  const data: Record<string, any> = {};

  fields.forEach((field: any) => {
    const match = fieldValues.find((fv) => fv.form_field_id === field.id);

    if (match) {
      try {
        // Try to parse if it's a JSON string (for multi-selection values)
        data[`field_${field.id}`] = JSON.parse(match.value);
      } catch {
        data[`field_${field.id}`] = match.value;
      }
    } else {
      data[`field_${field.id}`] = field.multi_selection ? [] : '';
    }
  });

  return data;
}
