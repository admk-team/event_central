  <style>
/* Container */
.site-header {
    position: sticky;
    top: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    transition: all 0.3s ease;
}

.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 1.5rem;
}

/* Logo */
.logo img {
    height: 55px;
    transition: transform 0.3s ease;
}
.logo img:hover {
    transform: scale(1.05);
}

/* Navigation */
.main-nav {
    display: flex;
    align-items: center;
}
.nav-links {
    display: flex;
    gap: 1.5rem;
    list-style: none;
}
.nav-links li a {
    text-decoration: none;
    font-weight: 600;
    color: #222;
    transition: color 0.3s ease;
}
.nav-links li a:hover {
    color: #007bff;
}

/* Buttons */
.btn {
    padding: 8px 18px;
    border-radius: 6px;
    font-weight: 600;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-block;
}
.btn-primary {
    background: #007bff;
    color: #fff;
}
.btn-accent {
    background: #ff4081;
    color: #fff;
}
.btn:hover {
    opacity: 0.85;
}

/* Mobile Styles */
.menu-toggle {
    display: none;
    flex-direction: column;
    cursor: pointer;
    gap: 5px;
}
.menu-toggle span {
    width: 25px;
    height: 3px;
    background: #333;
    border-radius: 5px;
    transition: all 0.3s ease;
}

/* Responsive Navigation */
@media (max-width: 991px) {
    .nav-links {
        display: none;
        flex-direction: column;
        background: white;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        padding: 1.2rem;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        border-top: 2px solid #eee;
        animation: slideDown 0.3s ease;
    }

    .nav-links.active {
        display: flex;
    }

    .header-actions {
        display: none;
    }

    .menu-toggle {
        display: flex;
    }
}

/* Slide Animation */
@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

</style>
<header class="site-header">
    <div class="container header-container" data-aos="fade-down">
        <!-- Logo -->
        <a href="{{ route('organizer.events.website', $event->uuid) }}{{ $isPreviewMode ?? false ? '?preview=true' : '' }}" class="logo">
            <img src="{{ $event->logo_img }}" alt="logo" />
        </a>

        <!-- Navigation -->
        <nav class="main-nav">
            <ul class="nav-links">
                <li><a href="{{ route('organizer.events.website', $event->uuid) }}{{ ($isPreviewMode ?? false) || request('preview')=='true' ? '?preview=true' : '' }}">About</a></li>
                <li><a href="{{ route('organizer.events.website.speakers', $event->uuid) }}{{ ($isPreviewMode ?? false) || request('preview')=='true' ? '?preview=true' : '' }}">Speakers</a></li>
                <li><a href="{{ route('organizer.events.website', $event->uuid) }}{{ ($isPreviewMode ?? false) || request('preview')=='true' ? '?preview=true' : '' }}#venue">Venue</a></li>
                <li><a href="{{ route('organizer.events.website.sponsors', $event->uuid) }}{{ ($isPreviewMode ?? false) || request('preview')=='true' ? '?preview=true' : '' }}">Sponsors</a></li>
                <li><a href="{{ route('organizer.events.website.exhibitors', $event->uuid) }}{{ ($isPreviewMode ?? false) || request('preview')=='true' ? '?preview=true' : '' }}">Exhibitors</a></li>
                <li><a href="{{ route('organizer.events.website.tickets', $event->uuid) }}{{ ($isPreviewMode ?? false) || request('preview')=='true' ? '?preview=true' : '' }}">Tickets</a></li>
                <li><a href="{{ route('organizer.events.website.products', $event->uuid) }}{{ ($isPreviewMode ?? false) || request('preview')=='true' ? '?preview=true' : '' }}">Products</a></li>
            </ul>
        </nav>

        <!-- Desktop Buttons -->
        <div class="header-actions">
            <a href="{{ route('organizer.events.website.schedule', $event->uuid) }}{{ ($isPreviewMode ?? false) || request('preview')=='true' ? '?preview=true' : '' }}" class="btn btn-primary">Schedule</a>
            <a href="{{ route('attendee.login', $event) }}{{ ($isPreviewMode ?? false) || request('preview')=='true' ? '?preview=true' : '' }}" class="btn btn-primary">Login</a>
            <a href="{{ route('attendee.register', $event) }}{{ ($isPreviewMode ?? false) || request('preview')=='true' ? '?preview=true' : '' }}" class="btn btn-accent">Register Now</a>
        </div>

        <!-- Mobile Menu Button -->
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
