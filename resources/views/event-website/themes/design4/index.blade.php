@extends('event-website.layouts.layout')

@section('style')
    @vite(['resources/css/design4/index_styles.css'])
@endsection

@section('header')
    @include('event-website.themes.design4.header')
@endsection

@section('content')

<section class="hero">
    <!-- Background -->
    <div class="hero-bg">
        <img src="/images/hero-bg-blur.png" alt="Background">
    </div>

    <div class="hero-container">
        <!-- Left: Event Info -->
        <div class="hero-left">
            @php
                $startDate = \Carbon\Carbon::parse($event->dates()->orderBy('date','asc')->first()->date);
                $endDate = \Carbon\Carbon::parse($event->dates()->orderBy('date','desc')->first()->date);
            @endphp
            <div class="event-dates">
                @if ($startDate->isSameDay($endDate))
                    {{ $startDate->format('F j, Y') }}
                @else
                    {{ $startDate->format('F j, Y') }} → {{ $endDate->format('F j, Y') }}
                @endif
            </div>
            <h1 class="hero-title">{{ $event->name }}</h1>
            @isset($event->tagline)
                <p class="hero-tagline">{{ $event->tagline }}</p>
            @endisset
            <div class="hero-cta">
                <a href="{{ route('attendee.register', $event) }}" class="btn btn-primary">Register</a>
                <a href="{{ route('organizer.events.website.schedule', $event->uuid) }}" class="btn btn-outline">Schedule</a>
            </div>

            <!-- Countdown Timer -->
            <div class="hero-countdown" data-start="{{ $startDate }}">
                <div class="countdown-block"><span id="countdown-days">00</span><span class="label">Days</span></div>
                <div class="countdown-block"><span id="countdown-hours">00</span><span class="label">Hours</span></div>
                <div class="countdown-block"><span id="countdown-minutes">00</span><span class="label">Minutes</span></div>
                <div class="countdown-block"><span id="countdown-seconds">00</span><span class="label">Seconds</span></div>
            </div>
        </div>

        <!-- Right: Hero Image -->
        <div class="hero-right">
            <div class="hero-card">
                <img src="{{ $event->images[0]->image_url ?? '/images/placeholder.png' }}" alt="{{ $event->name }}">
            </div>
        </div>
    </div>

    <!-- Stats Cards (Diagonal / Original Structure) -->
    <div class="hero-stats-diagonal">
        @php
            $stats = [
                ['icon'=>'calendar','number'=>$event->dates->count(),'label'=>'Days'],
                ['icon'=>'document','number'=>$event->event_sessions->count(),'label'=>'Sessions'],
                ['icon'=>'microphone','number'=>$event->event_speakers->count(),'label'=>'Speakers'],
            ];
        @endphp
        @foreach($stats as $stat)
        <div class="stat-card-diagonal" data-aos="fade-up">
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
        <div class="section-header" data-aos="fade-up">
            <span class="section-tag">About the Event</span>
            <h2 class="section-title">{{ $event->name }}</h2>
        </div>
        <div class="about-content">
            <div class="about-text-card" data-aos="fade-right">
                {!! $event->description !!}
            </div>
            <div class="about-media-card" data-aos="fade-left">
                <div class="media-wrapper">
                    <img src="{{ $event->images[1]->image_url ?? ($event->images[0]->image_url ?? '') }}" alt="{{ $event->name }}">
                    <div class="media-overlay">
                        <button class="play-button" aria-label="Play video">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
        <div class="section-header" data-aos="fade-up">
            <span class="section-tag">Event Location</span>
            <h2 class="section-title">{{ $event->location_base }}</h2>
        </div>
        <div class="venue-content">
            <div class="venue-info-card" data-aos="fade-right">
                <div class="venue-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6a82fb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                </div>
                <p class="venue-address">{{ $event->location_full ?? $event->location_base }}</p>
            </div>
            <div class="venue-map-card" data-aos="fade-left">
                @if(isset($event->location_map_url))
                    <iframe src="{{ $event->location_map_url }}" width="100%" height="350" style="border:0; border-radius:15px;" allowfullscreen="" loading="lazy"></iframe>
                @else
                    <img src="{{ $event->images[2]->image_url ?? ($event->images[0]->image_url ?? '') }}" alt="{{ $event->location_base }}">
                @endif
            </div>
        </div>
    </div>
</section>

<section id="register" class="register-modern">
    <div class="container">
        <div class="section-header light" data-aos="fade-up">
            <span class="section-tag">Register Now</span>
            <h2 class="section-title">Tickets</h2>
        </div>
        <div class="tickets-grid">
            @foreach ($event->tickets ?? [] as $index => $ticket)
                @if ($ticket->show_on_attendee_side)
                <div class="ticket-card" data-aos="fade-up" data-aos-delay="{{ $index * 100 }}">
                    <div class="ticket-header">
                        <h3>{{ $ticket->name }}</h3>
                        <div class="ticket-price">${{ $ticket->base_price }}</div>
                    </div>
                    <ul class="ticket-features">
                        @foreach($ticket->sessions->take(5) ?? [] as $session)
                            <li data-bs-toggle="modal" data-bs-target="#sessionModal{{ $session->id }}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span>{{ $session->name }}</span>
                            </li>
                        @endforeach
                        @php
                            $totalSessions = $ticket->sessions->count() ?? 0;
                            $remaining = $totalSessions > 5 ? $totalSessions - 5 : 0;
                        @endphp
                        @if($remaining>0)
                            <a href="{{ route('attendee.login', $event) }}">
                                <li class="more-sessions">{{ $remaining }}+ More</li>
                            </a>
                        @endif
                    </ul>
                    <div class="ticket-description">
                        <h6>Description:</h6>
                        <span>{{ $ticket->description }}</span>
                    </div>
                    <a href="{{ route('attendee.register', $event) }}" class="btn btn-primary btn-block register-btn">Register Now</a>
                </div>
                @endif
            @endforeach
        </div>
    </div>
</section>
@endsection
