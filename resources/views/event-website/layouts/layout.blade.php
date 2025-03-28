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

    @include('event-website.partials.website-colors')

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
            <a href="{{ route('organizer.events.website', $event->uuid) }}">
                <div class="logo">
                    <img src="{{ $event->logo_img }}" alt="{{ $event->name }}" />
                </div>
            </a>
            <nav class="main-nav">
                <ul class="nav-links">
                    <li><a href="#about">About</a></li>
                    <li><a href="{{ route('organizer.events.website.speakers', $event->uuid) }}">Speakers</a></li>
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
        @yield('content')
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
