  {{-- Rail (desktop ≥992px) --}}
    <aside class="rail" aria-label="Primary">
        <a class="rail__brand"
            href="{{ route('organizer.events.website', $event->uuid) }}{{ $isPreviewMode ?? false ? '?preview=true' : '' }}"
            title="Home">
            <img src="{{ $event->logo_img }}" alt="logo">
        </a>
        <nav class="rail__nav" aria-label="Main">
            <a class="rail__link {{ request()->routeIs('organizer.events.website') ? 'active' : '' }}"
                href="{{ route('organizer.events.website', $event->uuid) }}{{ request('preview') == 'true' || ($isPreviewMode ?? false) ? '?preview=true' : '' }}"
                data-label="About">
                <i class="bi bi-info-circle"></i>
            </a>
            <a class="rail__link {{ request()->routeIs('organizer.events.website.speakers') ? 'active' : '' }}"
                href="{{ route('organizer.events.website.speakers', $event->uuid) }}{{ request('preview') == 'true' || ($isPreviewMode ?? false) ? '?preview=true' : '' }}"
                data-label="Speakers">
                <i class="bi bi-mic"></i>
            </a>
            <a class="rail__link {{ str_contains(url()->current(), '#venue') ? 'active' : '' }}"
                href="{{ route('organizer.events.website', $event->uuid) }}{{ request('preview') == 'true' || ($isPreviewMode ?? false) ? '?preview=true' : '' }}#venue"
                data-label="Venue">
                <i class="bi bi-geo-alt"></i>
            </a>
            <a class="rail__link {{ request()->routeIs('organizer.events.website.sponsors') ? 'active' : '' }}"
                href="{{ route('organizer.events.website.sponsors', $event->uuid) }}{{ request('preview') == 'true' || ($isPreviewMode ?? false) ? '?preview=true' : '' }}"
                data-label="Sponsors">
                <i class="bi bi-star"></i>
            </a>
            <a class="rail__link {{ request()->routeIs('organizer.events.website.exhibitors') ? 'active' : '' }}"
                href="{{ route('organizer.events.website.exhibitors', $event->uuid) }}{{ request('preview') == 'true' || ($isPreviewMode ?? false) ? '?preview=true' : '' }}"
                data-label="Exhibitors">
                <i class="bi bi-door-open"></i>
            </a>
            <a class="rail__link {{ request()->routeIs('organizer.events.website.tickets') ? 'active' : '' }}"
                href="{{ route('organizer.events.website.tickets', $event->uuid) }}{{ request('preview') == 'true' || ($isPreviewMode ?? false) ? '?preview=true' : '' }}"
                data-label="Tickets">
                <i class="bi bi-ticket-perforated"></i>
            </a>
            <a class="rail__link {{ request()->routeIs('organizer.events.website.products') ? 'active' : '' }}"
                href="{{ route('organizer.events.website.products', $event->uuid) }}{{ request('preview') == 'true' || ($isPreviewMode ?? false) ? '?preview=true' : '' }}"
                data-label="Products">
                <i class="bi bi-bag"></i>
            </a>
        </nav>
        <div class="rail__cta">
            <a class="btn btn-rail"
                href="{{ route('organizer.events.website.schedule', $event->uuid) }}{{ request('preview') == 'true' || ($isPreviewMode ?? false) ? '?preview=true' : '' }}">Schedule</a>
            <a class="btn btn-rail--ghost"
                href="{{ route('attendee.login', $event) }}{{ request('preview') == 'true' || ($isPreviewMode ?? false) ? '?preview=true' : '' }}">Login</a>
            <a class="btn btn-rail"
                href="{{ route('attendee.register', $event) }}{{ request('preview') == 'true' || ($isPreviewMode ?? false) ? '?preview=true' : '' }}">Register</a>
        </div>
    </aside>

    {{-- Floating Action Button (mobile only) --}}
    <button class="fab" type="button" aria-label="Open menu" aria-controls="sheet" aria-expanded="false">
        <i class="bi bi-list"></i>
    </button>

    {{-- Bottom sheet (mobile) --}}
    <div id="sheet" class="sheet" aria-hidden="true" role="dialog" aria-modal="true">
        <div class="sheet__bar"></div>
        <div class="sheet__content">
            <div class="sheet__brand">
                <img src="{{ $event->logo_img }}" alt="logo">
            </div>
            <nav class="sheet__nav">
                <a class="{{ request()->routeIs('organizer.events.website') ? 'active' : '' }}"
                    href="{{ route('organizer.events.website', $event->uuid) }}{{ request('preview') == 'true' || ($isPreviewMode ?? false) ? '?preview=true' : '' }}">About</a>
                <a class="{{ request()->routeIs('organizer.events.website.speakers') ? 'active' : '' }}"
                    href="{{ route('organizer.events.website.speakers', $event->uuid) }}{{ request('preview') == 'true' || ($isPreviewMode ?? false) ? '?preview=true' : '' }}">Speakers</a>
                <a class="{{ str_contains(url()->current(), '#venue') ? 'active' : '' }}"
                    href="{{ route('organizer.events.website', $event->uuid) }}{{ request('preview') == 'true' || ($isPreviewMode ?? false) ? '?preview=true' : '' }}#venue">Venue</a>
                <a class="{{ request()->routeIs('organizer.events.website.sponsors') ? 'active' : '' }}"
                    href="{{ route('organizer.events.website.sponsors', $event->uuid) }}{{ request('preview') == 'true' || ($isPreviewMode ?? false) ? '?preview=true' : '' }}">Sponsors</a>
                <a class="{{ request()->routeIs('organizer.events.website.exhibitors') ? 'active' : '' }}"
                    href="{{ route('organizer.events.website.exhibitors', $event->uuid) }}{{ request('preview') == 'true' || ($isPreviewMode ?? false) ? '?preview=true' : '' }}">Exhibitors</a>
                <a class="{{ request()->routeIs('organizer.events.website.tickets') ? 'active' : '' }}"
                    href="{{ route('organizer.events.website.tickets', $event->uuid) }}{{ request('preview') == 'true' || ($isPreviewMode ?? false) ? '?preview=true' : '' }}">Tickets</a>
                <a class="{{ request()->routeIs('organizer.events.website.products') ? 'active' : '' }}"
                    href="{{ route('organizer.events.website.products', $event->uuid) }}{{ request('preview') == 'true' || ($isPreviewMode ?? false) ? '?preview=true' : '' }}">Products</a>
            </nav>
            <div class="sheet__cta">
                <a class="btn btn-rail w-100"
                    href="{{ route('organizer.events.website.schedule', $event->uuid) }}{{ request('preview') == 'true' || ($isPreviewMode ?? false) ? '?preview=true' : '' }}">Schedule</a>
                <a class="btn btn-rail--ghost w-100"
                    href="{{ route('attendee.login', $event) }}{{ request('preview') == 'true' || ($isPreviewMode ?? false) ? '?preview=true' : '' }}">Login</a>
                <a class="btn btn-rail w-100"
                    href="{{ route('attendee.register', $event) }}{{ request('preview') == 'true' || ($isPreviewMode ?? false) ? '?preview=true' : '' }}">Register</a>
            </div>
        </div>
    </div>
    <div class="sheet__backdrop" hidden></div>
    @section('script')
    <script>
        /* Mobile bottom-sheet controller with toggle */
        (() => {
            const sheet = document.getElementById('sheet');
            const backdrop = document.querySelector('.sheet__backdrop');
            const fab = document.querySelector('.fab');

            if (!sheet || !backdrop || !fab) return;

            const setOpen = (isOpen) => {
                sheet.classList.toggle('open', isOpen);
                sheet.setAttribute('aria-hidden', String(!isOpen));
                backdrop.hidden = !isOpen;
                fab.setAttribute('aria-expanded', String(isOpen));
                document.documentElement.classList.toggle('sheet-locked', isOpen);
            };

            const isOpen = () => sheet.classList.contains('open');

            const toggle = () => setOpen(!isOpen());
            const close = () => setOpen(false);

            document.addEventListener('click', (e) => {
                if (e.target.closest('.fab')) {
                    e.preventDefault();
                    toggle(); // <-- toggles open/close on same button
                }
                if (e.target.closest('.sheet__bar') || e.target === backdrop) {
                    close();
                }

                // close on link tap inside sheet (mobile)
                if (e.target.closest('.sheet__nav a') && window.matchMedia('(max-width: 991.98px)').matches) {
                    close();
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') close();
            });

            // close sheet when resizing to desktop
            window.addEventListener('resize', () => {
                if (window.matchMedia('(min-width: 992px)').matches) close();
            });
        })();
    </script>
@endsection