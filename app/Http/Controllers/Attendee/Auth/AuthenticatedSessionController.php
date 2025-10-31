<?php

namespace App\Http\Controllers\Attendee\Auth;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Attendee;
use App\Models\EventApp;
use Illuminate\Http\Request;
use App\Models\EventAppSetting;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Route;
use App\Models\AttendeePurchasedTickets;
use App\Models\AttendeeTransferedTicket;
use Laravel\Socialite\Facades\Socialite;
use App\Http\Requests\Attendee\AttendeeLoginRequest;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(EventApp $eventApp): Response|RedirectResponse
    {
        //Check if registration is public or private then show Login Page with registration button or not
        $event_setting = EventAppSetting::where('event_app_id', $eventApp->id)->where('key', 'registration_private')->first();
        $registration_allowed = ($event_setting && $event_setting->value === 1) ? false : true;
        $eventApp->load(['dates']);
        return Inertia::render('Attendee/Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
            'eventApp' => $eventApp,
            'registration_allowed' => $registration_allowed
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(AttendeeLoginRequest $request, EventApp $eventApp): RedirectResponse
    {
        //Custom logic to login user as attendee may sigunup with different event keeping same email address
        // Laravel default auth guard will not work here
        $url = route('organizer.events.website', $eventApp->uuid);
        $code = substr(sha1(mt_rand()), 1, 32);
        $personal_url = $url . '?link=' . $code;

        $user = Attendee::where('event_app_id', $eventApp->id)->where('email', $request->email)->first();
        if ($user) {
            $credentials = $request->validate([
                'email' => ['required', 'email'],
                'password' => ['required'],
            ]);
            $user->personal_url = $personal_url;
            $user->save();
            if (Hash::check($credentials['password'], $user->password)) {
                Auth::guard('attendee')->login($user);
                $user = Auth::guard('attendee')->user();
                $this->checkIfTicketTransferCase($user->email, $eventApp, $user);
                $request->session()->regenerate();
                return redirect()->route('attendee.event.detail.dashboard');
            }
        }
        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $eventId = auth('attendee')->user()->event_app_id;
        Auth::guard('attendee')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect(route('attendee.login', [$eventId]));
    }

    public function googleRedirect($id)
    {
        return Socialite::driver('google')->with(['state' => $id])
            ->redirect();
    }

    public function googleCallback(Request $request)
    {
        $event_id = $request->input('state');
        $googleUser = Socialite::driver('google')->stateless()->user();

        $user = Attendee::where('email', $googleUser->email)->first();
        if (!$user) {
            $user = Attendee::create([
                'event_app_id' => $event_id,
                'name' => $googleUser->name,
                'email' => $googleUser->email,
                'password' => Hash::make(rand(100000, 999999)),
                'google_id' => $googleUser->id,
            ]);
        }
        Auth::guard('attendee')->login($user);
        return redirect(route('attendee.event.detail.dashboard'));
    }

    private function checkIfTicketTransferCase($email, $eventApp, $user)
    {
        $transferedTicket = AttendeeTransferedTicket::where('email', $email)
            ->where('event_app_id', $eventApp->id)
            ->first();

        if ($transferedTicket) {
            $purchasedTicket = AttendeePurchasedTickets::whereId($transferedTicket->attendee_purchased_ticket_id)->first();

            if ($purchasedTicket) {
                DB::beginTransaction();
                try {
                    //Session Access Needed
                    $purchasedTicket->update([
                        'transfered_to_attendee_id' => $user->id,
                        'is_transfered' => true,
                    ]);

                    $transferedTicket->update([
                        'at_attendee_id' => $user->id,
                        'at_attendee_payment_id' => null,
                        'transfer_status' => 'done',
                    ]);

                    // // update sessions of previous attendee who transfered this ticket
                    $bt_attendee = Attendee::find($transferedTicket->bt_attendee_id);
                    $purchasedTickets = $bt_attendee->purchased_tickets();


                    foreach ($purchasedTickets as $purchasedTicketNew) {
                        DB::table('attendee_event_session')->where('attendee_id', $bt_attendee->id)
                            ->where('attendee_purchased_ticket_id', $purchasedTicketNew->id)->delete();
                        $this->updateAttendeeSession($bt_attendee, $purchasedTicketNew);
                    }


                    // update sessions of newly created attendee
                    DB::table('attendee_event_session')->where('attendee_purchased_ticket_id', $purchasedTicket->id)->delete();
                    $this->updateAttendeeSession($user, $purchasedTicket);

                    DB::commit();
                } catch (\Exception $ex) {
                    DB::rollBack();
                    Log::error($ex->getMessage());
                }
            }
        }
    }
}
