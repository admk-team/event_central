<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Event Certificate</title>
    <style>
        /* ✅ Embed fonts for Dompdf */
        @font-face {
            font-family: 'Playfair Display';
            src: url('{{ public_path('fonts/PlayfairDisplay-Regular.ttf') }}') format('truetype');
            font-weight: normal;
        }

        @font-face {
            font-family: 'Playfair Display';
            src: url('{{ public_path('fonts/PlayfairDisplay-Bold.ttf') }}') format('truetype');
            font-weight: bold;
        }

        @font-face {
            font-family: 'Open Sans';
            src: url('{{ public_path('fonts/OpenSans-Regular.ttf') }}') format('truetype');
            font-weight: normal;
        }

        body {
            margin: 0;
            padding: 0;
            font-family: 'Open Sans', sans-serif;
        }

        .certificate-container {
            width: 800px;
            height: fit-content;
            background: #fff;
            /* border: 2px solid #c9b18e; */
            margin: 50px auto;
            padding: 10px auto;
            position: relative;
        }

        /* Corner decorations */
        .corner {
            position: absolute;
            width: 60px;
            height: 60px;
        }

        .corner-top-left {
            top: 0;
            left: 0;
            border-top: 3px solid #8e7c5a;
            border-left: 3px solid #8e7c5a;
        }

        .corner-top-right {
            top: 0;
            right: 0;
            border-top: 3px solid #8e7c5a;
            border-right: 3px solid #8e7c5a;
        }

        .corner-bottom-left {
            bottom: 0;
            left: 0;
            border-bottom: 3px solid #8e7c5a;
            border-left: 3px solid #8e7c5a;
        }

        .corner-bottom-right {
            bottom: 0;
            right: 0;
            border-bottom: 3px solid #8e7c5a;
            border-right: 3px solid #8e7c5a;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
        }

        .header h1 {
            font-family: 'Playfair Display', serif;
            font-size: 38px;
            font-weight: bold;
            color: #8e7c5a;
            margin: 0 0 5px 0;
            text-transform: uppercase;
        }

        .header p {
            font-size: 16px;
            color: #666;
            margin: 0;
        }

        .main-content {
            text-align: center;
            margin: 30px 0;
        }

        .achievement {
            font-family: 'Playfair Display', serif;
            font-size: 28px;
            font-weight: bold;
            color: #333;
            margin: 15px 0;
        }

        .presented-to {
            font-size: 18px;
            color: #555;
        }

        .attendee-name {
            font-family: 'Playfair Display', serif;
            font-size: 32px;
            font-weight: bold;
            color: #8e7c5a;
            margin: 20px 0;
            text-transform: uppercase;
        }

        .description {
            font-size: 16px;
            color: #444;
            line-height: 1.6;
            width: 90%;
            margin: 0 auto;
        }

        .event-details {
            margin: 20px 0;
            font-size: 14px;
            color: #666;
        }

        /* Signatures section */
        .signatures {
            margin-top: 50px;
            text-align: center;
        }

        .signature {
            display: inline-block;
            width: 200px;
            margin: 0 40px;
        }

        .signature-line {
            width: 100%;
            height: 1px;
            background: #333;
            margin: 5px 0;
        }

        .signature p {
            margin: 2px 0;
            font-size: 14px;
            color: #555;
        }
    </style>
</head>

<body>
    <div class="certificate-container">
        <div class="corner corner-top-left"></div>
        <div class="corner corner-top-right"></div>
        <div class="corner corner-bottom-left"></div>
        <div class="corner corner-bottom-right"></div>

        <div class="header">
            <h1>{{ $session_name }}</h1>
            <p>This certifies that the following individual has participated in</p>
        </div>

        <div class="main-content">
            <div>
                <img src="{{ public_path('assets/images/badge.png') }}" alt="" width="80" height="100">

            </div>
            <div class="achievement">Successful Completion</div>

            <div class="presented-to">This certificate is presented to</div>
            <div class="attendee-name">{{ $attendee }}</div>

            <div class="description">
                Awarded to acknowledge your participation in "{{ $event_name }}" and its session "{{ $session_name }}"
                held on {{  \Carbon\Carbon::parse($start_date)->format('F d, Y') }}, appreciating your commitment to growth, learning, and contribution
                toward excellence in the field of digital marketing.
            </div>

            {{-- <div class="event-details">
                Event ID: DM2023-087 | Issue Date: October 17, 2023 | Certificate ID: EC-2301015
            </div> --}}
            <div class="event-details">
                Issue Date: {{ now()->format('F d, Y') }}
            </div>
        </div>

        {{-- <div class="signatures">
            <div class="signature">
                <p>Sarah Johnson</p>
                <div class="signature-line"></div>
                <p>Event Organizer</p>
            </div>
            <div class="signature">
                <p>{{ $event_name }}</p>
                <div class="signature-line"></div>
                <p>Event</p>
            </div>
        </div> --}}
    </div>
</body>

</html>
