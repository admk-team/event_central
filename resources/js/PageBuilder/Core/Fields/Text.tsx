import { FormControl, FormGroup, FormLabel } from "react-bootstrap";

export default function Text({ field, fieldConfig, onChange, value }: any) {
    return (
        <FormGroup className="mb-3">
            <FormLabel className="fw-semibold text-dark">
                {fieldConfig.label ?? field}
            </FormLabel>
            <FormControl
                type="text"
                className="_Input-input_g5w3n_26"
                value={value[field] ?? ''}
                onChange={(e) =>
                    onChange({ ...value, [field]: e.target.value })
                }
            />
        </FormGroup>
    );
}
