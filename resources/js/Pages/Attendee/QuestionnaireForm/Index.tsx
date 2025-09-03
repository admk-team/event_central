import { Head, Link } from "@inertiajs/react";
import Layout from "../../../Layouts/Attendee";
import React from "react";
import { Button, Card, Col, Container, Row, Form, Image, ProgressBar } from "react-bootstrap";
import RenderQuestionnaireForm from "../../../Components/FormBuilder/RenderQuestionnaireForm";
import { useLaravelReactI18n } from "laravel-react-i18n";

// Define interfaces for props
interface Form {
  id: number;
  status: number; // 0 for no questions, 1 for active, etc.
  [key: string]: any; // Allow additional properties
}

interface IndexProps {
  form: Form;
  submitted: boolean;
}

const Index = ({ form, submitted }: IndexProps) => {
  const { t } = useLaravelReactI18n();

  return (
    <React.Fragment>
      <Head title={t("Questionnaire Form")} />
      <div className="page-content">
        <Container fluid>
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6}>
              <div className="text-center mb-4">
                <h1>{t("Questionnaire Form")}</h1>
              </div>
              {form.status === 0 ? (
                <Card className="text-center p-4">
                  <p className="text-muted mb-0">
                    {t("This form is currently empty. No questions have been added yet.")}
                  </p>
                </Card>
              ) : submitted ? (
                <Card className="text-center p-4">
                  <h4 className="text-success mb-0">
                    {t("Thank you! Your response have been successfully submitted.")}
                  </h4>
                </Card>
              ) : (
                <Card className="p-4">
                  <RenderQuestionnaireForm form={form} />
                </Card>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

Index.layout = (page: any) => <Layout children={page} />;

export default Index;
