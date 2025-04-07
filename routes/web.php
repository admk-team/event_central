<?php

use App\Http\Controllers\AnswerController;
use App\Http\Controllers\ProfileController;
use App\Mail\AttendeeTicketPurchased;
use App\Models\Attendee;
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



require __DIR__ . '/auth.php';

require __DIR__ . '/admin.php';

require __DIR__ . '/organizer.php';

require __DIR__ . '/theme.php';

require __DIR__ . '/attendee.php';



Route::get('/send-test-email', function () {

    $attendee = Attendee::find(1);
    $attendee->load('payments.purchased_tickets');
    $attendee_purchased_tickets = [];

    foreach ($attendee->payments as $payment) {
        foreach ($payment->purchased_tickets as $ticket)
            array_push($attendee_purchased_tickets, $ticket);
    }

    Mail::to($attendee->email)->send(new AttendeeTicketPurchased($attendee, $attendee_purchased_tickets));
    return 'email sent';
});



// Route::get('/test-qr', function () {
//     $svg =  QrCode::format('svg')->generate("But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain");

//     file_put_contents('test.svg', $svg);
//     return view('svg', compact('svg'));
// });
