<!DOCTYPE html>
<html>

<head>
    <title>Ticket Purchase Confirmation</title>
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

        .ticket-wraper {
            width: 100%;
            margin-top: 15px;
            height: 200px;
        }


        .table-wrapper {
            overflow-x: auto;
            /* Allows horizontal scrolling on small screens */
            -webkit-overflow-scrolling: touch;
            /* Adds smooth scrolling for iOS devices */
        }

        .responsive-table {
            width: 100%;
            border-collapse: collapse;
            table-layout: auto;
            /* Ensures table resizes based on content */
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

        /* For very small screens: */
        @media screen and (max-width: 600px) {
            .responsive-table {
                width: 100%;
                /* Ensures the table takes up full width on smaller screens */
            }

            .responsive-table thead {
                display: none;
                /* Hide table headers on small screens */
            }

            .responsive-table,
            .responsive-table tbody,
            .responsive-table tr,
            .responsive-table td {
                display: block;
                /* Make each row block-level for stackable design */
                width: 100%;
                /* Ensure each cell takes up full width */
            }

            .responsive-table tr {
                margin-bottom: 10px;
                /* Add space between rows */
            }

            .responsive-table td {
                position: relative;
                padding-left: 50%;
                /* Add some space for labels */
            }

            .responsive-table td::before {
                content: attr(data-label);
                /* Show the header text before each cell */
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
        <h2>Welcome, {{ $attendee->first_name }} {{ $attendee->last_name }}!</h2>
        <p>You have successfully purchased following
            {{ count($attendee_purchased_tickets) > 1 ? count($attendee_purchased_tickets) . ' tickets' : ' ticket' }}:
        </p>

        <div class="table-wrapper">
            <table class="responsive-table">
                <thead>
                    <tr>
                        {{-- <th>Ticket Name</th> --}}
                        <th>Price</th>
                        <th>QR Code</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($attendee_purchased_tickets as $index => $purchased_ticket)
                        <tr>
                            {{-- <td>{{ $index + 1 }}. {{ $purchased_ticket->ticket->name }}</td> --}}
                            <td>{{ $purchased_ticket->total + $purchased_ticket->purchased_addons()->sum('price') }}
                            </td>
                            <td><img
                                    src="{{ $message->embed(storage_path('app/public/' . $purchased_ticket->qr_code)) }}">
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>


        <div class="footer">
            <p>Best Regards,<br><strong>{{ config('app.name') }}</strong></p>
        </div>
    </div>
</body>

</html>
