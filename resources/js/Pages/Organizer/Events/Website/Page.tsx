import React from 'react'
import { Render } from "@measured/puck";
import { config } from '../../../../PageBuilder/Config';

export default function Page({ page, header, footer }: any) {
    const data = page.content ? JSON.parse(page.content) : {
        root: {
            props: {
                title: page.title,
            }
        }
    };

    let headerData = null;
    if (header) {
        headerData = header?.content ? JSON.parse(header.content) : {
           root: {
               props: {
                   title: header.title,
               }
           }
       };
    }

    let footerData = null;
    if (footer) {
        footerData = footer?.content ? JSON.parse(footer.content) : {
            root: {
                props: {
                    title: footer.title,
                }
            }
        };
    }

    return (
        <>
            {headerData && (
                <Render config={config} data={headerData} />
            )}

            <Render config={config} data={data} />

            {footerData && (
                <Render config={config} data={footerData} />
            )}
        </>
    )
}
