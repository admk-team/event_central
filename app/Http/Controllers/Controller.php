<?php

namespace App\Http\Controllers;

use App\Models\EventBadge;
use App\Models\EventBadgeDetail;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Pusher\PushNotifications\PushNotifications;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    protected function datatable($query)
    {
        $request = request();

        $appendParams = [];

        $search = $request->search ? json_decode($request->search, true) : null;

        if ($search && $search['query']) {
            $query->where(function ($query) use ($search) {
                foreach ($search['columns'] as $i => $column) {
                    if ($i === 0) {
                        $query->where($column, 'like', "%{$search['query']}%");
                    } else {
                        $query->orWhere($column, 'like', "%{$search['query']}%");
                    }
                }

                if (isset($search['combinations'])) {
                    foreach ($search['combinations'] as $combination) {
                        $columnRaw = DB::raw("CONCAT(" . implode(", ' ', ", $combination) . ")");
                        $query->orWhere($columnRaw, 'like', "%{$search['query']}%");
                    }
                }
            });

            $appendParams['search'] = $request->search;
        }

        $sort = $request->sort ? json_decode($request->sort, true) : null;

        if ($sort) {
            $query->orderBy($sort['column'], $sort['desc'] ? 'desc' : 'asc');
            $appendParams['sort'] = $request->sort;
        } else {
            $query->latest();
        }

        return $query->paginate($request->per_page ?? 10)->appends($appendParams);
    }

    /**
     * Success response
     *
     * @param  JsonResource  $data
     * @param  bool  $resourceCreated
     * @return JsonResponse
     */
    protected function successResponse(array|JsonResource $data, bool $resourceCreated = false): JsonResponse
    {
        return response()
            ->json(
                $data,
                $resourceCreated ?
                    Response::HTTP_CREATED :
                    Response::HTTP_OK
            );
    }
    /**
     * Success Message response
     *
     * @param  string  $successMessage
     * @param  int  $responseCode
     * @return JsonResponse
     */
    protected function successMessageResponse(string $successMessage, int $responseCode): JsonResponse
    {
        return response()
            ->json(
                ['message' => $successMessage],
                $responseCode
            );
    }

    /**
     * Error response
     *
     * @param  string  $errorMessage
     * @param  int  $responseCode
     * @return JsonResponse
     */
    protected function errorResponse(string $errorMessage, int $responseCode): JsonResponse
    {
        return response()
            ->json(
                ['message' => $errorMessage],
                $responseCode
            );
    }

    /**
     * Delete response
     *
     * @return JsonResponse
     */
    protected function deleteResponse(): JsonResponse
    {
        return response()
            ->json(
                null,
                Response::HTTP_NO_CONTENT
            );
    }
    protected function eventBadgeDetail($type, $event_app_id, $attendee_id, $content_code): void
    {
        $badges = EventBadge::where('event_app_id', $event_app_id)
            ->where('type', $type)
            ->orderBy('milestone', 'asc')
            ->get();

        if ($badges->isEmpty()) {
            return;
        }

        foreach ($badges as $badge) {
            $commonConditions = [
                ['event_app_id', '=', $event_app_id],
                ['type', '=', $type],
                ['attendee_id', '=', $attendee_id],
                ['event_badge_id', '=', $badge->id],
            ];

            // Skip if a completed record exists for the same content_code
            $existing = EventBadgeDetail::where($commonConditions)
                ->where('content_code', $content_code)
                ->whereNotNull('completed_at')
                ->first();

            if ($existing) {
                continue;
            }

            // Get latest badge detail
            $latestDetail = EventBadgeDetail::where($commonConditions)
                ->latest()
                ->first();

            // Skip if already completed
            if ($latestDetail && $latestDetail->completed_at) {
                continue;
            }

            $totalPoints = ($latestDetail?->achieved_points ?? 0) + $badge->points;
            $isCompleted = $totalPoints >= $badge->milestone;

            EventBadgeDetail::create([
                'type' => $type,
                'achieved_points' => $totalPoints,
                'attendee_id' => $attendee_id,
                'event_badge_id' => $badge->id,
                'content_code' => $content_code,
                'event_app_id' => $event_app_id,
                'completed_at' => $isCompleted ? now() : null,
            ]);
        }
    }

    // protected function webPushNotification($userId, $title, $body, $deep_link): void
    // {
    //     $beamsClient = new PushNotifications([
    //         "instanceId" => config('services.pusher_beams.instance_id'),
    //         "secretKey" => config('services.pusher_beams.secret_key'),
    //     ]);

    //     $beamsClient->publishToInterests(
    //         ['attendee-' . $userId], // Matches frontend subscription
    //         [
    //             "web" => [
    //                 "notification" => [
    //                     "title" => $title,
    //                     "body" => $body,
    //                     "deep_link" => $deep_link,
    //                 ]
    //             ]
    //         ]
    //     );
    // }
}
