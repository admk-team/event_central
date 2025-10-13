@extends('event-website.layouts.layout')

@section('style')
    <!-- Dependency Styles -->
    <link id="style-bundle" rel="stylesheet" href="{{ asset('design3/bundle.css') }}" type="text/css" />

    <link
        href="https://fonts.googleapis.com/css2?family=Exo:wght@400;500;600;700;800&family=Open+Sans:wght@400;500;600;700;800&display=swap"
        rel="stylesheet" />

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

    @vite(['resources/css/design3/variables.css'])

    @vite(['resources/css/design3/index.css'])

    @vite(['resources/css/design3/schedule_style.css'])
@endsection


<div id="main_content" class="main-content">

    @section('header')
        @include('event-website.themes.design3.header')
    @endsection

    @section('content')
        <!-- ============ Tiny tab switcher (uses your existing classes) ============ -->
        <script>
            document.addEventListener('DOMContentLoaded', () => {
                const tabs = document.querySelectorAll('.schedule .tab-btn');
                const days = document.querySelectorAll('.schedule .schedule-day');

                if (!tabs.length || !days.length) return;

                tabs.forEach(btn => {
                    btn.addEventListener('click', () => {
                        const target = btn.getAttribute('data-day');
                        tabs.forEach(t => t.classList.remove('active'));
                        btn.classList.add('active');
                        days.forEach(d => d.classList.toggle('active', d.id === target));
                    });
                });
            });
        </script>
        <section id="schedule" class="schedule register--grid" x-data="{
            selectedTracks: [],
            selectedPlatforms: [],
            toggleTrackSelection(trackId) {
                if (this.selectedTracks.includes(trackId)) {
                    this.selectedTracks = this.selectedTracks.filter(id => id !== trackId)
                } else {
                    this.selectedTracks.push(trackId)
                }
            },
            clearTrackSelections() {
                this.selectedTracks = [];
            },
            trackSelected(trackId) {
                return this.selectedTracks.includes(trackId)
            },
            hasSelectedTracks(ids) {
                if (this.selectedTracks.length === 0) {
                    return true
                }

                for (const id of ids) {
                    if (this.selectedTracks.includes(id)) {
                        return true
                    }
                }

                return false
            },

            togglePlatformSelection(platformId) {
                if (this.selectedPlatforms.includes(platformId)) {
                    this.selectedPlatforms = this.selectedPlatforms.filter(id => id !== platformId)
                } else {
                    this.selectedPlatforms.push(platformId)
                }
            },
            clearPlatformSelections() {
                this.selectedPlatforms = [];
            },
            platformSelected(platformId) {
                return this.selectedPlatforms.includes(platformId)
            },
            hasSelectedPlatform(id) {
                if (this.selectedPlatforms.length === 0) {
                    return true
                }

                return this.selectedPlatforms.includes(id)
            }
        }">
            <div class="container">
                <div class="schedule-section-header">
                    <h2 class="schedule-section-tag">Event Schedule</h2>
                    <h2 class="schedule-section-title">Schedule</h2>
                    {{-- <p class="section-subtitle">Plan your DevCon experience with our comprehensive schedule</p> --}}
                </div>
                <div class="schedule-tabs">
                    @foreach ($event->dates as $date)
                        <button class="tab-btn {{ $loop->first ? 'active' : '' }}" data-day="day{{ $loop->index + 1 }}">Day
                            {{ $loop->index + 1 }} <span>{{ date('M j', strtotime($date->date)) }}</span></button>
                    @endforeach
                </div>
                @if ($enableTracks)
                    <div class="tracks">
                        <h2 class="tracks-title">Tracks:</h2>
                        <div class="tracks-filter">
                            @foreach ($tracks as $track)
                                <button @click="toggleTrackSelection({{ $track->id }})"
                                    :style="trackSelected({{ $track->id }}) ? {
                                        backgroundColor: '{{ $track->color }}',
                                        color: 'white'
                                    } : { border: '1px solid {{ $track->color }}' }"
                                    class="btn">
                                    {{ $track->name }}
                                </button>
                            @endforeach
                            <template x-if="selectedTracks.length">
                                <button @click="clearTrackSelections" class="btn btn-secondary">&#10006;</button>
                            </template>
                        </div>
                    </div>
                @endif
                <div class="locations">
                    <h4 class="location-title">Locations:</h4>
                    <div class="locations-filter">
                        @foreach ($eventPlatforms as $platform)
                            <button @click="togglePlatformSelection({{ $platform->id }})" class="platform-btn"
                                :class="platformSelected({{ $platform->id }}) && { active: true }">
                                {{ $platform->name }}
                            </button>
                        @endforeach
                        <template x-if="selectedPlatforms.length">
                            <button @click="clearPlatformSelections" class="btn btn-secondary">&#10006;</button>
                        </template>
                    </div>
                </div>
                <div class="schedule-content">
                    @foreach ($event->dates as $date)
                        <div class="schedule-day {{ $loop->first ? 'active' : '' }}" id="day{{ $loop->index + 1 }}">
                            <div class="schedule-timeline">
                                @foreach ($date->eventSessions()->orderBy('start_time')->get() as $session)
                                    <div x-show="hasSelectedTracks({{ $session->tracks->pluck('id') }}) && hasSelectedPlatform({{ $session->event_platform_id }})"
                                        class="timeline-item" type="button" data-bs-toggle="modal"
                                        data-bs-target="#sessionModal{{ $session->id }}">
                                        <div class="timeline-time">
                                            <span>{{ \Illuminate\Support\Carbon::createFromFormat('H:i:s', $session->start_time)->format('h:i A') }}</span>
                                            <span>-</span>
                                            <span>{{ \Illuminate\Support\Carbon::createFromFormat('H:i:s', $session->end_time)->format('h:i A') }}</span>
                                        </div>
                                        <div class="timeline-content">
                                            <div class="session-card">
                                                @if ($enableTracks && $session->tracks->count() > 0)
                                                    <div class="d-flex flex-wrap gap-2 mb-2">
                                                        @foreach ($session->tracks->slice(0, 3) as $track)
                                                            <div class="rounded"
                                                                style="background-color: {{ $track->color }}; width: 30px; height: 8px;">
                                                            </div>
                                                        @endforeach
                                                    </div>
                                                @endif
                                                <h3 class="session-title">{{ $session->name }}</h3>
                                                <div class="session-details">
                                                    <div class="session-speaker">
                                                        @isset($session->eventSpeakers)
                                                            @if (count($session->eventSpeakers) === 1)
                                                                {{-- Show avatar and name for single speaker --}}
                                                                @foreach ($session->eventSpeakers as $speaker)
                                                                    <img src="{{ $speaker->avatar }}"
                                                                        alt="{{ $speaker->name }}" class="speaker-avatar">
                                                                    <span>{{ $speaker->name }}</span>
                                                                @endforeach
                                                            @else
                                                                {{-- Show only avatars for multiple speakers --}}
                                                                @foreach ($session->eventSpeakers as $speaker)
                                                                    <img src="{{ $speaker->avatar }}"
                                                                        alt="{{ $speaker->name }}" class="speaker-avatar">
                                                                @endforeach
                                                            @endif
                                                        @endisset
                                                    </div>
                                                    <div class="session-location">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18"
                                                            height="18" viewBox="0 0 24 24" fill="none"
                                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round">
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
                                    <div class="modal fade text-dark" id="sessionModal{{ $session->id }}" tabindex="-1"
                                        aria-labelledby="sessionModalLabel{{ $session->id }}" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered">
                                            <div class="modal-content">
                                                <!-- {{ $session }} -->
                                                <div class="modal-body px-4">

                                                    @if ($enableTracks && $session->tracks->count() > 0)
                                                        <div class="d-flex flex-wrap gap-2 mb-2 justify-content-center">
                                                            @foreach ($session->tracks as $track)
                                                                <div class="rounded p-1"
                                                                    style="border:1px solid {{ $track->color }} ;font-size: 2rem;">
                                                                    {{ $track->name }}</div>
                                                            @endforeach
                                                        </div>
                                                    @endif

                                                    <h5 class="modal-title text-center"
                                                        id="sessionModalLabel{{ $session->id }}">{{ $session->name }}
                                                    </h5>
                                                    <div class="text-center">
                                                        <p class="mb-0" style="font-size: 2rem;"><span class="text-muted"
                                                                style="font-size: 2rem;">Type:
                                                            </span>{{ $session->type }}</p>
                                                        @if ($session->capacity)
                                                            <p style="font-size: 2rem;"><span class="text-muted"
                                                                    style="font-size: 2rem;">Capacity:
                                                                </span>{{ $session->capacity }}</p>
                                                        @endif
                                                        <p style="font-size: 2rem;">

                                                            {{ \Illuminate\Support\Carbon::createFromFormat('H:i:s', $session->start_time)->format('h:i A') }}
                                                            -
                                                            {{ \Illuminate\Support\Carbon::createFromFormat('H:i:s', $session->end_time)->format('h:i A') }}
                                                        </p>
                                                        <!-- Description with Show More functionality -->
                                                        <div class="description-container mt-1">
                                                            @if (strlen($session->description) > 100)
                                                                <p class="description-text short-description"
                                                                    style="font-size: 2rem;"
                                                                    id="shortDesc{{ $session->id }}">
                                                                    {{ substr($session->description, 0, 100) }}...</p>
                                                                <p class="description-text full-description text-muted d-none"
                                                                    style="font-size: 2rem;"
                                                                    id="fullDesc{{ $session->id }}">
                                                                    {{ $session->description }}</p>
                                                                <button class="btn show-more-btn p-0"
                                                                    style="font-size: 2rem;"
                                                                    data-session-id="{{ $session->id }}">Show
                                                                    More</button>
                                                            @else
                                                                <p style="font-size: 2rem;">{{ $session->description }}
                                                                </p>
                                                            @endif
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="modal-footer flex flex-wrap justify-content-center gap-3">
                                                    @isset($session->eventSpeakers)
                                                        @foreach ($session->eventSpeakers as $speaker)
                                                            <div
                                                                class="text-center d-flex justify-content-center align-items-center gap-1">
                                                                <img src="{{ $speaker->avatar }}" alt="{{ $speaker->name }}"
                                                                    class="speaker-avatar">
                                                                <span style="font-size: 2rem;">{{ $speaker->name }}</span>
                                                            </div>
                                                        @endforeach
                                                    @endisset
                                                </div>
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
</div>
@section('script')
    <!-- Dependency Scripts -->
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <script id="script-bundle" src="{{ asset('design3/bundle.js') }}"></script>
    <script id="color-switcher" src="{{ asset('design3/switcher.js') }}"></script>
    <!-- Site Scripts -->
    <script src="{{ asset('design3/app.js') }}"></script>
@endsection
