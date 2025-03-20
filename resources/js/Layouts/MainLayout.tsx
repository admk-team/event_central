"use client"

import { useState } from "react"
import { Link } from "@inertiajs/react"
import Footer from "../Components/Footer"
import logo from '../../images/logo.png'
export default function MainLayout({ children }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Navigation */}
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <Link href="/" className="navbar-brand d-flex align-items-center">
                        <img src={logo} style={{ maxWidth: '100px' }} />
                    </Link>

                    <button className="navbar-toggler" type="button" onClick={() => setMobileMenuOpen(true)}>
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <a href="#features" className="nav-link">
                                    Features
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#testimonials" className="nav-link">
                                    Testimonials
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#pricing" className="nav-link">
                                    Pricing
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#faq" className="nav-link">
                                    FAQ
                                </a>
                            </li>
                        </ul>
                        <div className="d-flex align-items-center">
                            <Link href="/login" className="nav-link me-3">
                                Login
                            </Link>
                            <a href="/register" className="btn btn-primary">
                                Get Started <i className="bi bi-arrow-right ms-2"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="mobile-menu">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <Link href="/" className="navbar-brand d-flex align-items-center">
                            <div
                                className="rounded-circle bg-primary d-flex align-items-center justify-content-center me-2"
                                style={{ width: "32px", height: "32px" }}
                            >
                                <span className="visually-hidden">Fokus Network</span>
                            </div>
                            <span className="fw-bold">Fokus Network</span>
                        </Link>
                        <button className="btn-close" onClick={() => setMobileMenuOpen(false)}></button>
                    </div>
                    <div className="mt-4">
                        <a href="#features" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
                            Features
                        </a>
                        <a href="#testimonials" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
                            Testimonials
                        </a>
                        <a href="#pricing" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
                            Pricing
                        </a>
                        <a href="#faq" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
                            FAQ
                        </a>
                        <a href="/login" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
                            Login
                        </a>
                        <div className="mt-4">
                            <a href="/register" className="btn btn-primary w-100" onClick={() => setMobileMenuOpen(false)}>
                                Get Started
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Main content with padding for fixed navbar */}
            <div style={{ paddingTop: "76px" }}>{children}</div>

            <Footer />
        </div>
    )
}

