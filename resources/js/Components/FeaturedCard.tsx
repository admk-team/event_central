export default function FeaturedCard({ icon, title, description }) {
    return (
        <div className="card h-100 p-4">
            <div className="mb-3">{icon}</div>
            <h3 className="mb-2 fs-4 fw-bold">{title}</h3>
            <p className="text-muted-dark">{description}</p>
        </div>
    )
}

