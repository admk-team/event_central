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

        .full-width-table {
            width: 100%;
            border-collapse: collapse;
            /* Removes space between cells */
            table-layout: fixed;
            /* Forces cells to be equal width */
        }

        .full-width-table th,
        .full-width-table td {
            border: 1px solid #ccc;
            padding: 8px 12px;
            text-align: left;
            width: 33.33%;
            /* Each column gets 1/3 of the width */
            word-wrap: break-word;
            /* Prevent overflow */
        }
    </style>
</head>

<body>
    <div class="email-container">
        <h2>Welcome, {{ $attendee->first_name }} {{ $attendee->last_name }}!</h2>
        <p>You have successfully purchased following tickets:</p>
        <table class="full-width-table">
            <tr>
                <th>Ticket Name</th>
                <th>Price</th>
                <th>QR Code</th>
            </tr>
            @foreach ($attendee_purchased_tickets as $purchased_ticket)
                <tr>
                    <td>{{ $purchased_ticket->ticket->name }}</td>
                    <td>{{ $purchased_ticket->total }}</td>
                    <td>...
                        {{-- <img src="{{ $message->embed($pathToImage) }}"> --}}
                    </td>
                </tr>
            @endforeach

        </table>

        <div class="footer">
            <p>Best Regards,<br><strong>{{ config('app.name') }}</strong></p>
        </div>
    </div>
</body>

</html>
