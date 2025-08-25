@switch($event->custom_theme)
    @case('design1')
        @include('event-website.themes.design1.sponsor-single')
        @break

    @case('design2')
        @include('event-website.themes.design2.sponsor-single')
        @break

    @case('design3')
        @include('event-website.themes.design3.sponsor-single')
        @break

    @default
        @include('event-website.themes.default.sponsor-single')
@endswitch