@extends('event-website.layouts.layout')
@section('style')
    @vite(['resources/css/website-styles.css'])
@endsection
@section('header')
    @include('event-website.themes.default.header')
@endsection

@section('content')
    {{-- @if ($partnerCategories->count() > 0 && $event->partners->count() > 0) --}}
    <section id="sponsors" class="sponsors">
        <div class="container">
            <div class="section-header">
                <span class="section-tag" style="font-size: 2rem">{{ $partner->company_name }}</span>
            </div>
            <div class="sponsors-tiers">
                {{-- @foreach ($partnerCategories ?? [] as $category) --}}
                {{-- @if ($category->count() > 0) --}}
                <img src="{{ $partner->banner_image }}" alt="{{ $partner->name }}">
                <div class="sponsors-tier">
                    {{-- <h3 class="tier-title">{{ $category->name }}</h3> --}}
                    <div class="d-flex sponsors-grid gold"
                        style="display: flex !important;
                            flex-direction: column;
                            align-content: center;
                            justify-content: center;
                            align-items: center;">
                        {{-- @foreach ($category->partners ?? [] as $partner) --}}
                        <div type="button" class="sponsor-logo">
                            <img src="{{ $partner->exhibitor_logo }}" alt="{{ $partner->name }}">
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
                                <a style="text-decoration: none; color:black" target="_blank"
                                    href="{{ $partner->twitter }}">
                                    <i class="bi bi-twitter-x"></i>
                                </a>
                                <a target="_blank" href="{{ $partner->linkedin }}">
                                    <i class="bi bi-linkedin"></i>
                                </a>
                                <a style="text-decoration: none; color:red" target="_blank" href="{{ $partner->youtube }}">
                                    <i class="bi bi-youtube"></i>
                                </a>
                                <a style="text-decoration: none; color:rgb(252, 127, 148)" target="_blank"
                                    href="{{ $partner->insta }}">
                                    <i class="bi bi-instagram"></i>
                                </a>
                                <a style="text-decoration: none; color:black" target="_blank"
                                    href="{{ $partner->tiktok }}">
                                    <i class="bi bi-tiktok"></i>
                                </a>
                            @endif
                            <p class="text-muted">{{ $partner->address }}</p>

                            <!-- Description with Show More functionality -->
                            <div class="description-container">
                                @if (strlen($partner->description) > 100)
                                    <p class="description-text short-description" id="shortPartnerDesc{{ $partner->id }}">
                                        {{ substr($partner->description, 0, 100) }}...</p>
                                    <p class="description-text full-description text-muted d-none"
                                        id="fullPartnerDesc{{ $partner->id }}">{{ $partner->description }}</p>
                                    <button class="btn show-more-btn p-0" data-partner-id="{{ $partner->id }}">Show
                                        More</button>
                                @else
                                    <p class="text-muted">{{ $partner->description }}</p>
                                @endif
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
                                            <a style="text-decoration: none; color:black" target="_blank"
                                                href="{{ $partner->twitter }}">
                                                <i class="bi bi-twitter-x"></i>
                                            </a>
                                            <a target="_blank" href="{{ $partner->linkedin }}">
                                                <i class="bi bi-linkedin"></i>
                                            </a>
                                            <a style="text-decoration: none; color:red" target="_blank"
                                                href="{{ $partner->youtube }}">
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
                                                    id="fullPartnerDesc{{ $partner->id }}">{{ $partner->description }}
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
    {{-- @endif --}}

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
@endsection
