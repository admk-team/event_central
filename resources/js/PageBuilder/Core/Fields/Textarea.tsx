import { FormControl, FormGroup, FormLabel } from "react-bootstrap";

export default function Textarea({ field, fieldConfig, onChange, value }: any) {
    return (
        <FormGroup className="mb-3">
            <FormLabel className="fw-semibold text-dark">
                {fieldConfig.label ?? field}
            </FormLabel>
            <FormControl
                as="textarea"
                className="_Input-input_g5w3n_26"
                rows={3}
                value={value[field] ?? ''}
                onChange={(e) =>
                    onChange({ ...value, [field]: e.target.value })
                }
            />
        </FormGroup>
    );
}
