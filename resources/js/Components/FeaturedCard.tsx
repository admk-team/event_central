export default function FeaturedCard({ icon, title, description }) {
    return (
        <div className="card h-100 p-4">
            <div className="mb-3 text-center">{icon}</div>
            <h3 className="mb-2 fs-4 fw-bold text-center">{title}</h3>
            <p className="text-muted-dark text-center">{description}</p>
        </div>
    )
}

