import React, { useState } from "react";
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
import { useLaravelReactI18n } from "laravel-react-i18n";
import axios from "axios";

const MailchimpCompains = ({ campaigns }: any) => {
    const [selectedCampaign, setSelectedCampaign] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const { t } = useLaravelReactI18n();

    const getCampaignStatus = (status: string) => {
        switch (status) {
            case "sent":
                return "Sent";
            case "save":
                return "Pending";
            case "scheduled":
                return "Scheduled";
            case "paused":
                return "Paused";
            default:
                return "Draft";
        }
    };

    const handleSync = async () => {
        if (!selectedCampaign) {
            alert("Please select an Campaign first.");
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            const { data } = await axios.post(
                route("organizer.mailchimp.send.compaign", selectedCampaign),
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
            <div className="bg-white p-4 rounded shadow-sm">
                <Form.Group className="mb-3">
                    <Form.Label>{t("Select Campaign")}</Form.Label>
                    <Form.Select
                        value={selectedCampaign}
                        onChange={(e) => setSelectedCampaign(e.target.value)}
                    >
                        <option value="">-- {t("Select Campaign")} --</option>
                        {campaigns.map((campaign: any) => (
                            <option key={campaign.id} value={campaign.id}>
                                {campaign.settings?.title} (
                                {getCampaignStatus(campaign.status)})
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Button
                    variant="primary"
                    onClick={handleSync}
                    disabled={loading || !selectedCampaign}
                >
                    {loading ? (
                        <Spinner animation="border" size="sm" />
                    ) : (
                        t("Send Campaign")
                    )}
                </Button>

                {result && (
                    <Alert variant={result.success ? "success" : "danger"} className="mt-4">
                        <p>
                            <strong>{result.message}</strong>
                        </p>
                    </Alert>
                )}
            </div>
        </React.Fragment>
    );
};

export default MailchimpCompains;
