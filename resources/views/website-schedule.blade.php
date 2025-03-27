<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $event->name }}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet">

    @include('partials.website-colors')

    @vite(['resources/css/website-styles.css'])

    <script>
        window.eventStartDate =
            '{{ $event->dates[0]->date }} {{ $event->event_sessions()->orderBy('start_time')->first()?->start_time ?? '00:00:00' }}';
    </script>
</head>

<body style="background-color: var(--color-neutral-50);">
    <div class="noise-overlay"></div>

    <header class="site-header">
        <div class="container">
            <a href="{{ route('organizer.events.website', $event->uuid) }}">
                <div class="logo">
                    <img src="{{ $event->logo_img }}" alt="{{ $event->name }}" />
                </div>
            </a>
            <nav class="main-nav">
                {{-- <button class="menu-toggle" aria-label="Toggle menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button> --}}
                <ul class="nav-links">
                    <li><a href="#about">About</a></li>
                    <li><a href="#speakers">Speakers</a></li>
                    {{-- <li><a href="#schedule">Schedule</a></li> --}}
                    {{-- <li><a href="#workshops">Workshops</a></li> --}}
                    <li><a href="#venue">Venue</a></li>
                    <li><a href="#sponsors">Sponsors</a></li>
                </ul>
            </nav>
            <div class="header-actions">
                {{-- <button class="theme-toggle" aria-label="Toggle dark mode">
                    <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                    <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                </button> --}}
                <a href="{{ route('organizer.events.website.schedule', $event->uuid) }}" class="btn btn-primary">Check Schedule</a>
                <a href="{{ route('attendee.register', $event) }}" class="btn btn-primary">Register Now</a>
            </div>
        </div>
    </header>

    <main>
        <section id="schedule" class="schedule">
            <div class="container">
                <div class="section-header">
                    <span class="section-tag">Event Schedule</span>
                    <h2 class="section-title">Schedule</h2>
                    {{-- <p class="section-subtitle">Plan your DevCon experience with our comprehensive schedule</p> --}}
                </div>
                <div class="schedule-tabs">
                    @foreach ($event->dates as $date)
                        <button class="tab-btn {{ $loop->first ? 'active' : '' }}" data-day="day{{ $loop->index + 1 }}">Day {{ $loop->index + 1 }} <span>{{ date('M j', strtotime($date->date)) }}</span></button>
                    @endforeach
                </div>
                <div class="schedule-content">
                    @foreach ($event->dates as $date)
                        <div class="schedule-day {{ $loop->first ? 'active' : '' }}" id="day{{ $loop->index + 1 }}">
                            <div class="schedule-timeline">
                                @foreach ($date->eventSessions as $session)
                                    <div class="timeline-item">
                                        <div class="timeline-time">
                                            <span>{{ Str::substr($session->start_time, 0, 5) }}</span>
                                            <span>-</span>
                                            <span>{{ Str::substr($session->end_time, 0, 5) }}</span>
                                        </div>
                                        <div class="timeline-content">
                                            <div class="session-card">
                                                <h3 class="session-title">{{ $session->name }}</h3>
                                                <div class="session-details">
                                                    <div class="session-speaker">
                                                            @isset($session->eventSpeaker)
                                                            <img src="{{ $session->eventSpeaker->avatar }}" alt="{{ $session->eventSpeaker->name }}"
                                                                class="speaker-avatar">
                                                            <span>{{ $session->eventSpeaker->name }}</span>
                                                            @endisset
                                                        </div>
                                                    <div class="session-location">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                            <circle cx="12" cy="10" r="3"></circle>
                                                        </svg>
                                                        <span>{{ $session->eventPlatform->name }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </section>

    @vite(['resources/js/website-script.js'])
</body>

</html>
