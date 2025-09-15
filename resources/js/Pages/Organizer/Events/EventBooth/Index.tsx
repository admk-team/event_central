import Layout from "../../../../Layouts/Event";
import React, { useMemo, useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { Button, Col, Container, Row } from "react-bootstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import HasPermission from "../../../../Components/HasPermission";
import DataTable, { ColumnDef } from "../../../../Components/DataTable";
import DeleteModal from "../../../../Components/Common/DeleteModal";
import DeleteManyModal from "../../../../Components/Common/DeleteManyModal";
import CreateEditModal from "./Components/CreateEditModal";
import { useLaravelReactI18n } from "laravel-react-i18n";

type Attendee = { id: number; name: string; email: string };

function Index({ data, attendees }: { data: any; attendees: Attendee[] }) {
  const [showCreateEditModal, setShowCreateEditModal] = useState(false);
  const [editBooth, setEditBooth] = useState<any>(null);
  const [deleteBooth, setDeleteBooth] = useState<any>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] = useState(false);
  const { t } = useLaravelReactI18n();

  const deleteForm = useForm({ _method: "DELETE" });
  const deleteManyForm = useForm<{ _method: string; ids: number[] }>({ _method: "DELETE", ids: [] });

  const editAction = (booth: any) => {
    // Preselect attendee IDs from badges
    const selectedIds = (booth.attendees_badges || []).map((a: any) => a.id);
    setEditBooth({ ...booth, selected_attendee_ids: selectedIds });
    setShowCreateEditModal(true);
  };

  const deleteAction = (booth: any) => {
    setDeleteBooth(booth);
    setShowDeleteConfirmation(true);
  };

  const handleDelete = () => {
    deleteForm.delete(route("organizer.booths.destroy", deleteBooth.id));
    setShowDeleteConfirmation(false);
  };

  const deleteManyAction = (ids: number[]) => {
    deleteManyForm.setData((d) => ({ ...d, ids }));
    setShowDeleteManyConfirmation(true);
  };

  const handleDeleteMany = () => {
    deleteManyForm.delete(route("organizer.booths.destroy.many"));
    setShowDeleteManyConfirmation(false);
  };

  const columns: ColumnDef<typeof data.data[0]> = [
    { accessorKey: "id", header: () => t("ID"), cell: (r) => r.id, cellClass: "fw-medium", enableSorting: true },
    { accessorKey: "name", header: () => t("Name"), cell: (r) => r.name, enableSorting: true },
    {
      accessorKey: "logo",
      header: () => t("Poster"),
      cell: (r) =>
        r.logo ? <img src={`/storage/${r.logo}`} alt={r.name} style={{ height: 32 }} /> : <span>—</span>,
      enableSorting: false,
    },
    { accessorKey: "number", header: () => t("Number"), cell: (r) => r.number ?? "—", enableSorting: true },
    { accessorKey: "type", header: () => t("Type"), cell: (r) => r.type, enableSorting: true },
    { accessorKey: "sold_qty", header: () => t("Sold"), cell: (r) => r.sold_qty, enableSorting: true },
    { accessorKey: "total_qty", header: () => t("Total"), cell: (r) => r.total_qty, enableSorting: true },
    {
      accessorKey: "attendees_badges",
      header: () => t("Attendees"),
      cell: (row: any) => {
        const list = (row.attendees_badges || []) as { id: number; name: string; email: string }[];
        if (!list.length) return "—";
        return (
          <div className="d-flex flex-wrap gap-1">
            {list.map((a) => (
              <span key={a.id} className="badge bg-light text-dark border">
                {a.name} <span className="text-muted">({a.email})</span>
              </span>
            ))}
          </div>
        );
      },
      enableSorting: false,
    },
    { accessorKey: "status", header: () => t("Status"), cell: (r) => r.status, enableSorting: true },
    { accessorKey: "price", header: () => t("Price"), cell: (r) => r.price ?? 0, enableSorting: true },
    {
      header: () => t("Action"),
      cell: (row) => (
        <div className="hstack gap-3 fs-15">
          <HasPermission permission="edit_event_booth">
            <span className="link-primary cursor-pointer" onClick={() => editAction(row)}>
              <i className="ri-edit-fill"></i>
            </span>
          </HasPermission>
          <HasPermission permission="delete_event_booth">
            <span className="link-danger cursor-pointer" onClick={() => deleteAction(row)}>
              <i className="ri-delete-bin-5-line"></i>
            </span>
          </HasPermission>
        </div>
      ),
    },
  ];

  return (
    <React.Fragment>
      <Head title={t("Sponsorship Opportunities")} />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title={t("Sponsorship Opportunities")} pageTitle={t("Sponsorship")} />
          <Row>
            <Col xs={12}>
              <DataTable
                data={data}
                columns={columns}
                title={t("Sponsorship Opportunities")}
                actions={[
                  // Delete multiple
                  {
                    render: (dt) => (
                      <HasPermission permission="delete_event_booth">
                        <Button
                          className="btn-danger"
                          onClick={() => deleteManyAction(dt.getSelectedRows().map((r) => r.id))}
                        >
                          <i className="ri-delete-bin-5-line"></i> {t("Delete")} ({dt.getSelectedRows().length})
                        </Button>
                      </HasPermission>
                    ),
                    showOnRowSelection: true,
                  },
                  // Add new
                  {
                    render: (
                      <HasPermission permission="create_event_booth">
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
            setEditBooth(null);
          }}
          onHide={() => {
            setShowCreateEditModal(false);
            setEditBooth(null);
          }}
          booth={editBooth}
          attendees={attendees}
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
