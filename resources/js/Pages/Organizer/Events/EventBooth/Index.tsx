// resources/js/Pages/Organizer/Events/EventBooth/Index.tsx
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

type Attendee = { id: number; name: string; email:string};

function Index({ data, attendees }: { data: any; attendees: Attendee[] }) {
  const [showCreateEditModal, setShowCreateEditModal] = useState(false);
  const [editBooth, setEditBooth] = useState<any>(null);
  const [deleteBooth, setDeleteBooth] = useState<any>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] = useState(false);
  const { t } = useLaravelReactI18n();

  const deleteForm = useForm({ _method: "DELETE" });
  const deleteManyForm = useForm<{ _method: string; ids: number[] }>({ _method: "DELETE", ids: [] });

  const attendeeMap = useMemo(() => {
    const map: Record<number, string> = {};
    (attendees || []).forEach((a) => {
      map[a.id] = a.name || `#${a.id}`;
    });
    return map;
  }, [attendees]);

  const editAction = (booth: any) => {
    setEditBooth(booth);
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
      header: () => t("Logo"),
      cell: (r) =>
        r.logo ? (
          <img src={`/storage/${r.logo}`} alt={r.name} style={{ height: 32 }} />
        ) : (
          t("No Logo")
        ),
      enableSorting: false,
    },
    { accessorKey: "number", header: () => t("Number"), cell: (r) => r.number ?? "—", enableSorting: true },
    { accessorKey: "type", header: () => t("Type"), cell: (r) => r.type, enableSorting: true },
    {
      accessorKey: "attendee_id",
      header: () => t("Attendee"),
      cell: (r) => (r.attendee_id ? attendeeMap[r.attendee_id] ?? `#${r.attendee_id}` : "—"),
      enableSorting: true,
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
          attendees={attendees} // <-- pass down
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
