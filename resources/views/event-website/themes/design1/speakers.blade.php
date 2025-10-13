@extends('event-website.layouts.layout')
@section('style')
    @vite(['resources/css/design1/index_styles.css'])
    @vite(['resources/css/design1/speakers_styles.css'])
@endsection
@section('header')
    @include('event-website.themes.design1.header')

@endsection
@section('content')
    <section id="register" class="register register--grid mt-2">
        <div class="container">
            <div class="section-header light">
                <span class="section-tag">Meet Our Speakers</span>
                <h2 class="section-title">Speakers</h2>
            </div>
            <div class="speakers-grid">
                @foreach ($event->event_speakers ?? [] as $speaker)
                    <div type="button" data-bs-toggle="modal" data-bs-target="#speakerModal{{ $speaker->id }}"
                        class="speaker-card">
                        <div class="speaker-image">
                            <img src="{{ $speaker->avatar }}" alt="{{ $speaker->name }}">
                        
                        </div>
                        <div class="speaker-info">
                            <h3>{{ $speaker->name }}</h3>
                            <p class="speaker-role">
                                {{ implode(', ', array_filter([$speaker->position, $speaker->company])) }}</p>
                            <!-- <p class="speaker-bio">{{ $speaker->bio }}</p> -->
                        </div>
                    </div>
                    <!-- Modal -->
                    <div class="modal fade" id="speakerModal{{ $speaker->id }}" tabindex="-1"
                        aria-labelledby="modalLabel{{ $speaker->id }}" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content pt-3">
                                <div class="d-flex justify-content-center">
                                    <img class="rounded-circle"
                                        src="{{ $speaker->avatar ? $speaker->avatar : '$event->logo' }}" width="150px"
                                        height="150px" alt="{{ $speaker->name }}">
                                </div>
                                <div class="px-4 text-center">
                                    <h5>{{ $speaker->name }}</h5>
                                    <p class="text-muted mb-0">{{ $speaker->email }}</p>
                                    <p class="text-muted ">{{ $speaker->phone }}</p>
                                    <p class="mb-0">{{ $speaker->company }}</p>
                                    <p class="text-muted">{{ $speaker->position }}</p>

                                    <!-- Bio with Show More functionality -->
                                    <div class="bio-container">
                                        @if (strlen($speaker->bio) > 100)
                                            <p class="text-muted bio-text short-bio" id="shortBio{{ $speaker->id }}">
                                                {{ substr($speaker->bio, 0, 100) }}...</p>
                                            <p class="text-muted bio-text full-bio d-none" id="fullBio{{ $speaker->id }}">
                                                {{ $speaker->bio }}</p>
                                            <span class="btn show-more-btn p-0" data-speaker-id="{{ $speaker->id }}">Show
                                                More</span>
                                        @else
                                            <p class="text-muted">{{ $speaker->bio }}</p>
                                        @endif
                                    </div>
                                </div>
                                <div class="modal-footer text-center d-flex justify-content-center">
                                    <!-- Speakers website link -->
                                    @if ($speaker->web)
                                        <a target="_blank" href="{{ $speaker->web }}">
                                            <i class="bi bi-globe"></i>
                                        </a>
                                    @endif

                                    <!-- LinkedIn link -->
                                    @if ($speaker->linkedin)
                                        <a target="_blank" href="{{ $speaker->linkedin }}">
                                            <i class="bi bi-linkedin text-info"></i>
                                        </a>
                                    @endif

                                    <!-- Facebook link -->
                                    @if ($speaker->facebook)
                                        <a target="_blank" href="{{ $speaker->facebook }}">
                                            <i class="bi bi-facebook text-primary"></i>
                                        </a>
                                    @endif
                                    <!-- Twitter link -->
                                    @if ($speaker->twitter)
                                        <a target="_blank" href="{{ $speaker->twitter }}">
                                            <i class="bi bi-twitter-x text-black"></i>
                                        </a>
                                    @endif
                                    <!-- Instagram link -->
                                    @if ($speaker->instagram)
                                        <a target="_blank" href="{{ $speaker->instagram }}">
                                            <i class="bi bi-instagram text-danger-emphasis"></i>
                                        </a>
                                    @endif
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </section>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const showMoreButtons = document.querySelectorAll('.show-more-btn');

            showMoreButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const speakerId = this.getAttribute('data-speaker-id');
                    const shortBio = document.getElementById(`shortBio${speakerId}`);
                    const fullBio = document.getElementById(`fullBio${speakerId}`);

                    if (fullBio.classList.contains('d-none')) {
                        // Show full bio
                        shortBio.classList.add('d-none');
                        fullBio.classList.remove('d-none');
                        this.textContent = 'Show Less';
                    } else {
                        // Show short bio
                        shortBio.classList.remove('d-none');
                        fullBio.classList.add('d-none');
                        this.textContent = 'Show More';
                    }
                });
            });
        });
    </script>
@endsection
