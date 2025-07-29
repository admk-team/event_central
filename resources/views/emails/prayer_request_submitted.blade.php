<!DOCTYPE html>
<html>

<head>
    <title>New Prayer Request - {{ $eventApp->name }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }

        p,
        li {
            font-size: 16px;
            color: #555;
            line-height: 1.6;
        }

        ul {
            padding-left: 20px;
        }

        .footer {
            text-align: center;
            font-size: 14px;
            color: #777;
            margin-top: 30px;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <p>Hello {{ $eventApp->organiser->name ?? 'Organizer' }},</p>

        <p>A new <strong>{{ $prayerRequest->request_type }}</strong> prayer request has been submitted by
            <strong>{{ $user->first_name }} {{ $user->last_name }}</strong> for the
            <strong>{{ $eventApp->name }}</strong> event.</p>

        <p><strong>Message:</strong></p>
        <p>{{ $prayerRequest->message }}</p>

        <p>Status: {{ ucfirst($prayerRequest->status) }}</p>

        <div class="footer">
            <p>Blessings,<br>
                The {{ $eventApp->name }} Team</p>
        </div>
    </div>
</body>

</html>
