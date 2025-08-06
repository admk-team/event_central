import { Form, FormGroup } from "react-bootstrap";
import { useFormBuilder } from "../../../hooks/useFormBuilder";

export default function Choice({ name, field }: any) {
    const { data, setData, errors } = useFormBuilder();

    return (
        <FormGroup className="mb-3">
            <Form.Label className="form-label">{field.label}</Form.Label>
            <div className="mb-3">
                {field.options.map((option: string, i: number) => (
                    <div key={option} className="form-check form-radio-primary mb-2">
                        {field.multi_selection ? (
                            <Form.Check.Input 
                                className="form-check-input" 
                                type="checkbox" 
                                id={`${name}_option_${i}`}
                                checked={data[name].includes(option)}
                                onChange={(e) => 
                                    e.target.checked ?
                                    setData(name, [...data[name], option]) :
                                    setData(name, data[name].filter((item: string) => item !== option))
                                }
                            />
                        ) : (
                            <Form.Check.Input 
                                className="form-check-input" 
                                type="radio" 
                                id={`${name}_option_${i}`}
                                checked={option === data[name]}
                                onChange={(e) => e.target.checked && setData(name, option)}
                            />
                        )}
                        <Form.Check.Label className="form-check-label" htmlFor={`${name}_option_${i}`}>
                            {option}
                        </Form.Check.Label>
                    </div>
                ))}
            </div>
            {errors[name] && (
                <Form.Control.Feedback type="invalid" className="d-block">{errors[name]}</Form.Control.Feedback>
            )}
            {field.description && (
                <div className="form-text">
                    {field.description}
                </div>
            )}
        </FormGroup>
    )
}
