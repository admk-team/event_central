import { Form, FormGroup } from "react-bootstrap";
import { useFormBuilder } from "../../../hooks/useFormBuilder";

export default function Dropdown({ name, field }: any) {
    const { data, setData, errors } = useFormBuilder();

    return (
        <FormGroup className="mb-3">
            <Form.Label className="form-label">{field.label}</Form.Label>
            <Form.Select
                value={data[name]}
                onChange={e => setData(name, e.target.value)}
                isInvalid={!!errors[name]}
            >
                {field.placeholder && (
                    <option value="" disabled>{field.placeholder}</option>
                )}
                {field.options.map((option: string) => (
                    <option value={option} key={option}>{option}</option>
                ))}
            </Form.Select>
            {errors[name] && (
                <Form.Control.Feedback type="invalid">{errors[name]}</Form.Control.Feedback>
            )}
            {field.description && (
                <div className="form-text">
                    {field.description}
                </div>
            )}
        </FormGroup>
    )
}
