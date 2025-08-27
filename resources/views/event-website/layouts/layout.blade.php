<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $event->name }}</title>
    <meta name="description" content={{ $event->tagline }} />
    <meta name="keywords" content="{{ $event->category?->name }}">

    {{-- Open Graph --}}
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{{ route('organizer.events.website', $event->uuid) }}" />
    <meta property="og:title" content="{{ $event->name }}" />
    <meta property="og:description" content="{{ $event->tagline }}" />
    <meta property="og:image" content="{{ $event->logo_img }}" />

    {{-- Twitter Card --}}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="{{ $event->name }}" />
    <meta name="twitter:description" content="{{ $event->tagline }}" />
    <meta name="twitter:image" content="{{ $event->logo_img }}" />

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    @include('event-website.partials.website-colors')
    @yield('style')
    <!-- AOS CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" />

    <!-- AOS JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            AOS.init({
                duration: 800, // Animation duration in ms
                easing: "ease-in-out", // Smoothness
                once: true, // Animate only once
                offset: 80, // Trigger point from top
            });
        });
    </script>

    {{--  @vite(['resources/css/website-styles.css'])  --}}

    <script>
        window.eventStartDate =
            '{{ $event->dates[0]->date }} {{ $event->event_sessions()->orderBy('start_time')->first()?->start_time ?? '00:00:00' }}';
    </script>
</head>

<body>
    <div class="noise-overlay"></div>
    @yield('header')
    <main>
        @yield('content')
    </main>
    @yield('script')
    @vite(['resources/js/website-script.js'])
</body>

</html>
