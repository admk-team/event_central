@extends('event-website.layouts.layout')
@section('style')
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    @vite(['resources/css/website-styles.css'])
@endsection
@section('header')
    @include('event-website.themes.default.header')
@endsection

@section('content')
    <section id="register" class="register">
        <div class="container">
            <div class="section-header light">
                <span class="section-tag">Event Shop</span>
                <h1 class="section-title">Available Products</h1>
            </div>
            <div class="row g-4">
                @foreach ($event_products as $item)
                    <div class="col-lg-3 col-md-6 col-sm-12">
                        <div class="card h-100">
                            <img src="{{ $item->image_url }}" class="card-img-top" alt="Wireless Headphones"
                                style="height: 200px; width: 100%; object-fit: cover;">
                            <div class="card-body">
                                <h5 class="card-title">{{ $item->name }}</h5>
                                <p class="card-text">{{ $item->description }}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <span class="h5 text-success">${{ $item->price }}</span>
                                    @if ($item->old_price > 0)
                                        <small class="text-muted"><s>${{ $item->old_price }}</s></small>
                                    @endif
                                </div>
                                <a href="{{ route('attendee.register', $event) }}"
                                    class="btn btn-primary btn-block mt-auto">Register Now</a>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
    </section>
@endsection
