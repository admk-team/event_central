@extends('event-website.layouts.layout')
@section('style')
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    @vite(['resources/css/design2/index_styles.css'])
@endsection
@section('header')
    @include('event-website.themes.design2.header')
@endsection
@section('content')
    {{-- ===== TICKETS ===== --}}
        <section id="register" class="tickets">
            <div class="container">
                <div class="section-head">
                    <span class="eyebrow">Register Now</span>
                    <h2>Tickets</h2>
                </div>

                <div class="row g-4">
                    @foreach ($event->tickets ?? [] as $ticket)
                        @if ($ticket->show_on_attendee_side)
                            <div class="col-xxl-4 col-md-6">
                                <div class="price">
                                    <div class="price__head">
                                        <h3>{{ $ticket->name }}</h3>
                                        <div class="price__amt">${{ $ticket->base_price }}</div>
                                    </div>

                                    <ul class="price__list">
                                        @foreach ($ticket->sessions->take(5) ?? [] as $session)
                                            <li type="button" data-bs-toggle="modal"
                                                data-bs-target="#sessionModal{{ $session->id }}">
                                                <i class="bi bi-check2-circle"></i> {{ $session->name }}
                                            </li>
                                        @endforeach

                                        @php
                                            $totalSessions = $ticket->sessions->count() ?? 0;
                                            $remaining = $totalSessions > 5 ? $totalSessions - 5 : 0;
                                        @endphp

                                        @if ($remaining > 0)
                                            <li class="more">
                                                <a
                                                    href="{{ route('attendee.login', $event) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}">+{{ $remaining }}
                                                    more</a>
                                            </li>
                                        @endif
                                    </ul>

                                    @if (!empty($ticket->description))
                                        <div class="price__desc">
                                            <small class="">{{ $ticket->description }}</small>
                                        </div>
                                    @endif

                                    <a href="{{ route('attendee.register', $event) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}"
                                        class="btn btn-primary w-100">
                                        Register Now
                                    </a>
                                </div>
                            </div>
                        @endif
                    @endforeach
                </div>

                {{-- Session Modals --}}
                @foreach ($event->tickets ?? [] as $ticket)
                    @foreach ($ticket->sessions ?? [] as $session)
                        <div class="modal fade text-dark" id="sessionModal{{ $session->id }}" tabindex="-1"
                            aria-labelledby="sessionModalLabel{{ $session->id }}" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-body p-4">
                                        <h5 class="modal-title text-center mb-3"
                                            id="sessionModalLabel{{ $session->id }}">{{ $session->name }}</h5>
                                        <div class="text-center small  mb-2">
                                            {{ $session->type }} @if ($session->capacity)
                                                • Capacity: {{ $session->capacity }}
                                            @endif
                                        </div>
                                        <p class="text-center mb-3">
                                            <i class="bi bi-clock"></i>
                                            {{ \Illuminate\Support\Carbon::createFromFormat('H:i:s', $session->start_time)->format('h:i A') }}
                                            –
                                            {{ \Illuminate\Support\Carbon::createFromFormat('H:i:s', $session->end_time)->format('h:i A') }}
                                        </p>
                                        @if ($session->description)
                                            <p class="mb-0 text-center">{{ $session->description }}</p>
                                        @endif
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endforeach
                @endforeach
            </div>
        </section>
@endsection
