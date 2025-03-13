import React, { useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { Head, Link, useForm } from "@inertiajs/react";
import BreadCrumb from "../../../../../Components/Common/BreadCrumb";
import Layout from "../../../../../Layouts/Event";
// import Pagination2 from '../../../Pages/Admin/';
import DeleteModal from "../../../../../Components/Common/DeleteModal";
import DataTable, { ColumnDef } from "../../../../../Components/DataTable";
import DeleteManyModal from "../../../../../Components/Common/DeleteManyModal";
import CreateEditModal from "./Component/CreateEditModal";
import AddPost from "./Component/AddPost";

function Index({ newsfeeds }: any) {
    const [deleteNewsfeed, setDeleteNewsfeed] = React.useState<any>(null);
    const [editPost, setEditPost] = React.useState<any>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeleteManyConfirmation, setShowDeleteManyConfirmation] =
        useState(false);

    const { get } = useForm();

    

    return (
        <React.Fragment>
            <Head>
                <title>Newsfeed | Organizer Dashboard</title>
                <meta
                    name="description"
                    content="Manage event Newsfeeds, edit details, and delete records from the organizer's dashboard."
                />
                <meta
                    name="keywords"
                    content="event Newsfeeds, Newsfeed management, conference Newsfeeds, admin dashboard"
                />
                <meta name="robots" content="index, follow" />

                {/* Open Graph Meta Tags */}
                <meta
                    property="og:title"
                    content="Newsfeed | Organizer Dashboard"
                />
                <meta
                    property="og:description"
                    content="Manage event Newsfeeds, edit details, and delete records from the organizer's dashboard."
                />
                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    content={route(
                        "organizer.events.engagement.newsfeed.index"
                    )}
                />
            </Head>

            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Newsfeed" pageTitle="Dashboard" />
                    <Row>
                        <Col lg={7} className="mx-auto">
                            <AddPost />
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

Index.layout = (page: any) => <Layout children={page} />;

export default Index;

