import React, { useState, useEffect, useRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Modal, Button, FormGroup, Form } from "react-bootstrap";
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
    const [aspectRatio, setAspectRatio] = useState(1);

    useEffect(() => {
        if (imageSrc) {
            const objectUrl = URL.createObjectURL(imageSrc);
            setImageUrl(objectUrl);
            // Clean up the object URL when component unmounts or file changes
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [imageSrc]);

    const handleCrop = () => {
        const cropper = cropperRef.current?.cropper;
        if (cropper) {
            const canvas = cropper.getCroppedCanvas();
            const base64 = canvas.toDataURL("image/png");

            // Generate formatted date string
            const now = new Date();
            const formattedDate = now.toISOString().replace(/[:.]/g, '-').slice(0, 19); // "2025-07-11T15-34-22"

            // Convert Base64 to File
            const file = dataURLtoFile(base64, `cropped_${formattedDate}.png`);

            onCrop(file); // Pass File instead of base64
            onClose();
        }
    };

    // convert base64 to file
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

    const handleAspectRatioChange = (e:any) => {
        const value = parseFloat(e.target.value);
        setAspectRatio(value);
        const cropper = cropperRef.current?.cropper;
        if (cropper) {
            cropper.setAspectRatio(value);
        }
    };

    if (!visible) return null;
      const { t } = useLaravelReactI18n();

    return (
        <Modal show={visible} onHide={onClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>{t("Crop Image")}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <FormGroup className="mb-3">
                    <Form.Label htmlFor="aspectRatio" className="form-label text-start w-100">
                        {t("Aspect Ratio")}
                    </Form.Label>
                    <Form.Select
                        id="aspectRatio"
                        value={aspectRatio}
                        onChange={handleAspectRatioChange}
                    >
                        <option value={1}>1:1</option>
                        <option value={1.777}>16:9</option>
                        <option value={1.333}>4:3</option>
                        <option value={1.5}>3:2</option>
                        <option value="free">Free</option>
                    </Form.Select>
                </FormGroup>


                {imageUrl && (
                    <Cropper
                        ref={cropperRef}
                        style={{ height: 400, width: "100%" }}
                        initialAspectRatio={1}
                        src={imageUrl}
                        viewMode={1}
                        minCropBoxHeight={10}
                        minCropBoxWidth={10}
                        background={false}
                        responsive={true}
                        autoCropArea={1}
                        checkOrientation={false}
                        guides={true}
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
