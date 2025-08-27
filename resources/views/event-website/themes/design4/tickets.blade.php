@extends('event-website.layouts.layout')
@section('style')
     @vite(['resources/css/design4/tickets_styles.css'])
@endsection
@section('header')
   @include('event-website.themes.design4.header')
@endsection
@section('content')
    <section id="register" class="register register--grid">
        <div class="container">
            <div class="section-header light">
                <span class="section-tag">Register Now</span>
                <h2 class="section-title">Tickets</h2>
            </div>

            <div class="tickets-grid-glass">
    @foreach ($event->tickets ?? [] as $ticket)
        @if ($ticket->show_on_attendee_side)
            <div class="ticket-card-glass" data-aos="fade-up">
                <div class="ticket-header">
                    <h3>{{ $ticket->name }}</h3>
                    <div class="ticket-price">${{ $ticket->base_price }}</div>
                </div>

                <ul class="ticket-features">
                    @foreach ($ticket->sessions->take(5) ?? [] as $session)
                        <li type="button" data-bs-toggle="modal" data-bs-target="#sessionModal{{ $session->id }}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            <span>{{ $session->name }}</span>
                        </li>
                    @endforeach
                </ul>

                <div class="ticket-description">
                    <p>{{ $ticket->description }}</p>
                </div>

                <a href="{{ route('attendee.register', $event) }}"
                    class="btn btn-glass">Register Now</a>
            </div>
        @endif
    @endforeach
</div>

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
