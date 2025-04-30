<?php

namespace App\Http\Controllers\Api\v1\Attendee;

use App\Http\Controllers\Controller;
use App\Models\EventBadge;
use App\Models\EventBadgeDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BadgeAchievementController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $eventAppId = $user->event_app_id;
        $attendeeId = $user->id;
        $referral_link = $user->personal_url;

        $badges = EventBadge::where('event_app_id', $eventAppId)
            ->select('id', 'title', 'icon', 'points', 'milestone')
            ->get();

        $data = [
            'badges' => [],
            'total_points' => 0,
            'current_month_points' => 0,
            'referral_link' => $referral_link,
        ];

        foreach ($badges as $badge) {
            $latestDetail = EventBadgeDetail::where('event_app_id', $eventAppId)
                ->where('attendee_id', $attendeeId)
                ->where('event_badge_id', $badge->id)
                ->orderByDesc('id')
                ->select('achieved_points', 'completed_at', 'created_at')
                ->first();

            $badge->details = $latestDetail;

            $data['badges'][] = $badge;

            if ($latestDetail) {
                $data['total_points'] += (int) $latestDetail->achieved_points;

                if (
                    $latestDetail->created_at &&
                    $latestDetail->created_at->isCurrentMonth() &&
                    $latestDetail->created_at->isCurrentYear()
                ) {
                    $data['current_month_points'] += (int) $latestDetail->achieved_points;
                }
            }
        }

        return response()->json(['success' => true, 'data' => $data]);
    }
}
