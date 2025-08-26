@extends('event-website.layouts.layout')
@section('style')
    @vite(['resources/css/design4/index_styles.css'])
@endsection
@section('header')
    @include('event-website.themes.design4.header')
@endsection

@section('content')
    {{-- <section class="hero-fullscreen">
        <!-- Floating Dates Panel -->
        @php
            $startDate = \Carbon\Carbon::parse($event->dates()->orderBy('date', 'asc')->first()->date);
            $endDate = \Carbon\Carbon::parse($event->dates()->orderBy('date', 'desc')->first()->date);
        @endphp
        <div class="floating-dates">
            <span>{{ $startDate->format('F j, Y') }}</span>
            @if (!$startDate->isSameDay($endDate))
                <span class="arrow">→</span>
                <span>{{ $endDate->format('F j, Y') }}</span>
            @endif
        </div>

        <div class="hero-content">
            <div class="hero-info">
                <h1 class="event-title">{{ $event->name }}</h1>
                @isset($event->tagline)
                    <p class="event-tagline">{{ $event->tagline }}</p>
                @endisset
                <div class="cta-buttons">
                    <a href="{{ route('attendee.register', $event) }}" class="btn btn-primary">Register</a>
                    <a href="{{ route('organizer.events.website.schedule', $event->uuid) }}"
                        class="btn btn-outline">Schedule</a>
                </div>
            </div>

            <div class="hero-image-wrapper">
                <img src="{{ $event->images[0]->image_url ?? '' }}" alt="{{ $event->name }}" class="hero-image">
            </div>
        </div>

        <div class="countdown-radial">
            @foreach (['Days' => 'days', 'Hours' => 'hours', 'Minutes' => 'minutes', 'Seconds' => 'seconds'] as $label => $id)
                <div class="radial-item">
                    <svg viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="16"></circle>
                    </svg>
                    <span id="countdown-{{ $id }}">00</span>
                    <span>{{ $label }}</span>
                </div>
            @endforeach
        </div>

        <!-- Stats Carousel -->
        <div class="stats-carousel">
            @php
                $stats = [
                    ['icon' => 'calendar', 'number' => $event->dates->count(), 'label' => 'Days'],
                    ['icon' => 'document', 'number' => $event->event_sessions->count(), 'label' => 'Sessions'],
                    ['icon' => 'microphone', 'number' => $event->event_speakers->count(), 'label' => 'Speakers'],
                    ['icon' => 'star', 'number' => $event->partners->count(), 'label' => 'Sponsors'],
                    ['icon' => 'exhibitor', 'number' => $exhibitors->count(), 'label' => 'Exhibitors'],
                ];
            @endphp
            @foreach ($stats as $stat)
                <div class="stat-card">
                    <i class="icon-{{ $stat['icon'] }}"></i>
                    <div class="number">{{ $stat['number'] }}</div>
                    <div class="label">{{ $stat['label'] }}</div>
                </div>
            @endforeach
        </div>
    </section> --}}
<section class="hero-diagonal">
    <!-- Background gradient overlay -->
    <div class="hero-bg"></div>

    <div class="container hero-diagonal-container">
        <!-- Left Text Overlay -->
        <div class="hero-left">
            {{-- Event Dates --}}
            @php
                $startDate = \Carbon\Carbon::parse($event->dates()->orderBy('date','asc')->first()->date);
                $endDate = \Carbon\Carbon::parse($event->dates()->orderBy('date','desc')->first()->date);
            @endphp
            <div class="event-dates">
                @if($startDate->isSameDay($endDate))
                    {{ $startDate->format('F j, Y') }}
                @else
                    {{ $startDate->format('F j, Y') }} → {{ $endDate->format('F j, Y') }}
                @endif
            </div>

            {{-- Title --}}
            <h1 class="hero-title">{{ $event->name }}</h1>

            {{-- Tagline --}}
            @isset($event->tagline)
                <p class="hero-tagline">{{ $event->tagline }}</p>
            @endisset

            {{-- Countdown --}}
            <div class="hero-countdown">
                @foreach(['Days'=>'days','Hours'=>'hours','Minutes'=>'minutes','Seconds'=>'seconds'] as $label=>$id)
                    <div class="countdown-block">
                        <span id="countdown-{{ $id }}" class="number">00</span>
                        <span class="label">{{ $label }}</span>
                    </div>
                @endforeach
            </div>

            {{-- CTA Buttons --}}
            <div class="hero-cta">
                <a href="{{ route('attendee.register', $event) }}" class="btn btn-primary">Register</a>
                <a href="{{ route('organizer.events.website.schedule', $event->uuid) }}" class="btn btn-outline">Schedule</a>
            </div>
        </div>

        <!-- Right Tilted Event Card -->
        <div class="hero-right">
            <div class="hero-card-tilt">
                <img src="{{ $event->images[0]->image_url ?? '' }}" alt="{{ $event->name }}">
            </div>
        </div>
    </div>

    <!-- Stats Floating Diagonal -->
    <div class="hero-stats-diagonal">
        @php
            $stats = [
                ['icon'=>'calendar','number'=>$event->dates->count(),'label'=>'Days'],
                ['icon'=>'document','number'=>$event->event_sessions->count(),'label'=>'Sessions'],
                ['icon'=>'microphone','number'=>$event->event_speakers->count(),'label'=>'Speakers'],
            ];
        @endphp
        @foreach($stats as $stat)
            <div class="stat-card-diagonal">
                <i class="icon-{{ $stat['icon'] }}"></i>
                <div class="number">{{ $stat['number'] }}</div>
                <div class="label">{{ $stat['label'] }}</div>
            </div>
        @endforeach
    </div>
