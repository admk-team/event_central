@extends('event-website.layouts.layout')

@section('style')
    {{-- vendor --}}
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    {{-- DESIGN 2 CSS --}}
    @vite(['resources/css/design2/index_styles.css'])
@endsection

{{-- ============ EDGE RAIL (desktop) + SHEET (mobile) ============ --}}
@section('header')
     @include('event-website.themes.design2.header')
@endsection

@section('content')
    <main>
        {{-- ===== HERO ===== --}}
        <section class="hero">


            @php
                $hero =
                    $event->images[1]->image_url ??
                    (null ??
                        ($event->cover_image ??
                            (null ?? ($event->banner_image ?? (null ?? ($event->logo_img ?? null))))));
            @endphp
            <div class="hero__media">
                @if ($hero)
                    <img src="{{ $hero }}" alt="{{ $event->name }}" loading="eager" decoding="async"
                        fetchpriority="high">
                @else
                    <div class="hero__placeholder"></div>
                @endif
            </div>
            <div class="marquee">
                <div class="marquee__track chip--muted">
                    <span><i class="bi bi-calendar-week"></i> {{ $event->dates->count() }}
                        Day{{ $event->dates->count() > 1 ? 's' : '' }}</span>
                    <span><i class="bi bi-easel3"></i> {{ $event->event_sessions->count() }}
                        Session{{ $event->event_sessions->count() > 1 ? 's' : '' }}</span>
                    <span><i class="bi bi-mic"></i> {{ $event->event_speakers->count() }}
                        Speaker{{ $event->event_speakers->count() > 1 ? 's' : '' }}</span>
                    <span><i class="bi bi-door-open"></i> {{ $exhibitors->count() }}
                        Exhibitor{{ $exhibitors->count() > 1 ? 's' : '' }}</span>
                    <span><i class="bi bi-star"></i> {{ $event->partners->count() }}
                        Sponsor{{ $event->partners->count() > 1 ? 's' : '' }}</span>
                    <span><i class="bi bi-calendar-week"></i> {{ $event->dates->count() }}
                        Day{{ $event->dates->count() > 1 ? 's' : '' }}</span>
                    <span><i class="bi bi-easel3"></i> {{ $event->event_sessions->count() }}
                        Session{{ $event->event_sessions->count() > 1 ? 's' : '' }}</span>
                    <span><i class="bi bi-mic"></i> {{ $event->event_speakers->count() }}
                        Speaker{{ $event->event_speakers->count() > 1 ? 's' : '' }}</span>
                    <span><i class="bi bi-door-open"></i> {{ $exhibitors->count() }}
                        Exhibitor{{ $exhibitors->count() > 1 ? 's' : '' }}</span>
                    <span><i class="bi bi-star"></i> {{ $event->partners->count() }}
                        Sponsor{{ $event->partners->count() > 1 ? 's' : '' }}</span>
                </div>
            </div>

            <div class="container hero__content">
                @php
                    $startDate = \Carbon\Carbon::parse($event->dates()->orderBy('date', 'asc')->first()->date);
                    $endDate = \Carbon\Carbon::parse($event->dates()->orderBy('date', 'desc')->first()->date);
                @endphp

                <div class="chips">
                    <span class="chip chip--muted">
                        @if ($startDate->isSameDay($endDate))
                            {{ $startDate->format('F j, Y') }}
                        @else
                            {{ $startDate->format('F j') }} – {{ $endDate->format('F j, Y') }}
                        @endif
                    </span>
                    <span class="chip chip--muted"><i class="bi bi-geo-alt"></i> {{ $event->location_base }}</span>
                </div>

                <h1 class="title chip--muted">
                    <span class="eyebrow">{{ $event->tagline ?? 'Live. In person.' }}</span>
                    {{ $event->name }}
                </h1>

                <div class="cta">
                    <a href="{{ route('attendee.register', $event) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}"
                        class="btn btn-primary btn-lg">Get Tickets</a>
                    <a href="{{ route('organizer.events.website.schedule', $event->uuid) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}"
                        class="btn btn-ghost btn-lg">View Schedule</a>
                </div>

                <div class="countdown chip--muted" id="countdown">
                    <div class="unit"><span id="countdown-days">00</span><small>Days</small></div>
                    <div class="unit"><span id="countdown-hours">00</span><small>Hours</small></div>
                    <div class="unit"><span id="countdown-minutes">00</span><small>Minutes</small></div>
                    <div class="unit"><span id="countdown-seconds">00</span><small>Seconds</small></div>
                </div>
            </div>
        </section>

        {{-- ===== ABOUT ===== --}}
        @isset($event->description)
            <section id="about" class="about">
                <div class="container">
                    <div class="row g-4 align-items-stretch">
                        <div class="col-xl-6">
                            <div class="card glass h-100">
                                <h2 class="card__h">About {{ $event->name }}</h2>
                                <div class="prose">{!! $event->description !!}</div>
                            </div>
                        </div>
                        <div class="col-xl-6">
                            <figure class="photo">
                                <img src="{{ $event->images[0]->image_url ?? ($event->images[1]->image_url ?? '') }}"
                                    alt="{{ $event->name }}">
                                <figcaption>{{ $event->location_base }}</figcaption>
                            </figure>
                        </div>
                    </div>
                </div>
            </section>
        @endisset

        {{-- ===== VENUE ===== --}}
        <section id="venue" class="venue">
            <div class="container">
                <div class="venue__panel">
                    <div class="venue__icon"><i class="bi bi-geo"></i></div>
                    <div class="venue__body">
                        <h3>Venue</h3>
                        <p class="mb-0">{{ $event->location_base }}</p>
                    </div>
                    <a href="#register" class="btn btn-primary">Tickets</a>
                </div>
            </div>
        </section>

        {{-- ===== TICKETS ===== --}}
        <section id="register" class="tickets">
            <div class="container">
                <div class="section-head">
                    <span class="eyebrow">Register Now</span>
                    <h2>Tickets</h2>
                </div>

                <div class="row g-4">
                    @foreach ($event->tickets ?? [] as $ticket)
                        @if ($ticket->show_on_attendee_side)
                            <div class="col-xxl-4 col-md-6">
                                <div class="price">
                                    <div class="price__head">
                                        <h3>{{ $ticket->name }}</h3>
                                        <div class="price__amt">${{ $ticket->base_price }}</div>
                                    </div>

                                    <ul class="price__list">
                                        @foreach ($ticket->sessions->take(5) ?? [] as $session)
                                            <li type="button" data-bs-toggle="modal"
                                                data-bs-target="#sessionModal{{ $session->id }}">
                                                <i class="bi bi-check2-circle"></i> {{ $session->name }}
                                            </li>
                                        @endforeach

                                        @php
                                            $totalSessions = $ticket->sessions->count() ?? 0;
                                            $remaining = $totalSessions > 5 ? $totalSessions - 5 : 0;
                                        @endphp

                                        @if ($remaining > 0)
                                            <li class="more">
                                                <a
                                                    href="{{ route('attendee.login', $event) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}">+{{ $remaining }}
                                                    more</a>
                                            </li>
                                        @endif
                                    </ul>

                                    @if (!empty($ticket->description))
                                        <div class="price__desc">
                                            <small class="">{{ $ticket->description }}</small>
                                        </div>
                                    @endif

                                    <a href="{{ route('attendee.register', $event) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}"
                                        class="btn btn-primary w-100">
                                        Register Now
                                    </a>
                                </div>
                            </div>
                        @endif
                    @endforeach
                </div>

                {{-- Session Modals --}}
                @foreach ($event->tickets ?? [] as $ticket)
                    @foreach ($ticket->sessions ?? [] as $session)
                        <div class="modal fade text-dark" id="sessionModal{{ $session->id }}" tabindex="-1"
                            aria-labelledby="sessionModalLabel{{ $session->id }}" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-body p-4">
                                        <h5 class="modal-title text-center mb-3"
                                            id="sessionModalLabel{{ $session->id }}">{{ $session->name }}</h5>
                                        <div class="text-center small  mb-2">
                                            {{ $session->type }} @if ($session->capacity)
                                                • Capacity: {{ $session->capacity }}
                                            @endif
                                        </div>
                                        <p class="text-center mb-3">
                                            <i class="bi bi-clock"></i>
                                            {{ \Illuminate\Support\Carbon::createFromFormat('H:i:s', $session->start_time)->format('h:i A') }}
                                            –
                                            {{ \Illuminate\Support\Carbon::createFromFormat('H:i:s', $session->end_time)->format('h:i A') }}
                                        </p>
                                        @if ($session->description)
                                            <p class="mb-0 text-center">{{ $session->description }}</p>
                                        @endif
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endforeach
                @endforeach
            </div>
        </section>
    </main>
@endsection

