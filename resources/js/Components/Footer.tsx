import { Link } from "@inertiajs/react"

export default function Footer() {
    return (
        <footer className="footer py-5 mt-auto">
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-3 col-md-6">
                        <Link href="/" className="d-flex align-items-center mb-3">
                            <div
                                className="rounded-circle bg-primary d-flex align-items-center justify-content-center me-2"
                                style={{ width: "32px", height: "32px" }}
                            >
                                <span className="visually-hidden">Fokus Network</span>
                            </div>
                            <span className="fw-bold">Fokus Network</span>
                        </Link>
                        <p className="text-muted-dark small">
                            Connecting focused individuals for better productivity and personal growth.
                        </p>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h5 className="text-uppercase small fw-bold mb-3">Company</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <a href="#" className="text-decoration-none text-muted-dark">
                                    About Us
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-decoration-none text-muted-dark">
                                    Careers
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-decoration-none text-muted-dark">
                                    Blog
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h5 className="text-uppercase small fw-bold mb-3">Resources</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <a href="#" className="text-decoration-none text-muted-dark">
                                    Help Center
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-decoration-none text-muted-dark">
                                    Community Guidelines
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-decoration-none text-muted-dark">
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h5 className="text-uppercase small fw-bold mb-3">Connect</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <a href="#" className="text-decoration-none text-muted-dark">
                                    Twitter
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-decoration-none text-muted-dark">
                                    Instagram
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-decoration-none text-muted-dark">
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-top border-light mt-4 pt-4 text-center text-muted-dark small">
                    <p>© {new Date().getFullYear()} Fokus Network. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