</section>

    @isset($event->description)
        <section id="about" class="about-modern">
            <div class="container">
                <!-- Section Header -->
                <div class="section-header">
                    <span class="section-tag">About the Event</span>
                    <h2 class="section-title">{{ $event->name }}</h2>
                    {{-- Optional subtitle --}}
                    {{-- <p class="section-subtitle">Join us for three days of learning, networking, and inspiration</p> --}}
                </div>

                <!-- Content Split -->
                <div class="about-content">
                    <!-- Left: Text -->
                    <div class="about-text-card">
                        {!! $event->description !!}
                    </div>

                    <!-- Right: Video/Image -->
                    <div class="about-media-card">
                        <div class="media-wrapper">
                            <img src="{{ $event->images[1]->image_url ?? ($event->images[0]->image_url ?? '') }}"
                                alt="{{ $event->name }}">
                            <div class="media-overlay">
                                <button class="play-button" aria-label="Play video">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"
                                        fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polygon points="10 8 16 12 10 16 10 8"></polygon>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    @endisset


    <section id="venue" class="venue-modern">
        <div class="container">
            <div class="section-header">
                <span class="section-tag">Event Location</span>
                <h2 class="section-title">{{ $event->location_base }}</h2>
                {{-- Optional subtitle --}}
                {{-- <p class="section-subtitle">500 E Cesar Chavez St, Austin, TX 78701</p> --}}
            </div>

            <div class="venue-content">
                <!-- Left: Venue Info Card -->
                <div class="venue-info-card">
                    <div class="venue-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
                            fill="none" stroke="#6a82fb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                    </div>
                    <p class="venue-address">{{ $event->location_full ?? $event->location_base }}</p>
                </div>

                <!-- Right: Map / Image -->
                <div class="venue-map-card">
                    @if (isset($event->location_map_url))
                        <iframe src="{{ $event->location_map_url }}" width="100%" height="350"
                            style="border:0; border-radius:15px;" allowfullscreen="" loading="lazy"></iframe>
                    @else
                        <img src="{{ $event->images[2]->image_url ?? ($event->images[0]->image_url ?? '') }}"
                            alt="{{ $event->location_base }}">
                    @endif
                </div>
            </div>
        </div>
    </section>


    <section id="register" class="register-modern">
        <div class="container">
            <!-- Section Header -->
            <div class="section-header light">
                <span class="section-tag">Register Now</span>
                <h2 class="section-title">Tickets</h2>
                {{-- <p class="section-subtitle">Early bird pricing available until June 30, 2025</p> --}}
            </div>

            <!-- Tickets Grid -->
            <div class="tickets-grid">
                @foreach ($event->tickets ?? [] as $ticket)
                    @if ($ticket->show_on_attendee_side)
                        <div class="ticket-card">
                            <div class="ticket-header">
                                <h3>{{ $ticket->name }}</h3>
                                <div class="ticket-price">${{ $ticket->base_price }}</div>
                            </div>

                            <ul class="ticket-features">
                                @foreach ($ticket->sessions->take(5) ?? [] as $session)
                                    <li type="button" data-bs-toggle="modal"
                                        data-bs-target="#sessionModal{{ $session->id }}">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
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
                                    <a
                                        href="{{ route('attendee.login', $event) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}">
                                        <li class="more-sessions">{{ $remaining }}+ More</li>
                                    </a>
                                @endif
                            </ul>

                            <div class="ticket-description">
                                <h6>Description:</h6>
                                <span>{{ $ticket->description }}</span>
                            </div>

                            <a href="{{ route('attendee.register', $event) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}"
                                class="btn btn-primary btn-block register-btn">Register Now</a>
                        </div>
                    @endif
                @endforeach
            </div>

            <!-- Session Modals -->
            @foreach ($event->tickets ?? [] as $ticket)
                @foreach ($ticket->sessions ?? [] as $session)
                    <div class="modal fade session-modal" id="sessionModal{{ $session->id }}" tabindex="-1"
                        aria-labelledby="sessionModalLabel{{ $session->id }}" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered modal-lg">
                            <div class="modal-content shadow-lg rounded-4 border-0 overflow-hidden">
                                <div class="modal-header bg-gradient-primary text-white">
                                    <h5 class="modal-title" id="sessionModalLabel{{ $session->id }}">
                                        {{ $session->name }}
                                    </h5>
                                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body p-4">
                                    <div class="session-info d-flex flex-column flex-md-row gap-4">
                                        <!-- Icon / Info Block -->
                                        <div class="session-meta text-center text-md-start">
                                            <div class="session-type mb-2">
                                                <i class="bi bi-calendar-event-fill me-2"></i>
                                                <span>{{ $session->type }}</span>
                                            </div>
                                            <div class="session-capacity mb-2">
                                                <i class="bi bi-people-fill me-2"></i>
                                                <span>{{ $session->capacity }} Seats</span>
                                            </div>
                                            <div class="session-time mb-2">
                                                <i class="bi bi-clock-fill me-2"></i>
                                                <span>{{ $session->start_time }} - {{ $session->end_time }}</span>
                                            </div>
                                        </div>

                                        <!-- Description Block -->
                                        <div class="session-description flex-grow-1">
                                            <p>{{ $session->description }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer justify-content-center border-0">
                                    <button type="button" class="btn btn-secondary rounded-pill px-4"
                                        data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            @endforeach
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
