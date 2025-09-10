// resources/js/Pages/Attendee/EventBooth/Index.tsx
import React, { useMemo, useState } from "react";
import { Head, router } from "@inertiajs/react";
import Layout from "../../../Layouts/Attendee";
import { Col, Container, Row } from "react-bootstrap";
import { useLaravelReactI18n } from "laravel-react-i18n";

/* ---------------- helpers ---------------- */
const getInitials = (name?: string) => {
  if (!name) return "—";
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() || "").join("") || "—";
};

const softBg = (id: number) => {
  const colors = ["#F5F7FF", "#F3E8FF", "#E8F8F1", "#FFF4E6", "#EDF2FB"];
  return colors[id % colors.length];
};

// visual for type badge
const typeMeta = (type?: string) => {
  switch ((type || "booth").toLowerCase()) {
    case "sponsor":
    case "sponsor ad":
      return { label: "Sponsor Ad", bg: "#F97316", color: "#111827" }; // orange
    case "banner":
      return { label: "Banner", bg: "#3B82F6", color: "#ffffff" }; // blue
    default:
      return { label: "Booth", bg: "#111827", color: "#ffffff" }; // dark
  }
};

type BoothCardProps = {
  booth: any;
  currencySymbol: string;
  owned?: boolean; // “My Booths” section
  onBuy?: (id: number) => void; // marketplace
  t: (k: string) => string;
};

