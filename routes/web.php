<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;


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

// Route::get("/apps-ecommerce-orders", [ProfileController::class, 'index'])->name('order-list');

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
});

Route::get('/test-qr', function () {
    return QrCode::format('png')->size(256)->generate('https://google.com');
});

require __DIR__ . '/auth.php';

require __DIR__ . '/admin.php';

require __DIR__ . '/organizer.php';

require __DIR__ . '/theme.php';

require __DIR__ . '/attendee.php';
