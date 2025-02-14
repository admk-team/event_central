import React, { useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Head, Link, useForm } from '@inertiajs/react';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import Layout from '../../../Layouts';
import Pagination2 from '../../../Components/Common/Pagination2';
import DeleteModal from '../../../Components/Common/DeleteModal';


function Index({ colorschemes }: any) {
    const [deleteTheme, setDeleteTheme] = React.useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const { get} = useForm()


    const deleteForm = useForm({
        _method: 'DELETE'
    });

    const editAction = (theme: any) => {
        console.log(theme);
        
        get(route('admin.color-themes.edit',theme))
    }

    // const deleteAction = (deleteTheme: any) => {
    //     deleteForm.post(route('admin.users.destroy', deleteTheme.id));

    // }
    const deleteAction = (user: any) => {
        setDeleteTheme(user);
        setShowDeleteConfirmation(true);
    }
    const handleDelete = () => {
        console.log(typeof(deleteTheme.id));
        
        deleteForm.post(route('admin.color-themes.destroy', deleteTheme.id));
        setShowDeleteConfirmation(false);
    }

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
                                        <Table className="table-borderless align-middle table-nowrap mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">ID</th>
                                                    <th scope="col">Title</th>                                         
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {colorschemes.data.map((color: any) => (
                                                    <tr key={color.id}>
                                                        <td className="fw-medium">{color.id}</td>
                                                        <td>{color.title}</td>
                                                        <td>
                                                            <div className="hstack gap-3 fs-15">
                                                                <span className="link-primary cursor-pointer" onClick={() => editAction(color)}>
                                                                    <i className="ri-edit-fill"></i>
                                                                </span>
                                                                <span className="link-danger cursor-pointer" onClick={() => deleteAction(color)}>
                                                                    <i className="ri-delete-bin-5-line"></i>
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>

                                        </Table>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    {colorschemes.links.length > 3 && (
                                        <Pagination2
                                            links={colorschemes.links}

                                        />
                                    )}
                                </div>
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
