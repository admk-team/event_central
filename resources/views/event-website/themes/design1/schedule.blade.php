@extends('event-website.layouts.layout')
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
@section('header')
    @include('event-website.themes.design1.header')
@endsection
@section('content')
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
<!-- ============ SCHEDULE: REDESIGN CSS (NON-BREAKING) ============ -->
<style>
/* ==========================================================
   SCHEDULE — Modern Vertical Timeline + Filters + Tabs
   Uses your existing tokens & classes (no functionality changes)
   Sections:
   1) Section chrome
   2) Tabs
   3) Filters (Tracks / Locations)
   4) Timeline rail + items
   5) Session cards
   6) Modals
   7) Responsive
========================================================== */

/* ---------------------------------
   1) SECTION CHROME
--------------------------------- */
.schedule .section-header{
  text-align:center; margin-bottom: 1.5rem ;margin-top: 1rem;
}
.schedule .section-tag{
  display:inline-block; padding:.35rem .6rem; border-radius:999px;
  background: var(--color-primary-light); color: var(--color-primary-foreground);
  font-size: var(--font-size-xs); letter-spacing:.06em; text-transform:uppercase;
}
.schedule .section-title{ var(--color-primary-foreground);margin:.55rem 0 0; font-size:clamp(1.6rem,3vw,2.25rem); font-weight:800 }

/* ---------------------------------
   2) TABS
--------------------------------- */
.schedule-tabs{
  display:flex; flex-wrap:wrap; gap:.6rem;
  justify-content:center; margin: .75rem 0 1.2rem;
}

.schedule .tab-btn{
  appearance:none; border:1px solid color-mix(in srgb, var(--color-neutral-200), transparent 30%);
  background: color-mix(in srgb, var(--color-neutral-50) 7%, transparent);
  color: var(--color-neutral-50);
  padding:.55rem .9rem; border-radius: .85rem; font-weight:800; letter-spacing:.2px;
  transition: background var(--transition-fast), transform var(--transition-fast), border-color var(--transition-fast);
}
.schedule .tab-btn span{
  opacity:.75; font-weight:600; margin-left:.35rem; font-size:.9em;
}
.schedule .tab-btn:hover{ transform: translateY(-1px) }
.schedule .tab-btn.active{
  background: linear-gradient(180deg, var(--color-primary), color-mix(in srgb, var(--color-primary), black 10%));
  border-color: color-mix(in srgb, var(--color-primary), black 15%);
}

/* ---------------------------------
   3) FILTERS (Tracks / Locations)
--------------------------------- */
.tracks, .locations{ margin: .25rem 0 1.1rem }
.tracks h4, .locations h4{
  font-size: .95rem; font-weight:800; letter-spacing:.02em; margin:0 0 .5rem; color: var(--color-neutral-100);
}

.tracks-filter, .locations-filter{
  display:flex; flex-wrap:wrap; gap:.5rem;
}

/* Your Track .btn are inline in Blade; we just add shape/weight */
.tracks-filter .btn{
  border-radius: .8rem; padding:.45rem .75rem; font-weight:800; color: var(--color-neutral-50);
  background: color-mix(in srgb, var(--color-neutral-50) 6%, transparent);
  border:1px solid color-mix(in srgb, var(--color-neutral-200), transparent 30%);
}
.tracks-filter .btn.btn-secondary{
  background: transparent; color: var(--color-neutral-200);
  border:1px dashed var(--color-neutral-400);
}

/* Location pills (toggle with .active via Alpine) */
.platform-btn{
  appearance:none; border-radius:.8rem; padding:.45rem .75rem; font-weight:800; cursor:pointer;
  background: color-mix(in srgb, var(--color-neutral-50) 6%, transparent);
  color: var(--color-neutral-50);
  border:1px solid color-mix(in srgb, var(--color-neutral-200), transparent 30%);
  transition: filter var(--transition-fast), background var(--transition-fast), border-color var(--transition-fast);
}
.platform-btn:hover{ filter: brightness(1.06) }
.platform-btn.active{
  background: linear-gradient(180deg, var(--color-primary), color-mix(in srgb, var(--color-primary), black 10%));
  border-color: color-mix(in srgb, var(--color-primary), black 15%);
}

