import { Button, Card, CardBody, CardHeader, CardText, CardTitle } from 'react-bootstrap';
import { useLaravelReactI18n } from "laravel-react-i18n";

export default function Contact() {
    const { t } = useLaravelReactI18n();

    return (
        <Card>
            <CardHeader className="d-flex justify-content-between align-items-center gap-2">
                <div>
                    <CardTitle>{t("Contact information")}</CardTitle>
                    <CardText>
                        {t("This information is visible to attendees on the apps and event homepage.")}
                    </CardText>
                </div>
                <div>
                    <Button>{t("Save")}</Button>
                </div>
            </CardHeader>
            <CardBody>
                {/* You can add form fields here later if needed */}
            </CardBody>
        </Card>
    );
}
