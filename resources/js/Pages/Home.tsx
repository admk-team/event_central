import { Head } from "@inertiajs/react"
import FeaturedCard from "../Components/FeaturedCard"
import TestimonialCard from "../Components/TestimonialCard"
import MainLayout from "../Layouts/MainLayout"
import HowItWorks from "../Components/HowItWorks"
import '../css/home.css'
import communityIcon from '../../images/community-icon.svg'
import partnersIcon from '../../images/partners.svg'
import productivityIcon from '../../images/productivity.svg'
import heroimage2 from '../../images/heorsection.png'

export default function Home() {
    return (
        <MainLayout>
            <Head title="Fokus Network - Connect with like-minded individuals" />

            <main>
                {/* Hero Section */}
                <section
                    className="hero-section"
                    style={{
                        backgroundImage: `url(${heroimage2})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        // backgroundPosition: "center",
                        paddingBottom: '200px'
                    }}
                >
                    <div className="container hero-content" >
                        <div className="row justify-content-center">
                            <div className="col-md-8 text-center" style={{ top: '130px' }}>
                                <h1 className="mb-4 display-4 fw-bold text-white">Connect with like-minded individuals</h1>
                                <p className="mb-5 lead text-white">
                                    Join our community of focused individuals who are dedicated to personal growth, productivity, and
                                    achieving their goals.
                                </p>
                                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                                    <a href="#" className="btn btn-primary btn-lg">
                                        Join Now <i className="bi bi-arrow-right ms-2"></i>
                                    </a>
                                    <a href="#" className="btn btn-outline-dark btn-lg text-white">
                                        Learn More
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-5">
                    <div className="container">
                        <div className="text-center mb-5">
                            <h2 className="mb-3 display-5 fw-bold">Why Choose Event Central?</h2>
                            <p className="mx-auto text-muted-dark" style={{ maxWidth: "700px" }}>
                                Our platform offers unique features designed to help you stay focused, connect with others, and achieve
                                your goals.
                            </p>
                        </div>
                        <div className="row g-4">
                            <div className="col-md-4">
                                <FeaturedCard
                                    icon={<img src={communityIcon} width={'50%'} />}
                                    title="Community Focus"
                                    description="Connect with like-minded individuals who share your passion for productivity and personal growth."
                                />
                            </div>
                            <div className="col-md-4">
                                <FeaturedCard
                                    icon={<img src={partnersIcon} width={'60%'} />}
                                    title="Accountability Partners"
                                    description="Find accountability partners to help you stay on track and achieve your goals faster."
                                />
                            </div>
                            <div className="col-md-4">
                                <FeaturedCard
                                    icon={<img src={productivityIcon} width={'50%'} />}
                                    title="Productivity Tools"
                                    description="Access a suite of productivity tools designed to help you maximize your efficiency and focus."
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <HowItWorks />

                {/* Testimonials Section */}
                <section id="testimonials" className="py-5 bg-lighter">
                    <div className="container">
                        <div className="text-center mb-5">
                            <h2 className="mb-3 display-5 fw-bold">What Our Members Say</h2>
                            <p className="mx-auto text-muted-dark" style={{ maxWidth: "700px" }}>
                                Hear from our community members about how Event Central has helped them achieve their goals.
                            </p>
                        </div>
                        <div className="row g-4">
                            <div className="col-md-4">
                                <TestimonialCard
                                    quote="Joining Fokus Network was a game-changer for my productivity. The community support is incredible!"
                                    author="Sarah Johnson"
                                    role="Freelance Designer"
                                />
                            </div>
                            <div className="col-md-4">
                                <TestimonialCard
                                    quote="I've found amazing accountability partners here who keep me motivated and on track with my goals."
                                    author="Michael Chen"
                                    role="Software Developer"
                                />
                            </div>
                            <div className="col-md-4">
                                <TestimonialCard
                                    quote="The productivity tools and resources available have completely transformed my daily workflow."
                                    author="Emma Rodriguez"
                                    role="Marketing Specialist"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-5">
                    <div className="container">
                        <div className="cta-section">
                            <div className="row justify-content-center">
                                <div className="col-md-8 text-center">
                                    <h2 className="mb-3 display-5 fw-bold text-white">Ready to join our community?</h2>
                                    <p className="mb-4 lead">
                                        Start your journey towards improved Events, productivity, and connection today.
                                    </p>
                                    <a href="#" className="btn btn-light btn-lg">
                                        Get Started Now <i className="bi bi-arrow-right ms-2"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </MainLayout>
    )
}

