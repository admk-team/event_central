import { Head, Link } from '@inertiajs/react';
import React, { useState } from 'react';
import Layout from '../../Layouts/Attendee';
import { Card, Col, Container, Row } from 'react-bootstrap';
import TicketCard from './TicketCard';


const Tickets = ({ eventApp }: any) => {

    const [plan, setPlan] = useState<boolean>(true);
    const toggle = () => setPlan(!plan);

    console.log(eventApp);

    return (
        <React.Fragment>
            {/* <Head title="Event Tickets" /> */}
            <section className="section bg-light" id="plans">
                <div className="bg-overlay bg-overlay-pattern"></div>
                <Container>
                    <Row className="justify-content-center mt-3 ">
                        <Col lg={8}>
                            <div className="text-center mb-5">
                                <h3 className="mb-3 fw-bold">Choose the Ticket that's right for you</h3>
                                <p className="text-muted mb-4">Simple pricing. No hidden fees.</p>
                            </div>
                        </Col>
                    </Row>

                    <Row className="gy-4">
                        {eventApp.tickets.length > 0 && eventApp.tickets.map((ticket: any) =>
                            <TicketCard ticket={ticket} key={ticket.id}></TicketCard>
                        )}
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    );
};
// Tickets.layout = (page: any) => <Layout children={page} />
export default Tickets;
