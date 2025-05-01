import React, { useEffect, useState } from 'react';
import { Head, Link, router } from "@inertiajs/react"
import Layout from '../../../../Layouts/Event';
import '../../../../css/emailtemplate.css';
const Index = ({ baseTemplate }: any) => {

    const useTemplate = (id: any) => {
        console.log('Use Template:', id);
    };

    const previewTemplate = (id: any) => {
        const url = route("organizer.events.base.template.view", id);
        const win = window.open(url, '_blank');
        if (win) {
            win.focus();
        } else {
            alert("Popup blocked! Please allow popups for this site.");
        }
    };


    return (
        <div className="container" style={{
            marginTop: '100px'
        }}>
            <div className="row">
                {baseTemplate.map((template: any) => (
                    <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={template.id}>
                        <div className="templateCard card text-center shadow-sm">
                            <div className="card-header bg-white fw-semibold text-muted">
                                {template.name}
                            </div>
                            <div className="card-body p-0 position-relative templateImageWrapper">
                                <img
                                    src={
                                        '/storage/' + template.thumbnail ||
                                        'https://fullaccess.maildoll.com/not_found/no-preview.png'
                                    }
                                    alt="Template Thumbnail"
                                    className="templateImage"
                                />
                                <div className="hoverButtons">
                                    <button className="btn btn-outline-light mb-2" onClick={() => useTemplate(template.id)}>
                                        Use Template
                                    </button>
                                    <button className="btn btn-outline-light mb-2" onClick={() => previewTemplate(template.id)}>
                                        Preview
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
};


Index.layout = (page: any) => <Layout children={page} />;

export default Index;
