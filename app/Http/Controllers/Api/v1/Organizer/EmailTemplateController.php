<?php

namespace App\Http\Controllers\Api\v1\Organizer;

use Illuminate\Http\Request;
use App\Services\TemplateService;
use App\Models\EventEmailTemplate;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class EmailTemplateController extends Controller
{
    protected $templateService;
    public function __construct(TemplateService $templateService)
    {
        $this->templateService = $templateService;
    }

    public function update(Request $request, EventEmailTemplate $EmailTemplate)
    {
        $input  = [
            'user_id' => $request->user_id,
            'name' => $request->name,
            'event_app_id' => $request->event_id,
            'thumbnail' => $request->thumbnail,
            'editor_content' => $request->editor_content,
            'mail_content' => $request->mail_content,
        ];
        // dd($input);

        DB::transaction(function () use ($EmailTemplate, $input) {
            $this->templateService->update($EmailTemplate, $input);
        }, 2);

        return response()->json(['message' => 'updated successfully']);
    }
}
