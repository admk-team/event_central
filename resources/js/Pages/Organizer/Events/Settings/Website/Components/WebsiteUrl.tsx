import { Link, usePage } from '@inertiajs/react'
import { Copy, CopyCheck } from 'lucide-react'
import React from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle } from 'react-bootstrap'
import toast from 'react-hot-toast';

export default function WebsiteUrl() {
    const url = usePage().props.url as string;
    const previewUrl = usePage().props.previewUrl as string;
    const copyLink = () => {
        navigator.clipboard.writeText(url)
        .then(() => {
            toast.success("Copied!");
        })
        .catch(() => {
          toast.error("Failed to copy");
        });
    }
    const openPreview = () => {
        if (previewUrl) {
            window.open(previewUrl, '_blank');
        } else {
            toast.error("Preview URL not available");
        }
    };
    return (
        <Card>
            <CardBody>
                <CardTitle>URL</CardTitle>
                <CardText>
                    <a href={url} target="blank">{url}</a>
                </CardText>
            </CardBody>
            <CardFooter>
                <div className="d-flex gap-2">
                    <Button className="d-flex align-items-center gap-1" onClick={copyLink}>
                        <Copy size={20} />
                        <span>Copy</span>
                    </Button>
                    <Button className="d-flex align-items-center gap-1" variant="secondary" onClick={openPreview}>
                        <span>Preview</span>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}
