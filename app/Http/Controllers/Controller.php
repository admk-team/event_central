<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

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

            if (isset($search['combinations'])) {
                foreach ($search['combinations'] as $combination) {
                    $columnRaw = DB::raw("CONCAT(" . implode(", ' ', ", $combination) . ")");
                    $query->orWhere($columnRaw, 'like', "%{$search['query']}%");
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
}
