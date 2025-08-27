@extends('event-website.layouts.layout')

@section('style')
    <!-- Dependency Styles -->
    <link id="style-bundle" rel="stylesheet" href="{{ asset('design3/bundle.css') }}" type="text/css" />

    <link
        href="https://fonts.googleapis.com/css2?family=Exo:wght@400;500;600;700;800&family=Open+Sans:wght@400;500;600;700;800&display=swap"
        rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

    @vite(['resources/css/design3/variables.css'])

    @vite(['resources/css/design3/index.css'])

    @vite(['resources/css/design3/exhibitors_style.css'])
@endsection

<div id="main_content" class="main-content">

    @section('header')
        @include('event-website.themes.design3.header')
    @endsection

    @section('content')

        <section id="speakers" class="speakers">
            <div class="container">
                <div class="section-header">
                    <h2>Our Exhibitors</h2>
                </div>
                @if ($exhibitors->count() > 0)
                    <ul class="list-group">
                        @foreach ($exhibitors ?? [] as $exhibitor)
                            <li class="list-group-item">
                                @if ($exhibitor->exhibitor_logo)
                                    <div class="mb-3">
                                        <img src="{{ $exhibitor->exhibitor_logo }}"
                                            alt="{{ $exhibitor->company_name }} Logo" />
                                    </div>
                                @else
                                    <div class="mb-3 initials-placeholder">
                                        {{ strtoupper(substr($exhibitor->company_name, 0, 2)) }}
                                    </div>
                                @endif
                                <div>
                                    <b class="list-group-name">Name: </b> <span>{{ $exhibitor->company_name }}</span>
                                </div>
                                @if ($exhibitor->phone)
                                    <div>
                                        <b class="list-group-phone">Phone: </b> <span>{{ $exhibitor->phone }}</span>
                                    </div>
                                @endif
                                @if ($exhibitor->exhibitor_booth_no)
                                    <div>
                                        <b class="list-group-b-number">Booth number: </b> <span>{{ $exhibitor->exhibitor_booth_no }}</span>
                                    </div>
                                @endif
                                @if ($exhibitor->web)
                                    <div>
                                        <a target="_blank" href="{{ $exhibitor->web }}">
                                            <i class="bi bi-globe"></i>
                                        </a>
                                        <a target="_blank" href="{{ $exhibitor->facebook }}">
                                            <i class="bi bi-facebook"></i>
                                        </a>
                                        <a style="text-decoration: none; color:black" target="_blank"
                                            href="{{ $exhibitor->twitter }}">
                                            <i class="bi bi-twitter-x"></i>
                                        </a>
                                        <a target="_blank" href="{{ $exhibitor->linkedin }}">
                                            <i class="bi bi-linkedin"></i>
                                        </a>
                                        <a style="text-decoration: none; color:red" target="_blank"
                                            href="{{ $exhibitor->youtube }}">
                                            <i class="bi bi-youtube"></i>
                                        </a>
                                    </div>
                                @endif
                            </li>
                        @endforeach
                    </ul>
                @endif
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
