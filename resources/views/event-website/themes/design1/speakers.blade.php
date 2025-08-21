@extends('event-website.layouts.layout')
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
@section('header')
    @include('event-website.themes.design1.header')
    <style>
        /* ==========================================================
   SPEAKERS PAGE — No-Crop Images + Fresh Layout
   Works with your existing classes/HTML.
   Sections:
   1) Section chrome
   2) Grid layout (with featured pattern)
   3) Speaker cards
   4) Image containment (NO CROPPING)
   5) Text/meta
   6) Hover/focus
   7) Modal polish (unchanged behavior)
   8) Responsive tweaks
========================================================== */

/* ---------------------------------
   1) SECTION CHROME
--------------------------------- */
.speakers .section-header{
  text-align:center; margin-bottom:1.75rem;
  margin-top: 3rem;
}
.speakers .section-tag{
  display:inline-block; padding:.35rem .6rem; border-radius:999px;
  background: var(--color-primary-light); color: var(--color-primary-foreground);
  font-size: var(--font-size-xs); letter-spacing:.06em; text-transform:uppercase;
}
.speakers .section-title{
  color:var(--color-primary-foreground);
  margin:.55rem 0 0; font-size:clamp(1.6rem,3.2vw,2.25rem);
  font-weight: var(--font-weight-extrabold);
}

/* ---------------------------------
   2) GRID LAYOUT (+ featured pattern)
--------------------------------- */
.speakers-grid{
  display:grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(.9rem, 2.5vw, 1.25rem);
}
@media (max-width: 1200px){ .speakers-grid{ grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 900px){  .speakers-grid{ grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px){  .speakers-grid{ grid-template-columns: 1fr; } }

/* Featured card pattern: every 6th card spans 2 columns on large screens */
.speakers-grid > .speaker-card:nth-child(6n){
  grid-column: span 2;
  display:grid;
  grid-template-columns: 1.2fr 1fr;        /* image + info side-by-side */
}
@media (max-width: 1200px){
  .speakers-grid > .speaker-card:nth-child(6n){
    grid-column: auto; grid-template-columns: 1fr; /* falls back to normal */
  }
}

/* ---------------------------------
   3) SPEAKER CARDS
--------------------------------- */
.speaker-card{
  border-radius:16px;
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--color-neutral-900) 4%, transparent), color-mix(in srgb, var(--color-neutral-900) 8%, transparent)),
    #fff;
  border:1px solid color-mix(in srgb, var(--color-neutral-300), transparent 35%);
  box-shadow: var(--shadow-md);
  overflow:hidden;
  cursor:pointer;
  transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-fast);
  will-change: transform;
  min-height: 100%; /* stretch nicely in grid */
}
.speaker-card::before{
  /* subtle top accent */
  content:""; display:block; height:3px;
  background: linear-gradient(90deg, transparent, var(--color-primary-light), var(--color-primary), transparent);
  opacity:.75;
}
.speaker-card .speaker-info{
  padding: .95rem .95rem 1.05rem;
  display:flex; flex-direction:column; gap:.25rem;
}

/* ---------------------------------
   4) IMAGE CONTAINMENT (NO CROPPING)
--------------------------------- */
.speaker-image{
  position: relative;
  /* No fixed aspect ratio — let image decide height while keeping it elegant */
  background:
    radial-gradient(100% 100% at 50% 0%, color-mix(in srgb, var(--color-neutral-200) 65%, white), white);
  border-bottom: 1px solid color-mix(in srgb, var(--color-neutral-300), transparent 35%);
  padding: clamp(.6rem, 1.6vw, .9rem);         /* frame/letterbox padding */
  display: flex; align-items: center; justify-content: center;
}

.speaker-image img{
  width: 100%;
  height: auto;                   /* keep natural aspect ratio */
  max-height: 360px;              /* prevent overly tall images */
  object-fit: contain;            /* NO CROPPING */
  object-position: center;        /* center inside frame */
  filter: drop-shadow(0 6px 12px rgba(0,0,0,.08));
  transition: transform var(--transition-slow), filter var(--transition-slow), opacity var(--transition-slow);
}

