<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Low Capacity Alert</title>
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
            color: #d9534f;
        }

        .content p {
            font-size: 16px;
            line-height: 1.6;
        }

        .session-details {
            margin: 20px 0;
            padding: 15px;
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            border-radius: 4px;
        }

        .session-details p {
            margin: 6px 0;
            font-size: 15px;
        }

        .footer {
            text-align: center;
            margin-top: 40px;
            font-size: 12px;
            color: #888;
        }

        .btn {
            display: inline-block;
            margin-top: 15px;
            padding: 12px 20px;
            background-color: #007bff;
            color: #fff !important;
            text-decoration: none;
            font-weight: bold;
            border-radius: 6px;
            transition: background-color 0.3s ease-in-out;
        }

        .btn:hover {
            background-color: #0056b3;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <img src="{{ asset($session->eventApp->logo_img ?? 'images/logo.png') }}" alt="Logo">
            <h1>Low Capacity Alert</h1>
        </div>

        <div class="content">
            <p>Hello {{ $session->eventApp->organiser->name ?? 'Organizer' }},</p>

            <p>
                The session <strong>{{ $session->name }}</strong> for the event
                <strong>{{ $session->eventApp->name ?? 'Your Event' }}</strong>
                is running low on capacity.
            </p>

            <div class="session-details">
                <p><strong>🎟️ Session:</strong> {{ $session->name }}</p>
                <p><strong>📦 Total Capacity:</strong> {{ $session->capacity }}</p>
                <p><strong>🪑 Remaining Seats:</strong> {{ $session->current_capacity }}</p>
                <p><strong>📅 Date:</strong> {{ \Carbon\Carbon::parse($session->date)->format('d M, Y') }}</p>
            </div>

            <p>
                Please review this session and consider taking action, such as increasing capacity or creating a waitlist.
            </p>
        </div>

        <div class="footer">
            &copy; {{ date('Y') }} {{ $session->eventApp->name ?? 'Event Central' }}. All rights reserved.
        </div>
    </div>
</body>
</html>
