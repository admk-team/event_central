export default function ComponentWrapper<T extends keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<any>>({
    fields,
    children,
    as,
    ...props
}: {
    fields: any;
    children: JSX.Element;
    as?: T;
} & React.ComponentProps<T>) {
    const Comp = as ? as : "div";
    return (
        <Comp
            {...props}
            style={{
                marginLeft: `${fields.marginLeft ?? 0}px`,
                marginTop: `${fields.marginTop ?? 0}px`,
                marginRight: `${fields.marginRight ?? 0}px`,
                marginBottom: `${fields.marginBottom ?? 0}px`,

                paddingLeft: `${fields.paddingLeft ?? 0}px`,
                paddingTop: `${fields.paddingTop ?? 0}px`,
                paddingRight: `${fields.paddingRight ?? 0}px`,
                paddingBottom: `${fields.paddingBottom ?? 0}px`,
            }}
        >
            {children}
        </Comp>
    );
}
