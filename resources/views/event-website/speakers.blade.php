@switch($event->custom_theme)
    @case('design1')
        @include('event-website.themes.design1.speakers')
        @break

    @case('design2')
        @include('event-website.themes.design2.speakers')
        @break

    @case('design3')
        @include('event-website.themes.design3.speakers')
        @break

    @default
        @include('event-website.themes.design4.speakers')
@endswitch