/* Wide featured card uses taller stage for images */
.speakers-grid > .speaker-card:nth-child(6n) .speaker-image img{
  max-height: 420px;
}

/* Optional soft vignette edge (doesn't hide edges) */
.speaker-image::after{
  content:""; position:absolute; inset:0;
  pointer-events:none; border-radius:12px;
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--color-neutral-300), transparent 60%),
              inset 0 -30px 40px -25px rgba(0,0,0,.10);
}

/* ---------------------------------
   5) TEXT / META
--------------------------------- */
.speaker-info h3{
  margin:0; line-height:1.2;
  font-size: clamp(1.08rem, 2.2vw, 1.2rem);
  font-weight: var(--font-weight-extrabold);
  color: var(--color-foreground);
}
.speaker-role{
  margin:0;
  color: var(--color-neutral-500);
  font-size: var(--font-size-sm);
}

/* ---------------------------------
   6) HOVER / FOCUS
--------------------------------- */
.speaker-card:hover{
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: color-mix(in srgb, var(--color-primary), transparent 65%);
}
.speaker-card:hover .speaker-image img{
  transform: scale(1.02);                 /* tiny lift, still no crop */
  filter: drop-shadow(0 10px 18px rgba(0,0,0,.10));
}
.speaker-card:focus{ outline:2px solid var(--color-primary-light); outline-offset: 3px; }
@supports selector(:focus-visible){
  .speaker-card:focus{ outline: none; }
  .speaker-card:focus-visible{ outline:2px solid var(--color-primary-light); outline-offset:3px; }
}

/* ---------------------------------
   7) MODAL POLISH
--------------------------------- */
.modal-content{
  border-radius: 18px;
  border: 1px solid var(--color-neutral-200);
  box-shadow: var(--shadow-2xl);
}
.modal-content .rounded-circle{
  object-fit: cover;        /* avatars are usually square/crop-friendly */
  border: 3px solid #fff;
  box-shadow: var(--shadow-lg);
}
.modal-content h5{ font-weight: var(--font-weight-extrabold); margin-top:.6rem; }
.modal-footer{ border-top:0; gap:.75rem; }
.modal-footer a{
  display:inline-flex; align-items:center; justify-content:center;
  width:40px; height:40px; border-radius:10px;
  border:1px solid color-mix(in srgb, var(--color-neutral-300), transparent 40%); background:#fff;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-fast);
}
.modal-footer a:hover{
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: color-mix(in srgb, var(--color-primary), transparent 60%);
}

/* Bio toggle button */
.bio-container .show-more-btn{
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
  text-decoration: none; cursor: pointer;
}
.bio-container .show-more-btn:hover{ text-decoration: underline; }

/* ---------------------------------
   8) RESPONSIVE TWEAKS
--------------------------------- */
@media (max-width: 420px){
  .speaker-image img{ max-height: 300px; }
  .speaker-card .speaker-info{ padding:.8rem; }
}

    </style>
