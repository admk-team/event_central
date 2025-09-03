import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React from 'react';
import InputError from '../../InputError';
import { useLaravelReactI18n } from "laravel-react-i18n";

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }: any) {
    const user = usePage().props.auth.user;
    const { t } = useLaravelReactI18n();

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e: any) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <React.Fragment>
            <Col>
                <h2 >{t("Profile Information")}</h2>
            <Card >

                <p className="text-muted p-2">
                    {t("Update Profile Info")}
                </p>
                <Card.Body>
                    <Form onSubmit={submit} className="mt-6 space-y-6">
                        <Row >
                            <Col lg={6}>
                                <Form.Label htmlFor="name" value="Name">{t("Name")}</Form.Label>

                                <Form.Control
                                    id="name"
                                    className="mt-1 block w-full border"
                                    value={data.name}
                                    onChange={(e: any) => setData('name', e.target.value)}
                                    required
                                    autoFocus
                                    autoComplete="name"
                                />

                                <InputError className="mt-2" message={errors.name} />
                            </Col>

                            <Col lg={6}>
                                <Form.Label htmlFor="email" value="Email" >{t("Email")} </Form.Label>

                                <Form.Control
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full border"
                                    value={data.email}
                                    onChange={(e: any) => setData('email', e.target.value)}
                                    required
                                    autoComplete="username"
                                />

                                <InputError className="mt-2" message={errors.email} />
                            </Col>
                        </Row>

                        {mustVerifyEmail && user.email_verified_at === null && (
                            <div>
                                <p className="text-sm mt-2 text-gray-800 dark:text-gray-200">
                                    {t("Email Unverified")}.
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                    >
                                        {t("Resend Verification")}.
                                    </Link>
                                </p>

                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                                        {t("Verification Link Sent")}.
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-4 mt-4">
                            <Button variant="success" disabled={processing} type='submit' className='btn btn-success'>Save</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-gray-600 dark:text-gray-400">{t("Saved")}.</p>
                            </Transition>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
            </Col>
        </React.Fragment>
    );
}
