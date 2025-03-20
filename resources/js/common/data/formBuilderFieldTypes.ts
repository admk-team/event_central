import { CircleChevronDown, LucideProps, SquareCheck, Text, Type } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import LongText from "../../Components/FormBuilder/Fields/LongText";
import ShortText from "../../Components/FormBuilder/Fields/ShortText";
import Choice from "../../Components/FormBuilder/Fields/Choice";
import Dropdown from "../../Components/FormBuilder/Fields/Dropdown";

export type FieldType = {
    name: string;
    label: string;
    icon: (() => JSX.Element) | ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    render: React.FC<{ name: string, field: any }>;
    formFields: string[];
}

export const fieldTypes: Record<string, FieldType> = {
    short_text: {
        name: 'short_text',
        label: 'Short Text',
        icon: Type,
        render: ShortText,
        formFields: [
            'label',
            'placeholder',
            'description',
            'required_field',
        ],
    },
    long_text: {
        name: 'long_text',
        label: 'Long Text',
        icon: Text,
        render: LongText,
        formFields: [
            'label',
            'placeholder',
            'description',
            'required_field',
        ],
    },
    choice: {
        name: 'choice',
        label: 'Choice',
        icon: SquareCheck,
        render: Choice,
        formFields: [
            'label',
            'description',
            'options',
            'multiple_selection',
            'required_field',
        ],
    },
    dropdown: {
        name: 'dropdown',
        label: 'Dropdown',
        icon: CircleChevronDown,
        render: Dropdown,
        formFields: [
            'label',
            'placeholder',
            'description',
            'options',
            'required_field',
        ],
    },
}