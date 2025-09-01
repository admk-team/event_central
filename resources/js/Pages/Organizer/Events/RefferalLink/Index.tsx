import Layout from "../../../../Layouts/Event";
import React, { useState } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import { Button, Col, Container, Row } from "react-bootstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import HasPermission from "../../../../Components/HasPermission";
import DataTable, { ColumnDef } from "../../../../Components/DataTable";
import DeleteModal from "../../../../Components/Common/DeleteModal";
import DeleteManyModal from "../../../../Components/Common/DeleteManyModal";
import CreateEditModal from "./Components/CreateEditModal";
import { useLaravelReactI18n } from "laravel-react-i18n";

function Index({ data }: any) {
  const [showCreateEditModal, setShowCreateEditModal] = useState(false);
  const [editReferralLink, setEditReferralLink] = useState<any>(null);
  const [deleteReferralLink, setDeleteReferralLink] = useState<any>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const { t } = useLaravelReactI18n();

  const deleteForm = useForm({
    _method: "DELETE",
  });

  const deleteManyForm = useForm<{ _method: string; ids: number[] }>({
    _method: "DELETE",
    ids: [],
  });

  const editAction = (referralLink: any) => {
    setEditReferralLink(referralLink);
    setShowCreateEditModal(true);
  };

  const deleteAction = (referralLink: any) => {
    setDeleteReferralLink(referralLink);
    setShowDeleteConfirmation(true);
  };

  const handleDelete = () => {
    deleteForm.delete(route("organizer.events.refferal-link.destroy", deleteReferralLink.id));
    setShowDeleteConfirmation(false);
  };

  const deleteManyAction = (ids: number[]) => {
    deleteManyForm.setData((d) => ({ ...d, ids }));
    setShowDeleteManyConfirmation(true);
  };

  const handleDeleteMany = () => {
    deleteManyForm.delete(route("organizer.events.refferal-link.destroy.many"));
    setShowDeleteManyConfirmation(false);
  };

  const copyUrlAction = (url: string, id: number) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy URL:", err);
      });
  };

  const columns: ColumnDef<typeof data.data[0]> = [
    {
      accessorKey: "id",
      header: () => t("ID"),
      cell: (referralLink) => referralLink.id,
      cellClass: "fw-medium",
      enableSorting: true,
    },
    {
      accessorKey: "name",
      header: () => t("Name"),
      cell: (referralLink) => referralLink.name,
      enableSorting: true,
    },
    {
      accessorKey: "url",
      header: () => t("URL"),
      cell: (referralLink) => (
        <a href={referralLink.url} target="_blank" rel="noopener noreferrer">
          {referralLink.url}
        </a>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "successful",
      header: () => t("Successful Attendees"),
      cell: (referralLink) => referralLink.successful,
      enableSorting: true,
    },
    {
      accessorKey: "nextcount",
      header: () => t("Total Clicks"),
      cell: (referralLink) => referralLink.nextcount,
      enableSorting: true,
    },
    {
      header: () => t("Action"),
      cell: (referralLink) => (
        <div className="hstack gap-3 fs-15">
          <HasPermission permission="delete_referral_link">
            <span
              className="link-danger cursor-pointer"
              onClick={() => deleteAction(referralLink)}
              title={t("Delete")}
            >
              <i className="ri-delete-bin-5-line"></i>
            </span>
          </HasPermission>

          {/* Copy URL with tooltip and checkmark */}
          <span
            className="link-success cursor-pointer"
            onClick={() => copyUrlAction(referralLink.url, referralLink.id)}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title={copiedId === referralLink.id ? t("Copied") : t("Copy URL")}
          >
            <i className={copiedId === referralLink.id ? "ri-check-line" : "ri-file-copy-line"}></i>
          </span>
        </div>
      ),
    },
  ];

  return (
    <React.Fragment>
      <Head title={t("Referral Links")} />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title={t("Event")} pageTitle={t("Referral Links")} />
          <Row>
            <Col xs={12}>
              <DataTable
                data={data}
                columns={columns}
                title={t("Referral Links")}
                actions={[
                  // Delete multiple
                  {
                    render: (dataTable: any) => (
                      <HasPermission permission="delete_referral_link">
                        <Button
                          className="btn-danger"
                          onClick={() =>
                            deleteManyAction(dataTable.getSelectedRows().map((row: any) => row.id))
                          }
                        >
                          <i className="ri-delete-bin-5-line"></i>{" "}
                          {t("Delete (:count)", { count: dataTable.getSelectedRows().length })}
                        </Button>
                      </HasPermission>
                    ),
                    showOnRowSelection: true,
                  },
                  // Add new
                  {
                    render: (
                      <HasPermission permission="create_referral_link">
                        <Button onClick={() => setShowCreateEditModal(true)}>
                          <i className="ri-add-fill"></i> {t("Add New")}
                        </Button>
                      </HasPermission>
                    ),
                  },
                ]}
              />
            </Col>
          </Row>
        </Container>
      </div>

      {showCreateEditModal && (
        <CreateEditModal
          show={showCreateEditModal}
          hide={() => {
            setShowCreateEditModal(false);
            setEditReferralLink(null);
          }}
          onHide={() => {
            setShowCreateEditModal(false);
            setEditReferralLink(null);
          }}
          refferal={editReferralLink}
        />
      )}

      <DeleteModal
        show={showDeleteConfirmation}
        onDeleteClick={handleDelete}
        onCloseClick={() => setShowDeleteConfirmation(false)}
      />

      <DeleteManyModal
        show={showDeleteManyConfirmation}
        onDeleteClick={handleDeleteMany}
        onCloseClick={() => setShowDeleteManyConfirmation(false)}
      />
    </React.Fragment>
  );
}

Index.layout = (page: any) => <Layout children={page} />;

export default Index;
