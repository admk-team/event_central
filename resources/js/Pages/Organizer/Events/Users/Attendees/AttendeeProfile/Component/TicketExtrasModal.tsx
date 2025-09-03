import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useLaravelReactI18n } from "laravel-react-i18n";

const TicketExtrasModal = ({ show, onHide, extras }: any) => {
      const { t } = useLaravelReactI18n();
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{t("Purchased Extra Services")}</Modal.Title>
            </Modal.Header>
            <hr className="mb-0" />
            <Modal.Body>
                {extras && extras.length > 0 ? (
                    extras.map((extra: any, index: number) => (
                        <div className="mb-3" key={index}>
                            <p className="m-2">
                                {index + 1}. {extra.name} ({extra.quantity})
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-center">{t("No Extra Services")}</p>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default TicketExtrasModal;
