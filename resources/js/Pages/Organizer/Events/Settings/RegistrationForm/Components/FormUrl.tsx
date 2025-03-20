import { Link, usePage } from '@inertiajs/react'
import { Copy, CopyCheck } from 'lucide-react'
import React from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle } from 'react-bootstrap'
import toast from 'react-hot-toast';

export default function FormUrl() {
    const url = usePage().props.url as string;

    const copyLink = () => {
        navigator.clipboard.writeText(url)
        .then(() => {
            toast.success("Copied!");
        })
        .catch(() => {
          toast.error("Failed to copy");
        });
    }

    return (
        <Card>
            <CardBody>
                <CardTitle>URL</CardTitle>
                <CardText>
                    <a href={url} target="blank">{url}</a>
                </CardText>
            </CardBody>
            <CardFooter>
                <Button className="d-flex gap-1" onClick={copyLink}>
                    <Copy size={20} />
                    <span>Copy</span>
                </Button>
            </CardFooter>
        </Card>
    )
}
