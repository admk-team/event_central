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
            <p className="text-muted-light small">
              Connecting focused individuals for better productivity and personal growth.
            </p>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5 className="text-uppercase small fw-bold mb-3">Company</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted-light">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted-light">
                  Careers
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted-light">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5 className="text-uppercase small fw-bold mb-3">Resources</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted-light">
                  Help Center
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted-light">
                  Community Guidelines
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted-light">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5 className="text-uppercase small fw-bold mb-3">Connect</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted-light">
                  Twitter
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted-light">
                  Instagram
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted-light">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-top border-dark mt-4 pt-4 text-center text-muted-light small">
          <p>© {new Date().getFullYear()} Fokus Network. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

