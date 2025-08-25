@extends('event-website.layouts.layout')

@section('style')
    <!-- Dependency Styles -->
    <link id="style-bundle" rel="stylesheet" href="{{ asset('design3/bundle.css') }}" type="text/css" />

    <link
        href="https://fonts.googleapis.com/css2?family=Exo:wght@400;500;600;700;800&family=Open+Sans:wght@400;500;600;700;800&display=swap"
        rel="stylesheet" />


    @vite(['resources/css/design3/index.css'])
    @vite(['resources/css/design3/variables.css'])
    @vite(['resources/css/design3/tickets_style.css'])
@endsection

<div id="main_content" class="main-content">

    @section('header')
        @include('event-website.themes.design3.header')
    @endsection

    @section('content')
        @php
            $startDate = \Carbon\Carbon::parse($event->dates()->orderBy('date', 'asc')->first()->date);
            $endDate = \Carbon\Carbon::parse($event->dates()->orderBy('date', 'desc')->first()->date);
        @endphp
        <section class="banner"
            style="
                    @if (!empty($event->images[0]->image_url)) background-image: url('{{ $event->images[0]->image_url }}');
                    @else
                        background-color: var(--color-primary); @endif
                ">
            <div class="container">

                <div class="banner__content">
                    <h1 class="banner__title">
                        <span class="banner__title--main">{{ $event->name }}</span>
                        <span class="banner__title--sub">{{ date('Y', strtotime($event->dates[0]->date)) }}</span>
                        {{ $event->tagline }}
                    </h1>

                    <p class="banner__event-date">
                        <span class="event-date-wrapper">
                            <span class="event-date">{{ $startDate->format('F j, Y') }}</span>
                            @if (!$startDate->isSameDay($endDate))
                                <svg class="event-arrow" xmlns="http://www.w3.org/2000/svg" width="30" height="40"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="m18.707 12.707-3 3a1 1 0 0 1-1.414-1.414L15.586 13H6a1 1 0 0 1 0-2h9.586l-1.293-1.293a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414z"
                                        style="fill:#ffffff" data-name="Right" />
                                </svg>
                                <span class="event-date">{{ $endDate->format('F j, Y') }}</span>
                            @endif
                        </span>
                        <span class="event-location">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <span>{{ $event->location_base }}</span>
                        </span>
                    </p>
                    <!-- /.banner__event-date -->

                    <div class="row justify-content-center mt-100">
                        <div class="col-md-10">
                            <div class="cbx-countdown-main">
                                <div class="cbx-countdown-container">
                                    <div class="cbx-countdown-countdown-container" id="countdown">

                                        <!-- days -->
                                        <div
                                            class="cbx-countdown-clock-item cbx-countdown-clock-days cbx-countdown-countdown-time-value">
                                            <div class="cbx-countdown-wrap">
                                                <div class="cbx-countdown-inner">
                                                    <div id="cbx-countdown-canvas_days" class="cbx-countdown-clock-canvas">
                                                    </div>
                                                    <div class="cbx-countdown-text">
                                                        <p class="cbx-countdown-val" id="countdown-days">0</p>
                                                        <p class="cbx-countdown-type-days cbx-countdown-type-time">Days
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- hours -->

                                        <div
                                            class="cbx-countdown-clock-item cbx-countdown-clock-hours cbx-countdown-countdown-time-value">
                                            <div class="cbx-countdown-wrap">
                                                <div class="cbx-countdown-inner">
                                                    <div id="cbx-countdown-canvas_hours" class="cbx-countdown-clock-canvas">
                                                    </div>
                                                    <div class="cbx-countdown-text">
                                                        <p class="cbx-countdown-val" id="countdown-hours">0</p>
                                                        <p class="cbx-countdown-type-hours cbx-countdown-type-time">
                                                            Hours</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- minutes -->
                                        <div
                                            class="cbx-countdown-clock-item cbx-countdown-clock-minutes cbx-countdown-countdown-time-value">
                                            <div class="cbx-countdown-wrap">
                                                <div class="cbx-countdown-inner">
                                                    <div id="cbx-countdown-canvas_minutes"
                                                        class="cbx-countdown-clock-canvas">
                                                    </div>
                                                    <div class="cbx-countdown-text">
                                                        <p class="cbx-countdown-val" id="countdown-minutes">0</p>
                                                        <p class="cbx-countdown-type-minutes cbx-countdown-type-time">
                                                            Minutes</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- seconds -->
                                        <div
                                            class="cbx-countdown-clock-item cbx-countdown-clock-seconds cbx-countdown-countdown-time-value">
                                            <div class="cbx-countdown-wrap">
                                                <div class="cbx-countdown-inner">
                                                    <div id="cbx-countdown-canvas_seconds"
                                                        class="cbx-countdown-clock-canvas">
                                                    </div>
                                                    <div class="cbx-countdown-text">
                                                        <p style="font-weight: 800;color: #fff;font-size: 50px;font-size: 5rem;line-height: 1;"
                                                            id="countdown-seconds">0</p>
                                                        <p class="cbx-countdown-type-seconds cbx-countdown-type-time">
                                                            Seconds </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /.banner__content -->
            </div>
        </section>

        <section id="hero-stats">
            <div class="stats-container">
                <div class="stat">
                    <div class="stat-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                    </div>
                    <div class="stat-number">{{ $event->dates->count() }}</div>
                    <div class="stat-label">Day{{ $event->dates->count() > 1 ? 's' : '' }}</div>
                </div>

                <div class="stat">
                    <div class="stat-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="8" y1="13" x2="9" y2="13"></line>
                            <line x1="8" y1="17" x2="9" y2="17"></line>
                            <line x1="11" y1="13" x2="16" y2="13"></line>
                            <line x1="11" y1="17" x2="16" y2="17"></line>
                        </svg>
                    </div>
                    <div class="stat-number">{{ $event->event_sessions->count() }}</div>
                    <div class="stat-label">Session{{ $event->event_sessions->count() > 1 ? 's' : '' }}</div>
                </div>

                <div class="stat">
                    <div class="stat-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path>
                            <rect x="17" y="2" width="4" height="6" rx="1"></rect>
                            <path d="M19 8v3"></path>
                            <path d="M16 11h6"></path>
                        </svg>
                    </div>
                    <div class="stat-number">{{ $event->event_speakers->count() }}</div>
                    <div class="stat-label">Speaker{{ $event->event_speakers->count() > 1 ? 's' : '' }}</div>
                </div>

                <div class="stat">
                    <div class="stat-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                        </svg>
                    </div>
                    <div class="stat-number">{{ $event->partners->count() }}</div>
                    <div class="stat-label">Sponsor{{ $event->partners->count() > 1 ? 's' : '' }}</div>
                </div>

                <div class="stat">
                    <div class="stat-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                            <path d="M3 9l1-5h16l1 5"></path>
                            <path d="M5 22V12H19V22"></path>
                            <path d="M9 22V16H15V22"></path>
                        </svg>
                    </div>
                    <div class="stat-number">{{ $exhibitors->count() }}</div>
                    <div class="stat-label">Exhibitor{{ $exhibitors->count() > 1 ? 's' : '' }}</div>
                </div>
            </div>
        </section>


        <section id="about" class="about-hero">

            @isset($event->description)
                <div class="container">
                    <div class="about-content">
                        <div class="about-image">
                            <div class="image-wrapper">
                                <img src="{{ $event->images[1]->image_url ?? ($event->images[0]->image_url ?? '') }}"
                                    alt="{{ $event->name }}">
                            </div>
                        </div>
                        <div class="about-text">
                            <h2 class="section-tag">About the Event</h2>
                            <span class="section-title">{{ $event->name }}</span>
                            <p>{!! $event->description !!}</p>
                        </div>
                    </div>
                </div>
            @endisset
        </section>

        <section id="venue" class="venue">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-tag">Event Location</h2>
                    <span class="section-title">{{ $event->location_base }}</span>
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
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                            <span style="font-size: 13px">{{ $session->name }}</span>
                                        </li>
                                    @endforeach

                                    @php
                                        $totalSessions = $ticket->sessions->count() ?? 0;
                                        $remaining = $totalSessions > 5 ? $totalSessions - 5 : 0;
                                    @endphp

                                    @if ($remaining > 0)
                                        <a
                                            href="{{ route('attendee.login', $event) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}">
                                            <li class="" style="color: var(--color-primary)">
                                                {{ $remaining }}+ More
                                            </li>
                                        </a>
                                    @endif
                                </ul>
                                <div class="description-header">
                                    <h6>Description:</h6>
                                    <div class="description">
                                        <span>{{ $ticket->description }}</span>
                                    </div>
                                </div>

                                <a href="{{ route('attendee.register', $event) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}"
                                    class="btn btn-primary btn-block mt-auto">Register Now</a>
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
                                            <h5 class="modal-title text-center"
                                                id="sessionModalLabel{{ $session->id }}">
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
                                                    </svg> {{ $session->start_time }} - {{ $session->end_time }}
                                                </p>
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
                </div>
        </section>

    </div>
    <!-- /#site -->
@endsection
</div>
@section('script')
    <!-- Dependency Scripts -->
    <script id="script-bundle" src="{{ asset('design3/bundle.js') }}"></script>
    <script id="color-switcher" src="{{ asset('design3/switcher.js') }}"></script>
    <!-- Site Scripts -->
    <script src="{{ asset('design3/app.js') }}"></script>
@endsection
