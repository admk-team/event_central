@extends('event-website.layouts.layout')
@section('style')
    @vite(['resources/css/design4/products_styles.css'])
@endsection
@section('header')
    @include('event-website.themes.design4.header')
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
                        <div class="product-card">
                            <div class="product-image">
                                <img src="{{ $item->image_url }}" alt="{{ $item->name }}">
                            </div>
                            <div class="product-body">
                                <h5 class="product-title">{{ $item->name }}</h5>
                                <p class="product-description">{{ $item->description }}</p>
                                <div class="product-price">
                                    <span class="current-price">${{ $item->price }}</span>
                                    @if ($item->old_price > 0)
                                        <span class="old-price"><s>${{ $item->old_price }}</s></span>
                                    @endif
                                </div>
                                <a href="{{ route('attendee.register', $event) }}" class="btn btn-product">Register Now</a>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
    </section>
@endsection
