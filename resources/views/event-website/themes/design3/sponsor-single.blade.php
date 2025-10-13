@extends('event-website.layouts.layout')

@section('style')
    <!-- Dependency Styles -->
    <link id="style-bundle" rel="stylesheet" href="{{ asset('design3/bundle.css') }}" type="text/css" />

    <link
        href="https://fonts.googleapis.com/css2?family=Exo:wght@400;500;600;700;800&family=Open+Sans:wght@400;500;600;700;800&display=swap"
        rel="stylesheet" />

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

    @vite(['resources/css/design3/variables.css', 'resources/css/design3/index.css', 'resources/css/design3/single_sponsor_style.css'])
@endsection

<div id="main_content" class="main-content">

    @section('header')
        @include('event-website.themes.design3.header')
    @endsection

    @section('content')
        <section id="single-sponsors" class="single-sponsors">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-tag">{{ $partner->company_name }}
                    </h2>
                </div>
                <div class="single-sponsors-tiers">
                    {{-- @foreach ($partnerCategories ?? [] as $category) --}}
                    {{-- @if ($category->count() > 0) --}}
                    @if ($partner->banner_image)
                        <div class="col-md-12">
                            <img src="{{ $partner->banner_image }}" alt="{{ $partner->name }}" id="banner-image">

                        </div>
                    @endif
                    <div class="single-sponsors-tier">
                        {{-- <h3 class="tier-title">{{ $category->name }}</h3> --}}
                        <div class="d-flex single-sponsors-grid gold">
                            {{-- @foreach ($category->partners ?? [] as $partner) --}}
                            <div class="col-md-8">
                                <div class="sponsor-logo">
                                    <img src="{{ $partner->exhibitor_logo }}" alt="{{ $partner->name }}">
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class=" text-center">
                                    <h5>{{ $partner->type }}</h5>
                                    <p class=" mb-0">{{ $partner->email }}</p>
                                    <p class="">{{ $partner->phone }}</p>
                                    <p class="mb-0">{{ $partner->company_name }}</p>
                                    <p class="">{{ $partner->exhibitor_booth_no }}</p>
                                    @if ($partner->web)
                                        <div class="social-icons">
                                            <a target="_blank" href="{{ $partner->web }}">
                                                <i class="bi bi-globe"></i>
                                            </a>
                                            <a target="_blank" href="{{ $partner->facebook }}">
                                                <i class="bi bi-facebook"></i>
                                            </a>
                                            <a target="_blank" href="{{ $partner->twitter }}">
                                                <i class="bi bi-twitter-x"></i>
                                            </a>
                                            <a target="_blank" href="{{ $partner->linkedin }}">
                                                <i class="bi bi-linkedin"></i>
                                            </a>
                                            <a target="_blank" href="{{ $partner->youtube }}">
                                                <i class="bi bi-youtube"></i>
                                            </a>
                                            <a target="_blank" href="{{ $partner->insta }}">
                                                <i class="bi bi-instagram"></i>
                                            </a>
                                            <a target="_blank" href="{{ $partner->tiktok }}">
                                                <i class="bi bi-tiktok"></i>
                                            </a>

                                        </div>
                                    @endif
                                    <p class="">{{ $partner->address }}</p>

                                    <!-- Description with Show More functionality -->
                                    <div class="description-container">
                                        @if (strlen($partner->description) > 100)
                                            <p class="description-text short-description"
                                                id="shortPartnerDesc{{ $partner->id }}">
                                                {{ substr($partner->description, 0, 100) }}...</p>
                                            <p class="description-text full-description d-none"
                                                id="fullPartnerDesc{{ $partner->id }}">{{ $partner->description }}</p>
                                            <button class="btn show-more-btn p-0"
                                                data-partner-id="{{ $partner->id }}">Show
                                                More</button>
                                        @else
                                            <p class="">{{ $partner->description }}</p>
                                        @endif
                                    </div>
                                </div>
                            </div>


                            <!-- Modal -->
                            <div class="modal fade" id="partnerModal{{ $partner->id }}" tabindex="-1"
                                aria-labelledby="modalLabel{{ $partner->id }}" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content py-3 px-4">
                                        <div class="d-flex justify-content-center">
                                            <img src="{{ $partner->exhibitor_logo }}" alt="{{ $partner->type }}"
                                                style="height: 120px;">
                                        </div>
                                        <div class=" text-center">
                                            <h5>{{ $partner->type }}</h5>
                                            <p class="text-muted mb-0">{{ $partner->email }}</p>
                                            <p class="text-muted">{{ $partner->phone }}</p>
                                            <p class="mb-0">{{ $partner->company_name }}</p>
                                            <p class="text-muted">{{ $partner->exhibitor_booth_no }}</p>
                                            @if ($partner->web)
                                                <a target="_blank" href="{{ $partner->web }}">
                                                    <i class="bi bi-globe"></i>
                                                </a>
                                                <a target="_blank" href="{{ $partner->facebook }}">
                                                    <i class="bi bi-facebook"></i>
                                                </a>
                                                <a target="_blank" href="{{ $partner->twitter }}">
                                                    <i class="bi bi-twitter-x"></i>
                                                </a>
                                                <a target="_blank" href="{{ $partner->linkedin }}">
                                                    <i class="bi bi-linkedin"></i>
                                                </a>
                                                <a target="_blank" href="{{ $partner->youtube }}">
                                                    <i class="bi bi-youtube"></i>
                                                </a>
                                            @endif
                                            <p class="text-muted">{{ $partner->address }}</p>

                                            <!-- Description with Show More functionality -->
                                            <div class="description-container">
                                                @if (strlen($partner->description) > 100)
                                                    <p class="description-text short-description"
                                                        id="shortPartnerDesc{{ $partner->id }}">
                                                        {{ substr($partner->description, 0, 100) }}...</p>
                                                    <p class="description-text full-description text-muted d-none"
                                                        id="fullPartnerDesc{{ $partner->id }}">
                                                        {{ $partner->description }}
                                                    </p>
                                                    <button class="btn show-more-btn p-0"
                                                        data-partner-id="{{ $partner->id }}">Show More</button>
                                                @else
                                                    <p class="text-muted">{{ $partner->description }}</p>
                                                @endif
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {{-- @endforeach --}}
                        </div>
                    </div>
                    {{-- @endif --}}
                    {{-- @endforeach --}}
                </div>
            </div>
        </section>
    @endsection
</div>
@section('script')
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const showMoreButtons = document.querySelectorAll('.show-more-btn');

            showMoreButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const partnerId = this.getAttribute('data-partner-id');
                    const shortDesc = document.getElementById(`shortPartnerDesc${partnerId}`);
                    const fullDesc = document.getElementById(`fullPartnerDesc${partnerId}`);

                    if (fullDesc.classList.contains('d-none')) {
                        // Show full description
                        shortDesc.classList.add('d-none');
                        fullDesc.classList.remove('d-none');
                        this.textContent = 'Show Less';
                    } else {
                        // Show short description
                        shortDesc.classList.remove('d-none');
                        fullDesc.classList.add('d-none');
                        this.textContent = 'Show More';
                    }
                });
            });
        });
    </script>

    <!-- Dependency Scripts -->
    <script id="script-bundle" src="{{ asset('design3/bundle.js') }}"></script>
    <script id="color-switcher" src="{{ asset('design3/switcher.js') }}"></script>
    <!-- Site Scripts -->
    <script src="{{ asset('design3/app.js') }}"></script>
@endsection
