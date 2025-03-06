import React from 'react'
import { Render } from "@measured/puck";
import { config } from '../../../../PageBuilder/Config';

export default function Page({ page }: any) {
    const data = page.content ? JSON.parse(page.content) : {
        root: {
            props: {
                title: page.title,
            }
        }
    };

    return (
        <Render config={config} data={data} />
    )
}
