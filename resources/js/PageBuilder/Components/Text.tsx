import React from 'react'

export type TextType = {
    text: string
}

export const TextBlock = {
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
