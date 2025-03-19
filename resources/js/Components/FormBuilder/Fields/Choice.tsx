import { Form, FormGroup } from "react-bootstrap";

export default function Choice({ field }: any) {
    return (
        <FormGroup className="mb-3">
            <Form.Label className="form-label">{field.label}</Form.Label>
            <div className="mb-3">
                {field.options.map((option: string) => (
                    <div key={option} className="form-check form-radio-primary mb-2">
                        <Form.Check.Input className="form-check-input" type="radio" name="formradiocolor1" id="formradioRight5"/>
                        <Form.Check.Label className="form-check-label" htmlFor="formradioRight5">
                            {option}
                        </Form.Check.Label>
                    </div>
                ))}
            </div>
            {/* {errors.label && (
          <Form.Control.Feedback type="invalid">{errors.label}</Form.Control.Feedback>
      )} */}
        </FormGroup>
    )
}
