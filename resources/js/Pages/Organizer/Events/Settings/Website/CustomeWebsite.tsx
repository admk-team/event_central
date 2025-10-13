import Layout from "../../../../../Layouts/Event";

function CustomeWebsite() {
    return (
        <div className="container-fluid py-5">
            <div className="row">
                <main className="col-lg-9">
                    <div className="card shadow-sm border-0 rounded-4">
                        <div className="card-body p-5">
                            <nav aria-label="breadcrumb" className="mb-4">
                                <ol className="breadcrumb bg-white p-2 rounded-3">
                                    <li className="breadcrumb-item">
                                        <a
                                            href={route(
                                                "organizer.events.settings.event.index"
                                            )}
                                        >
                                            Setting
                                        </a>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <a
                                            href={route(
                                                "organizer.events.settings.website.index"
                                            )}
                                        >
                                            Website
                                        </a>
                                    </li>
                                    <li
                                        className="breadcrumb-item active"
                                        aria-current="page"
                                    >
                                        Customize the event website domain
                                    </li>
                                </ol>
                            </nav>

                            <h1 className="display-6 mb-3">
                                Customize the Event Website Domain{" "}
                                <small> (Coming Soon) </small>
                            </h1>
                            <p className="text-muted mb-4">
                                Step-by-step guide to setting up your event’s
                                custom domain.
                            </p>

                            <section id="prerequisites" className="mb-5">
                                <h4 className="mb-3">Prerequisites</h4>
                                <ol>
                                    <li>
                                        Choose a domain registrar or use domain
                                        tools like{" "}
                                        <a
                                            href="http://iwantmyname.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            iwantmyname.com
                                        </a>{" "}
                                        to find and buy a domain name that's
                                        available.
                                    </li>
                                    <li>
                                        Create a DNS record based on how many
                                        levels your custom domain contains. Your
                                        registrar should have instructions on
                                        how to implement the proper CNAME or
                                        A-record. See the table below.
                                    </li>
                                </ol>
                            </section>

                            <section id="domain-configuration" className="mb-5">
                                <h4 className="mb-3">Domain Configuration</h4>
                                <span className="">
                                    Choose one of the configurations below based
                                    on the number of levels of your domain:
                                </span>
                                <div className="p-4 mt-3 mb-4 border rounded-3 bg-light">
                                    <h5 className="mb-2">Two Levels</h5>
                                    <p>
                                        <strong>Domain: Two levels</strong>(
                                        <b>e.g.</b>
                                        <a
                                            href="http://mywebsite.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            mywebsite.com
                                        </a>
                                        )
                                    </p>
                                    <p>
                                        <strong>Configuration:</strong> Point
                                        A-record (IP address) to{" "}
                                        <strong>192.168.0.1</strong>
                                    </p>
                                </div>

                                <div className="p-4 mb-4 border rounded-3 bg-light">
                                    <h5 className="mb-2">
                                        Three or More Levels
                                    </h5>
                                    <p>
                                        <strong>
                                            Domain: Three or more levels
                                        </strong>
                                        (<b>e.g.</b>
                                        <a
                                            href="http://event.mywebsite.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            mywebsite.com
                                        </a>
                                        ,{" "}
                                        <a
                                            href="http://blog.mywebsite.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            blog.mywebsite.com
                                        </a>
                                        )
                                    </p>
                                    <p>
                                        <strong>Configuration:</strong> Point
                                        CNAME record to{" "}
                                        <a
                                            href="http://cname.event.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            cname.event.com
                                        </a>
                                    </p>
                                </div>
                            </section>

                            <section
                                id="event-configuration"
                                className="mb-5"
                            >
                                <h4 className="mb-3">Event Configuration</h4>
                                <ol>
                                    <li>
                                        Go to{" "}
                                        <strong>Settings → Website</strong>.
                                    </li>
                                    <li>
                                        Click the <strong>Custom domain</strong>{" "}
                                        button under your current event website
                                        link.
                                    </li>
                                    <li>
                                        Enter your domain (<b>e.g.</b>
                                        <a
                                            href="http://mywebsite.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            mywebsite.com
                                        </a>
                                        ) or subdomain (<b>e.g.</b>
                                        <a
                                            href="http://mywebsite.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            mywebsite.blog.com
                                        </a>
                                        )
                                    </li>
                                    <li>
                                        Click <strong>Save</strong>.
                                    </li>
                                </ol>

                                <div className="alert alert-danger mt-3">
                                    <strong>⚠ Important:</strong> Please always
                                    make sure that you are only including the
                                    <b> domain name itself</b>. Do not append any
                                    additional paths, such as “/content”.
                                </div>
                            </section>

                            <section id="notes" className="mb-5">
                                <h4 className="mb-3">Notes</h4>
                                <ul>
                                    <li>
                                        You may need to wait up to 72 hours for
                                        the changes to take effect. Insert your
                                        domain <a href=""> here </a> and check
                                        the propagation in time. Make sure to
                                        select the correct configuration (CNAME
                                        or A).
                                    </li>
                                    <li>
                                        If you need to access the web version of
                                        Event Central during the verification
                                        process of your custom domain, you can
                                        <strong> Preview </strong>{" "}
                                        button in the top right corner.
                                    </li>
                                    <li>
                                        Your attendees will be automatically
                                        redirected to your new custom domain.
                                    </li>
                                    <li>
                                        You don't need to change the nameservers
                                        for your domain.
                                    </li>
                                    <li>
                                        Make sure that you test your domain and
                                        save the configurations in your
                                        administration in Event Central.
                                    </li>
                                    <li>
                                        Don't use the same password for your
                                        Event Central account and your domain
                                        registration account.
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

CustomeWebsite.layout = (page: any) => <Layout children={page} />;

export default CustomeWebsite;
