<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Event Reminder</title>
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

        .header {
            text-align: center;
            margin-bottom: 30px;
        }

        .header img {
            max-width: 180px;
        }

        .header h1 {
            font-size: 24px;
            margin-top: 10px;
            color: #0056b3;
        }

        .content p {
            font-size: 16px;
            line-height: 1.6;
        }

        .event-details {
            margin: 20px 0;
            padding: 15px;
            background-color: #f0f8ff;
            border-left: 4px solid #007bff;
            border-radius: 4px;
        }

        .event-details p {
            margin: 6px 0;
        }

        .footer {
            text-align: center;
            margin-top: 40px;
            font-size: 12px;
            color: #888;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <img src="{{ asset($events->logo_img ?: 'images/logo.png') }}" alt="Logo">
            <h1>Event Reminder</h1>
        </div>

        <div class="content">
            <p>Hello
                {{ $attendee->first_name && $attendee->last_name ? $attendee->first_name . ' ' . $attendee->last_name : 'Guest' }},
            </p>


            <p>
                This is a friendly reminder that the event you registered for,
                <strong>{{ $events->name ?? 'our upcoming event' }}</strong>, is starting soon!
            </p>

            <div class="event-details">
                <p><strong>📍 Location:</strong> {{ $events->location_base ?? 'To be announced' }}</p>
                @if ($startDate)
                    <p><strong>📅 Start Date:</strong> {{ $startDate }}</p>
                @endif
                @if ($endDate)
                    <p><strong>📅 End Date:</strong> {{ $endDate ?? 'N/A' }}</p>
                @endif
            </div>

            <p>
                We look forward to seeing you there! If you have any questions, feel free to reach out.
            </p>
        </div>

        <div class="footer">
            If you received this email by mistake, please ignore it.<br>
            &copy; {{ date('Y') }} {{ $events->name ?? 'Event Central' }}
        </div>
    </div>
</body>

</html>
