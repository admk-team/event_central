import { Toaster } from "react-hot-toast";
import RenderForm from "../../../Components/FormBuilder/RenderForm";
import useToastMessages from "../../../hooks/useToastMessages";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Head } from "@inertiajs/react";
import AuthSlider from "../../Theme/AuthInner/authCarousel";

export default function RegistrationForm({ form }: any) {
  useToastMessages();
  return (
    <>
      <Head title="Cover SignUp | Velzon - React Admin & Dashboard Template" />
      <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
        <div className="bg-overlay"></div>
        <div className="auth-page-content overflow-hidden pt-lg-5">
          <Container>
            <Row>
              <Col lg={12}>
                <Card className="overflow-hidden m-0">
                  <Row className="justify-content-center g-0">
                    <AuthSlider />

                    <Col lg={6}>
                      <div className="p-lg-5 p-4">
                        <div>
                          <h5 className="text-primary">{form.title}</h5>
                          <p className="text-muted">{form.description}</p>
                        </div>

                        <div className="mt-4">
                          <RenderForm form={form} />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>

            </Row>
          </Container>
        </div>

        <footer className="footer">
          <Container>
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center">
                  <p className="mb-0">{new Date().getFullYear()} Velzon. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand</p>
                </div>
              </div>
            </div>
          </Container>
        </footer>
      </div>

      {/* <Container className="py-4">
        <RenderForm form={form} />
      </Container> */}

      <Toaster />
    </>
  )
}
