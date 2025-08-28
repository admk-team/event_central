@switch($event->custom_theme)
    @case('design1')
        @include('event-website.themes.design1.products')
        @break

    @case('design2')
        @include('event-website.themes.design2.products')
        @break

    @case('design3')
        @include('event-website.themes.design3.products')
        @break

    @default
        @include('event-website.themes.design4.products')
@endswitch
