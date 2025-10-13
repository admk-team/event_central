import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Head, Link } from "@inertiajs/react";
import BreadCrumb from "../../../../../Components/Common/BreadCrumb";
import Layout from "../../../../../Layouts/Event";
import DataTable, { ColumnDef } from "../../../../../Components/DataTable";
import HasPermission from "../../../../../Components/HasPermission";
import { useLaravelReactI18n } from "laravel-react-i18n";

function Index({ sessions }: any) {
  const { t } = useLaravelReactI18n();

  const columns: ColumnDef<typeof sessions.data[0]> = [
    {
      header: () => t("ID"),
      headerStyle: { width: "70px" },
      cell: (session) => session.id,
      cellClass: "fw-medium",
    },
    {
      accessorKey: "name",
      header: () => t("Name"),
      headerStyle: { width: "200px", textWrap: "wrap", textAlign: "center" },
      cell: (session) => session.name,
      cellStyle: { width: "200px", textWrap: "wrap", textAlign: "center" },
      searchable: true,
    },
    {
      header: () => t("Type"),
      headerStyle: { width: "100px", textWrap: "wrap", textAlign: "center" },
      cell: (session) => session.type,
      cellStyle: { width: "100px", textWrap: "wrap", textAlign: "center" },
    },
    {
      header: () => t("Capacity"),
      headerStyle: { width: "100px", textWrap: "wrap", textAlign: "center" },
      cell: (session) => session.capacity ?? 0,
      cellStyle: { width: "100px", textWrap: "wrap", textAlign: "center" },
    },
    {
      header: () => t("Attendees"),
      headerStyle: { width: "150px", textWrap: "wrap", textAlign: "center" },
      cell: (session) => session.attendees.length,
      cellStyle: { width: "150px", textWrap: "wrap", textAlign: "center" },
    },
    {
      header: () => t("Attendances"),
      headerStyle: { width: "200px", textWrap: "wrap", textAlign: "center" },
      cell: (session) => session.attendances.length,
      cellStyle: { width: "200px", textWrap: "wrap", textAlign: "center" },
    },
    {
      header: () => t("Favorite By"),
      headerStyle: { width: "150px", textWrap: "wrap", textAlign: "center" },
      cell: (session) => session.fav_sessions.length,
      cellStyle: { width: "150px", textWrap: "wrap", textAlign: "center" },
    },
    {
      header: () => t("Rated By"),
      headerStyle: { width: "150px", textWrap: "wrap", textAlign: "center" },
      cell: (session) => session.attendees_rating.length,
      cellStyle: { width: "150px", textWrap: "wrap", textAlign: "center" },
    },
    {
      header: () => t("Tickets"),
      headerStyle: { width: "150px", textWrap: "wrap", textAlign: "center" },
      cell: (session) => session.tickets.length,
      cellStyle: { width: "150px", textWrap: "wrap", textAlign: "center" },
    },
  ];

  const handleExport = async () => {
    const url = route("organizer.events.report.export.session.data");
    window.location.href = url;
  };

  return (
    <React.Fragment>
      <Head>
        <title>{t("Sessions Report")}</title>
        <meta
          name="description"
          content={t(
            "Manage event attendees, edit details, and delete records from the organizer's dashboard."
          )}
        />
        <meta
          name="keywords"
          content={t(
            "event attendees, attendee management, conference attendees, admin dashboard"
          )}
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={t("Attendees Management | Organizer Dashboard")} />
        <meta
          property="og:description"
          content={t(
            "Manage event attendees, edit details, and delete records from the organizer's dashboard."
          )}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={route("organizer.events.report.session.index")} />
      </Head>

      <div className="page-content">
        <Container fluid>
          <BreadCrumb title={t("Sessions Report")} pageTitle={t("Dashboard")} />
          <Row>
            <Col xs={12}>
              <HasPermission permission="view_session_report">
                <DataTable
                  data={sessions}
                  columns={columns}
                  title={t("Sessions")}
                  tableLayoutFixed={true}
                  searchCombinations={[["name"]]}
                  actions={[
                    {
                      render: () => (
                        <Button
                          variant="outline-primary"
                          className="me-2"
                          onClick={() => handleExport()}
                        >
                          {t("Export Session")}
                        </Button>
                      ),
                      showOnRowSelection: false,
                    },
                  ]}
                />
              </HasPermission>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

Index.layout = (page: any) => <Layout children={page} />;

export default Index;
