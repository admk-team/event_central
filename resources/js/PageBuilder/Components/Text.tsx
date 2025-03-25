import { Component } from "lucide-react";
import { createComponent } from "../Core/createComponent";
import ComponentStyles from "../Core/ComponentStyles";

export const Text = createComponent({
    fields: {
        text: {
            label: "Text",
            type: "text",
            default: "Hello Worldddd",
        },
        description: {
            label: "Description",
            type: "textarea",
        },
        email: {
            label: "Email",
            type: "custom",
            render: () => <input type="text" />,
        },
        gender: {
            label: "Gender",
            type: 'select',
            options: [
                {label: "Male", value: "male"},
                {label: "Female", value: "female"},
                {label: "Other", value: "other"},
            ],
            default: "female"
        }
    },
    render: (props: any) => {
        return (
            <ComponentStyles fields={props} className="text-danger bg-primary">
                <h1>
                    {props.text}
                    {props.gender}
                </h1>
            </ComponentStyles>
        )
    },
});