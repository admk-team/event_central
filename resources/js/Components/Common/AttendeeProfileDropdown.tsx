import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, usePage } from "@inertiajs/react";
//import images
import avatar1 from "../../../images/users/avatar-1.jpg";
import UserProfileRightSidebar from "../../Pages/Attendee/Profile/RightSidebar";

const AttendeeProfileDropdown = () => {
    const user: any = usePage().props.auth.user;
    const eventApp: any = usePage().props.eventApp;

    //Dropdown Toggle
    const [isProfileDropdown, setIsProfileDropdown] = useState<boolean>(false);
    const toggleProfileDropdown = () => {
        setIsProfileDropdown(!isProfileDropdown);
    };
    return (
        <React.Fragment>
            {user && (
                <Dropdown
                    show={isProfileDropdown}
                    onClick={toggleProfileDropdown}
                    className="ms-sm-3 header-item topbar-user"
                >
                    <Dropdown.Toggle
                        as="button"
                        type="button"
                        className="arrow-none btn"
                    >
                        <span className="d-flex align-items-center">
                            <img
                                className="rounded-circle header-profile-user"
                                src={
                                    user.avatar_img ? user.avatar_img : avatar1
                                }
                                alt="Header Avatar"
                            />
                            <span className="text-start ms-xl-2">
                                <span
                                    className="d-none d-xl-inline-block ms-1 fw-medium user-name-text"
                                    style={{ textTransform: "capitalize" }}
                                >
                                    {user?.first_name}
                                </span>
                                <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">
                                    Attendee
                                </span>
                            </span>
                        </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-end">
                        <h6 className="dropdown-header">
                            Attendee Options {user?.name}!
                        </h6>
                        <UserProfileRightSidebar
                            dropdown={isProfileDropdown}
                        ></UserProfileRightSidebar>
                        {/* <Dropdown.Item href={route('profile.edit')} className="dropdown-item">
                            <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                            <span className="align-middle">Edit Profile</span>
                        </Dropdown.Item> */}
                        <Link
                            className="dropdown-item"
                            as="button"
                            method="post"
                            href={route("attendee.logout", [eventApp.id])}
                        >
                            <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{" "}
                            <span className="align-middle" data-key="t-logout">
                                Logout
                            </span>
                        </Link>
                    </Dropdown.Menu>
                </Dropdown>
            )}
        </React.Fragment>
    );
};

export default AttendeeProfileDropdown;
