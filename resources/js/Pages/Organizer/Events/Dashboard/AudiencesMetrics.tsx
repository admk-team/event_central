import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import CountUp from 'react-countup';
import { AudiencesCharts ,PieChart} from './DashboardAnalyticsCharts'; // Adjust path
import { Link } from '@inertiajs/react';

// Define the structure of each ticket data item
interface TicketData {
    ticketName: string;
    ticketsSold: number;
    totalRevenue: number;
}

// Define the structure of ticketsMetrics
interface TicketsMetrics {
    totalTickets: number; // Total ticket types
    totalTicketsSold: number; // Total tickets sold
    totalRevenue: number; // Total revenue
    ticketsData: TicketData[];
}

// Define props interface
interface AudiencesMetricsProps {
    ticketsMetrics: TicketsMetrics;
}

const AudiencesMetrics = ({ ticketsMetrics }: AudiencesMetricsProps) => {
    const [chartData, setChartData] = useState<{ name: string; data: number[] }[]>([]);

    console.log(ticketsMetrics);
    useEffect(() => {
        // Prepare chart data from ticketsData
        setChartData([
            {
                name: 'Tickets Sold',
                data: ticketsMetrics.ticketsData.map((ticket: TicketData) => ticket.ticketsSold),
            },
            {
                name: 'Total Revenue',
                data: ticketsMetrics.ticketsData.map((ticket: TicketData) => ticket.totalRevenue),
            },
        ]);
    }, [ticketsMetrics]);

    return (
        <React.Fragment>
            <Col xl={6}>
                <Link title='View ticket report' href={route('organizer.events.report.ticket.index')} className="link-primary cursor-pointer">
                    <Card>
                        <Card.Header className="border-0 align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Tickets Metrics</h4>
                        </Card.Header>
                        <Card.Header className="p-0 border-0 bg-light-subtle">
                            <Row className="g-0 text-center">
                                <Col xs={6} sm={4}>
                                    <div className="p-3 border border-dashed border-start-0">
                                        <h5 className="mb-1">
                                            <CountUp start={0} end={ticketsMetrics.totalTickets} duration={3} />
                                        </h5>
                                        <p className="text-muted mb-0">Total Tickets</p>
                                    </div>
                                </Col>
                                <Col xs={6} sm={4}>
                                    <div className="p-3 border border-dashed border-start-0">
                                        <h5 className="mb-1">
                                            <CountUp start={0} end={ticketsMetrics.totalTicketsSold} duration={3} />
                                        </h5>
                                        <p className="text-muted mb-0">Total Tickets Sold</p>
                                    </div>
                                </Col>
                                <Col xs={6} sm={4}>
                                    <div className="p-3 border border-dashed border-start-0 border-end-0">
                                        <h5 className="mb-1">
                                            <CountUp
                                                start={0}
                                                end={ticketsMetrics.totalRevenue}
                                                duration={3}
                                                separator=","
                                                prefix="$"
                                            />
                                        </h5>
                                        <p className="text-muted mb-0">Total Revenue</p>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body className="p-0 pb-2">
                            <div style={{ overflowX: 'auto' }}>
                                <div style={{ minWidth: `${ticketsMetrics.ticketsData.length * 100}px` }}>
                                    <AudiencesCharts
                                        series={chartData}
                                        dataColors='["--vz-success", "--vz-success"]'
                                        sessionNames={ticketsMetrics.ticketsData.map((ticket: TicketData) => ticket.ticketName)}
                                    />
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Link>
            </Col>
        </React.Fragment>
    );
};

export default AudiencesMetrics;