@extends('event-website.layouts.layout')
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
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
                    @foreach ($date->eventSessions()->orderBy('start_time')->get() as $session)
                    <div class="timeline-item" type="button" data-bs-toggle="modal" data-bs-target="#sessionModal{{ $session->id }}">
                        <div class="timeline-time">
                            <span>{{ \Illuminate\Support\Carbon::createFromFormat('H:i:s', $session->start_time)->format('h:i A') }}</span>
                            <span>-</span>
                            <span>{{ \Illuminate\Support\Carbon::createFromFormat('H:i:s', $session->end_time)->format('h:i A') }}</span>
                        </div>
                        <div class="timeline-content">
                            <div class="session-card">
                                <h3 class="session-title">{{ $session->name }}</h3>
                                <div class="session-details">
                                    <div class="session-speaker">
                                        @isset($session->eventSpeakers)
                                        @if(count($session->eventSpeakers) === 1)
                                        {{-- Show avatar and name for single speaker --}}
                                        @foreach($session->eventSpeakers as $speaker)
                                        <img src="{{ $speaker->avatar }}" alt="{{ $speaker->name }}" class="speaker-avatar">
                                        <span>{{ $speaker->name }}</span>
                                        @endforeach
                                        @else
                                        {{-- Show only avatars for multiple speakers --}}
                                        @foreach($session->eventSpeakers as $speaker)
                                        <img src="{{ $speaker->avatar }}" alt="{{ $speaker->name }}" class="speaker-avatar">
                                        @endforeach
                                        @endif
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
                    <!-- ////////////////////////////////////////////////////// modal start-->
                    <div class="modal fade text-dark" id="sessionModal{{ $session->id }}" tabindex="-1" aria-labelledby="sessionModalLabel{{ $session->id }}" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <!-- {{$session}} -->
                                <div class="modal-body px-4">
                                    <h5 class="modal-title text-center" id="sessionModalLabel{{ $session->id }}">{{ $session->name }}</h5>
                                    <div class="text-center">
                                        <p>{{$session->type}}</p>
                                        <p>{{$session->capacity}}</p>
                                        <p>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
                                                <path d="M12.25 2c-5.514 0-10 4.486-10 10s4.486 10 10 10 10-4.486 10-10-4.486-10-10-10zM18 13h-6.75V6h2v5H18v2z"></path>
                                            </svg>
                                            {{\Illuminate\Support\Carbon::createFromFormat('H:i:s', $session->start_time)->format('h:i A')}} -
                                            {{\Illuminate\Support\Carbon::createFromFormat('H:i:s', $session->end_time)->format('h:i A')}}
                                        </p>
                                        <div class="">
                                            @isset($session->eventSpeakers)
                                            @foreach($session->eventSpeakers as $speaker)
                                            <div class="text-center d-flex justify-content-center align-items-center gap-2">
                                                <img src="{{ $speaker->avatar }}" alt="{{ $speaker->name }}" class="speaker-avatar">
                                                <span>{{ $speaker->name }}</span>
                                            </div>
                                            @endforeach
                                            @endisset
                                        </div>
                                       <!-- Description with Show More functionality -->
                                        <div class="description-container mt-1">
                                            @if (strlen($session->description) > 100)
                                            <p class="description-text short-description" id="shortDesc{{ $session->id }}">{{ substr($session->description, 0, 100) }}...</p>
                                            <p class="description-text full-description d-none" id="fullDesc{{ $session->id }}">{{ $session->description }}</p>
                                            <button class="btn show-more-btn p-0" data-session-id="{{ $session->id }}">Show More</button>
                                            @else
                                            <p>{{ $session->description }}</p>
                                            @endif
                                        </div>
                                    </div>
                                </div>
                                <!-- <div class="modal-footer">

                                </div> -->
                            </div>
                        </div>
                    </div>
                    <!-- ////////////////////////////////////////////////////// modal end -->
                    @endforeach
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
                const sessionId = this.getAttribute('data-session-id');
                const shortDesc = document.getElementById(`shortDesc${sessionId}`);
                const fullDesc = document.getElementById(`fullDesc${sessionId}`);

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