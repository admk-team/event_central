import { Link, usePage } from "@inertiajs/react";
import { Copy, CopyCheck } from "lucide-react";
import React, { useState } from "react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardText,
    CardTitle,
    Modal,
} from "react-bootstrap";
import toast from "react-hot-toast";
import { useLaravelReactI18n } from "laravel-react-i18n";
import axios from "axios";

export default function WebsiteUrl() {
    const { t } = useLaravelReactI18n();
    const url = usePage().props.url as string;
    const previewUrl = usePage().props.previewUrl as string;
    const [showModal, setShowModal] = useState(false);
    const [customDomain, setCustomDomain] = useState("");
    const [customDomainError, setCustomDomainError] = useState("");
    const copyLink = () => {
        navigator.clipboard
            .writeText(url)
            .then(() => {
                toast.success(t("Copied!"));
            })
            .catch(() => {
                toast.error(t("Failed to copy"));
            });
    };

    const openPreview = () => {
        if (previewUrl) {
            window.open(previewUrl, "_blank");
        } else {
            toast.error(t("Preview URL not available"));
        }
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCustomDomainError("");
        axios
            .post(
                route(
                    "organizer.events.settings.website.store.custome.website.domain"
                ),
                {
                    custome_domain: customDomain,
                }
            )
            .then((response) => {
                toast.success(response.data.message);
                setShowModal(false);
            })
            .catch((error) => {
                if (error.response?.status === 422) {
                    // Laravel validation error
                    const errors = error.response.data.errors;
                    if (errors?.custome_domain) {
                        setCustomDomainError(errors.custome_domain[0]);
                    }
                } else {
                    toast.error(
                        error.response?.data?.message || "Something went wrong"
                    );
                }
            });
    };

    return (
        <>
            <Card>
                <CardBody>
                    <CardTitle>{t("URL")}</CardTitle>
                    <CardText>
                        <a href={url} target="_blank">
                            {url}
                        </a>
                    </CardText>
                </CardBody>
                <CardFooter>
                    <div className="d-flex gap-2">
                        <Button
                            className="d-flex align-items-center gap-1"
                            onClick={copyLink}
                        >
                            <Copy size={20} />
                            <span>{t("Copy")}</span>
                        </Button>
                        <Button
                            className="d-flex align-items-center gap-1"
                            onClick={openPreview}
                        >
                            <span>{t("Preview")}</span>
                        </Button>
                        <Button
                            className="d-flex align-items-center gap-1"
                            onClick={() => setShowModal(true)}
                        >
                            <span>{t("Custom Domain")}</span>
                        </Button>
                    </div>
                </CardFooter>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <form id="handleFormSubmit" onSubmit={handleFormSubmit}>
                    <Modal.Header closeButton className="border-0 pb-0">
                        <div className="w-100 text-center">
                            <h6 className="modal-title d-flex justify-content-center align-items-center gap-2">
                                {t("Custom domain")}
                            </h6>
                        </div>
                    </Modal.Header>

                    <Modal.Body className="px-4 py-3">
                        <div className="mb-3 text-end">
                            <a
                                href={route(
                                    "organizer.events.settings.website.customize.the.event.website.domain"
                                )}
                                rel="noopener noreferrer"
                                className="text-danger fw-semibold"
                            >
                                {t("How to add custom domain?")}
                            </a>
                        </div>

                        <div className="input-group mb-1">
                            <span
                                className="input-group-text bg-white"
                                style={{
                                    borderRight: "0",
                                    paddingRight: "1px",
                                }}
                            >
                                https://
                            </span>

                            <input
                                type="text"
                                maxLength={512}
                                className={`form-control ${
                                    customDomainError ? "is-invalid" : ""
                                }`}
                                placeholder={t("Add your domain")}
                                name="custome_domain"
                                value={customDomain}
                                onChange={(e) =>
                                    setCustomDomain(e.target.value)
                                }
                                style={{ borderLeft: "0", paddingLeft: "2px" }}
                            />
                        </div>
                        {customDomainError && (
                            <div className="invalid-feedback d-block">
                                {customDomainError}
                            </div>
                        )}
                    </Modal.Body>

                    <Modal.Footer className="border-0">
                        <Button
                            style={{
                                backgroundColor: "#0B2F4E",
                                border: "none",
                            }}
                            onClick={() => setShowModal(false)}
                        >
                            {t("Close")}
                        </Button>
                        <Button
                            type="submit"
                            form="handleFormSubmit"
                            style={{
                                backgroundColor: "#E74C3C",
                                border: "none",
                            }}
                        >
                            {t("Save")}
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}
