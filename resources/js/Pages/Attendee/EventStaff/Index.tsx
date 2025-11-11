import React, { useState } from "react";
import avatar1 from "../../../../images/users/user-dummy-img.jpg";
import { Head, useForm } from "@inertiajs/react";
import AttendeeLayout from "../../../Layouts/Attendee";
import { useLaravelReactI18n } from "laravel-react-i18n";
const Index = ({staff,enable_organizer_chat}:any) => {
    const { t } = useLaravelReactI18n();
    const [search, setSearch] = useState("");
    // Filter users by search input
    const filteredUsers = staff.filter((user:any) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    const { data, setData, post, reset,processing, errors } = useForm({
        receiver_id: '',
    })

    function submit(e: any) {
        e.preventDefault();
        post(route("attendee.event.chat-initate"), {
            onSuccess: () => {
                reset();
            },
        });
    }


    return (
        <React.Fragment>
            <Head title="Event Staff" />
            <div className="page-content">
                <div className="container">
                    {/* Search Bar */}
                    <div className="search-box mb-5">
                        <input type="text" className="form-control bg-light border-dark" autoComplete="off" placeholder={t("Search by name...")} value={search}
                            onChange={(e) => setSearch(e.target.value)} />
                        <i className="ri-search-line search-icon"></i>
                    </div>

                    {/* User Cards */}
                    <div className="row">
                        {!enable_organizer_chat && (
                            <div className="alert alert-info text-center my-3" role="alert">
                                Chat with organizers/Staff is not available for this event. <br />
                                Please contact the administrator if you need help.
                            </div>
                        )}

                        {enable_organizer_chat &&(
                            <>
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user:any) => (
                                        <div className="col-lg-3 col-md-6 mb-4" key={user.id}>
                                            <div className="card shadow-lg h-100">
                                                <div className="card-body text-center">
                                                    <div className="avatar-md mb-3 mx-auto">
                                                        <img
                                                            src={user.avatar_img ?? avatar1}
                                                            alt={user.name}
                                                            className="img-thumbnail rounded-circle shadow-none"
                                                        />
                                                    </div>
        
                                                    <h5 className="mb-0">{user.name}</h5>
                                                    <p className="text-muted">{user.role}</p>
        
                                                    <div>
                                                        <form onSubmit={submit} id={`user-${user.id}`}>
                                                            <button
                                                                type="submit"
                                                                className="btn btn-success rounded-pill w-sm"
                                                                disabled={user.is_chat || processing}
                                                                onClick={() => setData('receiver_id',user.id)}
                                                            >
                                                                <i className="bx bx-message-rounded-dots me-1"></i>
                                                                {user.is_chat ? t("Chat Initiated") : t("Start Chat")}
                                                            </button>
                                                            {errors.receiver_id && <div className="text-danger">{errors.receiver_id}</div>}
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-muted">No staff found.</div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </React.Fragment>
       
    );
};

Index.layout = (page: any) => <AttendeeLayout children={page} />;
export default Index;
