import React, { useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Head, Link, useForm } from '@inertiajs/react';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import Layout from '../../../Layouts/Admin';
// import Pagination2 from '../../../Pages/Admin/';
import DeleteModal from '../../../Components/Common/DeleteModal';
import DataTable, { ColumnDef } from '../../../Components/DataTable';



function Index({ colorschemes }: any) {
    const [deleteTheme, setDeleteTheme] = React.useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const { get } = useForm()


    const deleteForm = useForm({
        _method: 'DELETE'
    });

    const editAction = (theme: any) => {
        console.log(theme);

        get(route('admin.color-themes.edit', theme))
    }

    // const deleteAction = (deleteTheme: any) => {
    //     deleteForm.post(route('admin.users.destroy', deleteTheme.id));

    // }
    const deleteAction = (user: any) => {
        setDeleteTheme(user);
        setShowDeleteConfirmation(true);
    }
    const handleDelete = () => {
        console.log(typeof (deleteTheme.id));

        deleteForm.post(route('admin.color-themes.destroy', deleteTheme.id));
        setShowDeleteConfirmation(false);
    }

    const columns: ColumnDef<typeof colorschemes.data[0]> = [
        {
            header: () => 'ID',
            cell: (user) => user.id,
            cellClass: "fw-medium"
        },
        {
            header: () => 'Title',
            cell: (user) => user.title,
        },
        {
            header: () => 'Action',
            cell: (user) => (
                <div className="hstack gap-3 fs-15">
                    <span className="link-primary cursor-pointer" onClick={() => editAction(user)}><i className="ri-edit-fill"></i></span>
                    <span className="link-danger cursor-pointer" onClick={() => deleteAction(user)}>
                        <i className="ri-delete-bin-5-line"></i>
                    </span>
                </div>
            ),
        },
    ];


    return (
        <React.Fragment>
            <Head title='Starter | Velzon - React Admin & Dashboard Template' />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Thems" pageTitle="Dashboard" />
                    <Row>
                        <Col xs={12}>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <div className="card-title">Themes</div>
                                    <Link href={route('admin.color-themes.create')}><Button >Add New</Button></Link>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                 
                                    </div>
                                </div>
                                {/* <div className="card-footer">
                                    {colorschemes.links.length > 3 && (
                                        <Pagination2
                                            links={colorschemes.links}

                                        />
                                    )}
                                </div> */}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <DeleteModal
                show={showDeleteConfirmation}
                onDeleteClick={handleDelete}
                onCloseClick={() => { setShowDeleteConfirmation(false) }}
            />
        </React.Fragment>
    )
}

Index.layout = (page: any) => <Layout children={page} />;

export default Index;