/* ---------------- card ---------------- */
const BoothCard: React.FC<BoothCardProps> = ({ booth, currencySymbol, owned, onBuy, t }) => {
  const canBuy = !owned && booth.status === "available";
  const initials = getInitials(booth.name);
  const tm = typeMeta(booth.type);

  return (
    <div className="card h-100 border-0 shadow-sm rounded-4 overflow-visible">
      {/* MEDIA */}
      <div className="p-3 pt-3 position-relative" style={{ overflow: "visible" }}>
        {/* TYPE pill (top-left) */}
        <span
          className="position-absolute px-3 py-1 rounded-pill"
          style={{
            top: 12,
            left: 12,
            zIndex: 5,
            background: tm.bg,
            color: tm.color,
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          {t(tm.label)}
        </span>

        {/* NUMBER pill (top-right) if present */}
        {booth?.number != null && (
          <span
            className="position-absolute px-2 py-1 rounded-pill"
            style={{
              top: 12,
              right: 12,
              zIndex: 5,
              background: "rgba(17,24,39,.85)",
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            #{booth.number}
          </span>
        )}

        {/* Square media box */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "1 / 1",
            borderRadius: 16,
            overflow: "hidden",
            background: "linear-gradient(180deg,#F6F8FC 0%, #EDF2FB 100%)",
            border: "1px solid rgba(17,24,39,.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {booth.logo ? (
            <img
              src={`/storage/${booth.logo}`}
              alt={booth.name || t("Booth")}
              style={{ display: "block", objectFit: "contain", width: "86%", height: "86%" }}
            />
          ) : (
            <div
              style={{
                width: "78%",
                height: "78%",
                borderRadius: 14,
                background: softBg(booth.id),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontWeight: 800, fontSize: 40, lineHeight: 1, color: "#6f42c1", letterSpacing: 0.5 }}>
                {initials}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="card-body d-flex flex-column">
        <h6 className="mb-1 fw-bold">{booth.name || t("Booth")}</h6>
        {booth.description && (
          <p className="text-muted small mb-2" style={{ minHeight: 36 }}>
            {booth.description}
          </p>
        )}

        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="fw-semibold">
            {currencySymbol} {booth.price ?? 0}
          </span>
          <span className={`badge ${booth.status === "available" ? "bg-success" : "bg-secondary"}`}>
            {booth.status === "available" ? t("Available") : t("Soldout")}
          </span>
        </div>

        {owned ? (
          <button className="btn btn-success mt-auto w-100" disabled>
            {t("Owned")}
          </button>
        ) : (
          <button className="btn btn-primary mt-auto w-100" disabled={!canBuy} onClick={() => onBuy && onBuy(booth.id)}>
            {canBuy ? t("Buy Now") : t("Sold Out")}
          </button>
        )}
      </div>
    </div>
  );
};

/* ---------------- page ---------------- */
const Index = ({ booths, myBooths = [], getCurrency }: any) => {
  const { t } = useLaravelReactI18n();
  const [search, setSearch] = useState("");

  const myIds = useMemo(() => new Set((myBooths || []).map((b: any) => b.id)), [myBooths]);

  // text filter
  const filteredAll = useMemo(() => {
    const q = search.toLowerCase();
    return (booths || [])
      .filter((b: any) =>
        [b.name, b.description, b.number?.toString()].some((v) => (v || "").toLowerCase().includes(q))
      );
  }, [booths, search]);

  // exclude user's items from marketplace
  const filteredMarket = useMemo(
    () => filteredAll.filter((b: any) => !myIds.has(b.id)),
    [filteredAll, myIds]
  );

  // split by type
  const boothsOnly   = filteredMarket.filter((b: any) => (b.type || "booth").toLowerCase() === "booth");
  const sponsorsOnly = filteredMarket.filter((b: any) => (b.type || "").toLowerCase().startsWith("sponsor"));
  const bannersOnly  = filteredMarket.filter((b: any) => (b.type || "").toLowerCase() === "banner");

  const goCheckout = (id: number) => router.visit(route("attendee.booth.checkout", id));

  return (
    <>
      <Head title={t("Sponsorship Opportunities")} />
      <div className="page-content">
        <Container>
          {/* Search */}
          <div className="search-box mb-4">
            <input
              type="text"
              className="form-control bg-light border-dark"
              autoComplete="off"
              placeholder={t("Search by name...")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <i className="ri-search-line search-icon" />
          </div>

          {/* My purchases (combined) */}
          {myBooths?.length > 0 && (
            <>
              <h5 className="mb-3">{t("My Purchased")}</h5>
              <Row className="mb-4">
                {myBooths.map((booth: any) => (
                  <Col lg={3} md={6} sm={12} className="mb-3" key={booth.id}>
                    <BoothCard booth={booth} currencySymbol={getCurrency?.currency_symbol} owned t={t} />
                  </Col>
                ))}
              </Row>
              <hr className="mb-4" />
            </>
          )}

          {/* Booths */}
          {boothsOnly.length > 0 && (
            <>
              <h5 className="mb-3">{t("Event Booths")}</h5>
              <Row className="mb-4">
                {boothsOnly.map((booth: any) => (
                  <Col lg={3} md={6} sm={12} className="mb-4" key={booth.id}>
                    <BoothCard booth={booth} currencySymbol={getCurrency?.currency_symbol} onBuy={goCheckout} t={t} />
                  </Col>
                ))}
              </Row>
                <hr className="mb-4" />
            </>
          )}

          {/* Sponsor Ads */}
          {sponsorsOnly.length > 0 && (
            <>
              <h5 className="mb-3">{t("Event Sponsor Ads")}</h5>
              <Row className="mb-4">
                {sponsorsOnly.map((booth: any) => (
                  <Col lg={3} md={6} sm={12} className="mb-4" key={booth.id}>
                    <BoothCard booth={booth} currencySymbol={getCurrency?.currency_symbol} onBuy={goCheckout} t={t} />
                  </Col>
                ))}
              </Row>
              <hr className="mb-4" />
            </>
          )}

          {/* Banners */}
          {bannersOnly.length > 0 && (
            <>
              <h5 className="mb-3">{t("Event Banners")}</h5>
              <Row className="mb-4">
                {bannersOnly.map((booth: any) => (
                  <Col lg={3} md={6} sm={12} className="mb-4" key={booth.id}>
                    <BoothCard booth={booth} currencySymbol={getCurrency?.currency_symbol} onBuy={goCheckout} t={t} />
                  </Col>
                ))}
              </Row>
            </>
          )}

          {/* If nothing after filtering */}
          {boothsOnly.length === 0 && sponsorsOnly.length === 0 && bannersOnly.length === 0 && (
            <div className="text-center text-muted">{t("No booths found.")}</div>
          )}
        </Container>
      </div>
    </>
  );
};

Index.layout = (page: any) => <Layout children={page} />;
export default Index;
