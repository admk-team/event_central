@switch($event->custom_theme)
    @case('design1')
        @include('event-website.themes.design1.exhibitors')
        @break

    @case('design2')
        @include('event-website.themes.design2.exhibitors')
        @break

    @case('design3')
        @include('event-website.themes.design3.exhibitors')
        @break

    @default
        @include('event-website.themes.design4.exhibitors')
@endswitch
