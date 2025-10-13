import React, { useState } from "react";
import avatar1 from "../../../../../images/users/user-dummy-img.jpg";
import { useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";

const Friends = () => {
     const { t } = useLaravelReactI18n();
    const attendee = usePage().props.friends as any;
    const [search, setSearch] = useState("");
    // Filter users by search input
    const filteredUsers = attendee.filter((user:any) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    const { data, setData, post, reset,processing, errors } = useForm({
        friend_id: '',
    })

    function submit(e: any) {
        e.preventDefault();
        post(route("friend.unfollow"), {
            onSuccess: () => {
                reset();
            },
        });
    }


    return (
        <div className="container">
            {/* Search Bar */}
            <div className="search-box mb-5">
                <input type="text" className="form-control bg-light border-light" autoComplete="off"  placeholder={t("Search by name...")}  value={search}
                    onChange={(e) => setSearch(e.target.value)} />
                <i className="ri-search-line search-icon"></i>
            </div>

            {/* User Cards */}
            <div className="row">
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
                                        <form onSubmit={submit}>
                                            <button
                                                type="submit"
                                                className="btn btn-success rounded-pill w-sm"
                                                disabled={user.has_sent_request || processing}
                                                onClick={() => setData('friend_id',user.id)}
                                            >
                                                <i className="ri-user-unfollow-line me-1 align-bottom"></i> {t("Unfollow")}
                                            </button>
                                            {errors.friend_id && <div className="text-danger">{errors.friend_id}</div>}
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-muted">{t("No friends found.")}</div>
                )}
            </div>
        </div>
    );
};

export default Friends;
