import React, { useEffect, useState } from "react";
import avatar1 from "../../../../images/users/user-dummy-img.jpg";
import { Head, Link, useForm ,router} from "@inertiajs/react";
import AttendeeLayout from "../../../Layouts/Attendee";
import { Button } from "../../../Components/ui/button";
import axios from "axios";

const Index = ({products}:any) => {

    const [search, setSearch] = useState("");
    // Filter users by search input
    const filteredproducts = products.filter((user:any) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    function submit(id: number) {
        const data = {
            product_id: id,
        };
        if (id > 0) {
            axios.post(route("attendee.product.purchase"), data).then((response) => {
                console.log(response);
                router.visit(route('attendee.product.checkout', response.data.id));
            }).catch((error) => {
                console.log(error);
            })
        }
    }


    return (
        <React.Fragment>
            <Head title="Event Staff " />
            <div className="page-content">
                <div className="container">
                    {/* Search Bar */}
                    <div className="search-box mb-5">
                        <input type="text" className="form-control bg-light border-dark" autoComplete="off" placeholder="Search by name..." value={search}
                            onChange={(e) => setSearch(e.target.value)} />
                        <i className="ri-search-line search-icon"></i>
                    </div>

                    {/* User Cards */}
                    <div className="row">
                        {filteredproducts.length > 0 ? (
                            filteredproducts.map((product:any) => (
                                <div className="col-lg-3 col-md-6 col-sm-12 mb-4" key={product.id}>
                                    <div className="card h-100">
                                        <img
                                            src={product.image_url}
                                            className="card-img-top"
                                            alt={product.name}
                                            style={{ height: "200px", width: "100%", objectFit: "cover" }}
                                        />
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-text">{product.description}</p>
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <span className="h5 text-success">${product.price}</span>
                                                {product.old_price > 0 && (
                                                    <small className="text-muted">
                                                        <s>${product.old_price}</s>
                                                    </small>
                                                )}
                                            </div>
                                            <Button
                                                onClick={() => submit(product.id)}
                                                className="btn btn-primary mt-auto w-100"
                                            >
                                                Buy Now
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-muted">No Product found.</div>
                        )}
                    </div>
                </div>
            </div>
        </React.Fragment>
       
    );
};

Index.layout = (page: any) => <AttendeeLayout children={page} />;
export default Index;
