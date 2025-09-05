import React, { useState } from "react";
import { useForm, router } from "@inertiajs/react";
import Layout from "../../../../Layouts/Event";
import "../../../../css/emailtemplate.css";
import { useLaravelReactI18n } from "laravel-react-i18n";

type Template = {
    id: number;
    name: string;
    thumbnail?: string | null;
};

type Props = {
    baseTemplate: Template[];
    selectedTemplateId?: number | null; // <-- accept from controller
};
const editTemplate = (id: number) => {
    router.visit(route("organizer.events.badge-template.edit", id));
};
const Index = ({ baseTemplate, selectedTemplateId }: Props) => {
    const { post } = useForm({});
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
    const { t } = useLaravelReactI18n();

    const useTemplate = (id: number) => {
        if (id === selectedTemplateId) return; // already selected; no-op
        post(
            route("organizer.events.use.badge.design", {
                baseTemplate: id,
            })
        );
    };

    return (
        <div className="container" style={{ marginTop: "100px" }}>
            <div className="row">
                {baseTemplate.map((template) => {
                    const isSelected = template.id === selectedTemplateId;

                    return (
                        <div
                            className="col-sm-6 col-md-4 col-lg-4 mb-4"
                            key={template.id}
                        >
                            <div
                                className={`templateCard card text-center shadow-sm ${
                                    isSelected ? "selected" : ""
                                }`}
                            >
                                <div className="card-header bg-white fw-semibold text-muted d-flex justify-content-between align-items-center">
                                    <span>{template.name}</span>
                                    {isSelected && (
                                        <span className="badge bg-success">
                                            Selected
                                        </span>
                                    )}
                                </div>

                                <div className="card-body p-0 position-relative templateImageWrapper">
                                    <img
                                        src={
                                            template.thumbnail
                                                ? "/storage/" +
                                                  template.thumbnail
                                                : "https://fullaccess.maildoll.com/not_found/no-preview.png"
                                        }
                                        alt="Template Thumbnail"
                                        className="templateImage"
                                    />

                                    {/* your attractive instruction overlay (kept as-is) */}
                                    {template.name == "Default" && (
                                        <div className="hoverInstructions d-flex flex-column justify-content-between">
                                            <div>
                                                <h6 className="fw-bold mb-3 text-uppercase">
                                                    📝 Badge Instructions
                                                </h6>
                                                <ul className="instructionList">
                                                    <li>
                                                        <span>🎨</span>{" "}
                                                        <strong>
                                                            {t(
                                                                "Event Branding & Logistics"
                                                            )}
                                                        </strong>
                                                    </li>
                                                    <li>
                                                        <span>🏷️</span>{" "}
                                                        {t("Event Logo")}
                                                    </li>
                                                    <li>
                                                        <span>📅</span>{" "}
                                                        {t("Event Name & Date")}
                                                    </li>
                                                    <li>
                                                        <span>📍</span>{" "}
                                                        {t("Location / Venue")}
                                                    </li>

                                                    <li className="mt-3">
                                                        <span>✨</span>{" "}
                                                        <strong>
                                                            {t("Additional")}
                                                        </strong>
                                                    </li>
                                                    <li>
                                                        <span>🙋</span>{" "}
                                                        {t("Attendee Name")}
                                                    </li>
                                                    <li>
                                                        <span>💼</span>{" "}
                                                        {t("Attendee Position")}
                                                    </li>

                                                    <li className="mt-3">
                                                        <span>📱</span>{" "}
                                                        <strong>
                                                            {t(
                                                                "Tech / Scanning"
                                                            )}
                                                        </strong>
                                                    </li>
                                                    <li>
                                                        <span>🔳</span>{" "}
                                                        {t("QR Code")}
                                                    </li>
                                                    <li>
                                                        <span>🌍</span>{" "}
                                                        {t("Attendee Location")}
                                                    </li>
                                                    <li>
                                                        <span>🎟️</span>{" "}
                                                        {t("Attendee Ticket")}
                                                    </li>
                                                </ul>
                                            </div>
                                            <button
                                            className="btn btn-outline-light mb-2"
                                            onClick={() =>
                                                editTemplate(template.id)
                                            }
                                        >
                                            {t("Edit")}
                                        </button>
                                            <button
                                                className={`btn mt-3 ${
                                                    isSelected
                                                        ? "btn-success disabled"
                                                        : "btn-outline-light"
                                                }`}
                                                onClick={() =>
                                                    useTemplate(template.id)
                                                }
                                                disabled={isSelected}
                                                title={
                                                    isSelected
                                                        ? "Already selected"
                                                        : "Set as template"
                                                }
                                            >
                                                {isSelected
                                                    ? t("Selected")
                                                    : t("Use Template")}
                                            </button>
                                        </div>
                                    )}
                                    {template.name == "Design1" && (
                                        <div className="hoverInstructions d-flex flex-column justify-content-between">
                                            <div>
                                                <h6 className="fw-bold mb-3 text-uppercase">
                                                    📝 Badge Instructions
                                                </h6>
                                                <ul className="instructionList">
                                                    <li className="mt-3">
                                                        <span>✨</span>{" "}
                                                        <strong>
                                                            {t("Additional")}
                                                        </strong>
                                                    </li>
                                                    <li>
                                                        <span>🧑</span>{" "}
                                                        {t("Attendee Profile")}
                                                    </li>
                                                    <li>
                                                        <span>🙋</span>{" "}
                                                        {t("Attendee Name")}
                                                    </li>
                                                    <li>
                                                        <span>💼</span>{" "}
                                                        {t("Attendee Position")}
                                                    </li>
                                                    <li>
                                                        <span>🌍</span>{" "}
                                                        {t("Attendee Location")}
                                                    </li>
                                                    <li>
                                                        <span>🎟️</span>{" "}
                                                        {t("Attendee Ticket")}
                                                    </li>
                                                    <li className="mt-3">
                                                        <span>📱</span>{" "}
                                                        <strong>
                                                            {t(
                                                                "Tech / Scanning"
                                                            )}
                                                        </strong>
                                                    </li>
                                                    <li>
                                                        <span>🔳</span>{" "}
                                                        {t("QR Code")}
                                                    </li>
                                                    <li>
                                                        <span>🎨</span>{" "}
                                                        <strong>
                                                            {t(
                                                                "Event Branding & Logistics"
                                                            )}
                                                        </strong>
                                                    </li>

                                                    <li>
                                                        <span>📅</span>{" "}
                                                        {t("Event Name")}
                                                    </li>
                                                    <li>
                                                        <span>📍</span>{" "}
                                                        {t("Location / Venue")}
                                                    </li>
                                                </ul>
                                            </div>
                                            <button
                                                className="btn btn-outline-light mb-2"
                                                onClick={() =>
                                                    editTemplate(template.id)
                                                }
                                            >
                                                {t("Edit")}
                                            </button>
                                            <button
                                                className={`btn mt-3 ${
                                                    isSelected
                                                        ? "btn-success disabled"
                                                        : "btn-outline-light"
                                                }`}
                                                onClick={() =>
                                                    useTemplate(template.id)
                                                }
                                                disabled={isSelected}
                                                title={
                                                    isSelected
                                                        ? "Already selected"
                                                        : "Set as template"
                                                }
                                            >
                                                {isSelected
                                                    ? t("Selected")
                                                    : t("Use Template")}
                                            </button>
                                        </div>
                                    )}
                                     {template.name == "Design2" && (
                                        <div className="hoverInstructions d-flex flex-column justify-content-between">
                                            <div>
                                                <h6 className="fw-bold mb-3 text-uppercase">
                                                    📝 Badge Instructions
                                                </h6>
                                                <ul className="instructionList">
                                                     <li>
                                                        <span>🎨</span>{" "}
                                                        <strong>
                                                            {t(
                                                                "Event Branding & Logistics"
                                                            )}
                                                        </strong>
                                                    </li>

                                                    <li>
                                                        <span>📅</span>{" "}
                                                        {t("Event Logo")}
                                                    </li>
                                                    <li>
                                                        <span>📍</span>{" "}
                                                        {t("Location / Venue")}
                                                    </li>
                                                     <li>
                                                        <span>📍</span>{" "}
                                                        {t("Start and End Date")}
                                                    </li>
                                                      <li className="mt-3">
                                                        <span>📱</span>{" "}
                                                        <strong>
                                                            {t(
                                                                "Tech / Scanning"
                                                            )}
                                                        </strong>
                                                    </li>
                                                    <li>
                                                        <span>🔳</span>{" "}
                                                        {t("QR Code")}
                                                    </li>

                                                    <li className="mt-3">
                                                        <span>✨</span>{" "}
                                                        <strong>
                                                            {t("Additional")}
                                                        </strong>
                                                    </li>
                                                     <li>
                                                        <span>🎟️</span>{" "}
                                                        {t("Attendee Ticket")}
                                                    </li>

                                                    <li>
                                                        <span>🙋</span>{" "}
                                                        {t("Attendee Name")}
                                                    </li>
                                                    <li>
                                                        <span>💼</span>{" "}
                                                        {t("Attendee Position")}
                                                    </li>
                                                      <li>
                                                        <span>🌍</span>{" "}
                                                        {t("Attendee Location")}
                                                    </li>
                                                    <li>
                                                        <span>🌍</span>{" "}
                                                        {t("Attendee Hashtag / Social Handles")}
                                                    </li>
                                                </ul>
                                            </div>
                                            <button
                                                className="btn btn-outline-light mb-2"
                                                onClick={() =>
                                                    editTemplate(template.id)
                                                }
                                            >
                                                {t("Edit")}
                                            </button>
                                            <button
                                                className={`btn mt-3 ${
                                                    isSelected
                                                        ? "btn-success disabled"
                                                        : "btn-outline-light"
                                                }`}
                                                onClick={() =>
                                                    useTemplate(template.id)
                                                }
                                                disabled={isSelected}
                                                title={
                                                    isSelected
                                                        ? "Already selected"
                                                        : "Set as template"
                                                }
                                            >
                                                {isSelected
                                                    ? t("Selected")
                                                    : t("Use Template")}
                                            </button>
                                        </div>
                                    )}
                                    {template.name == "Design3" && (
                                        <div className="hoverInstructions d-flex flex-column justify-content-between">
                                            <div>
                                                <h6 className="fw-bold mb-3 text-uppercase">
                                                    📝 Badge Instructions
                                                </h6>
                                                <ul className="instructionList">
                                                     <li>
                                                        <span>🎨</span>{" "}
                                                        <strong>
                                                            {t(
                                                                "Event Branding & Logistics"
                                                            )}
                                                        </strong>
                                                    </li>

                                                    <li>
                                                        <span>📅</span>{" "}
                                                        {t("Event Logo")}
                                                    </li>
                                                    <li>
                                                        <span>📍</span>{" "}
                                                        {t("Location / Venue")}
                                                    </li>
                                                     <li>
                                                        <span>📍</span>{" "}
                                                        {t("Start and End Date")}
                                                    </li>
                                                      <li className="mt-3">
                                                        <span>📱</span>{" "}
                                                        <strong>
                                                            {t(
                                                                "Tech / Scanning"
                                                            )}
                                                        </strong>
                                                    </li>
                                                    <li>
                                                        <span>🔳</span>{" "}
                                                        {t("QR Code")}
                                                    </li>

                                                    <li className="mt-3">
                                                        <span>✨</span>{" "}
                                                        <strong>
                                                            {t("Additional")}
                                                        </strong>
                                                    </li>
                                                     <li>
                                                        <span>🎟️</span>{" "}
                                                        {t("Attendee Ticket")}
                                                    </li>

                                                    <li>
                                                        <span>🙋</span>{" "}
                                                        {t("Attendee Name")}
                                                    </li>
                                                    <li>
                                                        <span>💼</span>{" "}
                                                        {t("Attendee Position")}
                                                    </li>
                                                      <li>
                                                        <span>🌍</span>{" "}
                                                        {t("Attendee Location")}
                                                    </li>
                                                    <li>
                                                        <span>🌍</span>{" "}
                                                        {t("Attendee Hashtag / Social Handles")}
                                                    </li>
                                                </ul>
                                            </div>
                                            <button
                                                className="btn btn-outline-light mb-2"
                                                onClick={() =>
                                                    editTemplate(template.id)
                                                }
                                            >
                                                {t("Edit")}
                                            </button>
                                            <button
                                                className={`btn mt-3 ${
                                                    isSelected
                                                        ? "btn-success disabled"
                                                        : "btn-outline-light"
                                                }`}
                                                onClick={() =>
                                                    useTemplate(template.id)
                                                }
                                                disabled={isSelected}
                                                title={
                                                    isSelected
                                                        ? "Already selected"
                                                        : "Set as template"
                                                }
                                            >
                                                {isSelected
                                                    ? t("Selected")
                                                    : t("Use Template")}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

Index.layout = (page: any) => <Layout children={page} />;

export default Index;
