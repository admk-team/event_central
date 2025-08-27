@extends('event-website.layouts.layout')
@section('style')
   @vite(['resources/css/design4/sponsors_styles.css'])
@endsection
@section('header')
   @include('event-website.themes.design4.header')
@endsection

@section('content')
@if ($partnerCategories->count() > 0 && $event->partners->count() > 0)
<section id="sponsors" class="sponsors-modern py-12 bg-gray-50">
    <div class="container mx-auto px-4">

        <!-- Section Heading -->
        <div class="text-center mb-12" data-aos="fade-down">
            <span class="text-indigo-600 font-semibold uppercase">Our Sponsors</span>
            <h2 class="text-4xl font-extrabold text-gray-900 mt-2">Supporting Partners</h2>
            <p class="mt-3 text-gray-600 max-w-2xl mx-auto">
                Meet the organizations powering our event and driving innovation.
            </p>
        </div>

        <!-- Sponsor Categories -->
        @foreach ($partnerCategories ?? [] as $category)
            @if ($category->partners->count() > 0)
                <div class="sponsor-tier mb-12">
                    <h3 class="text-2xl font-semibold text-gray-800 mb-6">{{ $category->name }}</h3>
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        @foreach ($category->partners ?? [] as $partner)
                            <div class="sponsor-card group" data-bs-toggle="modal" data-bs-target="#partnerModal{{ $partner->id }}">
                                <!-- Sponsor Logo -->
                                <div class="sponsor-logo-container">
                                    <img src="{{ $partner->exhibitor_logo }}" alt="{{ $partner->name }}">
                                </div>
                                <!-- Sponsor Info -->
                                <div class="sponsor-info">
                                    <h5>{{ $partner->company_name }}</h5>
                                    <span>{{ $partner->type }}</span>
                                </div>
                            </div>

                            <!-- Modal -->
                            <div class="modal fade" id="partnerModal{{ $partner->id }}" tabindex="-1" aria-labelledby="modalLabel{{ $partner->id }}" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered modal-lg">
                                    <div class="modal-content rounded-2xl shadow-xl">
                                        <div class="modal-header border-0 bg-indigo-600 text-white">
                                            <h5 class="modal-title" id="modalLabel{{ $partner->id }}">
                                                {{ $partner->company_name }}
                                            </h5>
                                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body p-6">
                                            <div class="flex flex-col md:flex-row gap-6">
                                                <div class="text-center md:w-1/3">
                                                    <img src="{{ $partner->exhibitor_logo }}" class="mx-auto h-32 object-contain">
                                                    <p class="mt-2 text-gray-500">{{ $partner->type }}</p>
                                                </div>
                                                <div class="flex-1 space-y-2">
                                                    <p><strong>Email:</strong> {{ $partner->email }}</p>
                                                    <p><strong>Phone:</strong> {{ $partner->phone }}</p>
                                                    <p><strong>Booth:</strong> {{ $partner->exhibitor_booth_no }}</p>
                                                    <p>{{ $partner->description }}</p>
                                                    <div class="flex space-x-4 mt-3">
                                                        @if ($partner->web)<a href="{{ $partner->web }}" target="_blank" class="text-gray-700 hover:text-indigo-600"><i class="bi bi-globe fa-lg"></i></a>@endif
                                                        @if ($partner->facebook)<a href="{{ $partner->facebook }}" target="_blank" class="text-blue-600 hover:text-blue-800"><i class="bi bi-facebook fa-lg"></i></a>@endif
                                                        @if ($partner->twitter)<a href="{{ $partner->twitter }}" target="_blank" class="text-blue-400 hover:text-blue-600"><i class="bi bi-twitter-x fa-lg"></i></a>@endif
                                                        @if ($partner->linkedin)<a href="{{ $partner->linkedin }}" target="_blank" class="text-blue-700 hover:text-blue-900"><i class="bi bi-linkedin fa-lg"></i></a>@endif
                                                        @if ($partner->youtube)<a href="{{ $partner->youtube }}" target="_blank" class="text-red-600 hover:text-red-800"><i class="bi bi-youtube fa-lg"></i></a>@endif
                                                    </div>
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
            @endif
        @endforeach
    </div>
</section>
@endif
@endsection
