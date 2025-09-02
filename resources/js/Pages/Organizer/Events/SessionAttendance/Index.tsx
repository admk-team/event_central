import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row, Form } from 'react-bootstrap';
import { Head, Link, useForm } from '@inertiajs/react';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import Layout from '../../../../Layouts/Event';
import DeleteModal from '../../../../Components/Common/DeleteModal';
import DeleteManyModal from '../../../../Components/Common/DeleteManyModal';
import DataTable, { ColumnDef } from '../../../../Components/DataTable';
import { exportToCSV } from  '../../../../Components/ExportToCSV';
import { useLaravelReactI18n } from 'laravel-react-i18n';

interface Attendance {
  id: number;
  session: { id: number; name: string };
  attendee: { first_name: string; last_name: string; avatar?: string };
  checked_in: string | null;
}

interface EventSession {
  id: number;
  name: string;
}

function Index({
  attendance: initialAttendance,
  eventSession: initialSessions,
}: {
  attendance: Attendance[];
  eventSession: EventSession[];
}) {
  const { t } = useLaravelReactI18n();

  const [deleteAttendance, setDeleteAttendance] = useState<Attendance | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);
  const [filteredAttendance, setFilteredAttendance] = useState<Attendance[]>(initialAttendance);

  const deleteForm = useForm({ _method: 'DELETE' });
  const deleteManyForm = useForm<{ _method: string; ids: number[] }>({ _method: 'DELETE', ids: [] });

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
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setFilteredAttendance(data.attendance || []);
      } catch (error) {
        console.error('AJAX polling error:', error);
      }
    }, 5000);
    return () => clearInterval(interval);
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

  const columns: ColumnDef<Attendance> = [
    {
      header: () => t('ID'),
      cell: (attendance) => attendance.id,
      cellClass: 'fw-medium',
      accessorKey: 'id',
    },
    {
      header: () => t('Attendee Name'),
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
      exportValue: (attendance) =>
        `${attendance.attendee.first_name} ${attendance.attendee.last_name}`,
    },
    {
      header: () => t('Session Name'),
      cell: (attendance) => attendance.session.name,
      accessorKey: 'session.name',
    },
    {
      header: () => t('Check In'),
      cell: (attendance) => attendance.checked_in || t('Not checked in'),
      exportValue: (attendance) => attendance.checked_in || t('Not checked in'),
    },
    {
      header: () => t('Action'),
      cell: (attendance) => (
        <div className="hstack gap-3 fs-15">
          <span className="link-danger cursor-pointer" onClick={() => deleteAction(attendance)} title={t('Delete')}>
            <i className="ri-delete-bin-5-line"></i>
          </span>
        </div>
      ),
      exportable: false,
    },
  ];

  const handleSessionChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sessionId = e.target.value ? Number(e.target.value) : null;
    setSelectedSessionId(sessionId);

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
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setFilteredAttendance(data.attendance || []);
    } catch (error) {
      console.error('Session filter error:', error);
      setFilteredAttendance(initialAttendance);
    }
  };

  const handleExport = async (sessionId: number | null) => {
    const url = sessionId
      ? route('organizer.events.attendance.export.data', sessionId)
      : route('organizer.events.attendance.export.data');
    // trigger download
    window.location.href = url;
  };

  return (
    <React.Fragment>
      <Head>
        <title>{t('Session Attendance Management | Organizer Dashboard')}</title>
        <meta
          name="description"
          content={t(
            'View event session attendance records, including check-in and check-out times, from the organizer\'s dashboard.'
          )}
        />
        <meta
          name="keywords"
          content={t('session attendance, event management, organizer dashboard')}
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content={t('Session Attendance Management | Organizer Dashboard')}
        />
        <meta
          property="og:description"
          content={t(
            'View event session attendance records, including check-in and check-out times, from the organizer\'s dashboard.'
          )}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={route('organizer.events.attendance.index')} />
      </Head>

      <div className="page-content">
        <Container fluid>
          <BreadCrumb title={t('Session Attendance')} pageTitle={t('Dashboard')} />

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>{t('Select Session')}</Form.Label>
                <Form.Select onChange={handleSessionChange} value={selectedSessionId || ''}>
                  <option value="">{t('All Sessions')}</option>
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
                title={t('Session Attendance')}
                actions={[
                  {
                    render: (dataTable: any) => (
                      <Button
                        className="btn-danger"
                        onClick={() =>
                          deleteManyAction(dataTable.getSelectedRows().map((row: any) => row.id))
                        }
                      >
                        <i className="ri-delete-bin-5-line"></i>{' '}
                        {t('Delete (:count)', {
                          count: dataTable.getSelectedRows().length,
                        })}
                      </Button>
                    ),
                    showOnRowSelection: true,
                  },
                  {
                    render: () => (
                      <Button
                        variant="outline-primary"
                        className="me-2"
                        onClick={() => handleExport(selectedSessionId)}
                      >
                        {t('Export Session')}
                      </Button>
                    ),
                    showOnRowSelection: false,
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
