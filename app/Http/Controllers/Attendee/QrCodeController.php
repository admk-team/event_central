<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use App\Models\EventApp;
use Illuminate\Http\Request;
use Inertia\Inertia;
use SimpleSoftwareIO\QrCode\Facades\QrCode;


class QrCodeController extends Controller
{
    public function getQrCode(Request $request, EventApp $eventApp)
    {
        $qr_code = QrCode::size(256)->generate('https://google.com');
        $qr_code = base64_encode($qr_code);
        return Inertia::render("Attendee/QrCode", compact(['eventApp', 'qr_code']));
    }
}
