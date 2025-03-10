import { DropZone } from "@measured/puck";
import { Row as BSRow, Col } from "react-bootstrap";

export const Row = {
    resolveFields: (data: any) => {
        let fields: any = {
            cols: {
                type: "number",
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
                            {col.map((c: any, i: number) => (
                                <div key={i} className="mb-3">
                                    <div className="_Input-label_g5w3n_5">Column {i + 1}</div>
                                    <input type="number" value={c.span} onChange={(e) => {
                                        console.log("changeing");
                                        col[i].span = e.target.value;
                                        onChange([...col]);
                                    }} className="_Input-input_g5w3n_26" />
                                </div>
                            ))}
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