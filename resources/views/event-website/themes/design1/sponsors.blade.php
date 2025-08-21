@extends('event-website.layouts.layout')
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
@section('header')
    @include('event-website.themes.design1.header')
@endsection
<!-- ============ SPONSORS: REDESIGN CSS (NON‑BREAKING) ============ -->
<style>
/* ==========================================================
   SPONSORS — Tiers + Logo Grid (no functionality changes)
   Uses your classes: sponsors, sponsors-tiers, sponsors-tier,
   tier-title, sponsors-grid, sponsor-logo
========================================================== */

/* 1) Section chrome */
.sponsors .section-header{
  text-align:center; margin-bottom: 1.25rem;
}
.sponsors .section-tag{
  display:inline-block; padding:.35rem .6rem; border-radius:999px;
  background: var(--color-primary-light); color: var(--color-primary-foreground);
  font-size: var(--font-size-xs); letter-spacing:.06em; text-transform:uppercase;
}

/* 2) Tier blocks */
.sponsors-tiers{
  display:flex; flex-direction:column; gap: clamp(1rem, 3vw, 1.75rem);
}

.sponsors-tier{
  background: linear-gradient(180deg, color-mix(in srgb, #fff 7%, transparent), color-mix(in srgb, #fff 3%, transparent));
  border: 1px solid color-mix(in srgb, var(--color-neutral-200), transparent 30%);
  border-radius: 18px;
  padding: clamp(1rem, 2vw, 1.25rem);
  box-shadow: var(--shadow-md);
}

.tier-title{
  margin: 0 0 .9rem; font-weight: 900; letter-spacing:.2px;
  font-size: clamp(1.05rem, 2.2vw, 1.35rem);
  display: inline-flex; align-items:center; gap:.5rem;
  color: var(--color-neutral-50);
  position: relative;
  padding-left: .75rem;
}
.tier-title::before{
  content:""; width: 8px; height: 8px; border-radius:999px;
  position:absolute; left:0; top: .55em;
  background: var(--color-primary);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-primary-light), transparent 70%);
}

/* 3) Tier accents (optional) — add class on .sponsors-grid like .gold/.silver/.bronze */
.sponsors-grid.gold + .note, .sponsors-grid.silver + .note, .sponsors-grid.bronze + .note { color: var(--color-neutral-200) }