/* ---------------------------------
   4) TIMELINE RAIL + ITEMS
--------------------------------- */
.schedule-content{
  margin-top: .5rem;
}
.schedule-day{ display:none }
.schedule-day.active{ display:block }

.schedule-timeline{
  position: relative;
  display:grid; gap: 1rem;
  padding-left: clamp(.5rem, 2vw, .75rem);
}

/* vertical rail */
.schedule-timeline::before{
  content:""; position:absolute; top:.2rem; bottom:.2rem; left: 0;
  width: 3px; border-radius: 999px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--color-neutral-50) 25%, transparent), color-mix(in srgb, var(--color-neutral-50) 6%, transparent));
  opacity:.7;
}

/* each item hangs on rail */
.timeline-item{
  display:grid;
  grid-template-columns: 150px minmax(0, 1fr);
  gap: .9rem;
  position: relative;
}
@media (max-width: 680px){
  .timeline-item{ grid-template-columns: 120px 1fr; }
}

/* rail dot */
.timeline-item::before{
  content:""; position:absolute; left: -7px; top: .8rem;
  width: 14px; height: 14px; border-radius:50%;
  background: var(--color-neutral-900);
  border: 3px solid var(--color-primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary-light), transparent 60%);
}

/* time column */
.timeline-time{
  display:flex; align-items:center; gap:.35rem; justify-content:flex-end;
  font-weight:800; font-size:.95rem; letter-spacing:.2px; color: var(--color-neutral-200);
}
.timeline-time span:nth-child(2){ opacity:.7 }

