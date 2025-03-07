import React, { useState } from 'react'
import { Data, Puck, usePuck } from "@measured/puck";
import "@measured/puck/puck.css";
import { ArrowLeft, Save } from 'lucide-react';
import { Link, router } from '@inertiajs/react';
import useToastMessages from '../../../../../hooks/useToastMessages';
import  { Toaster } from 'react-hot-toast';
import { Spinner } from 'react-bootstrap';
import { config } from '../../../../../PageBuilder/Config';

export default function FooterBuilder({ footer }: any) {
    const initialData = footer.content ? JSON.parse(footer.content) : {
        root: {
            props: {
                title: footer.title,
            }
        }
    };

    const [processing, setProcessing] = useState(false);

    const save = (footerData: Data) => {
        router.post(route('organizer.events.footers.builder.save', footer.id), {
            footer_title: footerData.root.props?.title,
            footer_data: JSON.stringify(footerData),
        }, { 
            preserveScroll: true, 
            onBefore: () => setProcessing(true),
            onFinish: () => setProcessing(false),
        });
    };

    useToastMessages();

    return (
        <>
            <Puck 
                config={config}
                data={initialData} 
                onPublish={save}
                overrides={{
                    header: ({children}) => {
                        return (
                            <div className="d-flex" style={{gridArea: 'header'}}>
                                <div className="bg-white d-flex align-items-center gap-2 px-3" style={{borderBottom: '1px solid var(--puck-color-grey-09)'}}>
                                    <Link href={route('organizer.events.settings.website.index')}>
                                        <button className="_Button_10byl_1 _Button--primary_10byl_48 _Button--medium_10byl_29"><ArrowLeft size={18} /> Back</button>
                                    </Link>
                                </div>
                                <div style={{flex: 1}}>
                                    {children}
                                </div>
                            </div>
                        );
                    },
                    headerActions: ({children}) => {
                        const { appState } = usePuck();

                        return (
                            <>
                                <button 
                                    onClick={() => {
                                        save(appState.data);
                                    }}
                                    className="_Button_10byl_1 _Button--primary_10byl_48 _Button--medium_10byl_29 d-flex justify-content-center align-items-center"
                                    style={{width: '100px'}}
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <span>
                                            <Save size={18} /> Save
                                        </span>
                                    )}
                                </button>
                            </>
                        )
                    }
                }}
            />
            <Toaster />
        </>
    );
}
