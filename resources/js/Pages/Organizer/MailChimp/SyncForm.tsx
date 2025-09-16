import React, { useState } from "react";
import Layout from "../../../Layouts/Organizer";
import { Head, router } from "@inertiajs/react";
import {
    Col,
    Container,
    Row,
    Form,
    Button,
    Alert,
    Spinner,
} from "react-bootstrap";
import BreadCrumb2 from "../../../Components/Common/BreadCrumb2";
import { useLaravelReactI18n } from "laravel-react-i18n";
import axios from "axios";
import MailchimpCompains from "./Components/MailchimpCompains";

const MailChimpSyncPage = ({ events , campaigns }: any) => {
    const [selectedEvent, setSelectedEvent] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const { t } = useLaravelReactI18n();

    const handleSync = async () => {
        if (!selectedEvent) {
            alert("Please select an event first.");
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            const { data } = await axios.post(
                route("organizer.mailchimp.sync", selectedEvent),
                {}
            );
            setResult(data); // show the JSON result
        } catch (error: any) {
            setResult(error.response?.data || { error: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <React.Fragment>
            <Head title={t("MailChimp Sync")}>
                <meta name="csrf-token" content="{{ csrf_token() }}"></meta>
            </Head>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb2
                        title={t("MailChimp Sync")}
                        items={[
                            {
                                title: t("Settings"),
                                link: route("organizer.mailchimp.index"),
                            }, // ✅ update breadcrumb
                        ]}
                    />
                    <Row className="justify-content-center">
                        <Col md={8}>
                            <div className="bg-white p-4 rounded shadow-sm">
                                <Form.Group className="mb-3">
                                    <Form.Label>{t("Select Event")}</Form.Label>
                                    <Form.Select
                                        value={selectedEvent}
                                        onChange={(e) =>
                                            setSelectedEvent(e.target.value)
                                        }
                                    >
                                        <option value="">
                                            -- {t("Select Event")} --
                                        </option>
                                        {events.map((event: any) => (
                                            <option
                                                key={event.id}
                                                value={event.id}
                                            >
                                                {event.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    onClick={handleSync}
                                    disabled={loading || !selectedEvent}
                                >
                                    {loading ? (
                                        <Spinner animation="border" size="sm" />
                                    ) : (
                                        t("Sync Now")
                                    )}
                                </Button>

                                {result && (
                                    <Alert variant={ result.errors?.length? "warning": "success"}className="mt-4">
                                        <p>
                                            <strong>{result.message}</strong>
                                        </p>
                                        {/* <p>
                                            {t("Synced")}: {result.synced}
                                        </p> */}
                                        {result.errors?.length > 0 && (
                                            <>
                                                <p>{t("Errors")}:</p>
                                                <ul>
                                                    {result.errors.map((err: any,idx: number) => (
                                                            <li key={idx}>
                                                                <strong>{err.email}</strong>:{" "}{err.error?.detail || "Unknown error"}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </>
                                        )}
                                    </Alert>
                                )}
                            </div>
                        </Col>
                        <Col md={4}>
                            <MailchimpCompains campaigns={campaigns}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

MailChimpSyncPage.layout = (page: any) => <Layout children={page} />;

export default MailChimpSyncPage;
