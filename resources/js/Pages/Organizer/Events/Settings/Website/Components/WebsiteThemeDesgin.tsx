
import { useForm, usePage } from '@inertiajs/react';
import { Button, Card, CardBody, CardHeader, CardText, CardTitle, Form, FormGroup, Spinner } from 'react-bootstrap';



export default function WebsiteThemeDesgin() {

    const event = usePage().props.event as Record<string, string>;

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        custom_theme: event.custom_theme ?? '',

    });
    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        console.log(data);
        post(route('organizer.events.settings.event.info'));
    }
    return (
        <>
            <Form onSubmit={submit} className="tablelist-form">
                <Card>
                    <CardHeader className="d-flex justify-content-between align-items-center gap-2">
                        <CardTitle>Event Website Design Theme</CardTitle>

                    </CardHeader>
                    <CardBody>
                        <div>
                            <FormGroup className="mb-3">
                                <Form.Select
                                    className="form-control"
                                    value={data.custom_theme}
                                    onChange={(e) => setData({ ...data, custom_theme: e.target.value })}
                                    isInvalid={!!errors.custom_theme}
                                >
                                    <option value="default">Default</option>
                                    <option value="design1">Design 1</option>
                                    <option value="design2">Design 2</option>
                                    <option value="design3">Design 3</option>
                                </Form.Select>
                                {errors.custom_theme && (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.custom_theme}
                                    </Form.Control.Feedback>
                                )}
                            </FormGroup>
                        </div>
                        <div>

                            <Button type="submit" disabled={processing}>

                                {processing ? (
                                    <span className="d-flex gap-1 align-items-center">
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        Saving
                                    </span>
                                ) : (
                                    <span>Save</span>
                                )}

                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </Form>

        </>
    )
}
