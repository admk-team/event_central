<!DOCTYPE html>
<html>

<head>
    <title>Event Session Reminder</title>
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

        h2 {
            color: #333;
            text-align: left;
        }

        p {
            font-size: 16px;
            color: #555;
            line-height: 1.6;
        }

        .credentials {
            background: #f9f9f9;
            padding: 10px;
            border-radius: 5px;
            margin: 15px 0;
        }

        .credentials p {
            margin: 5px 0;
            font-weight: bold;
        }

        .btn {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 15px;
            background: #28a745;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
        }

        .btn:hover {
            background: #218838;
        }

        .footer {
            text-align: left;
            font-size: 14px;
            color: #777;
            margin-top: 20px;
        }

        .table-wrapper {
            overflow-x: auto;
        }

        .responsive-table {
            width: 100%;
            border-collapse: collapse;
            table-layout: auto;
        }

        .responsive-table th,
        .responsive-table td {
            padding: 12px;
            border: 1px solid #ddd;
            text-align: left;
        }

        .responsive-table th {
            background-color: #f4f4f4;
            font-weight: bold;
        }

        @media screen and (max-width: 600px) {
            .responsive-table {
                width: 100%;
            }

            .responsive-table thead {
                display: none;
            }

            .responsive-table,
            .responsive-table tbody,
            .responsive-table tr,
            .responsive-table td {
                display: block;
                width: 100%;
            }

            .responsive-table tr {
                margin-bottom: 10px;
            }

            .responsive-table td {
                position: relative;
                padding-left: 50%;
            }

            .responsive-table td::before {
                content: attr(data-label);
                position: absolute;
                left: 10px;
                top: 50%;
                transform: translateY(-50%);
                font-weight: bold;
            }
        }
    </style>
</head>

<body>
    <div class="email-container">
        <h2>⏰ Hello, this is your session reminder!</h2>
        <p>You're receiving this email because you're interested in the following session happening today:</p>

        <div class="table-wrapper">
            <table class="responsive-table">
                <thead>
                    <tr>
                        <th>Event</th>
                        <th>Session</th>
                        <th>Speaker</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Platform</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td data-label="Event">{{ $events->name ?? 'N/A' }}</td>
                        <td data-label="Session">{{ $session->name }}</td>
                        <td data-label="Speaker">{{ $session->eventSpeakers->pluck('name')->join(', ') }}</td>
                        <td data-label="Start Time">{{ \Carbon\Carbon::parse($session->start_time)->format('h:i A') }}</td>
                        <td data-label="End Time">{{ \Carbon\Carbon::parse($session->end_time)->format('h:i A') }}</td>
                        <td data-label="Platform">
                            @if ($session->eventPlatform)
                                {{ $session->eventPlatform->name }} ({{ $session->eventPlatform->type }})
                            @else
                                N/A
                            @endif
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="footer">
            <p>Thank you for your participation.</p>
            <p><strong>{{  $events->name }}</strong></p>
        </div>
    </div>
</body>

</html>
