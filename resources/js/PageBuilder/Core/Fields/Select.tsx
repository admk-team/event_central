import { FormGroup, FormLabel, FormSelect } from "react-bootstrap";

export default function Select({ field, fieldConfig, onChange, value }: any) {
    return (
        <FormGroup className="mb-3">
            <FormLabel className="fw-semibold text-dark">
                {fieldConfig.label ?? field}
            </FormLabel>
            <FormSelect
                className="_Input-input_g5w3n_26"
                value={value[field] ?? fieldConfig.default}
                onChange={(e) =>
                    onChange({ ...value, [field]: e.target.value })
                }
            >
                {fieldConfig.default == null && (
                    <option value="">{fieldConfig.placeholder ?? 'Select'}</option>
                )}
                {(fieldConfig.options ?? []).map((option: any) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </FormSelect>
        </FormGroup>
    );
}
