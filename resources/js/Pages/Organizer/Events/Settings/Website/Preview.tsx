import React from 'react';
import { Head } from '@inertiajs/react';

function Preview({ event, header, footer, page, colors }) {
    return (
        <div
            style={{
                backgroundColor: colors?.background || '#ffffff',
                color: colors?.text || '#000000',
                padding: '2rem',
                minHeight: '100vh',
            }}
        >
            <Head title={`Preview - ${event.name}`} />

            {header && (
                <header dangerouslySetInnerHTML={{ __html: header.content }} />
            )}

            <main className="my-4">
                {page?.title && <h1>{page.title}</h1>}
                {page?.content && (
                    <div dangerouslySetInnerHTML={{ __html: page.content }} />
                )}
            </main>

            {footer && (
                <footer dangerouslySetInnerHTML={{ __html: footer.content }} />
            )}
        </div>
    );
}

// ✅ Disable admin layout for standalone preview
Preview.layout = null;

export default Preview;
