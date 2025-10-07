import React, { useState, useEffect, useRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Modal, Button, FormGroup, Form } from "react-bootstrap";
import { useLaravelReactI18n } from "laravel-react-i18n";
import type CropperJS from "cropperjs";

type Props = {
    visible: boolean;
    imageSrc: File | null;
    onClose: () => void;
    onCrop: (croppedImage: File) => void;
};

const Index: React.FC<Props> = ({ visible, imageSrc, onClose, onCrop }) => {
    const cropperRef = useRef<ReactCropperElement | null>(null);
    const [imageUrl, setImageUrl] = useState<string>("");
    // keep as string so "free" can be selected
    const [aspectRatio, setAspectRatio] = useState<string>("1");

    useEffect(() => {
        if (!imageSrc) {
            setImageUrl("");
            return;
        }
        const objectUrl = URL.createObjectURL(imageSrc);
        setImageUrl(objectUrl);
        return () => {
            URL.revokeObjectURL(objectUrl);
            setImageUrl("");
        };
    }, [imageSrc]);

    // Helper: apply aspect ratio mode and related options to cropper instance
    const applyAspectMode = (ratioValue: string) => {
        const cropper = cropperRef.current?.cropper as any;
        if (!cropper) return;

        if (ratioValue === "free") {
            // Free → allow resize + move
            cropper.setAspectRatio(NaN);
            cropper.setDragMode("crop");
            cropper.setCropBoxResizable(true); // ✅ method, not options
            cropper.setCropBoxMovable(true); // ✅ method, not options
        } else {
            // Fixed → only move
            cropper.setAspectRatio(parseFloat(ratioValue));
            cropper.setDragMode("move");
            cropper.setCropBoxResizable(false); // ✅ this actually disables resizing
            cropper.setCropBoxMovable(true);
        }
    };

    // react to select changes
    const handleAspectRatioChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const value = e.target.value;
        setAspectRatio(value);
        // apply immediately if cropper ready
        applyAspectMode(value);
    };

    // ensure that when imageUrl changes we apply the current mode (so initial image respects the selection)
    useEffect(() => {
        if (!imageUrl) return;
        // slight delay to let Cropper initialize with the new image
        const t = window.setTimeout(() => applyAspectMode(aspectRatio), 100);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageUrl]);

    const handleCrop = () => {
        const cropper = cropperRef.current?.cropper as unknown as
            | CropperJS
            | undefined;
        if (!cropper) return;

        const canvas = cropper.getCroppedCanvas();
        if (!canvas) return;

        const base64 = canvas.toDataURL("image/png");
        const now = new Date();
        const formattedDate = now
            .toISOString()
            .replace(/[:.]/g, "-")
            .slice(0, 19);
        const file = dataURLtoFile(base64, `cropped_${formattedDate}.png`);
        onCrop(file);
        onClose();
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

    // compute numeric aspect for the Cropper prop (NaN for free)
    const cropperAspect =
        aspectRatio === "free" ? NaN : parseFloat(aspectRatio);

    return (
        <Modal show={visible} onHide={onClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>{t("Crop Image")}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <FormGroup className="mb-3">
                    <Form.Label
                        htmlFor="aspectRatio"
                        className="form-label text-start w-100"
                    >
                        {t("Aspect Ratio")}
                    </Form.Label>
                    <Form.Select
                        id="aspectRatio"
                        value={aspectRatio}
                        onChange={handleAspectRatioChange}
                    >
                        <option value="1">1:1</option>
                        <option value="1.777">16:9</option>
                        <option value="1.333">4:3</option>
                        <option value="1.5">3:2</option>
                        <option value="free">Free</option>
                    </Form.Select>
                </FormGroup>

                {imageUrl && (
                    <Cropper
                        key={imageUrl}
                        ref={cropperRef}
                        style={{ height: 400, width: "100%" }}
                        aspectRatio={cropperAspect}
                        src={imageUrl}
                        viewMode={1}
                        background={false}
                        responsive={true}
                        autoCropArea={1}
                        checkOrientation={false}
                        guides={true}
                        dragMode="crop"
                        cropBoxResizable={true}
                        cropBoxMovable={true}
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
