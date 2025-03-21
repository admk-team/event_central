import { FormControl, FormGroup, FormLabel } from "react-bootstrap";
import Text from "./Fields/Text";
import Textarea from "./Fields/Textarea";
import Select from "./Fields/Select";
import Radio from "./Fields/Radio";

export default function ComponentUserFields({
    fields,
    onChange,
    value,
    tab = "content",
}: any) {
    return (
        <>
            {(Object.entries(fields ?? {}) as [any, any][])
                .filter(
                    ([field, fieldConfig]) =>
                        (fieldConfig.tab ?? "content") === tab
                )
                .map(([field, fieldConfig]) => (
                    <Field
                        key={field}
                        field={field}
                        fieldConfig={fieldConfig}
                        onChange={onChange}
                        value={value}
                    />
                ))}
        </>
    );
}

function Field({ field, fieldConfig, onChange, value }: any) {
    switch (fieldConfig.type) {
        case "custom":
            const Comp = fieldConfig.render;
            if (!Comp) return null;
            return (
                <Comp
                    field={field}
                    fieldConfig={fieldConfig}
                    onChange={onChange}
                    value={value}
                />
            );
        case "text":
            return (
                <Text
                    field={field}
                    fieldConfig={fieldConfig}
                    onChange={onChange}
                    value={value}
                />
            );
        case "textarea":
            return (
                <Textarea
                    field={field}
                    fieldConfig={fieldConfig}
                    onChange={onChange}
                    value={value}
                />
            );
        case "select":
            return (
                <Select
                    field={field}
                    fieldConfig={fieldConfig}
                    onChange={onChange}
                    value={value}
                />
            );

        case "radio":
            return (
                <Radio
                    field={field}
                    fieldConfig={fieldConfig}
                    onChange={onChange}
                    value={value}
                />
            );
    }
}
