<!DOCTYPE html>
<html>
<head>
    <title>Welcome to {{ $event_app->name }}</title>
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
        p, li {
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
        <p>Hello {{ $fname }} {{ $lname }},</p>

        <p>We’re excited to welcome you to the <strong>{{ $event_app->name }}</strong>!</p>

        <p>You can now log in to the {{ $event_app->name }} App or access everything online to stay connected and make the most of your festival experience.</p>

        <p><strong>Here are your login details:</strong></p>
        <p>Username: {{ $email }}<br>
           Password: {{ $password }}</p>

        <p>You can log in through the app or online at:<br>
        <a href="{{ $url }}">{{ $url }}</a></p>

        <p>With your account, you’ll be able to:</p>
        <ul>
            <li>View the full festival schedule</li>
            <li>Add sessions to your personal agenda</li>
            <li>Vote for your favorite films</li>
            <li>Leave feedback on sessions and events</li>
            <li>Purchase tickets and more!</li>
        </ul>

        <p>Download the app from your device’s app store by searching <strong>{{ $event_app->name }}</strong>, or log in online at <a href="{{ $url }}">{{ $url }}</a> to get started.</p>

        <p>We’re looking forward to seeing you at the festival!</p>

        <div class="footer">
            <p>Blessings,<br>
            The {{ $event_app->name }} Team<br>
            {{--  <a href="https://www.internationalcff.com">www.internationalcff.com</a></p>  --}}
        </div>
    </div>
</body>
</html>
