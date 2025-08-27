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
                <div class="speaker-card group bg-white rounded-2xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
                     data-aos="fade-up" data-aos-delay="{{ $loop->index * 100 }}">

                    <!-- Speaker Image -->
                    <div class="relative">
                        <img src="{{ $speaker->image ?? asset('images/default-speaker.jpg') }}"
                             alt="{{ $speaker->name }}"
                             class="w-full h-64 object-cover rounded-t-2xl">

                        <!-- Social Icons -->
                        <div class="absolute bottom-3 left-3 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            @if($speaker->twitter)
                                <a href="{{ $speaker->twitter }}" target="_blank"
                                   class="bg-indigo-600 p-2 rounded-full text-white hover:bg-indigo-700">
                                    <i class="fab fa-twitter"></i>
                                </a>
                            @endif
                            @if($speaker->linkedin)
                                <a href="{{ $speaker->linkedin }}" target="_blank"
                                   class="bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700">
                                    <i class="fab fa-linkedin-in"></i>
                                </a>
                            @endif
                        </div>
                    </div>

                    <!-- Speaker Info -->
                    <div class="p-5 text-center flex flex-col h-full justify-between">
                        <div>
                            <h3 class="text-xl font-semibold text-gray-900">{{ $speaker->name }}</h3>
                            <p class="text-gray-500 text-sm">{{ $speaker->designation }}</p>
                            <p class="mt-2 text-gray-600 text-sm line-clamp-3">{{ $speaker->bio }}</p>
                        </div>
                    </div>
                </div>

                <!-- Speaker Modal -->
                <div class="modal fade" id="speakerModal{{ $speaker->id }}" tabindex="-1" aria-labelledby="speakerModalLabel{{ $speaker->id }}" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-lg">
                        <div class="modal-content rounded-2xl shadow-xl">
                            <div class="modal-header border-0">
                                <h5 class="modal-title text-xl font-semibold text-gray-900" id="speakerModalLabel{{ $speaker->id }}">
                                    {{ $speaker->name }}
                                </h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body flex flex-col lg:flex-row gap-6">
                                <img src="{{ $speaker->image ?? asset('images/default-speaker.jpg') }}"
                                     alt="{{ $speaker->name }}"
                                     class="w-full lg:w-1/3 h-64 object-cover rounded-xl shadow">
                                <div class="flex-1">
                                    <h4 class="text-lg font-semibold text-indigo-600">{{ $speaker->designation }}</h4>
                                    <p class="mt-2 text-gray-600 leading-relaxed">{{ $speaker->bio }}</p>
                                    <div class="flex mt-4 space-x-4">
                                        @if($speaker->twitter)
                                            <a href="{{ $speaker->twitter }}" target="_blank" class="text-indigo-600 hover:text-indigo-800"><i class="fab fa-twitter fa-lg"></i></a>
                                        @endif
                                        @if($speaker->linkedin)
                                            <a href="{{ $speaker->linkedin }}" target="_blank" class="text-blue-600 hover:text-blue-800"><i class="fab fa-linkedin fa-lg"></i></a>
                                        @endif
                                        @if($speaker->facebook)
                                            <a href="{{ $speaker->facebook }}" target="_blank" class="text-blue-800 hover:text-blue-900"><i class="fab fa-facebook fa-lg"></i></a>
                                        @endif
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer border-0">
                                <button type="button" class="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-300" data-bs-dismiss="modal">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</section>
@endsection
