import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import Layout from '../../../../Layouts/Event';
import '../../../../css/emailtemplate.css';
import { useLaravelReactI18n } from "laravel-react-i18n";
const Index = ({ baseTemplate }: any) => {
    const { post, get } = useForm({});
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
    const { t } = useLaravelReactI18n();
    const useTemplate = (id: number) => {
        post(route('organizer.events.use.badge.design', {
            baseTemplate: id
        }));
    };

    const previewTemplate = (id: number) => {
        const url = route('organizer.events.badge-template.show', id);
        const win = window.open(url, '_blank');
        if (win) {
            win.focus();
        } else {
            alert(t('Popup blocked! Please allow popups for this site.'));
        }
    };

    const editTemplate = (id: number) => {
        router.visit(route('organizer.events.badge-template.edit', id));
    };

    const deleteTemplate = (id: number) => {
        if (confirm(`Are you sure you want to delete template #${id}? This action cannot be undone.`)) {
            router.delete(route('organizer.events.badge.template.delete', id));
        }
    };

    return (
        <div className="container" style={{
            marginTop: '100px'
        }}>
            <div className='row'>
                <div className='col-sm-4'>
                    <button
                        className="btn btn-primary mb-3"
                        onClick={() => router.visit(route('organizer.events.badge-template.create'))}
                    >
                        {t('Create New Template')}
                    </button>
                </div>
            </div>
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
                                        template.thumbnail
                                            ? '/storage/' + template.thumbnail
                                            : 'https://fullaccess.maildoll.com/not_found/no-preview.png'
                                    }
                                    alt="Template Thumbnail"
                                    className="templateImage"
                                />
                                <div className="hoverButtons">
                                    <button
                                        className="btn btn-outline-light mb-2"
                                        onClick={() => useTemplate(template.id)}
                                    >
                                        {t('Use Template')}
                                    </button>
                                    <button
                                        className="btn btn-outline-light mb-2"
                                        onClick={() => previewTemplate(template.id)}
                                    >
                                        {t('Preview')}
                                    </button>
                                    <button
                                        className="btn btn-outline-light mb-2"
                                        onClick={() => editTemplate(template.id)}
                                    >
                                        {t('Edit')}
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteTemplate(template.id)}
                                    >
                                        {t('Delete')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

Index.layout = (page: any) => <Layout children={page} />;

export default Index;
