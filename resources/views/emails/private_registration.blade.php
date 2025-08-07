<!DOCTYPE html>
<html>

<head>
    <title>You're Invited to Join Our Event!</title>
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

        .btn {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 15px;
            background: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
        }

        .btn:hover {
            background: #0056b3;
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
        <h2>🎉 You're Invited to Register!</h2>
        <p>Hello,</p>

        <p>We're excited to invite you to register for our event
            <strong>{{ $events->name ?? 'Our Special Event' }}</strong>. Be part of a remarkable experience full of
            learning, networking, and inspiration.
        </p>

        <p>To register, simply click the button below:</p>

        <a href="{{ $inviteUrl }}" class="btn">Register Now</a>

        <p>If the button doesn't work, copy and paste the following URL into your browser:</p>
        <p style="word-break: break-all;"><a href="{{ $inviteUrl }}">{{ $inviteUrl }}</a></p>

        <div class="footer">
            <p>Blessings</p>
            <p><strong>{{ $events->name }}</strong></p>
        </div>
    </div>
</body>

</html>
