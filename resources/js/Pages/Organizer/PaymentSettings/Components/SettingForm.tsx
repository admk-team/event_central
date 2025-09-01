import { useForm, usePage } from "@inertiajs/react";
import React from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardText,
    CardTitle,
    Form,
    FormGroup,
    Spinner,
    Row,
    Col,
    InputGroup,
} from "react-bootstrap";
import stripe from "../../../../../images/stripe.png";
import paypal from "../../../../../images/paypal.png";
import toast from "react-hot-toast";
import CurrencySelect from "../../../../Components/CurrencySelect";
import { useLaravelReactI18n } from "laravel-react-i18n";


export default function SettingForm({ keys }: any) {
    // console.log(keys);

    const { t } = useLaravelReactI18n();
    const { data, setData, post, processing, errors } = useForm({
        _method: "PUT",

        // Paypal fields
        paypal_base_url: keys?.paypal_base_url ?? "",
        paypal_pub: keys?.paypal_pub ?? "",
        paypal_secret: keys?.paypal_secret ?? "",

        //Stripe fields
        stripe_publishable_key: keys?.stripe_publishable_key ?? "",
        stripe_secret_key: keys?.stripe_secret_key ?? "",
        currency: keys?.currency ?? "",
    });

    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        // console.log(data);

        post(route("organizer.settings.payment.update"));
    };

    const CopyLink = (link: string) => {
        navigator.clipboard
            .writeText(link)
            .then(() => {
                toast.success("Key Copied!");
            })
            .catch(() => {
                toast.error("Failed to copy key");
            });
    };

    return (
        <Form onSubmit={submit} className="tablelist-form">
            <Card>
                <CardHeader className="d-flex justify-content-between align-items-center gap-2">
                    <div>
                        <CardTitle>
                            {stripe && (
                                <img
                                    height={35}
                                    src={stripe}
                                    alt="stripe-image"
                                />
                            )}
                        </CardTitle>
                        <CardText>
                            {t("Stripe Info")}
                        </CardText>
                    </div>
                </CardHeader>
                <CardBody>
                    <InputGroup className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Enter Stripe Public Key"
                            className="form-control"
                            value={data.stripe_publishable_key}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    stripe_publishable_key: e.target.value,
                                })
                            }
                            isInvalid={!!errors.stripe_publishable_key}
                        />
                        <Button
                            variant="outline-secondary"
                            id="button-copyLink"
                            disabled={data.stripe_publishable_key.length === 0}
                            onClick={() =>
                                CopyLink(data.stripe_publishable_key)
                            }
                        >
                            <i className="bx bx-copy"></i>
                        </Button>
                        {errors.stripe_publishable_key && (
                            <Form.Control.Feedback type="invalid">
                                {errors.stripe_publishable_key}
                            </Form.Control.Feedback>
                        )}
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Enter Stripe Secret Key"
                            className="form-control"
                            value={data.stripe_secret_key}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    stripe_secret_key: e.target.value,
                                })
                            }
                            isInvalid={!!errors.stripe_secret_key}
                        />
                        <Button
                            variant="outline-secondary"
                            id="button-copyLink"
                            disabled={data.stripe_secret_key.length === 0}
                            onClick={() => CopyLink(data.stripe_secret_key)}
                        >
                            <i className="bx bx-copy"></i>
                        </Button>
                        {errors.stripe_secret_key && (
                            <Form.Control.Feedback type="invalid">
                                {errors.stripe_secret_key}
                            </Form.Control.Feedback>
                        )}
                    </InputGroup>
                </CardBody>
            </Card>
            <Card>
                <CardHeader className="d-flex justify-content-between align-items-center gap-2">
                    <div>
                        <CardTitle>
                            {paypal && (
                                <img
                                    height={25}
                                    src={paypal}
                                    alt="paypal-image"
                                />
                            )}
                        </CardTitle>
                        <CardText>
                            {t("PayPal Info")}
                        </CardText>
                    </div>
                </CardHeader>
                <CardBody>
                    <InputGroup className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Enter Paypal URL"
                            className="form-control"
                            value={data.paypal_base_url}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    paypal_base_url: e.target.value,
                                })
                            }
                            isInvalid={!!errors.paypal_base_url}
                        />
                        <Button
                            variant="outline-secondary"
                            id="button-copyLink"
                            disabled={data.paypal_base_url.length === 0}
                            onClick={() => CopyLink(data.paypal_base_url)}
                        >
                            <i className="bx bx-copy"></i>
                        </Button>
                        {errors.paypal_pub && (
                            <Form.Control.Feedback type="invalid">
                                {errors.paypal_pub}
                            </Form.Control.Feedback>
                        )}
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Enter Paypal Client ID"
                            className="form-control"
                            value={data.paypal_pub}
                            onChange={(e) =>
                                setData({ ...data, paypal_pub: e.target.value })
                            }
                            isInvalid={!!errors.paypal_pub}
                        />
                        <Button
                            variant="outline-secondary"
                            id="button-copyLink"
                            disabled={data.paypal_pub.length === 0}
                            onClick={() => CopyLink(data.paypal_pub)}
                        >
                            <i className="bx bx-copy"></i>
                        </Button>
                        {errors.paypal_pub && (
                            <Form.Control.Feedback type="invalid">
                                {errors.paypal_pub}
                            </Form.Control.Feedback>
                        )}
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Enter Paypal Secret Key"
                            className="form-control"
                            value={data.paypal_secret}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    paypal_secret: e.target.value,
                                })
                            }
                            isInvalid={!!errors.paypal_secret}
                        />
                        <Button
                            variant="outline-secondary"
                            id="button-copyLink"
                            disabled={data.paypal_secret.length === 0}
                            onClick={() => CopyLink(data.paypal_secret)}
                        >
                            <i className="bx bx-copy"></i>
                        </Button>
                        {errors.paypal_secret && (
                            <Form.Control.Feedback type="invalid">
                                {errors.paypal_secret}
                            </Form.Control.Feedback>
                        )}
                    </InputGroup>
                </CardBody>
            </Card>
            <Card>
                <CardHeader className="d-flex justify-content-between align-items-center gap-2">
                    <div>
                        <CardTitle>
                            <strong>{t("Currency")}</strong>
                        </CardTitle>
                        <CardText>
                            {t("Currency Info")}
                        </CardText>
                    </div>
                </CardHeader>
                <CardBody>
                    <InputGroup className="mb-3">
                        <CurrencySelect
                            value={data.currency} // now an object like { code: "ZWL", symbol: "Z$" }
                            onChange={(val) => setData({
                                ...data,
                                currency_code: val.code,
                                currency_symbol: val.symbol
                            })}
                            error={errors.currency}
                        />
                    </InputGroup>

                </CardBody>
            </Card>

            <Row className="justify-content-center mb-3">
                <Col md={6} lg={6}>
                    <Button
                        type="submit"
                        disabled={processing}
                        className="w-100"
                    >
                        {processing ? (
                            <span className="d-flex gap-1 align-items-center">
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                {t("Saving")}
                            </span>
                        ) : (
                            <span>{t("Save")}</span>
                        )}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}
