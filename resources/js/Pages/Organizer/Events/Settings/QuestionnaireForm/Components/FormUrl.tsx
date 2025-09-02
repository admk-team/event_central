import { Link, usePage } from '@inertiajs/react';
import { Copy } from 'lucide-react';
import React from 'react';
import { Button, Card, CardBody, CardFooter, CardText, CardTitle } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export default function FormUrl() {
    const url = usePage().props.url as string;
    const { t } = useTranslation();

    const copyLink = () => {
        navigator.clipboard.writeText(url)
            .then(() => {
                toast.success(t("Copied!"));
            })
            .catch(() => {
                toast.error(t("Failed to copy"));
            });
    };

    return (
        <Card>
            <CardBody>
                <CardTitle>{t("URL")}</CardTitle>
                <CardText>
                    <a href={url} target="blank">{url}</a>
                </CardText>
            </CardBody>
            <CardFooter>
                <Button className="d-flex gap-1" onClick={copyLink}>
                    <Copy size={20} />
                    <span>{t("Copy")}</span>
                </Button>
            </CardFooter>
        </Card>
    );
}
