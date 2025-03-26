<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\EventSession;
use App\Models\Question;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuestionController extends Controller
{
    public function index(Request $request, $session_id)
    {
        $event = EventSession::findOrFail($session_id);

        // Fetch organizer questions (user_type = App\Models\User)
        $organizerQuestions = Question::where('event_session_id', $session_id)
            ->where('user_type', \App\Models\User::class)
            ->with(['user', 'answers.user'])
            ->get();

        // Fetch attendee questions (user_type = App\Models\Attendee)
        $attendeeQuestions = Question::where('event_session_id', $session_id)
            ->where('user_type', \App\Models\Attendee::class)
            ->with(['user', 'answers.user'])
            ->get();
            // if ($request->wantsJson()) {
            //     return response()->json(['questionlist' => $questions]);
            // }
        if ($request->wantsJson()) {
            return response()->json([
                'organizer_questions' => $organizerQuestions,
                'questionlist' => $attendeeQuestions,
            ]);
        }

        return Inertia::render("Organizer/Events/Q&A/Index", [
            'event' => $event,
            'organizer_questions' => $organizerQuestions,
            'questionlist' => $attendeeQuestions,
        ]);
    }

    // Other methods remain unchanged...
    public function storeQuestion(Request $request, EventSession $event)
    {
        $request->validate(['content' => 'required|string|max:500']);

        $event->questions()->create([
            'user_id' => auth()->id(),
            'user_type' => auth()->user() instanceof \App\Models\User ? \App\Models\User::class : \App\Models\Attendee::class,
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
            'user_type' => auth()->user() instanceof \App\Models\User ? \App\Models\User::class : \App\Models\Attendee::class,
            'content' => $request->content,
        ]);

        return back()->withSuccess('Answer added successfully');
    }

    public function updateQuestion(Request $request, $questionId)
    {
        $request->validate(['content' => 'required|string|max:500']);
        $question = Question::findOrFail($questionId);

        // if ($question->user_id !== auth()->id() || $question->user_type !== get_class(auth()->user())) {
        //     abort(403, 'You are not authorized to update this question.');
        // }

        $question->update(['content' => $request->content]);
        return back()->withSuccess('Question updated successfully');
    }

    public function destroyQuestion($questionId)
    {
        $question = Question::findOrFail($questionId);

        // if ($question->user_id !== auth()->id() || $question->user_type !== get_class(auth()->user())) {
        //     abort(403, 'You are not authorized to delete this question.');
        // }

        $question->delete();
        return back()->withSuccess('Question deleted successfully');
    }

    public function updateAnswer(Request $request, $answerId)
    {
        $request->validate(['content' => 'required|string|max:1000']);
        $answer = Answer::findOrFail($answerId);

        // if ($answer->user_id !== auth()->id() || $answer->user_type !== get_class(auth()->user())) {
        //     abort(403, 'You are not authorized to update this answer.');
        // }

        $answer->update(['content' => $request->content]);
        return back()->withSuccess('Answer updated successfully');
    }

    public function destroyAnswer($answerId)
    {
        $answer = Answer::findOrFail($answerId);

        // if ($answer->user_id !== auth()->id() || $answer->user_type !== get_class(auth()->user())) {
        //     abort(403, 'You are not authorized to delete this answer.');
        // }

        $answer->delete();
        return back()->withSuccess('Answer deleted successfully');
    }
}