import ListGroup from 'react-bootstrap/ListGroup';
import {
    Spinner,
    Col,
    Form,
    FormGroup,
    Modal,
    Nav,
    Row,
    Tab,
    Button,
    Badge,
    Table,
} from "react-bootstrap";
import { useEffect, useReducer, useState } from 'react'
import InputGroup from 'react-bootstrap/InputGroup';;
import { add } from 'date-fns';
import { Plus, Trash, Trash2 } from 'lucide-react';

type Attribute = {
    id?: number;
    name: string;
    edit: boolean;
    options: Option[];
}

type Option = {
    id?: number;
    value: string;
}

type Variant = {
    id?: number;
    price: number;
    qty: number;
    attribute_values: AttributeValue[];
}

type AttributeValue = {
    attribute_index?: number;
    option_index?: number;
    addon_attribute_id?: number;
    addon_attribute_option_id?: number;
}

type Data = {
    attributes: Attribute[];
    variants: Variant[];
    deletedAttributes: number[];
    deletedOptions: number[];
    deletedVariants?: number[];
    defaultPrice: number;
}

type VariantsProps = {
    data: Omit<Data, 'deletedAttributes' | 'deletedOptions' | 'deletedVariants'>;
    onDataChange: (data: Omit<Data, 'defaultPrice'>) => void;
}

type State = {
    attributes: Attribute[];
    variants: Variant[];
    deletedAttributes: number[];
    deletedOptions: number[];
    deletedVariants: number[];
}

type AddAttribute = {
    type: 'add_attribute';
}

type EditAttributeAction = {
    type: 'edit_attribute';
    index: number;
    edit: boolean;
}

type UpdateAttributeName = {
    type: 'update_attribute_name';
    index: number;
    name: string;
}

type DeleteAttribute = {
    type: 'delete_attribute';
    index: number;
    id?: number;
}

type AddOption = {
    type: 'add_option';
    attributeIndex: number;
}

type UpdateOptionValue = {
    type: 'update_option_value';
    attributeIndex: number;
    optionIndex: number;
    value: string;
}

type DeleteOption = {
    type: 'delete_option';
    attributeIndex: number;
    optionIndex: number;
    optionId?: number;
}

type UpdateVariantPrice = {
    type: 'update_variant_price';
    index: number;
    price: number;
}

type UpdateVariantQty = {
    type: 'update_variant_qty';
    index: number;
    qty: number;
}

type Action = AddAttribute | EditAttributeAction | UpdateAttributeName | DeleteAttribute | AddOption | UpdateOptionValue | DeleteOption | UpdateVariantPrice | UpdateVariantQty;

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'add_attribute': {
            return {
                ...state,
                attributes: [
                    ...state.attributes,
                    {
                        name: '',
                        options: [
                            { value: '' },
                        ],
                        edit: true,
                    }
                ]
            }
        }
        case 'edit_attribute': {
            let newState = {
                ...state,
                attributes: state.attributes.map((attribute, i) => i === action.index ? {...attribute, edit: action.edit} : attribute)
            };
            newState = generateVariants(newState);
            return newState;
        }
        case 'update_attribute_name': {
            let newState = {
                ...state,
                attributes: state.attributes.map((attribute, i) => i === action.index ? {...attribute, name: action.name} : attribute)
            };
            newState = generateVariants(newState);
            return newState;
        }
        case 'delete_attribute': {
            let newState = {
                ...state,
                attributes: state.attributes.filter((_, i) => i !== action.index),
                deletedAttributes: [
                    ...state.deletedAttributes,
                    ...(action.id ? [action.id] : [])
                ],
            };
            newState = generateVariants(newState);
            return newState;
        }
        case 'add_option': {
            return {
                ...state,
                attributes: state.attributes.map((attribute, i) => {
                    if (i === action.attributeIndex) {
                        return {
                            ...attribute,
                            options: [...attribute.options, { value: '' }]
                        }
                    }
                    return attribute;
                })
            };
        }
        case 'update_option_value': {
            let newState = {
                ...state,
                attributes: state.attributes.map((attribute, aIndex) => {
                    if (aIndex === action.attributeIndex) {
                        return {
                            ...attribute,
                            options: attribute.options.map((option, oIndex) => oIndex === action.optionIndex ? {...option, value: action.value} : option)
                        };
                    }
                    return attribute;
                })
            };
            newState = generateVariants(newState);
            return newState;
        }
        case 'delete_option': {
            let newState = {
                ...state,
                attributes: state.attributes.map((attribute, aIndex) => {
                    if (aIndex === action.attributeIndex) {
                        return {
                            ...attribute,
                            options: attribute.options.filter((_, oIndex) => oIndex !== action.optionIndex)
                        };
                    }
                    return attribute;
                }),
                deletedOptions: [
                    ...state.deletedOptions,
                    ...(action.optionId ? [action.optionId]: [])
                ]
            };
            newState = generateVariants(newState);
            return newState;
        }
        case 'update_variant_price': {
            return {
                ...state,
                variants: state.variants.map((variant, i) => i === action.index ? {...variant, price: action.price} : variant)
            }
        }
        case 'update_variant_qty': {
            return {
                ...state,
                variants: state.variants.map((variant, i) => i === action.index ? {...variant, qty: action.qty} : variant)
            }
        }
        default: {
            throw Error('Unknown action');
        }
    }
}

