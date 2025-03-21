import { DropZone } from "@measured/puck";
import { Row as BSRow, Col } from "react-bootstrap";

export const Row = {
    resolveFields: (data: any) => {
        let fields: any = {
            test: {
                type: 'select',
            options: [
                {label: "Male", value: "male"},
                {label: "Female", value: "female"},
                {label: "Other", value: "other"},
            ],
            default: "female"
            },
            cols: {
                type: "textarea",
                max: 12,
                min: 1,
                label: "Columns",
            },
            col: {
                type: "custom",
                render: ({ name, onChange, value }: any) => {
                    console.log("Resolving fields");
                    const col = value || Array(data.props.cols).fill(null).map((_, index) => ({
                        span: 12 / data.props.cols,
                    }));
                    return (
                        <div>
                            sdfsdfds
                        </div>
                    );   
                },
            },
        };

        return {...fields};
    },
    defaultProps: {
        cols: 2,
    },
    render: (props: any) => {
        return (
            <BSRow>
                {Array(props.cols).fill(null).map((_, index) => (
                    <Col key={index + 1} md={{span: props.col ? props.col[index]?.span : 6}}>
                        <DropZone zone={`column ${index + 1}`} />
                    </Col>
                ))}
            </BSRow>
        )
    }
}