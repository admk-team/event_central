<?php

namespace App\Services;

use App\Models\EventEmailTemplate;
use App\Models\Template;
use Illuminate\Console\Scheduling\Event;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class TemplateService
{

    /**
     * Store a new template with the given data.
     */
    public function store(array $validatedData): EventEmailTemplate
    {
        if (isset($validatedData['thumbnail']) && $validatedData['thumbnail'] instanceof UploadedFile) {
            $validatedData['thumbnail'] = $validatedData['thumbnail']->store('templates', ['disk' => 'public']);
        }
        return EventEmailTemplate::create($validatedData);
    }
    /**
     * Update the given template with the provided data.
     */
    public function update(EventEmailTemplate $template, array $validatedData): EventEmailTemplate
    {
        if (isset($validatedData['thumbnail']) && $validatedData['thumbnail'] instanceof UploadedFile) {
            if ($template->thumbnail && Storage::disk('public')->exists($template->thumbnail)) {
                Storage::disk('public')->delete($template->thumbnail);
            }
            $validatedData['thumbnail'] = $validatedData['thumbnail']->store('templates', ['disk' => 'public']);
        }

        $sss = $template->update($validatedData);

        // dd($sss);
        return $template;
    }
}