.sponsors-grid.gold   ~ .tier-title::before { background: #E1B12C }
.sponsors-grid.silver ~ .tier-title::before { background: #C0C0C0 }
.sponsors-grid.bronze ~ .tier-title::before { background: #CD7F32 }

/* 4) Logo grid */
.sponsors-grid{
  display:grid;
  grid-template-columns: repeat(6, 1fr);
  gap: clamp(.7rem, 1.6vw, 1rem);
}
@media (max-width: 1200px){ .sponsors-grid{ grid-template-columns: repeat(5, 1fr) } }
@media (max-width: 992px) { .sponsors-grid{ grid-template-columns: repeat(4, 1fr) } }
@media (max-width: 768px) { .sponsors-grid{ grid-template-columns: repeat(3, 1fr) } }
@media (max-width: 520px) { .sponsors-grid{ grid-template-columns: repeat(2, 1fr) } }
@media (max-width: 360px) { .sponsors-grid{ grid-template-columns: 1fr } }

/* 5) Logo cards (never crop images) */
.sponsor-logo{
  display:flex; align-items:center; justify-content:center;
  background: white;
  border: 1px solid color-mix(in srgb, var(--color-neutral-200), transparent 30%);
  border-radius: 16px;
  box-shadow: var(--shadow-sm);
  padding: clamp(.7rem, 1.5vw, 1rem);
  min-height: 110px; /* bigger targets on mobile */
  transition: transform var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-fast), filter var(--transition-fast);
  text-decoration: none;
  position: relative;
  overflow: hidden;
}
.sponsor-logo::after{
  /* glossy light sweep on hover */
  content:""; position:absolute; inset:0; pointer-events:none;
  background: linear-gradient(120deg, transparent 20%, rgba(255,255,255,.12) 50%, transparent 80%);
  transform: translateX(-100%);
  transition: transform .6s ease;
}
.sponsor-logo:hover{
  transform: translateY(-3px);
  border-color: color-mix(in srgb, var(--color-primary), transparent 65%);
  box-shadow: var(--shadow-lg);
}
.sponsor-logo:hover::after{ transform: translateX(0) }

.sponsor-logo img{
  max-width: 100%;
  max-height: 60px;            /* control height while keeping aspect */
  object-fit: contain;         /* never crop */
  filter: grayscale(.4);
  opacity: .95;
  transition: filter var(--transition-fast), opacity var(--transition-fast), transform var(--transition-fast);
}
.sponsor-logo:hover img{
  filter: grayscale(0);
  opacity: 1;
  transform: scale(1.02);
}

/* Slightly larger for premium tiers by applying a class to grid */
.sponsors-grid.gold   .sponsor-logo{ min-height: 130px }
.sponsors-grid.gold   .sponsor-logo img{ max-height: 72px }
.sponsors-grid.silver .sponsor-logo{ min-height: 120px }
.sponsors-grid.silver .sponsor-logo img{ max-height: 66px }

/* 6) Modal polish (your IDs/markup unchanged) */
.modal-content{
  border-radius: 18px;
  border: 1px solid var(--color-neutral-200);
  box-shadow: var(--shadow-2xl);
}
.modal .show-more-btn{
  color: var(--color-primary); font-weight:800; background:transparent; border:0; cursor:pointer;
}
.modal .show-more-btn:hover{ text-decoration: underline }

/* 7) Small helper for long company names if you add captions later */
.sponsor-caption{
  margin-top:.4rem; font-size:.85rem; color: var(--color-neutral-200);
  text-align:center; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
}
</style>

@section('content')
@if ($partnerCategories->count() > 0 && $event->partners->count() > 0)
<section id="sponsors" class="sponsors">
    <div class="container">
        <div class="section-header">
            <span class="section-tag">Our Sponsors</span>
        </div>
        <div class="sponsors-tiers">
            @foreach ($partnerCategories ?? [] as $category)
            @if ($category->partners->count() > 0)
            <div class="sponsors-tier">
                <h3 class="tier-title">{{ $category->name }}</h3>
                <div class="sponsors-grid gold">
                    @foreach ($category->partners ?? [] as $partner)
                    <a href="{{ route('organizer.events.website.sponsors.single',['uuid' => $event->uuid, 'id' => $partner->id]) }}"  class="sponsor-logo">
                        <img src="{{ $partner->exhibitor_logo}}"
                            alt="{{ $partner->name }}">
                    </a>
                    <!-- Modal -->
                    <div class="modal fade" id="partnerModal{{ $partner->id }}" tabindex="-1" aria-labelledby="modalLabel{{ $partner->id }}" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content py-3 px-4">
                                <div class="d-flex justify-content-center">
                                    <img  src="{{ $partner->exhibitor_logo}}" alt="{{ $partner->type }}" style="height: 120px;">
                                </div>
                                <div class=" text-center">
                                    <h5>{{ $partner->type }}</h5>
                                    <p class="text-muted mb-0">{{$partner->email}}</p>
                                    <p class="text-muted">{{$partner->phone}}</p>
                                    <p class="mb-0">{{ $partner->company_name}}</p>
                                    <p class="text-muted">{{ $partner->exhibitor_booth_no }}</p>
                                    @if ($partner->web)
                                    <a target="_blank" href="{{ $partner->web }}">
                                        <i class="bi bi-globe"></i>
                                    </a>
                                    <a target="_blank" href="{{ $partner->facebook }}">
                                        <i class="bi bi-facebook"></i>
                                    </a>
                                    <a style="text-decoration: none; color:black" target="_blank" href="{{ $partner->twitter }}">
                                        <i class="bi bi-twitter-x"></i>
                                    </a>
                                    <a  target="_blank" href="{{ $partner->linkedin }}">
                                        <i class="bi bi-linkedin"></i>
                                    </a>
                                    <a style="text-decoration: none; color:red" target="_blank" href="{{ $partner->youtube }}">
                                        <i class="bi bi-youtube"></i>
                                    </a>
                                    @endif
                                    <p class="text-muted">{{$partner->address}}</p>

                                    <!-- Description with Show More functionality -->
                                    <div class="description-container">
                                        @if (strlen($partner->description) > 100)
                                        <p class="description-text short-description" id="shortPartnerDesc{{ $partner->id }}">{{ substr($partner->description, 0, 100) }}...</p>
                                        <p class="description-text full-description text-muted d-none" id="fullPartnerDesc{{ $partner->id }}">{{ $partner->description }}</p>
                                        <button class="btn show-more-btn p-0" data-partner-id="{{ $partner->id }}">Show More</button>
                                        @else
                                        <p class="text-muted">{{ $partner->description }}</p>
                                        @endif
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    @endforeach
                </div>
            </div>
            @endif
            @endforeach
        </div>
    </div>
</section>
@endif

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const showMoreButtons = document.querySelectorAll('.show-more-btn');

        showMoreButtons.forEach(button => {
            button.addEventListener('click', function() {
                const partnerId = this.getAttribute('data-partner-id');
                const shortDesc = document.getElementById(`shortPartnerDesc${partnerId}`);
                const fullDesc = document.getElementById(`fullPartnerDesc${partnerId}`);

                if (fullDesc.classList.contains('d-none')) {
                    // Show full description
                    shortDesc.classList.add('d-none');
                    fullDesc.classList.remove('d-none');
                    this.textContent = 'Show Less';
                } else {
                    // Show short description
                    shortDesc.classList.remove('d-none');
                    fullDesc.classList.add('d-none');
                    this.textContent = 'Show More';
                }
            });
        });
    });
</script>
@endsection
