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

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    protected function datatable($query)
    {
        $request = request();

        $appendParams = [];

        $search = $request->search ? json_decode($request->search, true) : null;

        if ($search && $search['query']) {
            foreach ($search['columns'] as $i => $column) {
                if ($i === 0) {
                    $query->where($column, 'like', "%{$search['query']}%");
                } else {
                    $query->orWhere($column, 'like', "%{$search['query']}%");
                }
            }

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
        $EventBadges = EventBadge::where('event_app_id', $event_app_id)
            ->where('type', $type)
            ->orderBy('milestone', 'asc') // Fetch EventBadges in ascending order of milestone
            ->get();

        if ($EventBadges) {
            foreach ($EventBadges as $EventBadge) {
                // Check if a record already exists for the same content_code and EventBadge
                $existingEventBadgeDetail = EventBadgeDetail::where('event_app_id', $event_app_id)
                    ->where('type', $type)
                    ->where('attendee_id', $attendee_id)
                    ->where('content_code', $content_code)
                    ->where('badge_id', $EventBadge->id)
                    ->first();

                // Skip processing if a EventBadge already exists and is completed
                if ($existingEventBadgeDetail && $existingEventBadgeDetail->completed_at) {
                    continue;
                }

                // Fetch the most recent EventBadge details for the user
                $previousEventBadgeDetail = EventBadgeDetail::where('event_app_id', $event_app_id)
                    ->where('type', $type)
                    ->where('attendee_id', $attendee_id)
                    ->where('badge_id', $EventBadge->id)
                    ->latest()
                    ->first();
                // Skip processing if a EventBadge already exists and is completed
                if ($previousEventBadgeDetail && $previousEventBadgeDetail->completed_at) {
                    continue;
                }

                // Calculate the total achieved points
                $totalPoints = $previousEventBadgeDetail ? $previousEventBadgeDetail->achieved_points + $EventBadge->points : $EventBadge->points;

                // Check if the EventBadge milestone is achieved
                if ($totalPoints >= $EventBadge->milestone) {
                    // Create a new EventBadge details record with completed status
                    EventBadgeDetail::create([
                        'type' => $type,
                        'achieved_points' => $totalPoints,
                        'attendee_id' => $attendee_id,
                        'badge_id' => $EventBadge->id,
                        'content_code' => $content_code,
                        'event_app_id' => $event_app_id,
                        'completed_at' => now(),
                    ]);
                } elseif ($previousEventBadgeDetail?->completed_at == null) {
                    // Create a EventBadge record if not yet completed
                    EventBadgeDetail::create([
                        'type' => $type,
                        'achieved_points' => $totalPoints,
                        'attendee_id' => $attendee_id,
                        'badge_id' => $EventBadge->id,
                        'content_code' => $content_code,
                        'event_app_id' => $event_app_id,
                        'completed_at' => null, // Not completed yet
                    ]);
                }
            }
        }
    }
}
