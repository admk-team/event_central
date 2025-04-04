@extends('event-website.layouts.layout')

@section('content')
    <section id="speakers" class="speakers">
        <div class="container">
            <div class="section-header">
                <span class="section-tag">Meet Our Speakers</span>
                <h2 class="section-title">Speakers</h2>
                {{-- <p class="section-subtitle">Gain insights from leaders at the forefront of technology</p> --}}
            </div>
            <div class="speakers-grid">
                @foreach ($event->event_speakers ?? [] as $speaker)
                    <div class="speaker-card">
                        <div class="speaker-image">
                            <img src="{{ $speaker->avatar }}" alt="{{ $speaker->name }}">
                            {{-- <div class="speaker-social">
                                        <a href="#" aria-label="Twitter">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <path
                                                    d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z">
                                                </path>
                                            </svg>
                                        </a>
                                        <a href="#" aria-label="LinkedIn">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <path
                                                    d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z">
                                                </path>
                                                <rect x="2" y="9" width="4" height="12"></rect>
                                                <circle cx="4" cy="4" r="2"></circle>
                                            </svg>
                                        </a>
                                    </div> --}}
                        </div>
                        <div class="speaker-info">
                            <h3>{{ $speaker->name }}</h3>
                            <p class="speaker-role">{{ $speaker->position }}
                                {{ $speaker->company ? ', ' . $speaker->company : '' }}</p>
                            <p class="speaker-bio">{{ $speaker->bio }}</p>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </section>
@endsection