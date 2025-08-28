@extends('event-website.layouts.layout')
@section('style')
    @vite(['resources/css/design4/exhibitors_styles.css'])
@endsection
@section('header')
    @include('event-website.themes.design4.header')
@endsection

@section('content')
@if ($exhibitors->count() > 0)
<section id="exhibitors" class="exhibitors-section">
    <div class="container mx-auto px-4">
        <!-- Section Header -->
        <div class="section-header" data-aos="fade-down">
            <h2>
                Meet Our <span>Exhibitors</span>
            </h2>
            <p>
                Explore the companies showcasing cutting-edge innovations and solutions at our event.
            </p>
        </div>

        <!-- Exhibitors Grid -->
        <div class="exhibitors-grid">
            @foreach ($exhibitors ?? [] as $exhibitor)
            <div class="exhibitor-card" data-aos="fade-up" data-aos-delay="{{ $loop->index * 100 }}">
                <!-- Logo -->
                <div class="exhibitor-logo">
                    @if ($exhibitor->exhibitor_logo)
                        <img src="{{ $exhibitor->exhibitor_logo }}" alt="{{ $exhibitor->company_name }}">
                    @else
                        <div class="no-logo">
                            <i class="bi bi-building"></i>
                        </div>
                    @endif
                </div>

                <!-- Booth Badge -->
                @if($exhibitor->exhibitor_booth_no)
                    <span class="booth-badge">Booth {{ $exhibitor->exhibitor_booth_no }}</span>
                @endif

                <!-- Info -->
                <div class="exhibitor-info">
                    <h3>{{ $exhibitor->company_name }}</h3>
                    @if($exhibitor->phone)
                        <p class="phone">📞 {{ $exhibitor->phone }}</p>
                    @endif
                </div>

                <!-- Social Icons -->
                <div class="social-icons">
                    @if ($exhibitor->web)<a href="{{ $exhibitor->web }}" target="_blank" class="web"><i class="bi bi-globe2"></i></a>@endif
                    @if ($exhibitor->facebook)<a href="{{ $exhibitor->facebook }}" target="_blank" class="facebook"><i class="bi bi-facebook"></i></a>@endif
                    @if ($exhibitor->twitter)<a href="{{ $exhibitor->twitter }}" target="_blank" class="twitter"><i class="bi bi-twitter-x"></i></a>@endif
                    @if ($exhibitor->linkedin)<a href="{{ $exhibitor->linkedin }}" target="_blank" class="linkedin"><i class="bi bi-linkedin"></i></a>@endif
                    @if ($exhibitor->youtube)<a href="{{ $exhibitor->youtube }}" target="_blank" class="youtube"><i class="bi bi-youtube"></i></a>@endif
                </div>
            </div>
            @endforeach
        </div>

        <!-- CTA -->
        <div class="exhibitors-cta" data-aos="fade-up">
            <p>
                Interested in exhibiting?
                <a href="#contact">Become an Exhibitor →</a>
            </p>
        </div>
    </div>
</section>
@endif
@endsection
