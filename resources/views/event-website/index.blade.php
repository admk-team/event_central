@extends('event-website.layouts.layout')
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
@section('content')
    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <div class="event-meta">
                    <div class="event-date">{{ date('F j, Y', strtotime($event->dates[0]->date)) }}</div>
                    <div class="event-location">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>{{ $event->location_base }}</span>
                    </div>
                </div>
                <h1 class="event-title">{{ $event->name }} <span
                        class="highlight">{{ date('Y', strtotime($event->dates[0]->date)) }}</span></h1>
                @isset($event->tagline)
                    <p class="event-tagline">{{ $event->tagline }}</p>
                @endisset
                <div class="hero-cta">
                    <a href="{{ route('attendee.register', $event) }}" class="btn btn-primary btn-lg">Secure Your
                        Spot</a>
                    <a href="{{ route('organizer.events.website.schedule', $event->uuid) }}"
                        class="btn btn-outline btn-lg">Explore Schedule</a>
                </div>
                <div class="countdown" id="countdown">
                    <div class="countdown-item">
                        <span class="countdown-number" id="countdown-days">00</span>
                        <span class="countdown-label">Days</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number" id="countdown-hours">00</span>
                        <span class="countdown-label">Hours</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number" id="countdown-minutes">00</span>
                        <span class="countdown-label">Minutes</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number" id="countdown-seconds">00</span>
                        <span class="countdown-label">Seconds</span>
                    </div>
                </div>
            </div>
            <div class="hero-graphics">
                <div class="hero-image">
                    <img src="{{ $event->images[0]->image_url ?? '' }}" alt="{{ $event->name }}">
                </div>
                <div class="shape shape-1"></div>
                <div class="shape shape-2"></div>
                <div class="shape shape-3"></div>
            </div>
        </div>
        <div class="hero-stats">
            <div class="container">
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2">
                                </rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                                <circle cx="8" cy="14" r="1"></circle>
                                <circle cx="12" cy="14" r="1"></circle>
                                <circle cx="16" cy="14" r="1"></circle>
                                <circle cx="8" cy="18" r="1"></circle>
                                <circle cx="12" cy="18" r="1"></circle>
                                <circle cx="16" cy="18" r="1"></circle>
                            </svg>
                        </div>
                        <div class="stat-number">{{ $event->dates->count() }}</div>
                        <div class="stat-label">Day{{ $event->dates->count() > 1 ? 's' : '' }}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <!-- Document/agenda -->
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <!-- Time indicators -->
                                <line x1="8" y1="13" x2="9" y2="13"></line>
                                <line x1="8" y1="17" x2="9" y2="17"></line>
                                <!-- Session content -->
                                <line x1="11" y1="13" x2="16" y2="13"></line>
                                <line x1="11" y1="17" x2="16" y2="17"></line>
                            </svg>
                        </div>
                        <div class="stat-number">{{ $event->event_sessions->count() }}</div>
                        <div class="stat-label">Session{{ $event->event_sessions->count() > 1 ? 's' : '' }}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <!-- Person -->
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path>
                                <!-- Microphone -->
                                <rect x="17" y="2" width="4" height="6" rx="1"></rect>
                                <path d="M19 8v3"></path>
                                <path d="M16 11h6"></path>
                            </svg>
                        </div>
                        <div class="stat-number">{{ $event->event_speakers->count() }}</div>
                        <div class="stat-label">Speaker{{ $event->event_speakers->count() > 1 ? 's' : '' }}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                            </svg>
                        </div>
                        <div class="stat-number">{{ $event->partners->count() }}</div>
                        <div class="stat-label">Sponsor{{ $event->partners->count() > 1 ? 's' : '' }}</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    @isset($event->description)
        <section id="about" class="about">
            <div class="container">
                <div class="section-header">
                    <span class="section-tag">About the Event</span>
                    <h2 class="section-title">{{ $event->name }}</h2>
                    {{-- <p class="section-subtitle">Join us for three days of learning, networking, and inspiration</p> --}}
                </div>
                <div class="about-content">
                    <div class="about-text">
                        {{ $event->description }}
                    </div>
                    <div class="about-video">
                        <div class="video-wrapper">
                            <img src="{{ $event->images[1]->image_url ?? ($event->images[0]->image_url ?? '') }}"
                                alt="{{ $event->name }}">
                            {{-- <button class="play-button" aria-label="Play video">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <polygon points="10 8 16 12 10 16 10 8"></polygon>
                                            </svg>
                                        </button> --}}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    @endif

        <section id="venue" class="venue">
            <div class="container">
                <div class="section-header">
                    <span class="section-tag">Event Location</span>
                    <h2 class="section-title">{{ $event->location_base }}</h2>
                    <!-- <p class="section-subtitle">500 E Cesar Chavez St, Austin, TX 78701</p> -->
                </div>
                {{-- <div class="venue-content">
                        <div class="venue-map">
                            <img src="/placeholder.svg?height=500&width=800" alt="Map of Austin Convention Center">
                        </div>
                    </div> --}}
            </div>
        </section>


        <section id="register" class="register">
            <div class="container">
                <div class="section-header light">
                    <span class="section-tag">Register Now</span>
                    <h2 class="section-title">Tickets</h2>
                    {{-- <p class="section-subtitle">Early bird pricing available until June 30, 2025</p> --}}
                </div>
                <div class="pricing-tiers">
                    @foreach ($event->tickets ?? [] as $ticket)
                    @if ($ticket->show_on_attendee_side)
                        <div class="pricing-card d-flex flex-column h-100">
                            <div class="pricing-header">
                                <h3>{{ $ticket->name }}</h3>
                                <div class="pricing">
                                    <span class="price">${{ $ticket->base_price }}</span>
                                </div>
                            </div>
                
                            <ul class="pricing-features">
                                @foreach ($ticket->sessions->take(5) ?? [] as $session)
                                    <li type="button" data-bs-toggle="modal"
                                        data-bs-target="#sessionModal{{ $session->id }}">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                        <span>{{ $session->name }}</span>
                                    </li>
                                @endforeach
                
                                @php
                                    $totalSessions = $ticket->sessions->count() ?? 0;
                                    $remaining = $totalSessions > 5 ? $totalSessions - 5 : 0;
                                @endphp
                
                                @if ($remaining > 0)
                                <a href="{{ route('attendee.login', $event) }}">
                                    <li class="color_primary">
                                        {{ $remaining }}+ More
                                    </li>
                                </a>
                                @endif
                            </ul>
                
                            <a href="{{ route('attendee.register', $event) }}" class="btn btn-primary btn-block mt-auto">Register Now</a>
                        </div>
                    @endif
                @endforeach
                



                    <!-- Modals placed outside the loop, after all content -->
                    @foreach ($event->tickets ?? [] as $ticket)
                        @foreach ($ticket->sessions ?? [] as $session)
                            <div class="modal fade text-dark" id="sessionModal{{ $session->id }}" tabindex="-1"
                                aria-labelledby="sessionModalLabel{{ $session->id }}" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <!-- {{ $session }} -->
                                        <div class="modal-body">
                                            <h5 class="modal-title text-center" id="sessionModalLabel{{ $session->id }}">
                                                {{ $session->name }}</h5>
                                            <div class="text-center">
                                                <p>{{ $session->type }}</p>
                                                <p>{{ $session->capacity }}</p>
                                                <p><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                        viewBox="0 0 24 24"
                                                        style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
                                                        <path
                                                            d="M12.25 2c-5.514 0-10 4.486-10 10s4.486 10 10 10 10-4.486 10-10-4.486-10-10-10zM18 13h-6.75V6h2v5H18v2z">
                                                        </path>
                                                    </svg> {{ $session->start_time }} - {{ $session->end_time }}</p>
                                                <p>{{ $session->description }}</p>
                                            </div>

                                        </div>
                                        <!-- <div class="modal-footer">

                                </div> -->
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    @endforeach





                    {{-- <div class="register-note">
                        <p>All prices will increase after June 30, 2025. Group discounts available for teams of 5 or more.
                        </p>
                        <p>Need help with registration? <a href="#">Contact us</a></p>
                    </div> --}}
                </div>
        </section>

        {{-- <section class="newsletter">
        <div class="container">
            <div class="newsletter-content">
                <div class="newsletter-text">
                    <h2>Stay Updated</h2>
                    <p>Subscribe to our newsletter for the latest updates about DevCon 2025, including speaker
                        announcements, schedule changes, and special offers.</p>
                </div>
                <form class="newsletter-form">
                    <div class="form-group">
                        <input type="email" placeholder="Your email address" required>
                        <button type="submit" class="btn btn-primary">Subscribe</button>
                    </div>
                    <div class="form-consent">
                        <label>
                            <input type="checkbox" required>
                            <span>I agree to receive emails about DevCon and related events</span>
                        </label>
                    </div>
                </form>
            </div>
        </div>
    </section> --}}
    @endsection
