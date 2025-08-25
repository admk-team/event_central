@extends('event-website.layouts.layout')

@section('style')
    <!-- Dependency Styles -->
    <link id="style-bundle" rel="stylesheet" href="{{ asset('design3/bundle.css') }}" type="text/css" />

    <link
        href="https://fonts.googleapis.com/css2?family=Exo:wght@400;500;600;700;800&family=Open+Sans:wght@400;500;600;700;800&display=swap"
        rel="stylesheet" />


    @vite(['resources/css/design3/variables.css'])
    @vite(['resources/css/design3/index.css'])

    @vite(['resources/css/design3/product_style.css'])
@endsection

<div id="main_content" class="main-content">

    @section('header')
        @include('event-website.themes.design3.header')
    @endsection

    @section('content')
        <section id="event-shop-section" class="event-shop-section">
            <div class="event-shop-container">
                <div class="event-shop-header light">
                    <h2 class="event-shop-title">Available Products</h2>
                </div>

                <div class="event-shop-grid">
                    @foreach ($event_products as $item)
                        <div class="event-shop-card">
                            <div class="event-shop-card-image">
                                <img src="{{ $item->image_url }}" alt="{{ $item->name }}">
                            </div>
                            <div class="event-shop-card-body">
                                <h3 class="event-shop-card-title">{{ $item->name }}</h3>
                                <p class="event-shop-card-description">{{ Str::limit($item->description, 60) }}</p>
                                <div class="event-shop-card-footer">
                                    <div class="event-shop-card-price">
                                        <span class="current-price">${{ $item->price }}</span>
                                        @if ($item->old_price > 0)
                                            <span class="old-price">${{ $item->old_price }}</span>
                                        @endif
                                    </div>
                                    <a href="{{ route('attendee.register', $event) }}" class="btn-event-shop">Register</a>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </section>
    @endsection
</div>
@section('script')
    <!-- Dependency Scripts -->
    <script id="script-bundle" src="{{ asset('design3/bundle.js') }}"></script>
    <script id="color-switcher" src="{{ asset('design3/switcher.js') }}"></script>
    <!-- Site Scripts -->
    <script src="{{ asset('design3/app.js') }}"></script>
@endsection
