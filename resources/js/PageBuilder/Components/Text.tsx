import { createComponent } from "../Core/createComponent";
import ComponentWrapper from "../Core/ComponentWrapper";

export const Text = createComponent({
    fields: {
        text: {
            label: "Text",
            type: "text",
            default: "Hello...",
        },
    },
    render: (props: any) => {
        return (
            <ComponentWrapper fields={props} as="div">
                {props.text}
            </ComponentWrapper>
        )
    },
});