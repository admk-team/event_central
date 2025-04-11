import { Form, FormGroup } from "react-bootstrap";
import { useFormBuilder } from "../../../hooks/useFormBuilder";

export default function LongText({ name, field }: any) {
    const { data, setData, errors } = useFormBuilder();

    return (
        <FormGroup className="mb-3">
            <Form.Label className="form-label">{field.label}</Form.Label>
            <Form.Control
                as="textarea"
                rows={4}
                placeholder={field.placeholder}
                className="form-control"
                value={data[name]}
                onChange={e => setData(name, e.target.value)}
                isInvalid={!!errors[name]}
            />
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
