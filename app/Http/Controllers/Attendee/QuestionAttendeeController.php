<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use App\Models\EventApp;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class QuestionAttendeeController extends Controller
{
    public function index(Request $request)
    {
        $eventID = session('event_id') ?? Auth::user()->event_app_id;
        $event = EventApp::findOrFail($eventID);
        $questions = Question::where('event_app_id', $eventID)
            ->with(['user', 'answers.user'])
            ->get();

        if ($request->wantsJson()) {
            return response()->json(['questionlist' => $questions]);
        }

        return Inertia::render("Attendee/Q&A/Index", [
            'eventApp' => $event,
            'questionlist' => $questions,
        ]);
    }

    // Other methods (storeQuestion, vote, storeAnswer) remain unchanged
    public function storeQuestion(Request $request, EventApp $event)
    {
        $request->validate(['content' => 'required|string|max:500']);

        $event->questions()->create([
            'user_id' => auth()->id(),
            'content' => $request->content,
        ]);

        return back()->withSuccess('Question added successfully');
    }

    public function vote(Request $request, $questionId)
    {
        $request->validate(['vote' => 'required|in:1,-1']);

        $question = Question::findOrFail($questionId);
        $question->votes()->updateOrCreate(
            ['user_id' => auth()->id()],
            ['vote' => $request->vote]
        );

        $question->likes_count = $question->votes()->where('vote', 1)->count();
        $question->dislikes_count = $question->votes()->where('vote', -1)->count();
        $question->save();

        return back()->withSuccess('Vote recorded');
    }

    public function storeAnswer(Request $request, $questionId)
    {
        $request->validate(['content' => 'required|string|max:1000']);

        $question = Question::findOrFail($questionId);
        $answer = $question->answers()->create([
            'user_id' => auth()->id(),
            'content' => $request->content,
        ]);

        return back()->withSuccess('Answer added successfully');
    }
}
