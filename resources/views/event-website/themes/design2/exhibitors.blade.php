@extends('event-website.layouts.layout')
@section('style')
    @vite(['resources/css/design2/index_styles.css'])
    @vite(['resources/css/design2/exhibitors_styles.css'])
@endsection
@section('header')
    @include('event-website.themes.design2.header')
@endsection

@section('content')
    @if ($exhibitors->count() > 0)
        <section id="register" class="tickets">
            <div class="container">
                <div class="section-head">
                    <span class="eyebrow">Our Exhibitors</span>
                    <h2>Exhibitors</h2>
                </div>
                <div class="exhibitors-grid">
                    @foreach ($exhibitors ?? [] as $exhibitor)
                        <article class="exhibitor-card">
                            <div class="exhibitor-media">
                                @if ($exhibitor->exhibitor_logo)
                                    <img src="{{ $exhibitor->exhibitor_logo }}" alt="{{ $exhibitor->company_name }} Logo">
                                @else
                                    <div class="exhibitor-placeholder">
                                        {{ \Illuminate\Support\Str::of($exhibitor->company_name)->substr(0, 2)->upper() }}
                                    </div>
                                @endif

                                @if ($exhibitor->exhibitor_booth_no)
                                    <span class="booth-chip">Booth {{ $exhibitor->exhibitor_booth_no }}</span>
                                @endif
                            </div>

                            <div class="exhibitor-body">
                                <h3 class="exhibitor-name">{{ $exhibitor->company_name }}</h3>

                                <ul class="exhibitor-meta">
                                    @if ($exhibitor->phone)
                                        <li><span class="meta-label">Phone:</span> <span
                                                class="meta-val">{{ $exhibitor->phone }}</span></li>
                                    @endif
                                </ul>

                                @if ($exhibitor->web || $exhibitor->facebook || $exhibitor->twitter || $exhibitor->linkedin || $exhibitor->youtube)
                                    <div class="exhibitor-social">
                                        @if ($exhibitor->web)
                                            <a target="_blank" href="{{ $exhibitor->web }}" aria-label="Website"><i
                                                    class="bi bi-globe"></i></a>
                                        @endif

                                        <a target="_blank" href="{{ $exhibitor->facebook }}" aria-label="Facebook"><i
                                                class="bi bi-facebook"></i></a>

                                        <a target="_blank" href="{{ $exhibitor->twitter }}" aria-label="Twitter / X"><i
                                                class="bi bi-twitter-x"></i></a>

                                        <a target="_blank" href="{{ $exhibitor->linkedin }}" aria-label="LinkedIn"><i
                                                class="bi bi-linkedin"></i></a>

                                        <a target="_blank" href="{{ $exhibitor->youtube }}" aria-label="YouTube"><i
                                                class="bi bi-youtube"></i></a>

                                    </div>
                                @endif
                            </div>
                        </article>
                    @endforeach
                </div>
            </div>
        </section>
    @endif
@endsection
