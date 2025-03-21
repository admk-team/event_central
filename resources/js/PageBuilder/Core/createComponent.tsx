import ComponentFields from "./ComponentFields";

export function createComponent(component: any) {
    const baseFieldName = 'customFields';

    const newComponent = {
        resolveFields: (data: any) => {
            let fields: any = {
                [baseFieldName]: {
                    type: "custom",
                    render: ComponentFields,
                },
            };

            return { ...fields };
        },
        defaultProps: {
            [baseFieldName]: { _component: { fields: component.fields } },
        },
        resolveData: async ({ props }: any) => {
            return {
                props: getResolvedProps(props[baseFieldName], component.fields),
            };
        },
        render: component.render,
    };

    return newComponent;
}


export function getResolvedProps(props: any, fields: any) {
    const resolvedProps: any = {
        ...props,
        marginLeft: props?.marginLeft ?? 0,
        marginTop: props?.marginTop ?? 0,
        marginRight: props?.marginRight ?? 0,
        marginBottom: props?.marginBottom ?? 0,

        paddingLeft: props?.paddingLeft ?? 0,
        paddingTop: props?.paddingTop ?? 0,
        paddingRight: props?.paddingRight ?? 0,
        paddingBottom: props?.paddingBottom ?? 0,
    };

    for (const [field, fieldConfig] of Object.entries(fields ?? {}) as [any, any][]) {
        resolvedProps[field] = props?.[field] ?? fieldConfig.default ?? null;
    }

    return  resolvedProps;
}