@extends('event-website.layouts.layout')

@section('style')
  @vite(['resources/css/design2/index_styles.css'])
  @vite(['resources/css/design2/speakers_styles.css']) {{-- new, theme‑matching --}}
@endsection

@section('header')
  @include('event-website.themes.design2.header')
@endsection

@section('content')
<section id="speakers" class="d2s-speakers">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Meet Our Speakers</span>
      <h2 class="d2s-h">Speakers</h2>
    </div>

    <div class="speakers-grid">
      @foreach (($event->event_speakers ?? []) as $speaker)
        @php
          $avatar = $speaker->avatar ?: ($event->logo_img ?? '');
          $role   = implode(', ', array_filter([$speaker->position, $speaker->company]));
        @endphp

        <article class="speaker-card"
                 role="button"
                 tabindex="0"
                 aria-haspopup="dialog"
                 aria-controls="speakerModal{{ $speaker->id }}"
                 data-bs-toggle="modal"
                 data-bs-target="#speakerModal{{ $speaker->id }}">
          <div class="speaker-media">
            <img src="{{ $avatar }}" alt="{{ $speaker->name }}">
          </div>
          <div class="speaker-meta">
            <h3 class="speaker-name">{{ $speaker->name }}</h3>
            @if($role)<p class="speaker-role">{{ $role }}</p>@endif
          </div>
        </article>

        {{-- Modal (Bootstrap 5) --}}
        <div class="modal fade text-dark"
             id="speakerModal{{ $speaker->id }}"
             tabindex="-1"
             aria-labelledby="speakerModalLabel{{ $speaker->id }}"
             aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content pt-3">
              <div class="d-flex justify-content-center">
                <img class="rounded-circle"
                     src="{{ $avatar }}"
                     width="150" height="150"
                     alt="{{ $speaker->name }}">
              </div>

              <div class="px-4 text-center">
                <h5 id="speakerModalLabel{{ $speaker->id }}" class="mb-1">{{ $speaker->name }}</h5>
                @if($speaker->email)<p class="text-muted mb-0">{{ $speaker->email }}</p>@endif
                @if($speaker->phone)<p class="text-muted">{{ $speaker->phone }}</p>@endif
                @if($speaker->company)<p class="mb-0">{{ $speaker->company }}</p>@endif
                @if($speaker->position)<p class="text-muted">{{ $speaker->position }}</p>@endif>

                {{-- Bio w/ show more --}}
                <div class="bio-container mt-2">
                  @php $long = is_string($speaker->bio) && strlen($speaker->bio) > 140; @endphp
                  @if ($long)
                    <p class="text-muted bio-text short-bio" id="shortBio{{ $speaker->id }}">
                      {{ Str::limit($speaker->bio, 140) }}
                    </p>
                    <p class="text-muted bio-text full-bio d-none" id="fullBio{{ $speaker->id }}">
                      {{ $speaker->bio }}
                    </p>
                    <button type="button"
                            class="btn btn-link p-0 show-more-btn"
                            data-speaker-id="{{ $speaker->id }}"
                            aria-controls="fullBio{{ $speaker->id }}"
                            aria-expanded="false">Show More</button>
                  @elseif(!empty($speaker->bio))
                    <p class="text-muted">{{ $speaker->bio }}</p>
                  @endif
                </div>
              </div>

              <div class="modal-footer text-center d-flex justify-content-center gap-3">
                @if ($speaker->web)
                  <a target="_blank" href="{{ $speaker->web }}" aria-label="Website"><i class="bi bi-globe"></i></a>
                @endif
                @if ($speaker->linkedin)
                  <a target="_blank" href="{{ $speaker->linkedin }}" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
                @endif
                @if ($speaker->facebook)
                  <a target="_blank" href="{{ $speaker->facebook }}" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
                @endif
                @if ($speaker->twitter)
                  <a target="_blank" href="{{ $speaker->twitter }}" aria-label="Twitter/X"><i class="bi bi-twitter-x"></i></a>
                @endif
                @if ($speaker->instagram)
                  <a target="_blank" href="{{ $speaker->instagram }}" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
                @endif
              </div>
            </div>
          </div>
        </div>
      @endforeach
    </div>
  </div>
</section>

{{-- JS: delegated “show more/less” + keyboard support on cards --}}
<script>
  document.addEventListener('click', (e) => {
    const t = e.target;

    // show more/less (delegated)
    const btn = t.closest('.show-more-btn');
    if (btn) {
      const id = btn.getAttribute('data-speaker-id');
      const shortEl = document.getElementById('shortBio' + id);
      const fullEl  = document.getElementById('fullBio' + id);
      if (!shortEl || !fullEl) return;

      const expand = fullEl.classList.contains('d-none');
      shortEl.classList.toggle('d-none', expand);
      fullEl.classList.toggle('d-none', !expand);
      btn.textContent = expand ? 'Show Less' : 'Show More';
      btn.setAttribute('aria-expanded', String(expand));
    }
  });

  // open modal via keyboard when card is focused
  document.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('.speaker-card')) {
      e.preventDefault();
      e.target.click();
    }
  });
</script>
@endsection