/* ---------------------------------
   5) SESSION CARD
--------------------------------- */
.timeline-content{ min-width: 0 }
.session-card{
  background: linear-gradient(180deg, color-mix(in srgb, #fff 6%, transparent), color-mix(in srgb, #fff 2%, transparent));
  border: 1px solid color-mix(in srgb, var(--color-neutral-200), transparent 25%);
  border-radius: 16px;
  box-shadow: var(--shadow-md);
  padding: .9rem 1rem;
  color: var(--color-neutral-50);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-fast);
}
.session-card:hover{
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  border-color: color-mix(in srgb, var(--color-primary), transparent 60%);
}

.session-title{
  margin: .15rem 0 .35rem;
  font-size: clamp(1.02rem, 2.2vw, 1.2rem);
  font-weight: 900;
  color: var(--color-neutral-50);
}

.session-details{
  display:flex; flex-wrap:wrap; gap:.65rem 1rem; align-items:center; justify-content:space-between;
}

.session-speaker{
  display:flex; align-items:center; gap:.4rem .5rem; flex-wrap:wrap;
}
.speaker-avatar{
  width: 28px; height: 28px; border-radius:50%; object-fit:cover;
  border: 2px solid rgba(255,255,255,.85); box-shadow: var(--shadow-sm);
}

.session-location{
  display:flex; align-items:center; gap:.4rem;
  color: var(--color-neutral-200); font-weight:700; letter-spacing:.2px;
}
.session-location svg{ opacity:.85 }

/* ---------------------------------
   6) MODALS
--------------------------------- */
.modal-content{
  border-radius: 18px;
  border: 1px solid var(--color-neutral-200);
  box-shadow: var(--shadow-2xl);
}
.modal .speaker-avatar{ width: 36px; height: 36px }

/* “Show more” button look */
.show-more-btn{
  color: var(--color-primary); font-weight:800; background:transparent; border:0; cursor:pointer;
}
.show-more-btn:hover{ text-decoration: underline }

/* ---------------------------------
   7) RESPONSIVE
--------------------------------- */
@media (max-width: 540px){
  .timeline-time{ justify-content:flex-start; padding-left:.4rem }
  .timeline-item{
    grid-template-columns: 1fr; 
    padding-left: .75rem;       /* room from rail/dot */
  }
}
</style>

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
<section
    id="schedule"
    class="schedule register--grid"
    x-data="{ 
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
        @if ($enableTracks)
        <div class="tracks">
            <h4>Tracks:</h4>
            <div class="tracks-filter">
                @foreach ($tracks as $track)
                <button
                    @click="toggleTrackSelection({{ $track->id }})"
                    :style="trackSelected({{ $track->id }}) ? {backgroundColor: '{{ $track->color }}', color: 'white'} : {border: '1px solid {{ $track->color }}'}"
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
            <h4>Locations:</h4>
            <div class="locations-filter">
                @foreach ($eventPlatforms as $platform)
                <button
                    @click="togglePlatformSelection({{ $platform->id }})"
                    class="platform-btn"
                    :class="platformSelected({{ $platform->id }}) && {active: true}">
                    {{ $platform->name }}
                </button>
                @endforeach
                <template x-if="selectedPlatforms.length">
                    <button @click="clearPlatformSelections" class="btn btn-secondary">&#10006;</button>
                </template>
            </div>
        </div>
        <div
            class="schedule-content">
            @foreach ($event->dates as $date)
            <div class="schedule-day {{ $loop->first ? 'active' : '' }}" id="day{{ $loop->index + 1 }}">
                <div class="schedule-timeline">
                    @foreach ($date->eventSessions()->orderBy('start_time')->get() as $session)
                    <div x-show="hasSelectedTracks({{ $session->tracks->pluck('id') }}) && hasSelectedPlatform({{ $session->event_platform_id }})" class="timeline-item" type="button" data-bs-toggle="modal" data-bs-target="#sessionModal{{ $session->id }}">
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
                                    <div class="rounded" style="background-color: {{ $track->color }}; width: 30px; height: 8px;"></div>
                                    @endforeach
                                </div>
                                @endif
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

                                    @if ($enableTracks && $session->tracks->count() > 0)
                                    <div class="d-flex flex-wrap gap-2 mb-2 justify-content-center">
                                        @foreach ($session->tracks as $track)
                                        <div class="rounded p-1" style="border:1px solid {{ $track->color }}">{{$track->name}}</div>
                                        @endforeach
                                    </div>
                                    @endif

                                    <h5 class="modal-title text-center" id="sessionModalLabel{{ $session->id }}">{{ $session->name }}</h5>
                                    <div class="text-center">
                                        <p class="mb-0"><span class="text-muted">Type: </span>{{$session->type}}</p>
                                        @if($session->capacity)
                                        <p><span class="text-muted">Capacity: </span>{{$session->capacity}}</p>
                                        @endif
                                        <p>
                                            <svg xmlns=" http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
                                                <path d="M12.25 2c-5.514 0-10 4.486-10 10s4.486 10 10 10 10-4.486 10-10-4.486-10-10-10zM18 13h-6.75V6h2v5H18v2z"></path>
                                            </svg>
                                            {{\Illuminate\Support\Carbon::createFromFormat('H:i:s', $session->start_time)->format('h:i A')}} -
                                            {{\Illuminate\Support\Carbon::createFromFormat('H:i:s', $session->end_time)->format('h:i A')}}
                                        </p>
                                        <!-- Description with Show More functionality -->
                                        <div class="description-container mt-1">
                                            @if (strlen($session->description) > 100)
                                            <p class="description-text short-description" id="shortDesc{{ $session->id }}">{{ substr($session->description, 0, 100) }}...</p>
                                            <p class="description-text full-description text-muted d-none" id="fullDesc{{ $session->id }}">{{ $session->description }}</p>
                                            <button class="btn show-more-btn p-0" data-session-id="{{ $session->id }}">Show More</button>
                                            @else
                                            <p>{{ $session->description }}</p>
                                            @endif
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer flex flex-wrap justify-content-center gap-3">
                                    @isset($session->eventSpeakers)
                                    @foreach($session->eventSpeakers as $speaker)
                                    <div class="text-center d-flex justify-content-center align-items-center gap-1">
                                        <img src="{{ $speaker->avatar }}" alt="{{ $speaker->name }}" class="speaker-avatar">
                                        <span>{{ $speaker->name }}</span>
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