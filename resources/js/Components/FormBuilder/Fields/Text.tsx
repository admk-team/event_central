import { Form, FormGroup } from "react-bootstrap";
import { useFormBuilder } from "../RenderForm";

export default function Text({ field }: any) {
  const {data, setData} = useFormBuilder();
  const name = `field_${field.id}`;

  return (
    <FormGroup className="mb-3">
      <Form.Label className="form-label">{field.label}</Form.Label>
      <Form.Control
        type="text"
        placeholder={field.placeholder}
        className="form-control"
        value={data[name]}
        onChange={e => setData(name, e.target.value)}
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
