@extends('event-website.layouts.layout')

@section('style')
  @vite(['resources/css/design2/index_styles.css'])
  @vite(['resources/css/design2/products_styles.css']) {{-- ← use design2 version --}}
@endsection

@section('header')
  @include('event-website.themes.design2.header')
@endsection

@section('content')
<section id="products" class="d2s-products">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Event Shop</span>
      <h1 class="d2s-h">Available Products</h1>
    </div>

    <div class="row g-4">
      @foreach ($event_products as $item)
        @php
          $hasOld = !empty($item->old_price) && $item->old_price > 0;
          $onSale = $hasOld && $item->old_price > $item->price;
          $offPct = $onSale ? round((1 - $item->price / $item->old_price) * 100) : 0;
        @endphp

        <div class="col-xxl-3 col-lg-4 col-md-6">
          <article class="d2s-product h-100">
            <div class="d2s-product__media">
              @if (!empty($item->image_url))
                <img src="{{ $item->image_url }}" alt="{{ $item->name }}">
              @else
                <div class="d2s-product__placeholder">
                  {{ Str::of($item->name)->substr(0, 2)->upper() }}
                </div>
              @endif

              @if ($onSale)
                <span class="d2s-badge d2s-badge--off">-{{ $offPct }}%</span>
              @endif
            </div>

            <div class="d2s-product__body">
              <h5 class="d2s-product__title">{{ $item->name }}</h5>

              @if (!empty($item->description))
                <p class="d2s-product__desc">{{ $item->description }}</p>
              @endif

              <div class="">
                <div class="d2s-price">
                  <span class="d2s-price__current">${{ number_format($item->price, 2) }}</span>
                  @if ($hasOld)
                    <span class="d2s-price__old">${{ number_format($item->old_price, 2) }}</span>
                  @endif
                </div>

                <a href="{{ route('attendee.register', $event) }}"
                   class="btn btn-primary w-100">
                  Register Now
                </a>
              </div>
            </div>
          </article>
        </div>
      @endforeach
    </div>
  </div>
</section>
@endsection
