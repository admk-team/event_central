import { Head, Link } from "@inertiajs/react";
import Layout from "../../../Layouts/Attendee";
import React from "react";
import { Button, Card, Col, Container, Row, Form, Image, ProgressBar } from "react-bootstrap";
import RenderQuestionnaireForm from "../../../Components/FormBuilder/RenderQuestionnaireForm";

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
  return (
    <React.Fragment>
      <Head title="Questionnaire Form" />
      <div className="page-content">
        <Container fluid>
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6}>
              <div className="text-center mb-4">
                <h1>Questionnaire Form</h1>
              </div>
              {form.status === 0 ? (
                <Card className="text-center p-4">
                  <p className="text-muted mb-0">
                    This form is currently empty. No questions have been added yet.
                  </p>
                </Card>
              ) : submitted ? (
                <Card className="text-center p-4">
                  <h4 className="text-success mb-0">
                    Thank you! Your responses have been successfully submitted.
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