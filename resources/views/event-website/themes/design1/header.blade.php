<header class="site-header">
    <div class="container">
        <a
            href="{{ route('organizer.events.website', $event->uuid) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}">
            <div class="logo">
                <img src="{{ $event->logo_img }}" alt="logo" />
            </div>
        </a>

        <nav class="main-nav">
            <ul class="nav-links">
                {{--  <li>
                    <a
                        href="{{ route('organizer.events.website', $event->uuid) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}">
                        About
                    </a>
                </li>  --}}
                <li>
                    <a
                        href="{{ route('organizer.events.website.speakers', $event->uuid) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}">
                        Speakers
                    </a>
                </li>
                <li>
                    <a
                        href="{{ route('organizer.events.website', $event->uuid) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}#venue">
                        Venue
                    </a>
                </li>
                <li>
                    <a
                        href="{{ route('organizer.events.website.sponsors', $event->uuid) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}">
                        Sponsors
                    </a>
                </li>
                <li>
                    <a
                        href="{{ route('organizer.events.website.exhibitors', $event->uuid) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}">
                        Exhibitors
                    </a>
                </li>
                <li>
                    <a
                        href="{{ route('organizer.events.website.tickets', $event->uuid) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}">
                        Tickets
                    </a>
                </li>
                <li>
                    <a
                        href="{{ route('organizer.events.website.products', $event->uuid) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}">
                        Products
                    </a>
                </li>

                <!-- Mobile-only CTA group -->
                <li class="header-actions-mobile">
                    <a href="{{ route('organizer.events.website.schedule', $event->uuid) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}"
                        class="btn btn-primary">Schedule</a>
                    <a href="{{ route('attendee.login', $event) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}"
                        class="btn btn-primary">Login</a>
                    <a href="{{ route('attendee.register', $event) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}"
                        class="btn btn-primary">Register Now</a>
                </li>
            </ul>
        </nav>

        <!-- Desktop CTA group -->
        <div class="header-actions">
            <a href="{{ route('organizer.events.website.schedule', $event->uuid) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}"
                class="btn btn-primary">Schedule</a>
            <a href="{{ route('attendee.login', $event) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}"
                class="btn btn-primary">Login</a>
            <a href="{{ route('attendee.register', $event) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}"
                class="btn btn-primary">Register Now</a>
        </div>

        <!-- Burger -->
        <button class="menu-toggle" aria-label="Toggle menu" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </div>
</header>

{{-- MOBILE NAV TOGGLE (works with existing classes/IDs) --}}
<script>
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav    = document.querySelector('.main-nav');

  if (!header || !toggle || !nav) return;

  // Keep the menu panel aligned exactly under the header, even if header height changes
  const setHeaderH = () => {
    const h = header.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--header-h', h + 'px');
  };
  setHeaderH();
  window.addEventListener('resize', setHeaderH);

  toggle.setAttribute('aria-expanded', 'false');

  function openNav(){
    header.classList.add('nav-open');
    document.documentElement.classList.add('nav-locked'); // prevent bg scroll
    toggle.setAttribute('aria-expanded', 'true');
  }
  function closeNav(){
    header.classList.remove('nav-open');
    document.documentElement.classList.remove('nav-locked');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => {
    header.classList.contains('nav-open') ? closeNav() : openNav();
  });

  // Close after tapping a nav link on mobile
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a') && window.matchMedia('(max-width: 992px)').matches) {
      closeNav();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeNav(); });
});
</script>
