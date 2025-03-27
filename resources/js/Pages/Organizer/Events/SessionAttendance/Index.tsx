import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row, Form } from 'react-bootstrap';
import { Head, Link, useForm } from '@inertiajs/react';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import Layout from '../../../../Layouts/Event';
import DeleteModal from '../../../../Components/Common/DeleteModal';
import DeleteManyModal from '../../../../Components/Common/DeleteManyModal';
import DataTable, { ColumnDef } from '../../../../Components/DataTable';

interface Attendance {
    id: number;
    session: { id: number; name: string }; // Added id for filtering
    attendee: { first_name: string; last_name: string; avatar?: string };
    check_in: string | null;
    check_out: string | null;
}

interface EventSession {
    id: number;
    name: string;
}

function Index({ attendance: initialAttendance, eventSession: initialSessions }: { attendance: Attendance[]; eventSession: EventSession[] }) {
    const [deleteAttendance, setDeleteAttendance] = useState<Attendance | null>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] = useState(false);
    const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);
    const [filteredAttendance, setFilteredAttendance] = useState<Attendance[]>(initialAttendance);

    const deleteForm = useForm({
        _method: 'DELETE',
    });
    const deleteManyForm = useForm<{ _method: string; ids: number[] }>({
        _method: 'DELETE',
        ids: [],
    });

    // AJAX polling every 5 seconds with session_id filter
    useEffect(() => {
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        const interval = setInterval(async () => {
            try {
                const url = selectedSessionId
                    ? `${route('organizer.events.attendance.index')}?session_id=${selectedSessionId}`
                    : route('organizer.events.attendance.index');
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRF-TOKEN': csrfToken || '',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setFilteredAttendance(data.attendance || []);
            } catch (error) {
                console.error('AJAX polling error:', error);
            }
        }, 5000); // Every 5 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, [selectedSessionId]);

    const deleteAction = (attendance: Attendance) => {
        setDeleteAttendance(attendance);
        setShowDeleteConfirmation(true);
    };

    const handleDelete = () => {
        if (deleteAttendance) {
            deleteForm.post(route('organizer.events.attendance.destroy', deleteAttendance.id), {
                onSuccess: () => setShowDeleteConfirmation(false),
            });
        }
    };

    const deleteManyAction = (ids: number[]) => {
        deleteManyForm.setData({ _method: 'DELETE', ids });
        setShowDeleteManyConfirmation(true);
    };

    const handleDeleteMany = () => {
        deleteManyForm.post(route('organizer.events.attendance.destroy.many'), {
            onSuccess: () => setShowDeleteManyConfirmation(false),
        });
    };

    const columns: ColumnDef<typeof attendance.data[0]> = [
        {
            header: () => 'ID',
            cell: (attendance) => attendance.id,
            cellClass: 'fw-medium',
        },
        {
            header: () => 'Attendee Name',
            cell: (attendance) => (
                <>
                    {attendance.attendee.avatar && (
                        <img
                            src={attendance.attendee.avatar}
                            alt={`${attendance.attendee.first_name} ${attendance.attendee.last_name}`}
                            width="50"
                            height="50"
                            className="rounded-circle me-2"
                        />
                    )}
                    {attendance.attendee.first_name} {attendance.attendee.last_name}
                </>
            ),
        },
        {
            header: () => 'Session Name',
            cell: (attendance) => attendance.session.name,
        },
        {
            header: () => 'Check In',
            cell: (attendance) => attendance.check_in || 'Not checked in',
        },
        {
            header: () => 'Check Out',
            cell: (attendance) => attendance.check_out || 'Not checked out',
        },
        {
            header: () => 'Action',
            cell: (attendance) => (
                <div className="hstack gap-3 fs-15">
                    <span className="link-danger cursor-pointer" onClick={() => deleteAction(attendance)}>
                        <i className="ri-delete-bin-5-line"></i>
                    </span>
                </div>
            ),
        },
    ];

    const handleSessionChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const sessionId = e.target.value ? Number(e.target.value) : null;
        setSelectedSessionId(sessionId);

        // Fetch filtered data immediately on selection
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            const url = sessionId
                ? `${route('organizer.events.attendance.index')}?session_id=${sessionId}`
                : route('organizer.events.attendance.index');
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': csrfToken || '',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setFilteredAttendance(data.attendance || []);
        } catch (error) {
            console.error('Session filter error:', error);
            setFilteredAttendance(initialAttendance); // Fallback to initial data
        }
    };

    return (
        <React.Fragment>
            <Head>
                <title>Session Attendance Management | Organizer Dashboard</title>
                <meta name="description" content="View event session attendance records, including check-in and check-out times, from the organizer's dashboard." />
                <meta name="keywords" content="session attendance, event management, organizer dashboard" />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Session Attendance Management | Organizer Dashboard" />
                <meta property="og:description" content="View event session attendance records, including check-in and check-out times, from the organizer's dashboard." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={route('organizer.events.attendance.index')} />
            </Head>

            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Session Attendance" pageTitle="Dashboard" />
                    <Row className="mb-3">
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Select Session</Form.Label>
                                <Form.Select onChange={handleSessionChange} value={selectedSessionId || ''}>
                                    <option value="">All Sessions</option>
                                    {initialSessions.map((session) => (
                                        <option key={session.id} value={session.id}>
                                            {session.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <DataTable
                                data={filteredAttendance}
                                columns={columns}
                                title="Session Attendance"
                                actions={[
                                    {
                                        render: (dataTable) => (
                                            <Button
                                                className="btn-danger"
                                                onClick={() => deleteManyAction(dataTable.getSelectedRows().map(row => row.id))}
                                            >
                                                <i className="ri-delete-bin-5-line"></i> Delete ({dataTable.getSelectedRows().length})
                                            </Button>
                                        ),
                                        showOnRowSelection: true,
                                    },
                                ]}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
            <DeleteModal
                show={showDeleteConfirmation}
                onDeleteClick={handleDelete}
                onCloseClick={() => setShowDeleteConfirmation(false)}
            />
            <DeleteManyModal
                show={showDeleteManyConfirmation}
                onDeleteClick={handleDeleteMany}
                onCloseClick={() => setShowDeleteManyConfirmation(false)}
            />
        </React.Fragment>
    );
}

Index.layout = (page: any) => <Layout children={page} />;

export default Index;