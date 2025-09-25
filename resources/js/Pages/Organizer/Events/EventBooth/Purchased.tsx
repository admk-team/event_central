import Layout from "../../../../Layouts/Event";
import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { Button, Col, Container, Row } from "react-bootstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import HasPermission from "../../../../Components/HasPermission";
import DataTable, { ColumnDef } from "../../../../Components/DataTable";
import DeleteModal from "../../../../Components/Common/DeleteModal";
import DeleteManyModal from "../../../../Components/Common/DeleteManyModal";
import { useLaravelReactI18n } from "laravel-react-i18n";

function PurchasesIndex({ data }: { data: any }) {
  const { t } = useLaravelReactI18n();
  const [deletePurchase, setDeletePurchase] = useState<any>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] = useState(false);

  const deleteForm = useForm({ _method: "DELETE" });
  const deleteManyForm = useForm<{ _method: string; ids: number[] }>({ _method: "DELETE", ids: [] });

  const deleteAction = (purchase: any) => {
    setDeletePurchase(purchase);
    setShowDeleteConfirmation(true);
  };

  const handleDelete = () => {
    deleteForm.delete(route("organizer.booth-purchases.destroy", deletePurchase.id));
    setShowDeleteConfirmation(false);
  };

  const deleteManyAction = (ids: number[]) => {
    deleteManyForm.setData((d) => ({ ...d, ids }));
    setShowDeleteManyConfirmation(true);
  };

  const handleDeleteMany = () => {
    deleteManyForm.delete(route("organizer.booth-purchases.destroy.many"));
    setShowDeleteManyConfirmation(false);
  };

  const columns: ColumnDef<typeof data.data[0]> = [
    { accessorKey: "id", header: () => t("ID"), cell: (r) => r.id, enableSorting: true },
    { accessorKey: "booth", header: () => t("Sponsorship"), cell: (r) => r.booth },
    { accessorKey: "type", header: () => t("Type"), cell: (r) => r.type },
    { accessorKey: "number", header: () => t("Number"), cell: (r) => r.number ?? "—" },
    { accessorKey: "attendee", header: () => t("Attendee"), cell: (r) => r.attendee },
    { accessorKey: "email", header: () => t("Email"), cell: (r) => r.email },
    { accessorKey: "amount", header: () => t("Amount"), cell: (r) => r.amount ? `${r.amount} ${r.currency}` : "" },
    { accessorKey: "status", header: () => t("Status"), cell: (r) => r.amount ? r.status  : "assigned" },
   
    {
      header: () => t("Action"),
      cell: (row) => (
        <div className="hstack gap-3 fs-15">
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
      <Head title={t("Sponsorship Purchases")} />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title={t("Sponsorship Purchases")} pageTitle={t("Sponsorship")} />
          <Row>
            <Col xs={12}>
              <DataTable
                data={data}
                columns={columns}
                title={t("Sponsorship Purchases")}
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
                ]}
              />
            </Col>
          </Row>
        </Container>
      </div>

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

PurchasesIndex.layout = (page: any) => <Layout children={page} />;
export default PurchasesIndex;
