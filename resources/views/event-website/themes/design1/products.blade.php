@extends('event-website.layouts.layout')
@section('style')
    @vite(['resources/css/design1/index_styles.css'])
    @vite(['resources/css/design1/products_styles.css'])
@endsection
@section('header')
    @include('event-website.themes.design1.header')
@endsection
@section('content')
    <section id="register" class="register register--grid mt-2">
        <div class="container">
            <div class="section-header light">
                <span class="section-tag">Event Shop</span>
                <h1 class="section-title">Available Products</h1>
            </div>

            <div class="row g-4">
                @foreach ($event_products as $item)
                    <div class="col-lg-3 col-md-6 col-sm-12">
                        <article class="card product-card h-100">
                            <div class="product-media">
                                @if (!empty($item->image_url))
                                    <img src="{{ $item->image_url }}" alt="">
                                @else
                                    <div class="product-placeholder">{{ Str::of($item->name)->substr(0, 2)->upper() }}</div>
                                @endif
                                {{-- Discount badge (only if old_price exists and is greater) --}}
                                @if (!empty($item->old_price) && $item->old_price > $item->price)
                                    @php
                                        $off = round((1 - $item->price / $item->old_price) * 100);
                                    @endphp
                                    <span class="badge-off">-{{ $off }}%</span>
                                @endif
                            </div>

                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title product-title">{{ $item->name }}</h5>

                                @if (!empty($item->description))
                                    <p class="card-text product-desc">{{ $item->description }}</p>
                                @endif

                                <div class="product-price-row mt-auto">
                                    <div class="product-prices">
                                        <span class="price-current">${{ number_format($item->price, 2) }}</span>
                                        @if (!empty($item->old_price) && $item->old_price > 0)
                                            <span class="price-old">${{ number_format($item->old_price, 2) }}</span>
                                        @endif
                                    </div>


                                </div>
                                <div class="mb-2">
                                    @if ($item->sizes)
                                        <div class="sizes-wrapper">
                                            @foreach ($item->sizes as $size)
                                                <label class="size-badge">
                                                    {{ $size }}
                                                </label>
                                            @endforeach
                                        </div>
                                    @endif
                                </div>
                                <a href="{{ route('attendee.register', $event) }}" class="btn btn-primary btn-buy">
                                    Register Now
                                </a>
                            </div>
                        </article>
                    </div>
                @endforeach
            </div>
        </div>
    </section>
@endsection
