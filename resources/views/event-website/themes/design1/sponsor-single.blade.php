@extends('event-website.layouts.layout')
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
@section('header')
    @include('event-website.themes.design1.header')
@endsection
<style>
/* ============================================================
   SINGLE SPONSOR PAGE — Polished layout (non-breaking)
   Uses existing classes from your markup.
   Relies on layout :root tokens (colors, shadows, radius, etc.)
============================================================ */

/* Section chrome consistent with other pages */
/* Header */
.sponsors .section-header{
  text-align:center; margin-bottom: 1.25rem;
}
.sponsors .section-tag{
  display:inline-block; padding:.35rem .75rem; border-radius:999px;
  background: var(--color-primary-light); color: var(--color-primary-foreground);
  font-weight: 800; letter-spacing:.02em;
  box-shadow: var(--shadow-sm);
}

/* Wrap + card */
.sponsors-tiers{
  display:flex; flex-direction:column; gap: clamp(1rem, 2.5vw, 1.6rem);
}

/* Hero banner (full width, non-intrusive height) */
.sponsors-tiers > img{
  width: 100%;
  height: clamp(180px, 30vw, 340px);
  object-fit: cover;             /* shows whole feel, soft crop only edges */
  border-radius: 18px;
  border: 1px solid color-mix(in srgb, var(--color-neutral-200), transparent 30%);
  box-shadow: var(--shadow-lg);
}

