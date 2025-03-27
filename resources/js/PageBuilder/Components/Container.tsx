import { DropZone } from "@measured/puck";
import { Container as BSContainer } from "react-bootstrap"
import { createComponent } from "../Core/createComponent";
import ComponentWrapper from "../Core/ComponentWrapper";

export const Container = createComponent({
    fields: {
        size: {
            label: "Size",
            type: "radio",
            options: [
                { label: "Full Width", value: "full-width" },
                { label: "Boxed", value: "boxed" },
            ],
            default: 'boxed',
        },
    },
    render: (props: any) => {
        return (
            <BSContainer fluid={props.size === 'boxed' ? false : true}>
                <ComponentWrapper fields={props}>
                    <DropZone zone="content" />
                </ComponentWrapper>
            </BSContainer>
        );
    },
});