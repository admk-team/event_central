@extends('event-website.layouts.layout')
@section('style')
    @vite(['resources/css/website-styles.css'])
@endsection
@section('header')
    @include('event-website.themes.default.header')
@endsection

@section('content')
    <div class="container py-5">
        <h1>{{ $page->title ?? 'Page' }}</h1>
        <div class="page-content">
            {!! $page->content ?? '' !!}
        </div>
    </div>
@endsection
