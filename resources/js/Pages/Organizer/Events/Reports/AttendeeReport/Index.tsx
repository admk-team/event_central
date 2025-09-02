import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Head, Link } from "@inertiajs/react";
import BreadCrumb from "../../../../../Components/Common/BreadCrumb";
import Layout from "../../../../../Layouts/Event";
import DataTable, { ColumnDef } from "../../../../../Components/DataTable";
import HasPermission from "../../../../../Components/HasPermission";
import { exportToCSV } from "../../../../../Components/ExportToCSV";
import { useLaravelReactI18n } from "laravel-react-i18n";

function Index({ attendees }: any) {
  const { t } = useLaravelReactI18n();

  const columns: ColumnDef<typeof attendees.data[0]> = [
    {
      exportValue: (attendee) => attendee.id,
      header: () => t("ID"),
      headerStyle: { width: "70px" },
      cell: (attendee) => attendee.id,
      cellClass: "fw-medium",
    },
    {
      header: () => t("Avatar"),
      headerStyle: { width: "90px" },
      cell: (attendee) => (
        <img
          src={attendee.avatar_img}
          alt={t("Avatar of :name", { name: attendee.first_name || attendee.name || "" })}
          width="50"
          height="50"
          className="rounded-circle"
        />
      ),
      exportable: false,
    },
    {
      accessorKey: "first_name",
      header: () => t("First Name"),
      headerStyle: { width: "100px", textWrap: "wrap", textAlign: "center" },
      cell: (attendee) => attendee.first_name,
      cellStyle: { width: "100px", textWrap: "wrap", textAlign: "center" },
      searchable: true,
    },
    {
      accessorKey: "last_name",
      header: () => t("Last Name"),
      headerStyle: { width: "100px", textWrap: "wrap", textAlign: "center" },
      cell: (attendee) => attendee.last_name,
      cellStyle: { width: "100px", textWrap: "wrap", textAlign: "center" },
      searchable: true,
    },
    {
      accessorKey: "email",
      header: () => t("Email"),
      headerStyle: { width: "150px", textWrap: "wrap", textAlign: "center" },
      cell: (attendee) => attendee.email,
      cellStyle: { width: "150px", textWrap: "wrap", textAlign: "center" },
      searchable: true,
    },
    {
      accessorKey: "position",
      header: () => t("Position"),
      headerStyle: { width: "200px", textWrap: "wrap", textAlign: "center" },
      cell: (attendee) => attendee.position,
      cellStyle: { width: "200px", textWrap: "wrap", textAlign: "center" },
    },
    {
      exportValue: (attendee) => attendee.attendee_event_sessions.length,
      header: () => t("Sessions"),
      headerStyle: { width: "150px", textWrap: "wrap", textAlign: "center" },
      cell: (attendee) => attendee.attendee_event_sessions.length,
      cellStyle: { width: "150px", textWrap: "wrap", textAlign: "center" },
    },
    {
      exportValue: (attendee) => attendee.attendee_fav_session.length,
      header: () => t("Favorite Sessions"),
      headerStyle: { width: "150px", textWrap: "wrap", textAlign: "center" },
      cell: (attendee) => attendee.attendee_fav_session.length,
      cellStyle: { width: "150px", textWrap: "wrap", textAlign: "center" },
    },
    {
      exportValue: (attendee) => attendee.event_selected_sessions.length,
      header: () => t("Selected Sessions"),
      headerStyle: { width: "150px", textWrap: "wrap", textAlign: "center" },
      cell: (attendee) => attendee.event_selected_sessions.length,
      cellStyle: { width: "150px", textWrap: "wrap", textAlign: "center" },
    },
    {
      accessorKey: "payments",
      header: () => t("Payments"),
      headerStyle: { width: "150px", textWrap: "wrap", textAlign: "center" },
      cell: (attendee) => attendee.payments.length,
      cellStyle: { width: "150px", textWrap: "wrap", textAlign: "center" },
    },
    {
      exportValue: (attendee) => attendee.attendee_purchased_tickets.length,
      header: () => t("Tickets"),
      headerStyle: { width: "150px", textWrap: "wrap", textAlign: "center" },
      cell: (attendee) => attendee.attendee_purchased_tickets.length,
      cellStyle: { width: "150px", textWrap: "wrap", textAlign: "center" },
    },
    {
      header: () => t("Actions"),
      cell: (attendee) => (
        <div className="hstack gap-4 fs-15 text-center">
          <Link
            title={t("View attendee details")}
            href={route("organizer.events.attendee.info", { id: attendee.id })}
            className="link-primary cursor-pointer"
          >
            <i className="ri-eye-fill"></i>
          </Link>
        </div>
      ),
      exportable: false,
    },
  ];

  const handleExport = async () => {
    const url = route("organizer.events.report.export.attendee.data");
    window.location.href = url;
  };

  return (
    <React.Fragment>
      <Head>
        <title>{t("Attendees Report")}</title>
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
        <meta
          property="og:title"
          content={t("Attendees Management | Organizer Dashboard")}
        />
        <meta
          property="og:description"
          content={t(
            "Manage event attendees, edit details, and delete records from the organizer's dashboard."
          )}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={route("organizer.events.report.attendee.index")}
        />
      </Head>

      <div className="page-content">
        <Container fluid>
          <BreadCrumb title={t("Attendees Report")} pageTitle={t("Dashboard")} />
          <Row>
            <Col xs={12}>
              <HasPermission permission="view_attendee_report">
                <DataTable
                  data={attendees}
                  columns={columns}
                  title={t("Attendees")}
                  tableLayoutFixed={true}
                  searchCombinations={[["first_name", "last_name"]]}
                  actions={[
                    {
                      render: () => (
                        <Button
                          variant="outline-primary"
                          className="me-2"
                          onClick={() => handleExport()}
                        >
                          {t("Export Attendee")}
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
