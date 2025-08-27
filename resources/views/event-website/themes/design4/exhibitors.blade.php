@extends('event-website.layouts.layout')
@section('style')
    @vite(['resources/css/design4/exhibitors_styles.css'])
@endsection
@section('header')
    @include('event-website.themes.design4.header')
@endsection

@section('content')
@if ($exhibitors->count() > 0)
<section id="exhibitors" class="exhibitors-section py-12 bg-gray-50">
    <div class="container mx-auto px-4">
        <!-- Section Header -->
        <div class="text-center mb-12" data-aos="fade-down">
            <h2 class="text-4xl font-extrabold text-gray-900 tracking-tight uppercase">
                Our <span class="text-indigo-600">Exhibitors</span>
            </h2>
            <p class="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
                Discover the companies showcasing their innovations at our event.
            </p>
        </div>

        <!-- Exhibitors Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            @foreach ($exhibitors ?? [] as $exhibitor)
            <div class="exhibitor-card group bg-white rounded-2xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl" data-aos="fade-up" data-aos-delay="{{ $loop->index * 100 }}">
                <!-- Logo -->
                <div class="exhibitor-logo-container p-4 bg-gray-100">
                    @if ($exhibitor->exhibitor_logo)
                        <img src="{{ $exhibitor->exhibitor_logo }}" alt="{{ $exhibitor->company_name }}" class="w-full h-32 object-contain">
                    @endif
                </div>

                <!-- Info -->
                <div class="p-5 text-center flex flex-col justify-between h-full">
                    <div>
                        <h3 class="text-xl font-semibold text-gray-900">{{ $exhibitor->company_name }}</h3>
                        @if($exhibitor->phone)
                            <p class="text-gray-500 text-sm mt-1">Phone: {{ $exhibitor->phone }}</p>
                        @endif
                        @if($exhibitor->exhibitor_booth_no)
                            <p class="text-gray-500 text-sm">Booth: {{ $exhibitor->exhibitor_booth_no }}</p>
                        @endif
                    </div>

                    <!-- Socials -->
                    <div class="mt-4 flex justify-center space-x-3">
                        @if ($exhibitor->web)<a href="{{ $exhibitor->web }}" target="_blank" class="text-gray-700 hover:text-indigo-600"><i class="bi bi-globe fa-lg"></i></a>@endif
                        @if ($exhibitor->facebook)<a href="{{ $exhibitor->facebook }}" target="_blank" class="text-blue-600 hover:text-blue-800"><i class="bi bi-facebook fa-lg"></i></a>@endif
                        @if ($exhibitor->twitter)<a href="{{ $exhibitor->twitter }}" target="_blank" class="text-blue-400 hover:text-blue-600"><i class="bi bi-twitter-x fa-lg"></i></a>@endif
                        @if ($exhibitor->linkedin)<a href="{{ $exhibitor->linkedin }}" target="_blank" class="text-blue-700 hover:text-blue-900"><i class="bi bi-linkedin fa-lg"></i></a>@endif
                        @if ($exhibitor->youtube)<a href="{{ $exhibitor->youtube }}" target="_blank" class="text-red-600 hover:text-red-800"><i class="bi bi-youtube fa-lg"></i></a>@endif
                    </div>
                </div>
            </div>
            @endforeach
        </div>
    </div>
</section>
@endif
@endsection
