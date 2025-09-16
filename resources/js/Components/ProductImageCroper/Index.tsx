import React, { useState, useEffect, useRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Modal, Button } from "react-bootstrap";
import { useLaravelReactI18n } from "laravel-react-i18n";

type Props = {
    visible: boolean;
    imageSrc: File;
    onClose: () => void;
    onCrop: (croppedImage: File) => void;
};

const Index: React.FC<Props> = ({ visible, imageSrc, onClose, onCrop }) => {
    const cropperRef = useRef<ReactCropperElement>(null);
    const [imageUrl, setImageUrl] = useState<string>("");

    useEffect(() => {
        if (imageSrc) {
            const objectUrl = URL.createObjectURL(imageSrc);
            setImageUrl(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [imageSrc]);

    const handleCrop = () => {
        const cropper = cropperRef.current?.cropper;
        if (cropper) {
            const canvas = cropper.getCroppedCanvas();
            const base64 = canvas.toDataURL("image/png");

            const now = new Date();
            const formattedDate = now
                .toISOString()
                .replace(/[:.]/g, "-")
                .slice(0, 19);

            const file = dataURLtoFile(base64, `cropped_${formattedDate}.png`);

            onCrop(file);
            onClose();
        }
    };

    const dataURLtoFile = (dataUrl: string, filename: string): File => {
        const arr = dataUrl.split(",");
        const mimeMatch = arr[0].match(/:(.*?);/);
        const mime = mimeMatch ? mimeMatch[1] : "image/png";
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    };

    if (!visible) return null;
    const { t } = useLaravelReactI18n();

    return (
        <Modal show={visible} onHide={onClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>{t("Crop Image")}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {imageUrl && (
                    <Cropper
                        ref={cropperRef}
                        style={{ height: 400, width: "100%" }}
                        src={imageUrl}
                        aspectRatio={1} // lock 1:1 ratio
                        viewMode={1}
                        background={false}
                        responsive={true}
                        autoCropArea={1}
                        checkOrientation={false}
                        guides={true}
                        movable={true} // crop box can be moved
                        cropBoxMovable={true} // crop box is movable
                        cropBoxResizable={false}
                    />
                )}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    {t("Cancel")}
                </Button>
                <Button variant="primary" onClick={handleCrop}>
                    {t("Crop & Save")}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Index;
