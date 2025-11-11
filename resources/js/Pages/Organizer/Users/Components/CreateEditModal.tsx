import { useForm, usePage } from '@inertiajs/react';
import { Form, FormGroup, Modal, Spinner } from "react-bootstrap";
import Select from "react-select";
import { customStyles } from '../../../../common/data/customSelectStyles';
import { useLaravelReactI18n } from "laravel-react-i18n";

export default function CreateEditModal({ show, hide, onHide, user }: { show: boolean, hide: () => void, onHide: () => void, user: any | null }) {
    const isEdit = user != null ? true : false;

    const roles = (usePage().props.roles ?? []) as any[];
    const events = (usePage().props.events ?? []) as any[];
    const { t } = useLaravelReactI18n();

    const { data, setData, post, processing, errors, reset } = useForm({
        _method: isEdit ? "PUT" : "POST",
        name: user?.name ?? '',
        email: user?.email ?? '',
        password: '',
        role_id: user?.roles[0]?.id ?? '',
        accessible_events: user?.accessible_events.map((event: any) => event.id) ?? [],
        accessible_event_sessions: user?.accessible_event_sessions.map((session: any) => session.id) ?? [],
        chat_with_organizer: user?.chat_with_organizer ?? false,
    });

    const submit = (e: any) => {
        e.preventDefault();

        if (isEdit) {
            post(route('organizer.users.update', user.id), {
                preserveScroll: true,
                onSuccess: () => {
                    hide();
                }
            });
        } else {
            post(route('organizer.users.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    hide();
                }
            });
        }
    }

    const eventSessions: any[] = [];
    data.accessible_events.forEach((eventId: number) => {
        const event = events.find(event => event.id === eventId);
        if (! event) return;
        eventSessions.push(...event.event_sessions);
    });

    const selectEventsOptions = [
        {
            options: events.map(event => ({ label: event.name, value: event.id }))
        },
    ];

    const selectEventSessionsOptions = [
        {
            options: eventSessions.map(session => ({ label: session.name, value: session.id }))
        },
    ];

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header className="bg-light p-3" closeButton>
                <h5 className="modal-title">
                    {isEdit ? t('Edit User') : t('Add User')}
                </h5>
            </Modal.Header>

            <Form onSubmit={submit} className="tablelist-form">
                <Modal.Body>
                    <FormGroup className="mb-3">
                        <Form.Label className="form-label">{t("Name")}</Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            isInvalid={!!errors.name}
                        />
                        {errors.name && (
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        )}
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label className="form-label">{t("Email")}</Form.Label>
                        <Form.Control
                            type="email"
                            className="form-control"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            isInvalid={!!errors.email}
                        />
                        {errors.email && (
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        )}
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label className="form-label">{t("Pasword")}</Form.Label>
                        <Form.Control
                            type="password"
                            className="form-control"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            isInvalid={!!errors.password}
                        />
                        {errors.password && (
                            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                        )}
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label className="form-label">{t("Role")}</Form.Label>
                        <Form.Select
                            className="form-control"
                            value={data.role_id}
                            onChange={(e) => setData('role_id', e.target.value)}
                            isInvalid={!!errors.role_id}
                        >
                            <option>Select</option>
                            {roles.map((role) => (
                                <option value={role.id} key={role.id}>{role.name}</option>
                            ))}
                        </Form.Select>
                        {errors.role_id && (
                            <Form.Control.Feedback type="invalid">{errors.role_id}</Form.Control.Feedback>
                        )}
                    </FormGroup>
                    {/* Events */}
                    {events.length > 0 && (
                        <FormGroup className="mb-3">
                            <Form.Label className="form-label d-flex justify-content-between align-items-center">
                                <div>{t("Events")}</div>
                                <div className="form-check form-switch mb-0">
                                    <Form.Check.Input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id="selectAllEvents"
                                        checked={data.accessible_events.length === events.length}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setData('accessible_events', events.map((event) => event.id));
                                            } else {
                                                setData('accessible_events', []);
                                            }
                                        }}
                                    />
                                    <Form.Check.Label className="form-check-label" htmlFor="selectAllEvents">{t("Select all")}</Form.Check.Label>
                                </div>
                            </Form.Label>
                            <Select
                                value={
                                    events.filter(event => data.accessible_events?.includes(event.id))
                                        .map(event => ({ label: event.name, value: event.id }))
                                }
                                isMulti={true}
                                onChange={(value: any) => {
                                    setData('accessible_events', value.map((option: any) => option.value))
                                }}
                                options={selectEventsOptions}
                                classNamePrefix="js-example-basic-multiple mb-0"
                                styles={customStyles}
                            />
                            {errors.accessible_events && (
                                <Form.Control.Feedback type="invalid">{errors.accessible_events}</Form.Control.Feedback>
                            )}
                        </FormGroup>
                    )}

                    {/* Event Sessions */}
                    {eventSessions.length > 0 && (
                        <FormGroup className="mb-3">
                            <Form.Label className="form-label d-flex justify-content-between align-items-center">
                                <div>{t("Event Sessions")}</div>
                                <div className="form-check form-switch mb-0">
                                    <Form.Check.Input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id="selectAllEventSessions"
                                        checked={data.accessible_event_sessions.length === eventSessions.length}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setData('accessible_event_sessions', eventSessions.map((session) => session.id));
                                            } else {
                                                setData('accessible_event_sessions', []);
                                            }
                                        }}
                                    />
                                    <Form.Check.Label className="form-check-label" htmlFor="selectAllEventSessions">{t("Select all")}</Form.Check.Label>
                                </div>
                            </Form.Label>
                            <Select
                                value={
                                    eventSessions.filter(session => data.accessible_event_sessions?.includes(session.id))
                                        .map(session => ({ label: session.name, value: session.id }))
                                }
                                isMulti={true}
                                onChange={(value: any) => {
                                    setData('accessible_event_sessions', value.map((option: any) => option.value))
                                }}
                                options={selectEventSessionsOptions}
                                classNamePrefix="js-example-basic-multiple mb-0"
                                styles={customStyles}
                            />
                            {errors.accessible_event_sessions && (
                                <Form.Control.Feedback type="invalid">{errors.accessible_event_sessions}</Form.Control.Feedback>
                            )}
                        </FormGroup>
                    )}
                    {/* can chat with organizer  */}
                    <FormGroup className="mb-3 d-flex align-items-center justify-content-between">
                        <Form.Label
                            className="form-check-label mb-0"
                            htmlFor="chatWithOrganizer"
                        >
                            {t("Allow attendees to chat with organizer ?")}
                        </Form.Label>
                        <Form.Check
                            type="switch"
                            id="chatWithOrganizer"
                            checked={data.chat_with_organizer}
                            onChange={(e) => setData("chat_with_organizer", e.target.checked)}
                        />
                    </FormGroup>

                </Modal.Body>
                <div className="modal-footer">
                    <div className="hstack gap-2 justify-content-end">
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={hide}
                        >
                            {t("Close")}
                        </button>

                        <button type="submit" className="btn btn-success" disabled={processing}>
                            {processing ? (
                                <span className="d-flex gap-1 align-items-center">
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    {isEdit ? t('Updating') : t('Creating')}
                                </span>
                            ) : (
                                <span>{isEdit ? t('Update') : t('Create')}</span>
                            )}
                        </button>
                    </div>
                </div>
            </Form>
        </Modal>
    )
}
