export default function TestimonialCard({ quote, author, role }) {
  return (
    <div className="card h-100 p-4">
      <div className="quote-mark mb-3">"</div>
      <p className="mb-4">{quote}</p>
      <div>
        <p className="fw-medium mb-1">{author}</p>
        <p className="small text-muted-light">{role}</p>
      </div>
    </div>
  )
}

