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
                  <li><a
                          href="{{ route('organizer.events.website.speakers', $event->uuid) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}">Speakers</a>
                  </li>
                  <li><a
                          href="{{ route('organizer.events.website', $event->uuid) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}#venue">Venue</a>
                  </li>
                  <li><a
                          href="{{ route('organizer.events.website.sponsors', $event->uuid) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}">Sponsors</a>
                  </li>
                  <li><a
                          href="{{ route('organizer.events.website.exhibitors', $event->uuid) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}">Exhibitors</a>
                  </li>
                  <li><a
                          href="{{ route('organizer.events.website.tickets', $event->uuid) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}">Tickets</a>
                  </li>
                  <li><a
                          href="{{ route('organizer.events.website.products', $event->uuid) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}">Products</a>
                  </li>
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
          <div class="header-actions">
              <a href="{{ route('organizer.events.website.schedule', $event->uuid) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}"
                  class="btn btn-primary">Schedule</a>
              <a href="{{ route('attendee.login', $event) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}"
                  class="btn btn-primary">Login</a>
              <a href="{{ route('attendee.register', $event) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}"
                  class="btn btn-primary">Register Now</a>
          </div>
          <button class="menu-toggle" aria-label="Toggle menu">
              <span></span>
              <span></span>
              <span></span>
          </button>
      </div>
  </header>
  <script>
      document.addEventListener('DOMContentLoaded', () => {
          // Mobile menu toggle
          const menuToggle = document.querySelector(".menu-toggle")
          const navLinks = document.querySelector(".nav-links")

          if (menuToggle && navLinks) {
              menuToggle.addEventListener("click", () => {
                  navLinks.classList.toggle("active")

                  if (navLinks.classList.contains("active")) {
                      navLinks.style.display = "flex"
                      navLinks.style.flexDirection = "column"
                      navLinks.style.position = "absolute"
                      navLinks.style.top = "100%"
                      navLinks.style.left = "0"
                      navLinks.style.width = "100%"
                      navLinks.style.padding = "1rem"
                      navLinks.style.backgroundColor = "var(--color-background)"
                      navLinks.style.boxShadow = "var(--shadow-lg)"
                      navLinks.style.zIndex = "50"
                  } else {
                      navLinks.style.display = ""
                  }
              })
          }

          // Theme toggle
          const themeToggle = document.querySelector(".theme-toggle")

          if (themeToggle) {
              // Check for saved theme preference or use system preference
              const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")
              const savedTheme = localStorage.getItem("theme")

              if (savedTheme === "dark" || (!savedTheme && prefersDarkScheme.matches)) {
                  document.documentElement.classList.add("dark")
              }

              themeToggle.addEventListener("click", () => {
                  document.documentElement.classList.toggle("dark")

                  // Save preference to localStorage
                  if (document.documentElement.classList.contains("dark")) {
                      localStorage.setItem("theme", "dark")
                  } else {
                      localStorage.setItem("theme", "light")
                  }
              })
          }
      });
  </script>
