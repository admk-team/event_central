import React, { useState } from 'react';
import { Button, Col, Container, Row, Table, Form } from 'react-bootstrap';
import { Head, Link, router, useForm } from '@inertiajs/react';
import BreadCrumb from '../../../../../Components/Common/BreadCrumb';
import Layout from '../../../../../Layouts/Event';
import DeleteModal from '../../../../../Components/Common/DeleteModal';
import DataTable, { ColumnDef } from '../../../../../Components/DataTable';
import DeleteManyModal from '../../../../../Components/Common/DeleteManyModal';
import ImportModal from '../../Components/ImportModal';
import HasPermission from '../../../../../Components/HasPermission';
import { Check, CircleCheck, CircleX } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLaravelReactI18n } from "laravel-react-i18n";

function Attendees({ attendees }: any) {
    // Date range state for the picker
    const { t } = useLaravelReactI18n();
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [startDate, endDate] = dateRange;

    // Form for filtering
    const { data, setData, get, processing } = useForm({
        start_date: '',
        end_date: '',
    });

    // Handle date range change
    const handleDateChange = (update: [Date | null, Date | null]) => {
        setDateRange(update);
        const [start, end] = update;
        setData({
            start_date: start ? start.toISOString().split('T')[0] : '',
            end_date: end ? end.toISOString().split('T')[0] : '',
        });
    };

    // Apply filter explicitly
    const applyFilter = () => {
        get(route('organizer.attendees.report'), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    // Clear filter
    const clearFilter = () => {
        setData({ start_date: '', end_date: '' });
        get(route('organizer.attendees.report'), {
            preserveState: false,
            preserveScroll: false,
        });
    };
    const columns: ColumnDef<typeof attendees.data[0]> = [
        {
            header: () => t('ID'),
            headerStyle: { width: '70px' },
            cell: (attendee) => attendee.id,
            cellClass: 'fw-medium',
        },
        {
            header: () => t('Avatar'),
            headerStyle: { width: '90px' },
            cell: (attendee) => (
                <img src={attendee.avatar_img} alt={attendee.name} width="50" height="50" className="rounded-circle" />
            ),
        },
        {
            accessorKey: 'first_name',
            header: () => t('First Name'),
            headerStyle: { width: '100px', textWrap: 'wrap' },
            cell: (attendee) => attendee.first_name,
            cellStyle: { width: '100px', textWrap: 'wrap' },
            searchable: true,
        },
        {
            accessorKey: 'last_name',
            header: () => t('Last Name'),
            headerStyle: { width: '100px', textWrap: 'wrap' },
            cell: (attendee) => attendee.last_name,
            cellStyle: { width: '100px', textWrap: 'wrap' },
            searchable: true,
        },
        {
            accessorKey: 'email',
            header: () => t('Email'),
            headerStyle: { width: '150px', textWrap: 'wrap' },
            cell: (attendee) => attendee.email,
            cellStyle: { width: '150px', textWrap: 'wrap' },
            searchable: true,
        },
        {
            header: () => t('Position'),
            headerStyle: { width: '200px', textWrap: 'wrap' },
            cell: (attendee) => attendee.position,
            cellStyle: { width: '200px', textWrap: 'wrap' },
        },
        {
            header: () => t('Checked In'),
            headerStyle: { width: '100px', textWrap: 'wrap' },
            cell: (attendee) => (attendee.event_checkin ? <CircleCheck color="green" /> : <CircleX color="red" />),
            cellClass: 'ps-4',
            cellStyle: { width: '100px', textWrap: 'wrap' },
        },
        {
            header: () => t('Actions'),
            headerStyle: { width: '100px', textWrap: 'wrap' },
            cell: (attendee) => (
                <Link
                    title={t("Attendee Reports")}
                    href={route('organizer.attendee.report.info', { id: attendee.id })}
                    className="link-primary cursor-pointer"
                >
                    <i className="ri-file-text-line"></i>
                </Link>
            ),
        },
    ];

    return (
        <React.Fragment>
            <Head>
                <title>{t("Attendees Report")}</title>
                <meta name="description" content="Manage event attendees, edit details, and delete records from the organizer's dashboard." />
                <meta name="keywords" content="event attendees, attendee management, conference attendees, admin dashboard" />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Attendees Management | Organizer Dashboard" />
                <meta property="og:description" content="Manage event attendees, edit details, and delete records from the organizer's dashboard." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={route('organizer.attendees.report')} />
            </Head>

            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Attendees" pageTitle="Dashboard" />
                    <Row className="d-flex justify-content-end mb-3" >
                        <Col md={3}>
                            <Form.Group className="d-flex justify-content-end mb-1 gap-1">
                            <Form.Label className="mt-2">{t("Date Range Filter")}</Form.Label>
                                {DatePicker ? (
                                    <DatePicker
                                        selectsRange
                                        startDate={startDate}
                                        endDate={endDate}
                                        onChange={handleDateChange}
                                        className="form-control"
                                        placeholderText="Select date range"
                                        isClearable
                                    />
                                ) : (
                                    <p>{t("Loading date picker...")}</p>
                                )}
                            </Form.Group>
                        </Col>
                        <Col md={1}>
                            <Button
                                variant="primary"
                                onClick={applyFilter}
                                disabled={processing || (!data.start_date && !data.end_date)}
                                className="w-100 mb-1"
                            >
                                {t("Apply Filter")}
                            </Button>
                        </Col>
                        <Col md={1}>
                            <Button
                                variant="secondary"
                                onClick={clearFilter}
                                disabled={processing}
                                className="w-100"
                            >
                                {t("Clear Filter")}
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <HasPermission permission="view_attendees_report">
                                <DataTable
                                    data={attendees}
                                    columns={columns}
                                    title={t("Attendees")}
                                    tableLayoutFixed={true}
                                    searchCombinations={[[t('first_name'), t('last_name')]]}
                                    actions={[]}
                                />
                            </HasPermission>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

Attendees.layout = (page: any) => <Layout children={page} />;

export default Attendees;
