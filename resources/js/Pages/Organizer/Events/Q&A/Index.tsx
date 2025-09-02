import Layout from "../../../../Layouts/Event";
import React, { useState, useEffect } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { Container, Row, Col, Card } from "react-bootstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import QuestionList from "../../Events/Q&A/Components/QuestionList";
import QuestionForm from "../../Events/Q&A/Components/QuestionForm";
import OrganizerQuestionList from "./Components/OrganizerQuestionList";
import { useLaravelReactI18n } from "laravel-react-i18n";

interface User {
  id?: number;
  name?: string;
  role?: string;
  is_organizer?: boolean;
}

interface Question {
  id: number;
  content: string;
  likes_count: number;
  dislikes_count: number;
  created_at: string;
  user: { id?: number; name?: string; first_name?: string };
  answers: {
    id: number;
    content: string;
    created_at: string;
    user: { name?: string };
  }[];
}

interface Event {
  id: number;
  name: string;
}

interface Props {
  event: Event;
  questionlist: Question[];
  organizer_questions: Question[];
  newAnswer?: {
    id: number;
    content: string;
    created_at: string;
    user: { name: string };
  };
}

function Index({
  event,
  questionlist: initialQuestions,
  organizer_questions: initialOrganizerQuestions,
  newAnswer,
}: Props) {
  const { auth } = usePage().props as { auth: { user: User } };
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [organizerQuestions, setOrganizerQuestions] = useState<Question[]>(
    initialOrganizerQuestions
  );
  const { t } = useLaravelReactI18n();

  // Sync initial questions from props
  useEffect(() => {
    setQuestions(initialQuestions);
  }, [initialQuestions]);

  useEffect(() => {
    setOrganizerQuestions(initialOrganizerQuestions);
  }, [initialOrganizerQuestions]);

  // AJAX polling for new questions every 5 seconds
  useEffect(() => {
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      ?.getAttribute("content");
    const interval = setInterval(async () => {
      try {
        const url = route("organizer.events.qa.index", { session_id: event?.id });
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRF-TOKEN": csrfToken || "",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const newAttendeeQuestions = (data.questionlist || []) as Question[];
        const newOrganizerQuestions = (data.organizer_questions || []) as Question[];
        setQuestions(newAttendeeQuestions);
        setOrganizerQuestions(newOrganizerQuestions);
      } catch (error) {
        console.error("AJAX polling error:", error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [event?.id]);

  return (
    <React.Fragment>
      <Head title={`${t("Q&A")} | ${event?.name || t("Event Central")}`} />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title={t("Q&A for :name", { name: event?.name || t("Unnamed Event") })}
            pageTitle={t("Events")}
          />
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6}>
              <div className="text-center">
                <h1>{t("Q&A")}</h1>
              </div>

              <div className="mt-4">
                <Card className="text-center p-4">
                  <h5 className="text-muted mb-0">
                    {t(
                      "Your attendees are eager to learn! Check out their questions and join the discussion."
                    )}
                  </h5>
                </Card>
              </div>

              <div className="mt-4">
                <QuestionForm eventId={event?.id} />
              </div>

              <h3 className="mt-4">{t("Organizer Questions")}</h3>
              <OrganizerQuestionList
                eventId={event?.id}
                user={auth?.user || ({} as User)}
                questions={organizerQuestions}
                newAnswer={newAnswer}
              />

              <h3 className="mt-4">{t("Attendee Questions")}</h3>
              <QuestionList
                eventId={event?.id}
                user={auth?.user || ({} as User)}
                questions={questions}
                newAnswer={newAnswer}
              />
            </Col>
          </Row>

          <Row className="mt-4">
            <Col className="text-center">
              <Link
                href={route("organizer.events.schedule.index")}
                className="btn btn-outline-primary"
              >
                <i className="ri-arrow-left-line"></i> {t("Back to Schedule")}
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

Index.layout = (page: any) => <Layout children={page} />;

export default Index;
