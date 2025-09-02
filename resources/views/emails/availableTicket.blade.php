<!DOCTYPE html>
<html>

<head>
    <title>🎟 Priority Access – Your Ticket is Now Available!</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
        }

        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 25px;
            border-radius: 10px;
            border: 1px solid #e5e5e5;
        }

        h2 {
            color: #2c3e50;
            font-size: 22px;
            margin-bottom: 10px;
        }

        p {
            font-size: 16px;
            color: #555555;
            line-height: 1.6;
        }

        .highlight {
            background: #ffefc4;
            padding: 10px;
            border-left: 5px solid #f39c12;
            margin: 15px 0;
            font-weight: bold;
            color: #8a6d3b;
        }

        .ticket-info {
            background: #f6f6f6;
            padding: 15px;
            border-radius: 6px;
            margin: 20px 0;
            border: 1px solid #ddd;
        }

        .ticket-info p {
            margin: 5px 0;
            font-size: 15px;
        }

        .btn {
            display: inline-block;
            padding: 12px 25px;
            margin-top: 20px;
            background: #e74c3c;
            color: #ffffff;
            text-decoration: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: bold;
        }

        .btn:hover {
            background: #c0392b;
        }

        .footer {
            margin-top: 25px;
            font-size: 13px;
            color: #777;
            text-align: center;
            line-height: 1.4;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="header">
            <img src="{{ asset($events->logo_img ?: 'images/logo.png') }}" alt="Logo">
            <h1>Event Reminder</h1>
        </div>
        <h2>Hi {{ $attendee->first_name }} {{ $attendee->last_name }}, Your Chance is Here!</h2>

        <p>You were on the waiting list for this event — and now <strong>tickets are available again</strong>!
            As one of our priority waitlist members, you can secure your spot before tickets are released to the public.
        </p>

        <div class="highlight">⚡ Hurry! This ticket may be claimed by other attendees if you delay.</div>

        <div class="ticket-info">
            <p>🎟 <strong>Ticket:</strong> {{ $ticket->name }}</p>
            <p>💵 <strong>Price:</strong> {{ $ticket->base_price }} {{ config('app.currency', 'USD') }}</p>
        </div>

        <p>Click below to purchase your ticket right now and confirm your place at the event:</p>

        <a href="{{ $purchaseUrl }}" class="btn">Claim Your Ticket Now</a>

        <div class="footer">
            <p>This email was sent to you because you joined the waiting list for
                <strong>{{ config('app.name') }}</strong>.
            </p>
            <p>Please act fast – availability is not guaranteed.</p>
        </div>
        <div class="footer">
            If you received this email by mistake, please ignore it.<br>
            &copy; {{ date('Y') }} {{ $events->name ?? 'Event Central' }}
        </div>
    </div>
</body>

</html>
