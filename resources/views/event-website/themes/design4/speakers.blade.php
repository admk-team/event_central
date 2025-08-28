@extends('event-website.layouts.layout')
@section('style')
    @vite(['resources/css/design4/speakers_styles.css'])
@endsection
@section('header')
    @include('event-website.themes.design4.header')
@endsection

@section('content')
    <section class="speakers-section py-12 bg-gradient-to-b from-gray-50 to-gray-100">
        <div class="container mx-auto px-4">
            <!-- Section Heading -->
            <div class="text-center mb-12" data-aos="fade-down">
                <h2 class="text-4xl font-extrabold text-gray-900 tracking-tight uppercase">
                    Meet Our <span class="text-indigo-600">Speakers</span>
                </h2>
                <p class="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
                    Discover the experts shaping the future of technology, innovation, and business.
                </p>
            </div>

            <!-- Speakers Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                @foreach ($event->event_speakers ?? [] as $speaker)
                    <div class="speaker-card group bg-white rounded-2xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl flex"
                        data-aos="fade-up" data-aos-delay="{{ $loop->index * 100 }}">

                        <!-- Speaker Image -->
                        <div class="flex-shrink-0 w-32 h-32 overflow-hidden rounded-l-2xl">
                            <img src="{{ $speaker->avatar ?? asset('images/default-speaker.jpg') }}"
                                alt="{{ $speaker->name }}" class="w-full h-full object-cover">
                        </div>

                        <!-- Speaker Info -->
                        <div class="p-5 flex-1 flex flex-col justify-between">
                            <div>
                                <h3 class="text-xl font-semibold text-gray-900">{{ $speaker->name }}</h3>
                                <p class="text-gray-500 text-sm">{{ $speaker->designation }}</p>
                                <p class="mt-2 text-gray-600 text-sm line-clamp-3">{{ $speaker->bio }}</p>
                            </div>

                            <!-- Social Icons -->
                            <div class="mt-3 flex space-x-3">
                                @if ($speaker->twitter)
                                    <a href="{{ $speaker->twitter }}" target="_blank"
                                        class="bg-indigo-600 p-2 rounded-full text-white hover:bg-indigo-700">
                                        <i class="fab fa-twitter"></i>
                                    </a>
                                @endif
                                @if ($speaker->linkedin)
                                    <a href="{{ $speaker->linkedin }}" target="_blank"
                                        class="bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700">
                                        <i class="fab fa-linkedin-in"></i>
                                    </a>
                                @endif
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>

        </div>
    </section>
@endsection
