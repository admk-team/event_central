import { Form, FormGroup } from "react-bootstrap";

export default function LongText({ field }: any) {
    return (
        <FormGroup className="mb-3">
            <Form.Label className="form-label">{field.label}</Form.Label>
            <Form.Control
                as="textarea"
                rows={4}
                placeholder={field.placeholder}
                className="form-control"
            // value={data.label}
            // onChange={(e) => setData('label', e.target.value)}
            // isInvalid={!!errors.label}
            />
            {/* {errors.label && (
          <Form.Control.Feedback type="invalid">{errors.label}</Form.Control.Feedback>
      )} */}
        </FormGroup>
    )
}
