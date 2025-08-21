@switch($event->custom_theme)
    @case('design1')
        @include('event-website.themes.design1.schedule')
        @break

    @case('design2')
        @include('event-website.themes.design2.schedule')
        @break

    @case('design3')
        @include('event-website.themes.design3.schedule')
        @break

    @default
        @include('event-website.themes.default.schedule')
@endswitch