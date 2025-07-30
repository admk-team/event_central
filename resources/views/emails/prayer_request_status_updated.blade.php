<!DOCTYPE html>
<html>

<head>
    <title>Prayer Request Status</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f7f7f7;
            margin: 0;
            padding: 20px;
        }

        .container {
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            max-width: 600px;
            margin: auto;
        }

        p {
            font-size: 16px;
            color: #444;
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
    <div class="container">
        <p>Dear {{ $prayerRequest->attendee->first_name ?? 'Attendee' }},</p>

        <p>Your prayer request has been <strong>{{ ucfirst($prayerRequest->status) }}</strong>.</p>

        <p><strong>Your message:</strong></p>
        <p>{{ $prayerRequest->message }}</p>

        <p>Thank you for sharing your request with us.</p>

        <div class="footer">
            <p>Blessings,<br>
                The {{ $prayerRequest->eventApp->name ?? 'Event Team' }} Team</p>
        </div>
    </div>
</body>

</html>
