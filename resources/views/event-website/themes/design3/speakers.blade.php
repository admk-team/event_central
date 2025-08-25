@extends('event-website.layouts.layout')

@section('style')
    <link
        href="https://fonts.googleapis.com/css2?family=Exo:wght@400;500;600;700&family=Open+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet" />
    @vite(['resources/css/design3/variables.css'])
    @vite(['resources/css/design3/index.css'])
    @vite(['resources/css/design3/speakers_style.css'])
@endsection

<div id="main_content" class="main-content">

    @section('header')
        @include('event-website.themes.design3.header')
    @endsection

    @section('content')
        <section id="staggered-speakers" class="staggered-speakers-section">
            <div class="container">
                <div class="section-title text-center" style="margin-top: 8%">
                    <h2>Meet Our Speakers</h2>
                </div>

                <div class="speakers-staggered">
                    @foreach ($event->event_speakers ?? [] as $index => $speaker)
                        <div class="speaker-item {{ $index % 2 == 0 ? 'right' : 'left' }}" data-bs-toggle="modal"
                            data-bs-target="#speakerModal{{ $speaker->id }}">
                            <div class="speaker-img">
                                <img src="{{ $speaker->avatar }}" alt="{{ $speaker->name }}">
                            </div>
                            <div class="speaker-desc">
                                <h3>{{ $speaker->name }}</h3>
                                <p class="speaker-position">
                                    {{ implode(', ', array_filter([$speaker->position, $speaker->company])) }}</p>
                                <p class="speaker-bio">{{ substr($speaker->bio, 0, 120) }}...</p>
                            </div>
                        </div>
                        <hr>

                        <!-- Modal (same as before) -->
                        <div class="modal fade" id="speakerModal{{ $speaker->id }}" tabindex="-1"
                            aria-labelledby="modalLabel{{ $speaker->id }}" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content p-4">
                                    <div class="text-center">
                                        <img class="rounded-circle modal-avatar"
                                            src="{{ $speaker->avatar ? $speaker->avatar : '$event->logo' }}"
                                            alt="{{ $speaker->name }}">
                                        <h5 class="mt-3">{{ $speaker->name }}</h5>
                                        <h5 class="text-muted">{{ $speaker->email }}</h5>
                                        <h5 class="text-muted">{{ $speaker->phone }}</h5>
                                        <h5>{{ $speaker->company }}</h5>
                                        <h5 class="text-muted">{{ $speaker->position }}</h5>

                                        <div class="bio-container">
                                            @if (strlen($speaker->bio) > 100)
                                                <h6 class="bio-text short-bio" id="shortBio{{ $speaker->id }}">
                                                    {{ substr($speaker->bio, 0, 100) }}...</h6>
                                                <h6 class="bio-text full-bio d-none" id="fullBio{{ $speaker->id }}">
                                                    {{ $speaker->bio }}</h6>
                                                <span class="btn show-more-btn" data-speaker-id="{{ $speaker->id }}">Show
                                                    More</span>
                                            @else
                                                <h6 class="bio-text">{{ $speaker->bio }}</h6>
                                            @endif
                                        </div>
                                    </div>

                                    <div class="modal-footer justify-content-center">
                                        @if ($speaker->web)
                                            <a target="_blank" href="{{ $speaker->web }}"><i class="bi bi-globe"></i></a>
                                        @endif
                                        @if ($speaker->linkedin)
                                            <a target="_blank" href="{{ $speaker->linkedin }}"><i
                                                    class="bi bi-linkedin text-info"></i></a>
                                        @endif
                                        @if ($speaker->facebook)
                                            <a target="_blank" href="{{ $speaker->facebook }}"><i
                                                    class="bi bi-facebook text-primary"></i></a>
                                        @endif
                                        @if ($speaker->twitter)
                                            <a target="_blank" href="{{ $speaker->twitter }}"><i
                                                    class="bi bi-twitter-x text-black"></i></a>
                                        @endif
                                        @if ($speaker->instagram)
                                            <a target="_blank" href="{{ $speaker->instagram }}"><i
                                                    class="bi bi-instagram text-danger-emphasis"></i></a>
                                        @endif
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </section>
    @endsection
</div>

@section('script')
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const showMoreButtons = document.querySelectorAll('.show-more-btn');
            showMoreButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.dataset.speakerId;
                    const shortBio = document.getElementById('shortBio' + id);
                    const fullBio = document.getElementById('fullBio' + id);
                    if (fullBio.classList.contains('d-none')) {
                        shortBio.classList.add('d-none');
                        fullBio.classList.remove('d-none');
                        this.textContent = 'Show Less';
                    } else {
                        shortBio.classList.remove('d-none');
                        fullBio.classList.add('d-none');
                        this.textContent = 'Show More';
                    }
                });
            });
        });
    </script>
@endsection