export default function Variants({ data, onDataChange }: VariantsProps) {
    const [state, dispatch] = useReducer(reducer, {
        attributes: data.attributes,
        variants: data.variants,
        deletedAttributes: [],
        deletedOptions: [],
        deletedVariants: [],
    });

    useEffect(() => {
        onDataChange && onDataChange(state);
    }, [state])

    return (
        <>
            <Col md={12} className="mb-4">
                <Form.Label>Attributes</Form.Label>
                {/* Attributes */}
                <div>
                    <ListGroup className="mb-1">
                        {state.attributes.map((attribute, index) => (
                            <ListGroup.Item key={index} className="p-0">
                                {!attribute.edit ? (
                                    <div className="px-4 py-3 cursor-pointer addon-attr-option" onClick={() => dispatch({ type: 'edit_attribute', index, edit: true })}>
                                        <div className="fw-bold mb-2">{attribute.name}</div>
                                        <div className="d-flex flex-wrap gap-2">
                                            {getNonEmptyOptions(attribute).map((option, optionIndex) => (
                                                <Badge bg="light" className="text-black fs-6 py-2" key={optionIndex}>{option.value}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="px-4 py-4">
                                        <FormGroup className="mb-3">
                                            <Form.Label>Attribute Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={attribute.name}
                                                onChange={(e) => dispatch({ type: 'update_attribute_name', index, name: e.target.value })}
                                            />
                                        </FormGroup>
                                        <FormGroup className="mb-3">
                                            <Form.Label>Attribute options</Form.Label>
                                            {attribute.options.map((option, optionIndex) => (
                                                <InputGroup key={optionIndex} className='mb-1'>
                                                    <Form.Control
                                                        type="text"
                                                        value={option.value}
                                                        onChange={(e) => dispatch({ type: 'update_option_value', attributeIndex: index, optionIndex, value: e.target.value })}
                                                    />
                                                    {attribute.options.length > 1 && (
                                                        <Button size="sm" variant="danger" onClick={() => dispatch({ type: 'delete_option', attributeIndex: index, optionIndex, optionId: option.id})}><Trash2 size={16} /></Button>
                                                    )}
                                                </InputGroup>
                                            ))}
                                            <Button variant="light" className="w-100" onClick={() => dispatch({ type: 'add_option', attributeIndex: index })}><Plus size={16} /></Button>
                                        </FormGroup>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <Button variant="danger" onClick={() => dispatch({ type: 'delete_attribute', index, id: attribute.id })}>Delete</Button>
                                            <Button
                                                variant="secondary"
                                                onClick={() => dispatch({ type: 'edit_attribute', index, edit: false })}
                                                disabled={!attribute.name || !attribute.options[0].value}
                                            >Done</Button>
                                        </div>
                                    </div>
                                )}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <Button
                        variant="light"
                        className="d-block w-100 d-flex align-items-center justify-content-center"
                        onClick={() => dispatch({ type: 'add_attribute' })}
                    >
                        Add new attribute
                    </Button>
                </div>
            </Col>

            <Col md={12}>
                <div className="d-flex justify-content-between align-items=center mb-3">
                    <Form.Label className="mb-0">Variants</Form.Label>
                </div>
                <Table bordered size="sm">
                    <thead className="bg-light">
                        <tr>
                            <th>Variant</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.variants.map((variant, index) => (
                            <tr key={index}>
                                <td>
                                    {variant.attribute_values.map((attrVal) => getOptionByAttributeValue(attrVal, state)?.value).join(' / ')}
                                </td>
                                <td>
                                    <Form.Control
                                        type="number"
                                        value={variant.price}
                                        onChange={(e) => {
                                            const newPrice = parseFloat(e.target.value);
                                            dispatch({ type: 'update_variant_price', index, price: newPrice });
                                        }}
                                    />
                                </td>
                                <td>
                                    <Form.Control
                                        type="number"
                                        value={variant.qty}
                                        onChange={(e) => {
                                            const newQty = parseInt(e.target.value, 10);
                                            dispatch({ type: 'update_variant_qty', index, qty: newQty })
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Col>
        </>
    )
}

function generateVariants(state: State): State {
    let newVariants: Variant[] = [];
    getNonEmptyAttributes(state.attributes).forEach((attribute, attrIndex) => {
        const nonEmptyOption = getNonEmptyOptions(attribute);
        const optionsCount = nonEmptyOption.length;
        
        if (optionsCount === 0) return;
        
        if (newVariants.length === 0) {
            nonEmptyOption.forEach((_, optIndex) => {
                newVariants.push({
                    price: 0,
                    qty: 0,
                    attribute_values: [
                        {
                            attribute_index: attrIndex,
                            option_index: optIndex,
                        }
                    ]
                });
            })
            return;
        }
        
        const variantGroups: Variant[][] = [];
        newVariants.forEach((variant) => {
            const group: Variant[] = [];
            for (let i = 1; i <= optionsCount; ++i) {
                group.push(JSON.parse(JSON.stringify(variant)));
            }
            variantGroups.push(group);
        });
        newVariants = variantGroups.flat();
    
        newVariants.forEach((_, variantIndex) => {
            const optionIndex = variantIndex % (optionsCount);
            newVariants[variantIndex].attribute_values.push({
                attribute_index: attrIndex,
                option_index: optionIndex,
            });
        });
    })

    newVariants = newVariants.map(variant => {
        state.variants.forEach(oldVariant => {
            if (oldVariant.attribute_values.length === variant.attribute_values.length &&
                oldVariant.attribute_values.every((val, index) => {
                    return getOptionByAttributeValue(variant.attribute_values[index], state)?.value === getOptionByAttributeValue(val, state)?.value;
                })) {
                return {
                    ...variant,
                    id: oldVariant.id,
                    price: oldVariant.price,
                    qty: oldVariant.qty,
                };
            }
        });

        return variant;
    });

    // Copy data from old variants to new variants
    state.variants.forEach((oldVariant) => {
        const oldVariantAttributeCount = oldVariant.attribute_values.length;
        let matchFound = false;

        newVariants = newVariants.map((newVariant) => {
            let matchedAttributes = 0;
            oldVariant.attribute_values.forEach((oldAttributeValue) => {
                newVariant.attribute_values.forEach((newAttributeValue) => {
                    if (getOptionByAttributeValue(oldAttributeValue, state)?.value === getOptionByAttributeValue(newAttributeValue, state)?.value) {
                        ++matchedAttributes;
                    }
                })
            })

            if (matchedAttributes === oldVariantAttributeCount) {
                matchFound = true;
                return {
                    ...newVariant,
                    id: oldVariant.id,
                    price: oldVariant.price,
                    qty: oldVariant.qty,
                }
            }

            return newVariant;
        })

        if (!matchFound && oldVariant.id) {
            state.deletedVariants.push(oldVariant.id);
        }
    })
    
    state.variants = newVariants;

    return state;
}

function getNonEmptyAttributes(attributes: Attribute[]) {
    return attributes.filter(attribute => attribute.name !== '' && getNonEmptyOptions(attribute).length > 0);
}

function getNonEmptyOptions(attribute: Attribute) {
    return attribute.options.filter(option => option.value !== '');
}

function getOptionByAttributeValue(attributeValue: AttributeValue, state: State) {
    const isOld = attributeValue.addon_attribute_id !== undefined && attributeValue.addon_attribute_option_id !== undefined;

    if (isOld) {
        const attribute = state.attributes.find(attr => attr.id === attributeValue.addon_attribute_id) as Attribute;
        if (!attribute) return null;
        return getNonEmptyOptions(attribute).find(opt => opt.id === attributeValue.addon_attribute_option_id);

    } else {
        const attribute = state.attributes[attributeValue.attribute_index as number];
        if (!attribute) return null;
        return getNonEmptyOptions(attribute)[attributeValue.option_index as number];
    }
}