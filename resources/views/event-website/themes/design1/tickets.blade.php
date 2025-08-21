@extends('event-website.layouts.layout')
@section('style')
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    @vite(['resources/css/design1/index_styles.css'])
@endsection
@section('header')
    @include('event-website.themes.design1.header')
@endsection
@section('content')
    <section id="register" class="register register--grid mt-2">
        <div class="container">
            <div class="section-header light">
                <span class="section-tag">Register Now</span>
                <h2 class="section-title">Tickets</h2>
            </div>

            <div class="pricing-tiers">
                @foreach ($event->tickets ?? [] as $ticket)
                    @if ($ticket->show_on_attendee_side)
                        <div class="pricing-card d-flex flex-column h-100">
                            <div class="pricing-header">
                                <h3>{{ $ticket->name }}</h3>
                                <div class="pricing">
                                    <span class="price">${{ $ticket->base_price }}</span>
                                </div>
                            </div>

                            <ul class="pricing-features">
                                @foreach ($ticket->sessions->take(5) ?? [] as $session)
                                    <li type="button" data-bs-toggle="modal"
                                        data-bs-target="#sessionModal{{ $session->id }}">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                        <span>{{ $session->name }}</span>
                                    </li>
                                @endforeach

                                @php
                                    $totalSessions = $ticket->sessions->count() ?? 0;
                                    $remaining = $totalSessions > 5 ? $totalSessions - 5 : 0;
                                @endphp

                                @if ($remaining > 0)
                                    <a
                                        href="{{ route('attendee.login', $event) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}">
                                        <li class="color_primary">{{ $remaining }}+ More</li>
                                    </a>
                                @endif
                            </ul>

                            <div class="description-header">
                                <h6>Description:</h6>
                                <div class="description">
                                    <span>{{ $ticket->description }}</span>
                                </div>
                            </div>

                            <a href="{{ route('attendee.register', $event) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}"
                                class="btn btn-primary btn-block mt-auto">Register Now</a>
                        </div>
                    @endif
                @endforeach

                <!-- Session Modals -->
                @foreach ($event->tickets ?? [] as $ticket)
                    @foreach ($ticket->sessions ?? [] as $session)
                        <div class="modal fade text-dark" id="sessionModal{{ $session->id }}" tabindex="-1"
                            aria-labelledby="sessionModalLabel{{ $session->id }}" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-body">
                                        <h5 class="modal-title text-center" id="sessionModalLabel{{ $session->id }}">
                                            {{ $session->name }}</h5>
                                        <div class="text-center">
                                            <p>{{ $session->type }}</p>
                                            <p>{{ $session->capacity }}</p>
                                            <p>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" style="fill: rgba(0,0,0,1);">
                                                    <path
                                                        d="M12.25 2c-5.514 0-10 4.486-10 10s4.486 10 10 10 10-4.486 10-10-4.486-10-10-10zM18 13h-6.75V6h2v5H18v2z">
                                                    </path>
                                                </svg>
                                                {{ $session->start_time }} - {{ $session->end_time }}
                                            </p>
                                            <p>{{ $session->description }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endforeach
                @endforeach
            </div>
        </div>
    </section>
@endsection
