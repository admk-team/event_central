import { Link, usePage } from '@inertiajs/react'
import { Copy, CopyCheck } from 'lucide-react'
import React from 'react'
import { Button, Card, CardBody, CardFooter, CardText, CardTitle } from 'react-bootstrap'
import toast from 'react-hot-toast';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function WebsiteUrl() {
    const { t } = useLaravelReactI18n();
    const url = usePage().props.url as string;
    const previewUrl = usePage().props.previewUrl as string;

    const copyLink = () => {
        navigator.clipboard.writeText(url)
            .then(() => {
                toast.success(t("Copied!"));
            })
            .catch(() => {
                toast.error(t("Failed to copy"));
            });
    }

    const openPreview = () => {
        if (previewUrl) {
            window.open(previewUrl, '_blank');
        } else {
            toast.error(t("Preview URL not available"));
        }
    };

    return (
        <Card>
            <CardBody>
                <CardTitle>{t("URL")}</CardTitle>
                <CardText>
                    <a href={url} target="_blank">{url}</a>
                </CardText>
            </CardBody>
            <CardFooter>
                <div className="d-flex gap-2">
                    <Button className="d-flex align-items-center gap-1" onClick={copyLink}>
                        <Copy size={20} />
                        <span>{t("Copy")}</span>
                    </Button>
                    <Button className="d-flex align-items-center gap-1" onClick={openPreview}>
                        <span>{t("Preview")}</span>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}
