<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>SVG</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/assets/passes.css">
    <!-- Scripts -->
</head>

<body class="font-sans antialiased">

    <div class="passWrapper">
        <div class="pass div-gradient">
            <div class="heading-wraper">
                <img class="circle" src="{{ $event->logo_img }}" alt="event logo">
                <p class="event-name">{{ $event->name }}</p>
                <p class="event-desc">{{ $event->description }}</p>
                <p class="event-date">{{ Carbon\Carbon::create($event->start_date)->format('d M, Y') }}
                </p>
            </div>
            <div class="qrWrapper">
                <div>
                    <img class="attendee-avatar-img" src="{{ $attendee->avatar_img }}" alt="attendee avatar">
                </div>
                <div>
                    <img class="qr-code-img" src="{{ Storage::url('public/qr-codes/' . $attendee->id . '.png') }}"
                        alt="qr code">
                </div>
            </div>
            <div class="attendee-details">
                <p class="attendee-name">{{ $attendee->first_name . ' ' . $attendee->last_name }}</p>
            </div>
        </div>
    </div>
</body>

</html>
