<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Thank You for Attending</title>
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
            color: #28a745;
        }

        .content p {
            font-size: 16px;
            line-height: 1.6;
        }

        .feedback-btn {
            display: inline-block;
            margin: 20px 0;
            padding: 12px 24px;
            background-color: #007bff;
            color: #fff !important;
            text-decoration: none;
            font-weight: bold;
            border-radius: 6px;
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
        <div class="content">
            <div class="header">
                <img src="{{ asset($events->logo_img ?: 'images/logo.png') }}" alt="Logo">
                <h1>Event Reminder</h1>
            </div>
            <p>Hello
                {{ $attendee->first_name ? $attendee->first_name : 'Guest' }},
            </p>

            <p>
                On behalf of our entire team, we want to sincerely thank you for being part of {{ $events->name }}. Your
                presence made the event truly special, and we’re grateful you chose to spend your time with us.
            </p>
            <p>
                We hope you left inspired, encouraged, and connected with new people who share your passion. Our goal is
                always to create experiences that uplift, equip, and bring people together, and it wouldn’t have been
                the same without you.
            </p>
            <p>
                Please Keep an eye out, we’ll be sharing photos, highlights, and upcoming announcements soon.
            </p>
            <p>
                In the meantime, we’d love to hear your feedback. What did you enjoy most? What can we do better next
                time? Your thoughts help us continue to grow and create even better experiences. Please use the event
                app for any feedback.
            </p>
            <p>
                Thank you again for joining us. We’re already looking forward to seeing you at the next event!
            </p>
            <p>
                With gratitude,
            </p>
            <p>
                {{ $events->name }} Team
            </p>

            <div class="footer">
                If you received this email by mistake, please ignore it.<br>
                &copy; {{ date('Y') }} {{ $events->name ?? 'Event Central' }}
            </div>
        </div>
</body>

</html>
