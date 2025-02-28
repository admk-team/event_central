import { Link } from '@inertiajs/react'
import { Copy, CopyCheck } from 'lucide-react'
import React from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle } from 'react-bootstrap'

export default function WebsiteUrl() {
    const [copied, setCopeid] = React.useState(false);
    const copyLink = () => {
        setCopeid(true);
        setTimeout(() => setCopeid(false), 3000);
    }

    return (
        <Card>
            <CardBody>
                <CardTitle>URL</CardTitle>
                <CardText>
                    <Link href='#'>
                        https://eventee.com/e/VZ5hOg9rsTvnCujMU3kQ7oFE7wXQy92JvNl7WSkHRak4HW3HIEJAsBZjEQJeOBGDCdAZvpWP6PfASy3xSBU8SqMafBFIfSppUlG5KHiANc1VOMYCRvtcrb4ElMiuNm0N
                    </Link>
                </CardText>
            </CardBody>
            <CardFooter>
                <Button className="d-flex gap-1" onClick={copyLink} disabled={copied}>
                    {copied ? (
                        <>
                        <CopyCheck size={20} />
                        <span>Copied!</span>
                        </>
                    ) : (
                        <>
                        <Copy size={20} />
                        <span>Copy</span>
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    )
}