@endsection
@section('content')
    <section id="speakers" class="speakers">
        <div class="container">
            <div class="section-header">
                <span class="section-tag">Meet Our Speakers</span>
                <h2 class="section-title">Speakers</h2>
                {{-- <p class="section-subtitle">Gain insights from leaders at the forefront of technology</p> --}}
            </div>
            <div class="speakers-grid">
                @foreach ($event->event_speakers ?? [] as $speaker)
                    <div type="button" data-bs-toggle="modal" data-bs-target="#speakerModal{{ $speaker->id }}"
                        class="speaker-card">
                        <div class="speaker-image">
                            <img src="{{ $speaker->avatar }}" alt="{{ $speaker->name }}">
                            {{-- <div class="speaker-social">
                                        <a href="#" aria-label="Twitter">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <path
                                                    d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z">
                                                </path>
                                            </svg>
                                        </a>
                                        <a href="#" aria-label="LinkedIn">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <path
                                                    d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z">
                                                </path>
                                                <rect x="2" y="9" width="4" height="12"></rect>
                                                <circle cx="4" cy="4" r="2"></circle>
                                            </svg>
                                        </a>
                                    </div> --}}
                        </div>
                        <div class="speaker-info">
                            <h3>{{ $speaker->name }}</h3>
                            <p class="speaker-role">
                                {{ implode(', ', array_filter([$speaker->position, $speaker->company])) }}</p>
                            <!-- <p class="speaker-bio">{{ $speaker->bio }}</p> -->
                        </div>
                    </div>
                    <!-- Modal -->
                    <div class="modal fade" id="speakerModal{{ $speaker->id }}" tabindex="-1"
                        aria-labelledby="modalLabel{{ $speaker->id }}" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content pt-3">
                                <div class="d-flex justify-content-center">
                                    <img class="rounded-circle"
                                        src="{{ $speaker->avatar ? $speaker->avatar : '$event->logo' }}" width="150px"
                                        height="150px" alt="{{ $speaker->name }}">
                                </div>
                                <div class="px-4 text-center">
                                    <h5>{{ $speaker->name }}</h5>
                                    <p class="text-muted mb-0">{{ $speaker->email }}</p>
                                    <p class="text-muted ">{{ $speaker->phone }}</p>
                                    <p class="mb-0">{{ $speaker->company }}</p>
                                    <p class="text-muted">{{ $speaker->position }}</p>

                                    <!-- Bio with Show More functionality -->
                                    <div class="bio-container">
                                        @if (strlen($speaker->bio) > 100)
                                            <p class="text-muted bio-text short-bio" id="shortBio{{ $speaker->id }}">
                                                {{ substr($speaker->bio, 0, 100) }}...</p>
                                            <p class="text-muted bio-text full-bio d-none" id="fullBio{{ $speaker->id }}">
                                                {{ $speaker->bio }}</p>
                                            <span class="btn show-more-btn p-0" data-speaker-id="{{ $speaker->id }}">Show
                                                More</span>
                                        @else
                                            <p class="text-muted">{{ $speaker->bio }}</p>
                                        @endif
                                    </div>
                                </div>
                                <div class="modal-footer text-center d-flex justify-content-center">
                                    <!-- Speaker's website link -->
                                    @if ($speaker->web)
                                        <a target="_blank" href="{{ $speaker->web }}">
                                            <i class="bi bi-globe"></i>
                                        </a>
                                    @endif

                                    <!-- LinkedIn link -->
                                    @if ($speaker->linkedin)
                                        <a target="_blank" href="{{ $speaker->linkedin }}">
                                            <i class="bi bi-linkedin text-info"></i>
                                        </a>
                                    @endif

                                    <!-- Facebook link -->
                                    @if ($speaker->facebook)
                                        <a target="_blank" href="{{ $speaker->facebook }}">
                                            <i class="bi bi-facebook text-primary"></i>
                                        </a>
                                    @endif
                                    <!-- Twitter link -->
                                    @if ($speaker->twitter)
                                        <a target="_blank" href="{{ $speaker->twitter }}">
                                            <i class="bi bi-twitter-x text-black"></i>
                                        </a>
                                    @endif
                                    <!-- Instagram link -->
                                    @if ($speaker->instagram)
                                        <a target="_blank" href="{{ $speaker->instagram }}">
                                            <i class="bi bi-instagram text-danger-emphasis"></i>
                                        </a>
                                    @endif
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </section>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const showMoreButtons = document.querySelectorAll('.show-more-btn');

            showMoreButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const speakerId = this.getAttribute('data-speaker-id');
                    const shortBio = document.getElementById(`shortBio${speakerId}`);
                    const fullBio = document.getElementById(`fullBio${speakerId}`);

                    if (fullBio.classList.contains('d-none')) {
                        // Show full bio
                        shortBio.classList.add('d-none');
                        fullBio.classList.remove('d-none');
                        this.textContent = 'Show Less';
                    } else {
                        // Show short bio
                        shortBio.classList.remove('d-none');
                        fullBio.classList.add('d-none');
                        this.textContent = 'Show More';
                    }
                });
            });
        });
    </script>
@endsection
