import { DropZone } from "@measured/puck";
import { Container as BSContainer } from "react-bootstrap"

export const Container = {
    fields: {
        size: {
            label: "Size",
            type: "radio",
            options: [
                { label: "Full Width", value: "full-width" },
                { label: "Boxed", value: "boxed" },
            ]
        },
    },
    defaultProps: {
        size: "boxed",
    },
    render: ({ size }: { size: string }) => {
        return (
            <BSContainer fluid={size === 'boxed' ? false : true}>
                <DropZone zone="content" />
            </BSContainer>
        );
    },
}