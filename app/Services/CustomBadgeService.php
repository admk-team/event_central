<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use App\Models\CustomBadgeAttendee;
use Illuminate\Support\Facades\Storage;

class CustomBadgeService
{
    /**
     * Store a new template with the given data.
     */
    public function store(array $validatedData): CustomBadgeAttendee
    {
        if (isset($validatedData['thumbnail']) && $validatedData['thumbnail'] instanceof UploadedFile) {
            $validatedData['thumbnail'] = $validatedData['thumbnail']->store('templates', ['disk' => 'public']);
        }
        return CustomBadgeAttendee::create($validatedData);
    }
    /**
     * Update the given template with the provided data.
     */
    public function update(CustomBadgeAttendee $template, array $validatedData): CustomBadgeAttendee
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