/* Main tier card */
.sponsors-tier{
  background: linear-gradient(180deg, color-mix(in srgb, #fff 8%, transparent), color-mix(in srgb, #fff 3%, transparent));
  border: 1px solid color-mix(in srgb, var(--color-neutral-200), transparent 30%);
  border-radius: 18px;
  padding: clamp(1rem, 2vw, 1.3rem);
  box-shadow: var(--shadow-md);
}

/* Center column container (you already inline-style flex; this complements it) */
.sponsors-grid.gold{
  gap: 1rem;
  text-align: center;
}

/* Sponsor logo card — never crop logo */
.sponsor-logo{
  display:flex; align-items:center; justify-content:center;
  background:white;
  border: 1px solid color-mix(in srgb, var(--color-neutral-200), transparent 30%);
  border-radius: 16px;
  box-shadow: var(--shadow-sm);
  padding: clamp(.9rem, 1.8vw, 1.2rem);
  min-height: 140px;
  width: min(460px, 100%);
  margin-inline: auto;
}
.sponsor-logo img{
  max-width: 100%;
  max-height: 90px;
  object-fit: contain;            /* no cropping */
  filter: grayscale(.1);
  opacity: .98;
  transition: filter 200ms, opacity 200ms, transform 200ms;
}
.sponsor-logo:hover img{
  filter: grayscale(0);
  opacity: 1;
  transform: scale(1.02);
}

/* Info block */
.sponsors-tier .text-center h5{
  margin: .75rem 0 .25rem;
  font-weight: 900;
  letter-spacing:.2px;
}
.sponsors-tier .text-muted{
  color: color-mix(in srgb, var(--color-neutral-200), #fff 0%) !important;
}

/* Inline badges for type & booth (if present) */
.sponsors-tier .text-center .badge{
  display:inline-block; margin: .25rem .25rem 0;
  padding: .35rem .6rem; border-radius: 999px; font-size: .78rem; font-weight: 800;
  background: color-mix(in srgb, var(--color-primary-light) 40%, transparent);
  color: var(--color-primary-foreground);
  border: 1px solid color-mix(in srgb, var(--color-primary), transparent 60%);
}

/* Social row */
.sponsors-tier .text-center a{
  display:inline-flex; align-items:center; justify-content:center;
  width: 38px; height: 38px; border-radius: 999px; margin: .25rem .2rem 0;
  background: color-mix(in srgb, #fff 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-neutral-200), transparent 35%);
  color: var(--color-neutral-50);
  transition: transform 160ms, filter 160ms, background 160ms, border-color 160ms;
}
.sponsors-tier .text-center a:hover{
  transform: translateY(-2px);
  background: color-mix(in srgb, var(--color-primary-light) 20%, transparent);
  border-color: color-mix(in srgb, var(--color-primary), transparent 60%);
  filter: none;
}

/* Address */
.sponsors-tier p.text-muted:last-of-type{
  margin-top: .35rem;
  border-top: 1px dashed color-mix(in srgb, var(--color-neutral-200), transparent 55%);
  padding-top: .6rem;
}

/* Description + show more */
.description-container{
  margin-top:.4rem;
  background: color-mix(in srgb, #fff 8%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-neutral-200), transparent 40%);
  border-radius: 12px;
  padding: .75rem .85rem;
  box-shadow: var(--shadow-inner);
}
.description-text{
  margin: 0 0 .4rem;
}
.show-more-btn{
  color: var(--color-primary);
  font-weight: 800;
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
}
.show-more-btn:hover{ text-decoration: underline }

/* Modal polish (you already have the markup) */
.modal-content{
  border-radius: 18px;
  border: 1px solid var(--color-neutral-200);
  box-shadow: var(--shadow-2xl);
}

/* Responsiveness: tighten layout on small screens */
@media (max-width: 768px){
  .sponsors-tiers > img{ height: clamp(160px, 36vw, 240px) }
  .sponsor-logo{ min-height: 120px }
  .sponsor-logo img{ max-height: 80px }
}
</style>

@section('content')
    {{-- @if ($partnerCategories->count() > 0 && $event->partners->count() > 0) --}}
    <section id="sponsors" class="sponsors">
        <div class="container">
            <div class="section-header">
                <span class="section-tag" style="font-size: 2rem">{{ $partner->company_name }}</span>
            </div>
            <div class="sponsors-tiers">
                {{-- @foreach ($partnerCategories ?? [] as $category) --}}
                {{-- @if ($category->count() > 0) --}}
                @if($partner->banner_image)
                <img src="{{ $partner->banner_image }}" alt="{{ $partner->name }}">
                @endif
                <div class="sponsors-tier">
                    {{-- <h3 class="tier-title">{{ $category->name }}</h3> --}}
                    <div class="d-flex sponsors-grid gold"
                        style="display: flex !important;
                            flex-direction: column;
                            align-content: center;
                            justify-content: center;
                            align-items: center;">
                        {{-- @foreach ($category->partners ?? [] as $partner) --}}
                        <div type="button" class="sponsor-logo">
                            <img src="{{ $partner->exhibitor_logo }}" alt="{{ $partner->name }}">
                        </div>
                        <div class=" text-center">
                            <h5>{{ $partner->type }}</h5>
                            <p class="text-muted mb-0">{{ $partner->email }}</p>
                            <p class="text-muted">{{ $partner->phone }}</p>
                            <p class="mb-0">{{ $partner->company_name }}</p>
                            <p class="text-muted">{{ $partner->exhibitor_booth_no }}</p>
                            @if ($partner->web)
                                <a target="_blank" href="{{ $partner->web }}">
                                    <i class="bi bi-globe"></i>
                                </a>
                                <a target="_blank" href="{{ $partner->facebook }}">
                                    <i class="bi bi-facebook"></i>
                                </a>
                                <a style="text-decoration: none; color:black" target="_blank"
                                    href="{{ $partner->twitter }}">
                                    <i class="bi bi-twitter-x"></i>
                                </a>
                                <a target="_blank" href="{{ $partner->linkedin }}">
                                    <i class="bi bi-linkedin"></i>
                                </a>
                                <a style="text-decoration: none; color:red" target="_blank" href="{{ $partner->youtube }}">
                                    <i class="bi bi-youtube"></i>
                                </a>
                                <a style="text-decoration: none; color:rgb(252, 127, 148)" target="_blank"
                                    href="{{ $partner->insta }}">
                                    <i class="bi bi-instagram"></i>
                                </a>
                                <a style="text-decoration: none; color:black" target="_blank"
                                    href="{{ $partner->tiktok }}">
                                    <i class="bi bi-tiktok"></i>
                                </a>
                            @endif
                            <p class="text-muted">{{ $partner->address }}</p>

                            <!-- Description with Show More functionality -->
                            <div class="description-container">
                                @if (strlen($partner->description) > 100)
                                    <p class="description-text short-description" id="shortPartnerDesc{{ $partner->id }}">
                                        {{ substr($partner->description, 0, 100) }}...</p>
                                    <p class="description-text full-description text-muted d-none"
                                        id="fullPartnerDesc{{ $partner->id }}">{{ $partner->description }}</p>
                                    <button class="btn show-more-btn p-0" data-partner-id="{{ $partner->id }}">Show
                                        More</button>
                                @else
                                    <p class="text-muted">{{ $partner->description }}</p>
                                @endif
                            </div>
                        </div>
                        <!-- Modal -->
                        <div class="modal fade" id="partnerModal{{ $partner->id }}" tabindex="-1"
                            aria-labelledby="modalLabel{{ $partner->id }}" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content py-3 px-4">
                                    <div class="d-flex justify-content-center">
                                        <img src="{{ $partner->exhibitor_logo }}" alt="{{ $partner->type }}"
                                            style="height: 120px;">
                                    </div>
                                    <div class=" text-center">
                                        <h5>{{ $partner->type }}</h5>
                                        <p class="text-muted mb-0">{{ $partner->email }}</p>
                                        <p class="text-muted">{{ $partner->phone }}</p>
                                        <p class="mb-0">{{ $partner->company_name }}</p>
                                        <p class="text-muted">{{ $partner->exhibitor_booth_no }}</p>
                                        @if ($partner->web)
                                            <a target="_blank" href="{{ $partner->web }}">
                                                <i class="bi bi-globe"></i>
                                            </a>
                                            <a target="_blank" href="{{ $partner->facebook }}">
                                                <i class="bi bi-facebook"></i>
                                            </a>
                                            <a style="text-decoration: none; color:black" target="_blank"
                                                href="{{ $partner->twitter }}">
                                                <i class="bi bi-twitter-x"></i>
                                            </a>
                                            <a target="_blank" href="{{ $partner->linkedin }}">
                                                <i class="bi bi-linkedin"></i>
                                            </a>
                                            <a style="text-decoration: none; color:red" target="_blank"
                                                href="{{ $partner->youtube }}">
                                                <i class="bi bi-youtube"></i>
                                            </a>
                                        @endif
                                        <p class="text-muted">{{ $partner->address }}</p>

                                        <!-- Description with Show More functionality -->
                                        <div class="description-container">
                                            @if (strlen($partner->description) > 100)
                                                <p class="description-text short-description"
                                                    id="shortPartnerDesc{{ $partner->id }}">
                                                    {{ substr($partner->description, 0, 100) }}...</p>
                                                <p class="description-text full-description text-muted d-none"
                                                    id="fullPartnerDesc{{ $partner->id }}">{{ $partner->description }}
                                                </p>
                                                <button class="btn show-more-btn p-0"
                                                    data-partner-id="{{ $partner->id }}">Show More</button>
                                            @else
                                                <p class="text-muted">{{ $partner->description }}</p>
                                            @endif
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {{-- @endforeach --}}
                    </div>
                </div>
                {{-- @endif --}}
                {{-- @endforeach --}}
            </div>
        </div>
    </section>
    {{-- @endif --}}

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
