import React, { useState } from "react";
import avatar1 from "../../../../../images/products/img-10.png";

const users = [
    {
        id: 1,
        name: "Anna Adame",
        position: "Web Developer",
        avatar: avatar1,
    },
    {
        id: 2,
        name: "John Doe",
        position: "Backend Engineer",
        avatar: avatar1,
    },
    {
        id: 3,
        name: "Sarah Miller",
        position: "UI/UX Designer",
        avatar: avatar1,
    },
];

const IncomingRequest = () => {
    const [search, setSearch] = useState("");

    // Filter users by search input
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container">
            {/* Search Bar */}
            <div className="search-box mb-5">
                <input type="text" className="form-control bg-light border-light" autoComplete="off" placeholder="Search by name..." value={search}
                    onChange={(e) => setSearch(e.target.value)} />
                <i className="ri-search-line search-icon"></i>
            </div>

            {/* User Cards */}
            <div className="row">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <div className="col-lg-3 col-md-6 mb-4" key={user.id}>
                            <div className="card shadow-lg h-100">
                                <div className="card-body text-center">
                                    <div className="avatar-md mb-3 mx-auto">
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            className="img-thumbnail rounded-circle shadow-none"
                                        />
                                    </div>

                                    <h5 className="mb-0">{user.name}</h5>
                                    <p className="text-muted">{user.position}</p>

                                    <div className="d-flex gap-2 justify-content-center mb-3">
                                        <button type="button" className="btn avatar-xs p-0" title="Website">
                                            <span className="avatar-title rounded-circle bg-light text-body">
                                                <i className="ri-global-line"></i>
                                            </span>
                                        </button>
                                        <button type="button" className="btn avatar-xs p-0" title="Facebook">
                                            <span className="avatar-title rounded-circle bg-light text-body">
                                                <i className="ri-facebook-line"></i>
                                            </span>
                                        </button>
                                        <button type="button" className="btn avatar-xs p-0" title="Twitter">
                                            <span className="avatar-title rounded-circle bg-light text-body">
                                                <i className="ri-twitter-line"></i>
                                            </span>
                                        </button>
                                        <button type="button" className="btn avatar-xs p-0" title="LinkedIn">
                                            <span className="avatar-title rounded-circle bg-light text-body">
                                                <i className="ri-linkedin-line"></i>
                                            </span>
                                        </button>
                                    </div>


                                    <div>
                                        <button type="button" className="btn btn-success rounded-pill w-sm">
                                            <i className="ri-user-follow-line me-1 align-bottom"></i> Accept
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-muted">No users found.</div>
                )}
            </div>
        </div>
    );
};

export default IncomingRequest;
