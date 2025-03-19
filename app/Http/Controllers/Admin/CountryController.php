<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Country;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CountryController extends Controller
{
    public function index(Request $request)
    {
        $country = $this->datatable(Country::query());
        return Inertia::render('Admin/Country/index', compact('country'));
    }
}
