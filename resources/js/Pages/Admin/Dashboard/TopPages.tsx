import React, { useState } from 'react';
import { Card, Col, Dropdown } from 'react-bootstrap';
import { topPages } from "../../../common/data";
import { useLaravelReactI18n } from "laravel-react-i18n";

const TopPages = () => {
    const { t } = useLaravelReactI18n();
    const [isTopPageDropdown, setTopPageDropdown] = useState<boolean>(false);
    const toggleDropdown = () => { setTopPageDropdown(!isTopPageDropdown); };

    return (
        <React.Fragment>
            <Col xl={4} md={6}>
                <Card className="card-height-100">
                    <Card.Header className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">{t("top_pages")}</h4>
                        <div className="flex-shrink-0">
                            <Dropdown show={isTopPageDropdown} onClick={toggleDropdown} className="card-header-dropdown">
                                <Dropdown.Toggle as="a" className="text-reset dropdown-btn arrow-none" role="button">
                                    <span className="text-muted fs-16"><i className="mdi mdi-dots-vertical align-middle"></i></span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu-end">
                                    <Dropdown.Item>{t("today")}</Dropdown.Item>
                                    <Dropdown.Item>{t("last_week")}</Dropdown.Item>
                                    <Dropdown.Item>{t("last_month")}</Dropdown.Item>
                                    <Dropdown.Item>{t("current_year")}</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <div className="table-responsive table-card">
                            <table className="table align-middle table-borderless table-centered table-nowrap mb-0">
                                <thead className="text-muted table-light">
                                    <tr>
                                        <th scope="col" style={{ width: "62" }}>{t("active_page")}</th>
                                        <th scope="col">{t("active")}</th>
                                        <th scope="col">{t("users")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(topPages || []).map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <a href="#">{item.page}</a>
                                            </td>
                                            <td>{item.active}</td>
                                            <td>{item.user}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default TopPages;
