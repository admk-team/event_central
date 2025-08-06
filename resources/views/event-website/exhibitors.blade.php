@extends('event-website.layouts.layout')
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

@section('content')

@if ($exhibitors->count() > 0)
<section id="speakers" class="speakers">
    <div class="container">
        <div class="section-header">
            <span class="section-tag">Our Exhibitors</span>
        </div>
        <ul class="list-group">
            @foreach ($exhibitors ?? [] as $exhibitor)
                <li class="list-group-item">
                    @if ($exhibitor->exhibitor_logo)
                        <div class="mb-3">
                            <img src="{{ $exhibitor->exhibitor_logo }}" alt="{{ $exhibitor->company_name }} Logo" height="60px" style="height: 60px;" />
                        </div>
                    @endif
                    <div>
                        <b>Name: </b> {{ $exhibitor->company_name }}
                    </div>
                    @if ($exhibitor->phone)
                        <div>
                            <b>Phone: </b> {{ $exhibitor->phone }}
                        </div>
                    @endif
                    @if ($exhibitor->exhibitor_booth_no)
                        <div>
                            <b>Booth number: </b> {{ $exhibitor->exhibitor_booth_no }}
                        </div>
                    @endif
                    @if ($exhibitor->web)
                        <div>
                            <a target="_blank" href="{{ $exhibitor->web }}">
                                        <i class="bi bi-globe"></i>
                            </a>
                            <a target="_blank" href="{{ $exhibitor->facebook }}">
                                <i class="bi bi-facebook"></i>
                            </a>
                            <a style="text-decoration: none; color:black" target="_blank" href="{{ $exhibitor->twitter }}">
                                <i class="bi bi-twitter-x"></i>
                            </a>
                            <a  target="_blank" href="{{ $exhibitor->linkedin }}">
                                <i class="bi bi-linkedin"></i>
                            </a>
                            <a style="text-decoration: none; color:red" target="_blank" href="{{ $exhibitor->youtube }}">
                                <i class="bi bi-youtube"></i>
                            </a>
                        </div>
                    @endif
                </li>
            @endforeach
        </ul>
        </div>
    </div>
</section>
@endif

@endsection
