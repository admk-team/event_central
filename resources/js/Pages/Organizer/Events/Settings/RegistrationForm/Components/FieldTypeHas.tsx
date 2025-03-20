import React from 'react'
import { fieldTypes } from '../../../../../../common/data/formBuilderFieldTypes'

export default function FieldTypeHas({ type, name, children }: any) {
    if (fieldTypes[type].formFields.includes(name)) {
        return children;
    }

    return null;
}
