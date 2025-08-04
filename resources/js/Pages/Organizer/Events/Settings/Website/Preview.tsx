import React from 'react';
import { Head } from '@inertiajs/react';

function Preview({ event, header, footer, page, colors }) {
    return (
        <div
            style={{
                backgroundColor: colors?.background || '#fff',
                color: colors?.text || '#000',
                padding: '2rem',
                minHeight: '100vh',
            }}
        >
            <Head title={`Preview - ${event.name}`} />

            {header && (
                <header dangerouslySetInnerHTML={{ __html: header.content }} />
            )}

            <main className="my-4">
                <h1>{page?.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: page?.content }} />
            </main>

            {footer && (
                <footer dangerouslySetInnerHTML={{ __html: footer.content }} />
            )}
        </div>
    );
}

export default Preview;
