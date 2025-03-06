import { Config, DropZone } from "@measured/puck";
import { Col, Container, Row } from "react-bootstrap";

export type Components = {
    HeadingBlock: {
        title: string;
    };
    Text: {
        text: string
    };
    Container: {
        type: string;
    };
    Row: {
        cols: number;
        col?: Array<any>;
    };
};

export const config: Config<Components> = {
    components: {
        HeadingBlock: {
            fields: {
                title: {
                    type: "text",
                },
            },
            defaultProps: {
                title: "Hello World",
            },
            render: ({ title }) => {
                return <h1>{title}</h1>;
            },
        },

        Text: {
            fields: {
                text: {
                    type: "text",
                },
            },
            defaultProps: {
                text: "Hello World",
            },
            render: ({ text }: { text: string }) => {
                return <h1>{text}</h1>;
            },
        },

        Container: {
            fields: {
                type: {
                    type: "radio",
                    options: [
                        { label: "Full Width", value: "full-width" },
                        { label: "Boxed", value: "boxed" },
                    ]
                },
            },
            defaultProps: {
                type: "boxed",
            },
            render: ({ type }: { type: string }) => {
                return (
                    <Container fluid={type === 'boxed' ? false : true}>
                        <DropZone zone="content" />
                    </Container>
                );
            },
        },

        Row: {
            resolveFields: (data) => {
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


                // Array(data.props.cols).fill(null).map((_, index) => {
                //     fields[`Col ${index + 1} span`] = {
                //         type: "number",
                //         min: 1,
                //         max: data.props.columns,
                //     }
                // });

                return {...fields};
            },
            defaultProps: {
                cols: 2,
            },
            render: (props) => {
                return (
                    <Row>
                        {Array(props.cols).fill(null).map((_, index) => (
                            <Col key={index + 1} md={{span: props.col ? props.col[index]?.span : 6}}>
                                <DropZone zone={`column ${index + 1}`} />
                            </Col>
                        ))}
                    </Row>
                )
            }
        }
    },
};