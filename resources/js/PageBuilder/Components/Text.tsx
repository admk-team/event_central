export const Text = {
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
}