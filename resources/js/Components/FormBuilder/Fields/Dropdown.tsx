import { Form, FormGroup } from "react-bootstrap";

export default function Dropdown({ field }: any) {
    return (
        <FormGroup className="mb-3">
            <Form.Label className="form-label">{field.label}</Form.Label>
            <Form.Select>
                {field.options.map((option: string) => (
                    <option value={option} key={option}>{option}</option>
                ))}
            </Form.Select>
            {/* {errors.label && (
          <Form.Control.Feedback type="invalid">{errors.label}</Form.Control.Feedback>
      )} */}
        </FormGroup>
    )
}
