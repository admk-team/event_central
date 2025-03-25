<!DOCTYPE html>
<html>
<head>
    <title>Welcome to Our System</title>
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
            text-align: center;
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
            text-align: center;
            font-size: 14px;
            color: #777;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <h2>Welcome, {{ $fname }} {{ $lname}}!</h2>
        <p>We are excited to have you onboard. Below are your login credentials:</p>

        <div class="credentials">
            <p><strong>Email:</strong> {{ $email }}</p>
            <p><strong>Password:</strong> {{ $password }}</p>
        </div>

        <p>You can log in using the credentials above. For security reasons, please change your password after logging in.</p>

        <p style="text-align: center;">
            <a href="{{ url('/attendee/' . $event_app_id . '/login') }}" class="btn">Login Now</a>
        </p>

        <div class="footer">
            <p>Best Regards,<br><strong>{{ config('app.name') }}</strong></p>
        </div>
    </div>
</body>
</html>
