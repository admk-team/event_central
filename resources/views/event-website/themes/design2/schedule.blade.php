@extends('event-website.layouts.layout')

@section('style')
    @vite(['resources/css/design2/index_styles.css'])
    @vite(['resources/css/design2/schedule_styles.css'])
@endsection

@section('header')
    @include('event-website.themes.design2.header')
@endsection

@section('content')
    {{-- Alpine for filters --}}
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

    {{-- Tabs switching --}}
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

    <section id="schedule" class="tickets" x-data="{
        selectedTracks: [],
        selectedPlatforms: [],
        toggleTrackSelection(id) { this.selectedTracks = this.selectedTracks.includes(id) ? this.selectedTracks.filter(x => x !== id) : [...this.selectedTracks, id] },
        clearTrackSelections() { this.selectedTracks = [] },
        trackSelected(id) { return this.selectedTracks.includes(id) },
        hasSelectedTracks(ids) { if (!this.selectedTracks.length) return true; for (const id of ids) { if (this.selectedTracks.includes(id)) return true } return false },
    
        togglePlatformSelection(id) { this.selectedPlatforms = this.selectedPlatforms.includes(id) ? this.selectedPlatforms.filter(x => x !== id) : [...this.selectedPlatforms, id] },
        clearPlatformSelections() { this.selectedPlatforms = [] },
        platformSelected(id) { return this.selectedPlatforms.includes(id) },
        hasSelectedPlatform(id) { return !this.selectedPlatforms.length || this.selectedPlatforms.includes(id) }
    }">
        <div class="container">

            <div class="section-head">
                <span class="eyebrow">Event Schedule</span>
                <h2>Schedule</h2>
            </div>

            {{-- Day tabs --}}
            <div class="schedule-tabs">
                @foreach ($event->dates as $date)
                    <button class="tab-btn {{ $loop->first ? 'active' : '' }}" data-day="day{{ $loop->index + 1 }}">
                        Day {{ $loop->index + 1 }} <span>{{ date('M j', strtotime($date->date)) }}</span>
                    </button>
                @endforeach
            </div>

            {{-- ===== NEW LAYOUT: sticky filters aside + sessions pane ===== --}}
            <div class="schedule-layout">
                {{-- Sticky FILTERS (desktop) --}}
                <aside class="filters-aside">
                    {{-- Tracks --}}
                    @if ($enableTracks)
                        <div class="tracks panel">
                            <div class="panel__head">
                                <h4>Tracks</h4>
                                <template x-if="selectedTracks.length">
                                    <button @click="clearTrackSelections" class="btn btn-secondary btn-clear"
                                        aria-label="Clear track filters">Clear</button>
                                </template>
                            </div>
                            <div class="tracks-filter">
                                @foreach ($tracks as $track)
                                    <button @click="toggleTrackSelection({{ $track->id }})"
                                        :style="trackSelected({{ $track->id }}) ? { backgroundColor: '{{ $track->color }}',
                                            color: 'white' } : { border: '1px solid {{ $track->color }}' }"
                                        class="btn chip-btn">{{ $track->name }}</button>
                                @endforeach
                            </div>
                        </div>
                    @endif

                    {{-- Locations --}}
                    <div class="locations panel">
                        <div class="panel__head">
                            <h4>Locations</h4>
                            <template x-if="selectedPlatforms.length">
                                <button @click="clearPlatformSelections" class="btn btn-secondary btn-clear"
                                    aria-label="Clear location filters">Clear</button>
                            </template>
                        </div>
                        <div class="locations-filter">
                            @foreach ($eventPlatforms as $platform)
                                <button @click="togglePlatformSelection({{ $platform->id }})" class="platform-btn chip-btn"
                                    :class="platformSelected({{ $platform->id }}) && { active: true }">{{ $platform->name }}</button>
                            @endforeach
                        </div>
                    </div>

                    {{-- Active filters summary --}}
                    <div class="filter-summary" x-show="selectedTracks.length || selectedPlatforms.length">
                        <div class="summary-chip" x-show="selectedTracks.length">Tracks: <strong
                                x-text="selectedTracks.length"></strong></div>
                        <div class="summary-chip" x-show="selectedPlatforms.length">Locations: <strong
                                x-text="selectedPlatforms.length"></strong></div>
                    </div>
                </aside>

                {{-- Sessions column --}}
                <div class="sessions-pane">
                    <div class="schedule-content">
                        @foreach ($event->dates as $date)
                            <div class="schedule-day {{ $loop->first ? 'active' : '' }}" id="day{{ $loop->index + 1 }}">
                                <div class="schedule-timeline">
                                    @foreach ($date->eventSessions()->orderBy('start_time')->get() as $session)
                                        <div x-show="hasSelectedTracks({{ $session->tracks->pluck('id') }}) && hasSelectedPlatform({{ $session->event_platform_id }})"
                                            class="timeline-item" type="button" data-bs-toggle="modal"
                                            data-bs-target="#sessionModal{{ $session->id }}">
                                            {{-- time rail --}}
                                            <div class="timeline-time">
                                                <span>{{ \Illuminate\Support\Carbon::createFromFormat('H:i:s', $session->start_time)->format('h:i A') }}</span>
                                                <span>-</span>
                                                <span>{{ \Illuminate\Support\Carbon::createFromFormat('H:i:s', $session->end_time)->format('h:i A') }}</span>
                                            </div>

                                            {{-- content --}}
                                            <div class="timeline-content">
                                                <div class="session-card">
                                                    @if ($enableTracks && $session->tracks->count() > 0)
                                                        <div class="track-swatches mb-2">
                                                            @foreach ($session->tracks->slice(0, 3) as $track)
                                                                <span class="swatch"
                                                                    style="background-color: {{ $track->color }}"></span>
                                                            @endforeach
                                                        </div>
                                                    @endif

                                                    <h3 class="session-title">{{ $session->name }}</h3>

                                                    <div class="session-details">
                                                        <div class="session-speaker">
                                                            @isset($session->eventSpeakers)
                                                                @if (count($session->eventSpeakers) === 1)
                                                                    @foreach ($session->eventSpeakers as $speaker)
                                                                        <img src="{{ $speaker->avatar }}"
                                                                            alt="{{ $speaker->name }}" class="speaker-avatar">
                                                                        <span>{{ $speaker->name }}</span>
                                                                    @endforeach
                                                                @else
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
                                                                stroke="currentColor" stroke-width="2"
                                                                stroke-linecap="round" stroke-linejoin="round">
                                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z">
                                                                </path>
                                                                <circle cx="12" cy="10" r="3"></circle>
                                                            </svg>
                                                            <span>{{ $session->eventPlatform->name }}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {{-- ================= Session Modal ================= --}}
                                        <div class="modal fade text-dark" id="sessionModal{{ $session->id }}"
                                            tabindex="-1" aria-labelledby="sessionModalLabel{{ $session->id }}"
                                            aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered">
                                                <div class="modal-content">
                                                    <div class="modal-body px-4">
                                                        @if ($enableTracks && $session->tracks->count() > 0)
                                                            <div class="d-flex flex-wrap gap-2 mb-2 justify-content-center">
                                                                @foreach ($session->tracks as $track)
                                                                    <div class="rounded p-1"
                                                                        style="border:1px solid {{ $track->color }}">
                                                                        {{ $track->name }}</div>
                                                                @endforeach
                                                            </div>
                                                        @endif

                                                        <h5 class="modal-title text-center"
                                                            id="sessionModalLabel{{ $session->id }}">{{ $session->name }}
                                                        </h5>

                                                        <div class="text-center">
                                                            <p class="mb-0"><span class="text-muted">Type:</span>
                                                                {{ $session->type }}</p>
                                                            @if ($session->capacity)
                                                                <p><span class="text-muted">Capacity:</span>
                                                                    {{ $session->capacity }}</p>
                                                            @endif
                                                            <p>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                                    height="24" viewBox="0 0 24 24" style="fill:#000">
                                                                    <path
                                                                        d="M12.25 2c-5.514 0-10 4.486-10 10s4.486 10 10 10 10-4.486 10-10-4.486-10-10-10zM18 13h-6.75V6h2v5H18v2z">
                                                                    </path>
                                                                </svg>
                                                                {{ \Illuminate\Support\Carbon::createFromFormat('H:i:s', $session->start_time)->format('h:i A') }}
                                                                -
                                                                {{ \Illuminate\Support\Carbon::createFromFormat('H:i:s', $session->end_time)->format('h:i A') }}
                                                            </p>

                                                            {{-- Session Show More --}}
                                                            <div class="description-container mt-1">
                                                                @if (!empty($session->description) && strlen($session->description) > 100)
                                                                    <p class="description-text short-description"
                                                                        id="shortDesc{{ $session->id }}">
                                                                        {{ substr($session->description, 0, 100) }}...</p>
                                                                    <p class="description-text full-description text-muted d-none"
                                                                        id="fullDesc{{ $session->id }}">
                                                                        {{ $session->description }}</p>
                                                                    <button class="btn show-more-btn p-0"
                                                                        data-session-id="{{ $session->id }}">Show
                                                                        More</button>
                                                                @else
                                                                    <p>{{ $session->description }}</p>
                                                                @endif
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="modal-footer flex flex-wrap justify-content-center gap-3">
                                                        @isset($session->eventSpeakers)
                                                            @foreach ($session->eventSpeakers as $speaker)
                                                                @php
                                                                    $speakerKey = $session->id . '_' . $speaker->id;
                                                                    $speakerModalId = "speakerModal{$speakerKey}";
                                                                @endphp

                                                                <div
                                                                    class="text-center d-flex justify-content-center align-items-center gap-1">
                                                                    <div class="speaker-trigger d-inline-flex align-items-center gap-1"
                                                                        role="button" tabindex="0"
                                                                        data-target="#{{ $speakerModalId }}"
                                                                        aria-label="Open {{ $speaker->name }} details">
                                                                        <img src="{{ $speaker->avatar }}"
                                                                            alt="{{ $speaker->name }}"
                                                                            class="speaker-avatar">
                                                                        <span>{{ $speaker->name }}</span>
                                                                    </div>
                                                                </div>

                                                                {{-- UNIQUE speaker modal per session+speaker --}}
                                                                <div class="modal fade" id="{{ $speakerModalId }}"
                                                                    tabindex="-1"
                                                                    aria-labelledby="modalLabel{{ $speakerModalId }}"
                                                                    aria-hidden="true">
                                                                    <div class="modal-dialog modal-dialog-centered">
                                                                        <div class="modal-content pt-3">
                                                                            <div class="d-flex justify-content-center">
                                                                                <img class="rounded-circle"
                                                                                    src="{{ $speaker->avatar ?: $event->logo }}"
                                                                                    width="150" height="150"
                                                                                    alt="{{ $speaker->name }}">
                                                                            </div>
                                                                            <div class="px-4 text-center">
                                                                                <h5>{{ $speaker->name }}</h5>
                                                                                @if ($speaker->email)
                                                                                    <p class="text-muted mb-0">
                                                                                        {{ $speaker->email }}</p>
                                                                                @endif
                                                                                @if ($speaker->phone)
                                                                                    <p class="text-muted">
                                                                                        {{ $speaker->phone }}</p>
                                                                                @endif
                                                                                @if ($speaker->company)
                                                                                    <p class="mb-0">{{ $speaker->company }}
                                                                                    </p>
                                                                                @endif
                                                                                @if ($speaker->position)
                                                                                    <p class="text-muted">
                                                                                        {{ $speaker->position }}</p>
                                                                                @endif

                                                                                <div class="bio-container">
                                                                                    @if (!empty($speaker->bio) && strlen($speaker->bio) > 100)
                                                                                        <p class="text-muted bio-text short-bio"
                                                                                            id="shortBio{{ $speakerKey }}">
                                                                                            {{ substr($speaker->bio, 0, 100) }}...
                                                                                        </p>
                                                                                        <p class="text-muted bio-text full-bio d-none"
                                                                                            id="fullBio{{ $speakerKey }}">
                                                                                            {{ $speaker->bio }}</p>
                                                                                        <span class="btn show-more-btn p-0"
                                                                                            data-speaker-key="{{ $speakerKey }}">Show
                                                                                            More</span>
                                                                                    @elseif(!empty($speaker->bio))
                                                                                        <p class="text-muted">
                                                                                            {{ $speaker->bio }}</p>
                                                                                    @endif
                                                                                </div>
                                                                            </div>
                                                                            <div
                                                                                class="modal-footer text-center d-flex justify-content-center gap-3">
                                                                                @if ($speaker->web)
                                                                                    <a target="_blank"
                                                                                        href="{{ $speaker->web }}"
                                                                                        aria-label="Website"><i
                                                                                            class="bi bi-globe"></i></a>
                                                                                @endif
                                                                                @if ($speaker->linkedin)
                                                                                    <a target="_blank"
                                                                                        href="{{ $speaker->linkedin }}"
                                                                                        aria-label="LinkedIn"><i
                                                                                            class="bi bi-linkedin"></i></a>
                                                                                @endif
                                                                                @if ($speaker->facebook)
                                                                                    <a target="_blank"
                                                                                        href="{{ $speaker->facebook }}"
                                                                                        aria-label="Facebook"><i
                                                                                            class="bi bi-facebook"></i></a>
                                                                                @endif
                                                                                @if ($speaker->twitter)
                                                                                    <a target="_blank"
                                                                                        href="{{ $speaker->twitter }}"
                                                                                        aria-label="Twitter/X"><i
                                                                                            class="bi bi-twitter-x"></i></a>
                                                                                @endif
                                                                                @if ($speaker->instagram)
                                                                                    <a target="_blank"
                                                                                        href="{{ $speaker->instagram }}"aria-label="Instagram"><i
                                                                                            class="bi bi-instagram"></i></a>
                                                                                @endif
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            @endforeach
                                                        @endisset
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {{-- ================= /Session Modal ================= --}}
                                    @endforeach
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>{{-- /schedule-layout --}}
        </div>
    </section>

    {{-- Auto-select today's tab if present --}}
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const tabs = [...document.querySelectorAll('.schedule .tab-btn')];
            if (!tabs.length) return;
            const today = new Date();
            const fmt = new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day: 'numeric'
            }).format(today); // "Mar 5"
            const match = tabs.find(b => b.querySelector('span')?.textContent.trim() === fmt);
            if (match && !match.classList.contains('active')) match.click();
        });
    </script>

    {{-- Session Show More --}}
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('.show-more-btn[data-session-id]').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-session-id');
                    const shortEl = document.getElementById(`shortDesc${id}`);
                    const fullEl = document.getElementById(`fullDesc${id}`);
                    if (!shortEl || !fullEl) return;
                    const collapsed = fullEl.classList.contains('d-none');
                    shortEl.classList.toggle('d-none', collapsed);
                    fullEl.classList.toggle('d-none', !collapsed);
                    this.textContent = collapsed ? 'Show Less' : 'Show More';
                });
            });
        });
    </script>

    {{-- Speaker Show More (delegated; uses unique speakerKey) --}}
    <script>
        document.addEventListener('click', function(e) {
            const btn = e.target.closest('.show-more-btn[data-speaker-key]');
            if (!btn) return;
            const key = btn.getAttribute('data-speaker-key'); // e.g., "12_34"
            const shortEl = document.getElementById(`shortBio${key}`);
            const fullEl = document.getElementById(`fullBio${key}`);
            if (!shortEl || !fullEl) return;
            const collapsed = fullEl.classList.contains('d-none');
            shortEl.classList.toggle('d-none', collapsed);
            fullEl.classList.toggle('d-none', !collapsed);
            btn.textContent = collapsed ? 'Show Less' : 'Show More';
        });
    </script>

    {{-- Modal handoff (close session → open speaker), with re-entry guard --}}
    <script>
        (function() {
            let transitioning = false;

            document.addEventListener('click', function(e) {
                const trigger = e.target.closest('.speaker-trigger');
                if (!trigger) return;
                if (transitioning) return;
                transitioning = true;

                e.preventDefault();

                const targetSel = trigger.getAttribute('data-target');
                const id = targetSel && targetSel.startsWith('#') ? targetSel.slice(1) : null;
                if (!id) {
                    transitioning = false;
                    return;
                }

                let targetEl = document.getElementById(id);
                if (!targetEl) {
                    transitioning = false;
                    return;
                }

                const parentModalEl = trigger.closest('.modal');

                // Hoist once if nested inside current modal
                if (parentModalEl && parentModalEl.contains(targetEl) && targetEl.parentElement !== document
                    .body) {
                    document.body.appendChild(targetEl);
                }

                if (document.activeElement) document.activeElement.blur();

                const showTarget = () => {
                    const next = bootstrap.Modal.getInstance(targetEl) || new bootstrap.Modal(targetEl, {
                        focus: true
                    });
                    if (!targetEl.classList.contains('show')) {
                        targetEl.addEventListener('shown.bs.modal', () => {
                            transitioning = false;
                        }, {
                            once: true
                        });
                        next.show();
                    } else {
                        transitioning = false;
                        targetEl.querySelector('.modal-dialog')?.focus?.();
                    }
                };

                if (parentModalEl) {
                    parentModalEl.setAttribute('inert', '');
                    const current = bootstrap.Modal.getInstance(parentModalEl) || new bootstrap.Modal(
                        parentModalEl);
                    parentModalEl.addEventListener('hidden.bs.modal', () => {
                        parentModalEl.removeAttribute('inert');
                        showTarget();
                    }, {
                        once: true
                    });
                    current.hide();
                } else {
                    showTarget();
                }
            });

            // Keyboard support
            document.addEventListener('keydown', function(e) {
                if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('.speaker-trigger')) {
                    e.preventDefault();
                    e.target.click();
                }
            });
        })();
    </script>

    <style>
        .speaker-trigger {
            cursor: pointer;
        }

        .speaker-trigger:hover {
            opacity: .95;
        }
    </style>
@endsection
