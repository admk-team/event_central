<?php

namespace App\Http\Controllers;

use App\Models\EventApp;
use App\Models\Question;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class QuestionController extends Controller
{
    public function index(Request $request)
    {
        $event = EventApp::findOrFail(session('event_id'));
        $questions = Question::where('event_app_id', session('event_id'))
            ->with(['user', 'answers.user'])
            ->get();

        if ($request->wantsJson()) {
            return response()->json(['questionlist' => $questions]);
        }

        return Inertia::render("Organizer/Events/Q&A/Index", [
            'event' => $event,
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
