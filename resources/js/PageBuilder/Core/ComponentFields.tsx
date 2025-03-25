import { Field } from "formik";
import { FormControl, FormGroup, FormLabel, Nav, Tab } from "react-bootstrap";
import { getResolvedProps } from "./createComponent";
import ComponentUserFields from "./ComponentUserFields";

export default function ComponentFields({ name, onChange, value }: any) {
    const component = value._component;

    value = getResolvedProps(value, component.fields);

    return (
        <div style={{ margin: "-16px -16px 0 -16px" }}>
            <Tab.Container defaultActiveKey="1">
                <Nav className="nav-tabs nav-justified mb-3 border-bottom">
                    <Nav.Item>
                        <Nav.Link eventKey="1" className="text-dark fw-bold">Content</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="2" className="text-dark fw-bold">Style</Nav.Link>
                    </Nav.Item>
                </Nav>

                <Tab.Content className="text-muted">
                    <Tab.Pane eventKey="1" className="px-3">
                        {/* User Fields */}
                        <ComponentUserFields
                            fields={component.fields}
                            onChange={onChange}
                            value={value}
                            tab="content"
                        />
                    </Tab.Pane>

                    <Tab.Pane eventKey="2" className="px-3">
                        {/* Margin */}
                        <FormGroup className="mb-3">
                            <FormLabel className="fw-semibold text-dark">Margin</FormLabel>
                            <div className="d-flex gap-1">
                                <div>
                                    <FormLabel>Left</FormLabel>
                                    <FormControl
                                        type="number"
                                        value={value?.marginLeft ?? 0} 
                                        onChange={(e) => onChange({...value, marginLeft: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <FormLabel>Top</FormLabel>
                                    <FormControl
                                        type="number"
                                        value={value?.marginTop ?? 0} 
                                        onChange={(e) => onChange({...value, marginTop: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <FormLabel>Right</FormLabel>
                                    <FormControl
                                        type="number"
                                        value={value?.marginRight ?? 0} 
                                        onChange={(e) => onChange({...value, marginRight: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <FormLabel>Bottom</FormLabel>
                                    <FormControl
                                        type="number"
                                        value={value?.marginBottom ?? 0} 
                                        onChange={(e) => onChange({...value, marginBottom: e.target.value})}
                                    />
                                </div>
                            </div>
                        </FormGroup>

                        {/* Padding */}
                        <FormGroup className="mb-3">
                            <FormLabel className="fw-semibold text-dark">Padding</FormLabel>
                            <div className="d-flex gap-1">
                                <div>
                                    <FormLabel>Left</FormLabel>
                                    <FormControl
                                        type="number"
                                        value={value?.paddingLeft ?? 0} 
                                        onChange={(e) => onChange({...value, paddingLeft: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <FormLabel>Top</FormLabel>
                                    <FormControl
                                        type="number"
                                        value={value?.paddingTop ?? 0} 
                                        onChange={(e) => onChange({...value, paddingTop: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <FormLabel>Right</FormLabel>
                                    <FormControl
                                        type="number"
                                        value={value?.paddingRight ?? 0} 
                                        onChange={(e) => onChange({...value, paddingRight: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <FormLabel>Bottom</FormLabel>
                                    <FormControl
                                        type="number"
                                        value={value?.paddingBottom ?? 0} 
                                        onChange={(e) => onChange({...value, paddingBottom: e.target.value})}
                                    />
                                </div>
                            </div>
                        </FormGroup>

                        {/* User Fields */}
                        <ComponentUserFields
                            fields={component.fields}
                            onChange={onChange}
                            value={value}
                            tab="style"
                        />
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </div>
    );
}
