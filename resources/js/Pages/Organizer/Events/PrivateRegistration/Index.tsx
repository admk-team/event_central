import React, { useEffect, useState } from "react";
import Layout from "../../../../Layouts/Event";
import { Head, useForm } from "@inertiajs/react";
import {
    Button,
    Col,
    Container,
    FormGroup,
    Row,
    FormLabel,
} from "react-bootstrap";
import BreadCrumb2 from "../../../../Components/Common/BreadCrumb2";
import Select, { StylesConfig } from "react-select";
import DataTable, { ColumnDef } from "../../../../Components/DataTable";
import DeleteModal from "../../../../Components/Common/DeleteModal";
import DeleteManyModal from "../../../../Components/Common/DeleteManyModal";
import HasPermission from "../../../../Components/HasPermission";

type OptionType = {
    label: string;
    value: string;
};

const customStyles: StylesConfig = {
    control: (base) => ({
        ...base,
        minHeight: 40,
        borderColor: "#ced4da",
    }),
    multiValue: (base) => ({
        ...base,
        backgroundColor: "#d1e7dd",
    }),
};

function Index({ data }: any) {
    const [selectEmails, setSelectEmails] = useState<OptionType[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [sendNow, setSendNow] = useState(false);
    const [deleteItem, setDeleteItem] = useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] =
        useState(false);

    const { setData, post, processing, reset } = useForm({
        emails: [] as string[],
    });

    useEffect(() => {
        if (sendNow && selectEmails.length > 0) {
            post(route("organizer.private-registration.send"), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    setSelectEmails([]);
                    setInputValue("");
                },
                onFinish: () => setSendNow(false),
            });
        }
    }, [sendNow]);

    const handleSendInvites = () => {
        const emails = selectEmails.map((e) => e.value);
        if (emails.length === 0) return;
        setData("emails", emails);
        setSendNow(true);
    };

    const deleteForm = useForm({
        _method: "DELETE",
    });
    const deleteManyForm = useForm<{ _method: string; ids: number[] }>({
        _method: "DELETE",
        ids: [],
    });
    const handleDelete = () => {
        deleteForm.delete(
            route("organizer.private-registration.destroy", deleteItem.id)
        );
        setShowDeleteConfirmation(false);
    };
    const deleteManyAction = (ids: number[]) => {
        deleteManyForm.setData((data) => ({ ...data, ids }));
        setShowDeleteManyConfirmation(true);
    };

    const handleDeleteMany = () => {
        deleteManyForm.delete(
            route("organizer.private-registration.destroy.many")
        );
        setShowDeleteManyConfirmation(false);
    };

    const columns: ColumnDef<(typeof data.data)[0]> = [
        {
            accessorKey: "id",
            header: () => "ID",
            cell: (row) => row.id,
        },
        {
            accessorKey: "name",
            header: () => "Email",
            cell: (row) => row.email,
        },
        {
            header: () => "Actions",
            cell: (row) => (
                <div className="hstack gap-3 fs-15">
                    <HasPermission permission="delete_private_registration">
                        <span
                            className="link-danger cursor-pointer"
                            onClick={() => {
                                setDeleteItem(row);
                                setShowDeleteConfirmation(true);
                            }}
                        >
                            <i className="ri-delete-bin-5-line"></i>
                        </span>
                    </HasPermission>
                </div>
            ),
        },
    ];

    return (
        <>
            <Head title="Private Registration" />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb2
                        title="Private Registration"
                        items={[
                            {
                                title: "Private Registration via Email",
                                link: route(
                                    "organizer.private-registration.index"
                                ),
                            },
                        ]}
                    />

                    <Row className="mt-4">
                        <Col md={9} lg={9}>
                            <FormGroup className="mb-3">
                                <FormLabel>Send invites via Email</FormLabel>
                                <Select
                                    placeholder="Type and press Enter to add emails..."
                                    value={selectEmails}
                                    inputValue={inputValue}
                                    isMulti
                                    onInputChange={(value) =>
                                        setInputValue(value)
                                    }
                                    onChange={(list) =>
                                        setSelectEmails(list as OptionType[])
                                    }
                                    options={[]}
                                    styles={customStyles}
                                    onKeyDown={(e) => {
                                        if (
                                            e.key === "Enter" &&
                                            inputValue.trim()
                                        ) {
                                            const email = inputValue.trim();
                                            if (/^\S+@\S+\.\S+$/.test(email)) {
                                                const exists =
                                                    selectEmails.some(
                                                        (item) =>
                                                            item.value === email
                                                    );
                                                if (!exists) {
                                                    setSelectEmails((prev) => [
                                                        ...prev,
                                                        {
                                                            label: email,
                                                            value: email,
                                                        },
                                                    ]);
                                                }
                                                setInputValue("");
                                            }
                                            e.preventDefault();
                                        }
                                    }}
                                />
                            </FormGroup>

                            <Button
                                variant="primary"
                                disabled={
                                    processing || selectEmails.length === 0
                                }
                                onClick={handleSendInvites}
                            >
                                Send Invitations
                            </Button>
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col xs={12}>
                            <DataTable
                                data={data}
                                columns={columns}
                                title="Private Registration Emails"
                                actions={[
                                    // Delete multiple
                                    {
                                        render: (dataTable) => (
                                            <HasPermission permission="delete_private_registration">
                                                <Button
                                                    className="btn-danger"
                                                    onClick={() =>
                                                        deleteManyAction(
                                                            dataTable
                                                                .getSelectedRows()
                                                                .map(
                                                                    (row) =>
                                                                        row.id
                                                                )
                                                        )
                                                    }
                                                >
                                                    <i className="ri-delete-bin-5-line"></i>{" "}
                                                    Delete (
                                                    {
                                                        dataTable.getSelectedRows()
                                                            .length
                                                    }
                                                    )
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
        </>
    );
}

Index.layout = (page: any) => <Layout children={page} />;

export default Index;
