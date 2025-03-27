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

<body>
    <div class="noise-overlay"></div>

    <header class="site-header">
        <div class="container">
            <div class="logo">
                <img src="{{ $event->logo_img }}" alt="{{ $event->name }}" />
            </div>
            <nav class="main-nav">
                <ul class="nav-links">
                    <li><a href="#about">About</a></li>
                    <li><a href="#speakers">Speakers</a></li>
                    {{-- <li><a href="#schedule">Schedule</a></li> --}}
                    {{-- <li><a href="#workshops">Workshops</a></li> --}}
                    <li><a href="#venue">Venue</a></li>
                    <li><a href="#sponsors">Sponsors</a></li>
                    <li class="header-actions-mobile">
                        <a href="{{ route('organizer.events.website.schedule', $event->uuid) }}" class="btn btn-primary">Check Schedule</a>
                        <a href="{{ route('attendee.register', $event) }}" class="btn btn-primary">Register Now</a>
                    </li>
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
            <button class="menu-toggle" aria-label="Toggle menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </header>

    <main>
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
                    <p class="event-tagline">{{ Str::substr($event->description, 0, 120) }} {{ strlen($event->description) > 120 ? '...' : '' }}</p>
                    <div class="hero-cta">
                        <a href="{{ route('attendee.register', $event) }}" class="btn btn-primary btn-lg">Secure Your
                            Spot</a>
                        <a href="#schedule" class="btn btn-outline btn-lg">Explore Schedule</a>
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round">
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round">
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round">
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round">
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

        @if (strlen($event->description) > 120)
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
                                <img src="{{ $event->images[0]->image_url ?? '' }}" alt="{{ $event->name }}">
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

        <section id="speakers" class="speakers">
            <div class="container">
                <div class="section-header">
                    <span class="section-tag">Meet Our Speakers</span>
                    <h2 class="section-title">Speakers</h2>
                    {{-- <p class="section-subtitle">Gain insights from leaders at the forefront of technology</p> --}}
                </div>
                <div class="speakers-grid">
                    @foreach ($event->event_speakers as $speaker)    
                        <div class="speaker-card">
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
                                <p class="speaker-role">{{ $speaker->position }} {{ $speaker->company ? ', ' . $speaker->company: '' }}</p>
                                <p class="speaker-bio">{{ $speaker->bio }}</p>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </section>

        <section id="venue" class="venue">
            <div class="container">
                <div class="section-header">
                    <span class="section-tag">Event Location</span>
                    <h2 class="section-title">Austin Convention Center</h2>
                    <p class="section-subtitle">500 E Cesar Chavez St, Austin, TX 78701</p>
                </div>
                {{-- <div class="venue-content">
                    <div class="venue-map">
                        <img src="/placeholder.svg?height=500&width=800" alt="Map of Austin Convention Center">
                    </div>
                </div> --}}
            </div>
        </section>
        
        @if ($partnerCategories->count() > 0 && $event->partners->count() > 0)
            <section id="sponsors" class="sponsors">
                <div class="container">
                    <div class="section-header">
                        <span class="section-tag">Our Sponsors</span>
                    </div>
                    <div class="sponsors-tiers">
                        @foreach ($partnerCategories as $category)
                            @if ($category->partners->count() > 0)
                                <div class="sponsors-tier">
                                    <h3 class="tier-title">{{ $category->name }}</h3>
                                    <div class="sponsors-grid gold">
                                        @foreach ($category->partners as $partner) 
                                            <div class="sponsor-logo">
                                                <img src="{{ url("storage/{$partner->exhibitor_logo}") }}" alt="{{ $partner->name }}">
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

        <section id="register" class="register">
            <div class="container">
                <div class="section-header light">
                    <span class="section-tag">Register Now</span>
                    <h2 class="section-title">Tickets</h2>
                    {{-- <p class="section-subtitle">Early bird pricing available until June 30, 2025</p> --}}
                </div>
                <div class="pricing-tiers">
                    @foreach ($event->tickets as $ticket)
                        <div class="pricing-card">
                            <div class="pricing-header">
                                <h3>{{ $ticket->name }}</h3>
                                <div class="pricing">
                                    <span class="price">${{ $ticket->base_price }}</span>
                                    {{-- <span class="period">Early Bird</span> --}}
                                </div>
                            </div>
                            <ul class="pricing-features">
                                @foreach ($ticket->sessions as $session)
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                        <span>{{ $session->name }}</span>
                                    </li>
                                @endforeach
                            </ul>
                            <div style="margin-bottom: 24px;">Addons</div>
                            <ul class="pricing-features">
                                @foreach ($ticket->features as $feature)
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                        <div style="display: flex; justify-content: space-between; align-items: center; flex-grow: 1;">
                                            <span>{!! $feature->name !!}</span>
                                            <span style="">${{ $feature->price }}</span>
                                        </div>
                                    </li>
                                @endforeach
                            </ul>
                            <a href="{{ route('attendee.register', $event) }}" class="btn btn-primary btn-block">Register Now</a>
                        </div>
                    @endforeach
                </div>
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
    </main>

    {{-- <footer class="site-footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <div class="logo">
                        <span>Dev</span>Con
                    </div>
                    <p>The ultimate developer conference bringing together the brightest minds in technology.</p>
                    <div class="social-links">
                        <a href="#" aria-label="Twitter">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path
                                    d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z">
                                </path>
                            </svg>
                        </a>
                        <a href="#" aria-label="Facebook">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                            </svg>
                        </a>
                        <a href="#" aria-label="Instagram">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5">
                                </rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
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
                        <a href="#" aria-label="GitHub">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path
                                    d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
                                </path>
                            </svg>
                        </a>
                    </div>
                </div>
                <div class="footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#about">About</a></li>
                        <li><a href="#speakers">Speakers</a></li>
                        <li><a href="#schedule">Schedule</a></li>
                        <li><a href="#workshops">Workshops</a></li>
                        <li><a href="#venue">Venue</a></li>
                        <li><a href="#sponsors">Sponsors</a></li>
                        <li><a href="#register">Register</a></li>
                    </ul>
                </div>
                <div class="footer-links">
                    <h3>Resources</h3>
                    <ul>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Code of Conduct</a></li>
                        <li><a href="#">Accessibility</a></li>
                        <li><a href="#">Travel Information</a></li>
                        <li><a href="#">Hotels</a></li>
                        <li><a href="#">Past Events</a></li>
                    </ul>
                </div>
                <div class="footer-contact">
                    <h3>Contact Us</h3>
                    <p>Have questions about DevCon 2025?</p>
                    <a href="mailto:info@devcon2025.com" class="contact-email">info@devcon2025.com</a>
                    <a href="tel:+15551234567" class="contact-phone">+1 (555) 123-4567</a>
                    <p class="contact-address">
                        500 E Cesar Chavez St<br>
                        Austin, TX 78701
                    </p>
                </div>
            </div>
            <div class="footer-bottom">
                <div class="copyright">
                    <p>&copy; 2025 DevCon. All rights reserved.</p>
                </div>
                <div class="footer-legal">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Cookie Policy</a>
                </div>
            </div>
        </div>
    </footer> --}}

    @vite(['resources/js/website-script.js'])
</body>

</html>
