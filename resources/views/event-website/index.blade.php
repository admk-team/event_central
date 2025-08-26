@switch($event->custom_theme)
    @case('design1')
        @include('event-website.themes.design1.index')
        @break

    @case('design2')
        @include('event-website.themes.design2.index')
        @break

    @case('design3')
        @include('event-website.themes.design3.index')
        @break
    @default
      @include('event-website.themes.design4.index')
        {{-- @include('event-website.themes.default.index') --}}
@endswitch
