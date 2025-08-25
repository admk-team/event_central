 <header class="site-header header-transparent header-fixed" data-responsive-width="991">
     <div class="container">
         <div class="header-inner">

             <nav id="site-navigation" class="main-nav">

                 <div class="site-logo">
                     <a
                         href="{{ route('organizer.events.website', $event->uuid) }}{{ $isPreviewMode ?? false ? '?preview=true' : '' }}"class="logo">
                         <img src="{{ $event->logo_img }}" class="w-25">
                     </a>
                 </div>
                 <div class="burger-menu">
                     <span class="bar"></span>
                     <span class="bar"></span>
                     <span class="bar"></span>
                 </div>
                 <div class="menu-wrapper main-nav-container canvas-menu-wrapper" id="mega-menu-wrap">
                     <div class="canvas-header">
                         <div class="mobile-offcanvas-logo">
                             <a href="{{ route('organizer.events.website', $event->uuid) }}{{ $isPreviewMode ?? false ? '?preview=true' : '' }}"
                                 class="mobile-logo">
                                 <img src="{{ $event->logo_img }}" class="w-50">
                             </a>
                         </div>
                         <div class="close-menu menu-close" id="page-close-main-menu">
                             <i class="fas fa-times"></i>
                         </div>
                     </div>
                     <ul class="codeboxr-main-menu">
                         <li><a class="gotome"
                                 href="{{ route('organizer.events.website', $event->uuid) }}{{ $isPreviewMode ?? false ? '?preview=true' : '' }}">About</a>
                         </li>
                         <li><a class="gotome"
                                 href="{{ route('organizer.events.website.speakers', $event->uuid) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}">Speakers</a>
                         </li>
                         <li><a class="gotome"
                                 href="{{ route('organizer.events.website', $event->uuid) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}#venue">
                                 Venue</a>
                         </li>
                         <li><a class="gotome"
                                 href="{{ route('organizer.events.website.sponsors', $event->uuid) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}">Sponsor</a>
                         </li>
                         <li><a
                                 class="gotome"href="{{ route('organizer.events.website.exhibitors', $event->uuid) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}">Exhibitors</a>
                         </li>
                         <li><a class="gotome"
                                 href="{{ route('organizer.events.website.tickets', $event->uuid) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}">Tickets</a>
                         </li>
                         <li><a class="gotome"
                                 href="{{ route('organizer.events.website.products', $event->uuid) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}">Products</a>
                         </li>
                     </ul>
                     <a style="background-color: var(--color-primary);color: var(--color-primary-foreground);"
                         class="cbx-btn btn-brand btn-show-md"href="{{ route('organizer.events.website.schedule', $event->uuid) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}">Schedule</a>
                     <a class="cbx-btn btn-brand btn-show-md"
                         style="background-color: var(--color-primary);color: var(--color-primary-foreground);"
                         href="{{ route('attendee.login', $event) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}">Login</a>

                     <a class="cbx-btn btn-brand btn-show-md"
                         style="background-color: var(--color-primary);color: var(--color-primary-foreground);"
                         href="{{ route('attendee.register', $event) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}">Register
                         Now</a>

                 </div>
                 <!-- /.menu-wrapper -->
                 <a class="cbx-btn btn-brand btn-hide-md"
                     style="background-color: var(--color-primary);color: var(--color-primary-foreground);"
                     href="{{ route('organizer.events.website.schedule', $event->uuid) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}">Schedule</a>
                 <a class="cbx-btn btn-brand btn-hide-md"
                     style="background-color: var(--color-primary);color: var(--color-primary-foreground);"
                     href="{{ route('attendee.login', $event) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}">Login</a>

                 <a class="cbx-btn btn-brand btn-hide-md"
                     style="background-color: var(--color-primary);color: var(--color-primary-foreground);"
                     href="{{ route('attendee.register', $event) }}{{ ($isPreviewMode ?? false) || request('preview') == 'true' ? '?preview=true' : '' }}">Register
                     Now</a>

             </nav>
             <!-- /.site-nav -->
         </div>
         <!-- /.header-inner -->
     </div>
     <!-- /.container-full -->
 </header>
