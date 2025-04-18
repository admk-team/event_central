<?php

use App\Http\Controllers\AnswerController;
use App\Http\Controllers\ProfileController;
use App\Mail\AttendeeTicketPurchased;
use App\Mail\AttendeeTicketPurchasedEmail;
use App\Models\Attendee;
use App\Models\AttendeePayment;
use App\Models\AttendeePurchasedTickets;
use Illuminate\Support\Facades\Route;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\Image\ImagickImageBackEnd;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\PlainTextRenderer;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });


Route::get('/', function () {
    //If Attendee User is logged in then redirect to Attendee Dashboard
    if (auth()->guard('attendee')->check()) {
        $eventId = auth()->guard('attendee')->user()->event_app_id;
        return redirect()->route('attendee.event.detail.dashboard', $eventId);
    } else if (auth()->check()) {
        // If Admin or Organizer is logged in then redirect to their respective dashboard
        $role = auth()->user()->role;
        if ($role == 'admin') {
            return redirect()->route('admin.dashboard');
        } else if ($role == 'organizer') {
            return redirect()->route('organizer.events.index');
        }
    } else {
        // If no user is logged in then show the Landing Page
        return Inertia::render('Home');
    }
});

Route::middleware('auth')->group(function () {
    Route::get('/profile-edit', [ProfileController::class, 'edit'])->name('profile.edit'); // To be removed in future
    Route::patch('/profile-update', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile-destroy', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::get('/test-attendee-qr', [AnswerController::class, 'generate']);
});


Route::middleware('auth:attendee')->group(function () {

    Route::get('/test-attendee-qr', [AnswerController::class, 'generate']);
});

Route::get('test', function () {
    $payment = AttendeePayment::find(213);
    $payment->load('purchased_tickets.ticket.sessions');
    $sessions = $payment->purchased_tickets->flatMap(function ($item) {
        return $item->ticket->sessions;
    });

    // return $payment;
    return $sessions->pluck('id');
    dd($payment);
    // return Inertia::render('Test');
});



require __DIR__ . '/auth.php';

require __DIR__ . '/admin.php';

require __DIR__ . '/organizer.php';

require __DIR__ . '/theme.php';

require __DIR__ . '/attendee.php';
