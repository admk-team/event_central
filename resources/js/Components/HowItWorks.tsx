import type React from "react"
import "../css/how-it-work.css"

// Import your images
import icon1 from "../../images/icon-1.png"
import icon2 from "../../images/icon-2.png"
import icon3 from "../../images/icon-3.png"
import icon4 from "../../images/icon-4.png"
import icon5 from "../../images/icon-5.png"

// Assuming you have a translation function
// You'll need to replace this with your actual translation implementation
const t = (key: string): string => {
    // This is a placeholder. Replace with your actual translation logic
    const translations: Record<string, string> = {
        "landing.works.title": "How It Works",
        "landing.works.description":
            "Our platform makes it easy to connect with like-minded individuals and achieve your goals.",
        "landing.works.btn": "Get Started",
        "landing.works.cards.registerTitle": "Register",
        "landing.works.cards.registerDescription": "Create your account and set up your profile.",
        "landing.works.cards.projectTitle": "Create Project",
        "landing.works.cards.projectDescription": "Define your goals and what you want to achieve.",
        "landing.works.cards.participantTitle": "Find Participants",
        "landing.works.cards.participantDescription": "Connect with others who share your interests.",
        "landing.works.cards.sessionsTitle": "Schedule Sessions",
        "landing.works.cards.sessionsDescription": "Set up regular meetings to stay on track.",
        "landing.works.cards.feedbackTitle": "Get Feedback",
        "landing.works.cards.feedbackDescription": "Receive insights and improve your process.",
    }

    return translations[key] || key
}

const HowItWorks: React.FC = () => {
    return (
        <section className="works">
            <div className="work__desc">
                <h1>{t("landing.works.title")}</h1>
                <p>{t("landing.works.description")}</p>
                <button className="custom-btn btn btn-primary">{t("landing.works.btn")}</button>
            </div>
            <div className="works__box">
                <div className="box" id="box1">
                    <div>
                        <img src={icon1 || "/placeholder.svg"} alt="Register icon" />
                    </div>
                    <h3>User Registration</h3>
                    <p>Create your profile and get matched with suitable projects</p>
                </div>
                <div className="box2" id="box2">
                    <div>
                        <img src={icon2 || "/placeholder.svg"} alt="Project icon" />
                    </div>
                    <h3>Project Creation</h3>
                    <p>Define your project parameters and target audience.</p>
                </div>
                <div className="box" id="box3">
                    <div>
                        <img src={icon3 || "/placeholder.svg"} alt="Participant icon" />
                    </div>
                    <h3>Participant Matching</h3>
                    <p>Our system matches participants based on your criteria</p>
                </div>
                <div className="box2" id="box4">
                    <div>
                        <img src={icon4 || "/placeholder.svg"} alt="Sessions icon" />
                    </div>
                    <h3>Event Sessions</h3>
                    <p>Conduct insightful sessions with easy-to-use online tools.</p>
                </div>
                <div className="box" id="box5">
                    <div>
                        <img src={icon5 || "/placeholder.svg"} alt="Feedback icon" />
                    </div>
                    <h3>Feedback & Analysis</h3>
                    <p>Collect and analyze feedback to drive your product innovation.</p>
                </div>
            </div>
        </section>
    )
}

export default HowItWorks

