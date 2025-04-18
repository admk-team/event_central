@extends('event-website.layouts.layout')
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
@section('content')
    <div class="container">
        <h2>Contact Us</h2>

        <p>If you have any questions or concerns about this Privacy Policy or our data handling practices, feel free to
            contact
            us through the following methods:</p>

        <ul>
            <li><strong>Email:</strong> <a href="mailto:support@eventcentral.net">support@eventcentral.net</a></li>
            <li><strong>Phone:</strong> +1 (800) 123-4567</li>
            <li><strong>Website:</strong> <a href="https://eventcentral.net" target="_blank">https://eventcentral.net</a></li>
        </ul>

        <h3>Contact Form</h3>
        <form action="#" method="POST">
            @csrf
            <div style="margin-bottom: 1rem;">
                <label for="name">Name:</label><br>
                <input type="text" name="name" id="name" required style="width: 100%;">
            </div>

            <div style="margin-bottom: 1rem;">
                <label for="email">Email:</label><br>
                <input type="email" name="email" id="email" required style="width: 100%;">
            </div>

            <div style="margin-bottom: 1rem;">
                <label for="message">Message:</label><br>
                <textarea name="message" id="message" rows="5" required style="width: 100%;"></textarea>
            </div>

            <button type="submit" class="btn btn-primary" style="padding: 0.5rem 1rem;">Send Message</button>
        </form>
    </div>
@endsection
