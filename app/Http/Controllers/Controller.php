<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    protected function datatable($query)
    {
        $request = request();

        $appendParams = [];

        $sort = $request->sort? json_decode($request->sort, true): null;

        if ($sort) {
            $query->orderBy($sort['column'], $sort['desc'] ? 'desc' : 'asc');
            $appendParams['sort'] = $request->sort;
        } else {
            $query->latest();
        }

        return $query->paginate($request->per_page ?? 10)->appends($appendParams);
    }
}
