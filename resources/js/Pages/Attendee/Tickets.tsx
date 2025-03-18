import { Head, Link, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import Layout from '../../Layouts/Attendee';
import { Button, Col, Container, Row } from 'react-bootstrap';
import TicketCard from './TicketCard';


const Tickets = ({ eventApp }: any) => {

    const [grandTotal, setGrandTotal] = useState(0);
    const [selectedTickets, setSelectedTicket] = useState(Array<any>);


    const { data, setData, post, processing, errors, reset } = useForm({
        _method: 'POST',
        event_app_id: eventApp.id,
        ticketData: Array<any>()
    });

    const addToCart = (ticket: any, price: any, quantity: any, subTotal: any, discount: any, total: any, discountCode: any) => {
        let list = Array<any>(...selectedTickets);
        list.push({
            ticket_id: ticket.id,
            price: price,
            qty: quantity,
            subTotal: subTotal,
            discount: discount,
            total: total,
            discountCode: discountCode
        });
        setSelectedTicket(list);
        setData('ticketData', selectedTickets);
        setGrandTotal(list.reduce((accumulator, value) => {
            return accumulator + value.total;
        }, 0));
    }

    const removeFromCart = (ticket: any) => {
        let list = [...selectedTickets];
        list = list.filter((item) => {
            return item.ticket_id !== ticket.id
        });
        setSelectedTicket(list);
        setData('ticketData', selectedTickets);
        setGrandTotal(list.reduce((accumulator, value) => {
            return accumulator + value.total;
        }, 0));
    }

    const proceedNext = () => {
        console.log(selectedTickets);
        post(route('attendee.tickets.post', eventApp.id));
    }

    return (
        <React.Fragment>
            {/* <Head title="Event Tickets" /> */}
            <section className="section bg-light" id="plans">
                <div className="bg-overlay bg-overlay-pattern"></div>
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <div className="text-center mb-5">
                                <h3 className="mb-3 fw-bold">Choose the Ticket that's right for you</h3>
                                <p className="text-muted mb-4">Simple pricing. No hidden fees.</p>
                            </div>
                        </Col>
                    </Row>

                    <Row className="gy-4">
                        {eventApp.tickets.length > 0 && eventApp.tickets.map((ticket: any) =>
                            <TicketCard
                                onAddToCart={addToCart}
                                onRemoveFromCart={removeFromCart}
                                ticket={ticket}
                                key={ticket.id}>
                            </TicketCard>
                        )}
                    </Row>
                    <Row className="mt-4 d-flex justify-content-center">
                        {grandTotal}
                        <Col md={6} lg={6}>
                            <Button
                                disabled={selectedTickets.length === 0}
                                onClick={proceedNext}
                                className="btn btn-success w-100">
                                Proceed Next {selectedTickets.length > 0 ? '(' + selectedTickets.length + ')' : ''}
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    );
};
Tickets.layout = (page: any) => <Layout children={page} />
export default Tickets;
