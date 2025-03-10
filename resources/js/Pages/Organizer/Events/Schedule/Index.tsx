import { Head } from '@inertiajs/react';
import React from 'react';
import Layout from '../../../../Layouts/Event';
import { Button, Card, CardBody, CardHeader, Container } from 'react-bootstrap';
import BreadCrumb2 from '../../../../Components/Common/BreadCrumb2';
import Platforms from './Components/Platforms';


function Index() {
    const [selectedPlatform, setSelectedPlatform] = React.useState<any>(null);

    return (
        <React.Fragment>
            <Head title='Schedule' />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb2 
                        title="Schedule"
                    />
                    <Card className="schedule">
                        <CardHeader className="d-flex justify-content-between align-items-center">
                            <div className="fw-bold fs-5">March 15, 2024</div>
                            <Button><i className="ri-add-fill"></i> New Session</Button>
                        </CardHeader>
                        <CardBody className="p-0 d-flex" style={{height: '400px'}}>
                            <div className="sidebar">
                                <Platforms onPlatformChange={(platform: any) => setSelectedPlatform(platform)} />
                            </div>
                            <div className="flex-grow-1">
                                {selectedPlatform?.name}
                            </div>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    )
}

Index.layout = (page: any) => <Layout children={page} />;

export default Index;
