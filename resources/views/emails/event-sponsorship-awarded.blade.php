<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sponsorship Opportunity Awarded</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f9f9f9;
            color: #333;
            padding: 20px;
        }
        .container {
            background-color: #fff;
            max-width: 600px;
            margin: 0 auto;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }
        .header { text-align: center; margin-bottom: 30px; }
        .header img { max-width: 180px; }
        .header h1 { font-size: 24px; margin-top: 10px; color: #0056b3; }
        .content p { font-size: 16px; line-height: 1.6; }
        .event-details {
            margin: 20px 0;
            padding: 15px;
            background-color: #f0f8ff;
            border-left: 4px solid #007bff;
            border-radius: 4px;
        }
        .event-details p { margin: 6px 0; }
        .footer {
            text-align: center;
            margin-top: 40px;
            font-size: 12px;
            color: #888;
        }
        .muted { color: #666; }
        .pill {
            display: inline-block;
            padding: 2px 8px;
            font-size: 12px;
            border-radius: 999px;
            background: #111827;
            color: #fff;
            vertical-align: middle;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="header">
        <img src="{{ asset($events->logo_img ?: 'images/logo.png') }}" alt="Logo">
        <h1>Sponsorship Opportunity Awarded</h1>
    </div>

    <div class="content">
        <p>
            Hello
            {{ ($attendee->first_name ?? null) && ($attendee->last_name ?? null)
                ? $attendee->first_name . ' ' . $attendee->last_name
                : ($attendee->name ?? 'Guest') }},
        </p>

        <p>
            Congratulations! You’ve been awarded a sponsorship opportunity for
            <strong>{{ $events->name ?? 'our event' }}</strong>.
        </p>

        <div class="event-details">
            <p><strong>🏷 Type:</strong>
                <span class="pill">
                    {{ ucfirst($booth->type ?? 'booth') }}
                </span>
            </p>
            <p><strong>📛 Item:</strong> {{ $booth->name ?? 'N/A' }}</p>
            @if(!is_null($booth->number))
                <p><strong>🔢 Number:</strong> #{{ $booth->number }}</p>
            @endif
            <p><strong>🤑 Price:</strong> {{ $booth->price ?? 0 }}</p>
            <p><strong>📌 Status:</strong> {{ ucfirst($booth->status ?? 'available') }}</p>

            @if(!empty($events->location_base))
                <p class="muted"><strong>📍 Location:</strong> {{ $events->location_base }}</p>
            @endif
        </div>

        <p>
            You can view this in your attendee portal and manage your participation.  
        </p>
    </div>

    <div class="footer">
        If you received this email by mistake, please ignore it.<br>
        &copy; {{ date('Y') }} {{ $events->name ?? 'Event Central' }}
    </div>
</div>
</body>
</html>
