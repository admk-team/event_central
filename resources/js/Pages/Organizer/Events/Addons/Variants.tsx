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
import { useEffect, useState } from 'react'
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

export default function Variants({ data, onDataChange }: VariantsProps) {
    const [attributes, _setAttributes] = useState<Attribute[]>(data.attributes);
    const [variants, _setVariants] = useState<Variant[]>(data.variants);
    const [deletedAttributes, _setDeletedAttributes] = useState<number[]>([]);
    const [deletedOptions, _setDeletedOptions] = useState<number[]>([]);
    const [deletedVariants, _setDeletedVariants] = useState<number[]>([]);

    const setAttributes = (newAttributes: Attribute[]) => {
        _setAttributes(newAttributes);
        onDataChange && onDataChange({
            attributes: newAttributes,
            variants: variants,
            deletedAttributes: deletedAttributes,
            deletedOptions: deletedOptions,
        });
    }

    const setVariants = (newVariants: Variant[]) => {
        _setVariants(newVariants);
        onDataChange && onDataChange({
            attributes: attributes,
            variants: newVariants,
            deletedAttributes: deletedAttributes,
            deletedOptions: deletedOptions,
        });
    }

    const setDeletedAttributes = (newDeletedAttributes: number[]) => {
        _setDeletedAttributes(newDeletedAttributes);
        onDataChange && onDataChange({
            attributes: attributes,
            variants: variants,
            deletedAttributes: newDeletedAttributes,
            deletedOptions: deletedOptions,
        });
    }

    const setDeletedOptions = (newDeletedOptions: number[]) => {
        _setDeletedOptions(newDeletedOptions);
        onDataChange && onDataChange({
            attributes: attributes,
            variants: variants,
            deletedAttributes: deletedAttributes,
            deletedOptions: newDeletedOptions,
        });
    }

    const setDeletedVariants = (newDeletedVariants: number[]) => {
        _setDeletedVariants(newDeletedVariants);
        onDataChange && onDataChange({
            attributes: attributes,
            variants: variants,
            deletedAttributes: deletedAttributes,
            deletedOptions: deletedOptions,
            deletedVariants: newDeletedVariants,
        });
    }

    const getNonEmptyAttributes = (attributes: Attribute[]) => {
        return attributes.filter(attribute => attribute.name !== '' && getNonEmptyOptions(attribute).length > 0);
    }

    const getNonEmptyOptions = (attribute: Attribute) => {
        return attribute.options.filter(option => option.value !== '');
    }

    const addNewAttribute = () => {
        setAttributes([
            ...attributes,
            {
                name: '',
                options: [
                    { value: '' },
                ],
                edit: true,
            }
        ])
    }

    const setAttribute = (index: number, newAttribute: Attribute) => {
        setAttributes(attributes.map((attribute, attrIndex) => {
            if (attrIndex === index) {
                return newAttribute;
            }
            return attribute;
        }))
    }

    const deleteAttribute = (index: number, id?: number) => {
        setAttributes(attributes.filter((_, attrIndex) => attrIndex !== index));
        if (id) {
            setDeletedAttributes([...deletedAttributes, id]);
        }
    }

    const getOptionByAttributeValue = (attributeValue: AttributeValue) => {
        const isOld = attributeValue.addon_attribute_id !== undefined && attributeValue.addon_attribute_option_id !== undefined;

        if (isOld) {
            const attribute = attributes.find(attr => attr.id === attributeValue.addon_attribute_id) as Attribute;
            if (!attribute) return null;
            return getNonEmptyOptions(attribute).find(opt => opt.id === attributeValue.addon_attribute_option_id);

        } else {
            const attribute = attributes[attributeValue.attribute_index as number];
            if (!attribute) return null;
            return getNonEmptyOptions(attribute)[attributeValue.option_index as number];
        }
    }

    const addOption = (attributeIndex: number) => {
        setAttributes(attributes.map((attribute, index) => {
            if (index === attributeIndex) {
                return {
                    ...attribute,
                    options: [
                        ...attribute.options,
                        { value: '' }
                    ]
                }
            }
            return attribute;
        }))
    }

    const setOption = (attributeIndex: number, optionIndex: number, newOption: Option) => {
        setAttributes(attributes.map((attribute, index) => {
            if (index === attributeIndex) {
                return {
                    ...attribute,
                    options: attribute.options.map((option, optIndex) => {
                        if (optIndex === optionIndex) {
                            return newOption;
                        }
                        return option;
                    })
                }
            }
            return attribute;
        }))
    }

    const deleteOption = (attributeIndex: number, optionIndex: number, id?: number) => {
        setAttributes(attributes.map((attribute, index) => {
            if (index === attributeIndex) {
                return {
                    ...attribute,
                    options: attribute.options.filter((_, optIndex) => optIndex !== optionIndex)
                }
            }
            return attribute;
        }))

        if (id) {
            setDeletedOptions([...deletedOptions, id]);
        }
    }

    useEffect(() => {
        let newVariants: Variant[] = [];
        getNonEmptyAttributes(attributes).forEach((attribute, attrIndex) => {
            const nonEmptyOption = getNonEmptyOptions(attribute);
            const optionsCount = nonEmptyOption.length;
            
            if (optionsCount === 0) return;
            
            if (newVariants.length === 0) {
                nonEmptyOption.forEach((_, optIndex) => {
                    newVariants.push({
                        price: data.defaultPrice,
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
            variants.forEach(oldVariant => {
                if (oldVariant.attribute_values.length === variant.attribute_values.length &&
                    oldVariant.attribute_values.every((val, index) => {
                        return getOptionByAttributeValue(variant.attribute_values[index])?.value === getOptionByAttributeValue(val)?.value;
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

        setVariants(newVariants);
    }, [attributes])

    return (
        <>
            <Col md={12} className="mb-4">
                <Form.Label>Attributes</Form.Label>
                {/* Attributes */}
                <div>
                    <ListGroup className="mb-1">
                        {attributes.map((attribute, index) => (
                            <ListGroup.Item key={index} className="p-0">
                                {!attribute.edit ? (
                                    <div className="px-4 py-3 cursor-pointer addon-attr-option" onClick={() => setAttribute(index, { ...attribute, edit: true })}>
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
                                                onChange={(e) => setAttribute(index, { ...attribute, name: e.target.value })}
                                            />
                                        </FormGroup>
                                        <FormGroup className="mb-3">
                                            <Form.Label>Attribute options</Form.Label>
                                            {attribute.options.map((option, optionIndex) => (
                                                <InputGroup key={optionIndex} className='mb-1'>
                                                    <Form.Control
                                                        type="text"
                                                        value={option.value}
                                                        onChange={(e) => {
                                                            setOption(index, optionIndex, { ...option, value: e.target.value });
                                                        }}
                                                    />
                                                    {attribute.options.length > 1 && (
                                                        <Button size="sm" variant="danger" onClick={() => deleteOption(index, optionIndex, option.id)}><Trash2 size={16} /></Button>
                                                    )}
                                                </InputGroup>
                                            ))}
                                            <Button variant="light" className="w-100" onClick={() => addOption(index)}><Plus size={16} /></Button>
                                        </FormGroup>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <Button variant="danger" onClick={() => deleteAttribute(index, attribute.id)}>Delete</Button>
                                            <Button
                                                variant="secondary"
                                                onClick={() => setAttribute(index, { ...attribute, edit: false })}
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
                        onClick={addNewAttribute}
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
                        {variants.map((variant, index) => (
                            <tr key={index}>
                                <td>
                                    {variant.attribute_values.map((attrVal) => getOptionByAttributeValue(attrVal)?.value).join(' / ')}
                                </td>
                                <td>
                                    <Form.Control
                                        type="number"
                                        value={variant.price}
                                        onChange={(e) => {
                                            const newPrice = parseFloat(e.target.value);
                                            setVariants(variants.map((v, vIndex) => vIndex === index ? { ...v, price: isNaN(newPrice) ? 0 : newPrice } : v));
                                        }}
                                    />
                                </td>
                                <td>
                                    <Form.Control
                                        type="number"
                                        value={variant.qty}
                                        onChange={(e) => {
                                            const newQty = parseInt(e.target.value, 10);
                                            setVariants(variants.map((v, vIndex) => vIndex === index ? { ...v, qty: isNaN(newQty) ? 0 : newQty } : v));
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
