@extends('event-website.layouts.layout')

@section('content')
    <style>
        body {
            background-color: var(--color-neutral-50);
        }
    </style>
    <section id="schedule" class="schedule">
        <div class="container">
            <div class="section-header">
                <span class="section-tag">Event Schedule</span>
                <h2 class="section-title">Schedule</h2>
                {{-- <p class="section-subtitle">Plan your DevCon experience with our comprehensive schedule</p> --}}
            </div>
            <div class="schedule-tabs">
                @foreach ($event->dates as $date)
                    <button class="tab-btn {{ $loop->first ? 'active' : '' }}" data-day="day{{ $loop->index + 1 }}">Day
                        {{ $loop->index + 1 }} <span>{{ date('M j', strtotime($date->date)) }}</span></button>
                @endforeach
            </div>
            <div class="schedule-content">
                @foreach ($event->dates as $date)
                    <div class="schedule-day {{ $loop->first ? 'active' : '' }}" id="day{{ $loop->index + 1 }}">
                        <div class="schedule-timeline">
                            @foreach ($date->eventSessions as $session)
                                <div class="timeline-item">
                                    <div class="timeline-time">
                                        <span>{{ Str::substr($session->start_time, 0, 5) }}</span>
                                        <span>-</span>
                                        <span>{{ Str::substr($session->end_time, 0, 5) }}</span>
                                    </div>
                                    <div class="timeline-content">
                                        <div class="session-card">
                                            <h3 class="session-title">{{ $session->name }}</h3>
                                            <div class="session-details">
                                                <div class="session-speaker">
                                                    @isset($session->eventSpeaker)
                                                        <img src="{{ $session->eventSpeaker->avatar }}"
                                                            alt="{{ $session->eventSpeaker->name }}" class="speaker-avatar">
                                                        <span>{{ $session->eventSpeaker->name }}</span>
                                                    @endisset
                                                </div>
                                                <div class="session-location">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                        <circle cx="12" cy="10" r="3"></circle>
                                                    </svg>
                                                    <span>{{ $session->eventPlatform->name }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </section>
@endsection
