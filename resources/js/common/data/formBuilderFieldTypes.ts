import { LucideProps, Text, Type } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type FieldType = {
    name: string;
    label: string;
    icon: (() => JSX.Element) | ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

export const fieldTypes: FieldType[] = [
    {
        name: 'text',
        label: 'Short Text',
        icon: Type
    },
    {
        name: 'long_text',
        label: 'Long Text',
        icon: Text
    },
]