<?php

namespace App\Http\Controllers\Organizer\Event;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\Event\EventPlatformRequest;
use App\Models\EventPartner;
use App\Models\EventPlatform;
use App\Models\PlatForm;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EventPlatformController extends Controller
{
    public function index()
    {
        $eventPlatforms = $this->datatable(
            EventPlatform::where('event_app_id', session('event_id'))
        );

        $platforms = PlatForm::orderBy('name', 'ASC')->get();

        return Inertia::render('Organizer/Events/VenueManagement/Index', [
            'eventPlatforms' => $eventPlatforms,
            'platforms' => $platforms
        ]);
    }

    public function store(EventPlatformRequest $request)
    {
        if (! Auth::user()->can('create_locations')) {
            abort(403);
        }

        $data = $request->validated();
        $data['event_app_id'] = session('event_id');
        EventPlatform::create($data);
        return back()->withSuccess('Created');
    }

    public function update(EventPlatformRequest $request, EventPlatform $event_platform)
    {
        if (! Auth::user()->can('edit_locations')) {
            abort(403);
        }

        $data = $request->validated();
        $data['event_app_id'] = session('event_id');
        $event_platform->update($data);
        return back()->withSuccess('Updated');
    }

    public function destroy(EventPlatform $event_platform)
    {
        if (! Auth::user()->can('delete_locations')) {
            abort(403);
        }
        $event_platform->delete();
        return back()->withSuccess('Deleted');
    }

    public function destroyMany(Request $request)
    {
        if (! Auth::user()->can('delete_locations')) {
            abort(403);
        }

        $request->validate([
            'ids' => 'required|array'
        ]);

        foreach ($request->ids as $id) {
            EventPlatform::find($id)?->delete();
        }

        return back()->withSuccess('Deleted');
    }

    public function blueprintImport(Request $request)
    {
        $request->validate([
            'blueprint' => 'required|image',
        ]);

        $file = $request->file('blueprint');

        $base64Image = base64_encode(file_get_contents($file->getRealPath()));

        $mime = $file->getMimeType();

        $dataUri = 'data:' . $mime . ';base64,' . $base64Image;
        $prompt = file_get_contents(resource_path('data/venue_blueprint_prompt.txt'));
        
        
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
                'Content-Type'  => 'application/json',
            ])->post('https://api.openai.com/v1/responses', [
                'model' => 'gpt-4.1',
                'input' => [
                    [
                        'role' => 'user',
                        'content' => [
                            [
                                'type' => 'input_text',
                                'text' => $prompt,
                            ],
                            [
                                'type' => 'input_image',
                                'image_url' => $dataUri,
                            ],
                        ],
                    ],
                ],
            ]);
    
            if (! $response->successful()) {
                throw new Exception($response->body());
            }
    
            $output = $response->json()['output'][0]['content'][0]['text'] ?? null;
            if (! $output) {
                throw new Exception('Failed');
            }

            $outputArray = json_decode($output, true);

            foreach ($outputArray as $item) {
                $eventPlatform = EventPlatform::where('name', $item['name'])->where('event_app_id', session('event_id'))->first();
                if ($eventPlatform) {
                    $eventPlatform->update([
                        'type' => ucwords($item['type']),
                        'seats' => $item['seats'],
                    ]);
                } else {
                    EventPlatform::create([
                        'event_app_id' => session('event_id'),
                        'type' => ucwords($item['type']),
                        'name' => $item['name'],
                        'seats' => $item['seats'],
                    ]);
                }
            }

            return back()->withSuccess("successfully Imported");
        } catch (\Exception $e) {
            Log::error("error", [
                $e->getMessage(),
            ]);
            return back()->withError("Failed to import from blueprint");
        }
    }
}
