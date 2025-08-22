@switch($event->custom_theme)
    @case('design1')
        @include('event-website.themes.design1.tickets')
        @break

    @case('design2')
        @include('event-website.themes.design2.tickets')
        @break

    @case('design3')
        @include('event-website.themes.design3.tickets')
        @break

    @default
        @include('event-website.themes.default.tickets')
@endswitch