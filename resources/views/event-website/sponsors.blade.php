@switch($event->custom_theme)
    @case('design1')
        @include('event-website.themes.design1.sponsors')
        @break

    @case('design2')
        @include('event-website.themes.design2.sponsors')
        @break

    @case('design3')
        @include('event-website.themes.design3.sponsors')
        @break

    @default
        @include('event-website.themes.design4.sponsors')
@endswitch
