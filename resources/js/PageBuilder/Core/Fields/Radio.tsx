import { FormGroup, FormLabel, FormSelect } from "react-bootstrap";

export default function Radio({ field, fieldConfig, onChange, value }: any) {
    return (
        <FormGroup className="mb-3">
            <FormLabel className="fw-semibold text-dark">
                {fieldConfig.label ?? field}
            </FormLabel>
            <div
                className="_Input-radioGroupItems_g5w3n_85"
                id="Container-e0103ed3-c000-4c64-a7e1-171b4eaec50c_radio_size"
            >
                {(fieldConfig.options ?? []).map((option: any) => (
                    <label className="_Input-radio_g5w3n_85 mb-0">
                        <input
                            type="radio"
                            className="_Input-radioInput_g5w3n_147"
                            checked={option.value === value[field] || (value[field] === null && option.value === fieldConfig.default)}
                            onChange={(e) => e.target.checked && onChange({ ...value, [field]: option.value })}
                        />
                        <div className="_Input-radioInner_g5w3n_102">
                            {option.label}
                        </div>
                    </label>
                ))}
            </div>
        </FormGroup>
    );
}
