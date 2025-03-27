<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use App\Models\Answer;
use App\Models\EventSession;
use App\Models\Question;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuestionAttendeeController extends Controller
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

        if ($request->wantsJson()) {
            return response()->json([
                'organizer_questions' => $organizerQuestions,
                'attendee_questions' => $attendeeQuestions,
            ]);
        }

        return Inertia::render("Attendee/Q&A/Index", [
            'eventApp' => $event,
            'organizer_questions' => $organizerQuestions,
            'attendee_questions' => $attendeeQuestions,
        ]);
    }

    public function storeQuestion(Request $request, EventSession $event)
    {
        $request->validate(['content' => 'required|string|max:500']);

        $event->questions()->create([
            'user_id' => auth()->id(),
            'user_type' => \App\Models\Attendee::class, // Attendees only
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

        // Restrict attendees to answering only organizer questions
        if ($question->user_type !== \App\Models\User::class) {
            abort(403, 'Attendees can only answer organizer questions.');
        }

        $answer = $question->answers()->create([
            'user_id' => auth()->id(),
            'user_type' => \App\Models\Attendee::class, // Attendees only
            'content' => $request->content,
        ]);

        return back()->withSuccess('Answer added successfully');
    }

    public function updateQuestion(Request $request, $questionId)
    {
        $request->validate(['content' => 'required|string|max:500']);
        $question = Question::findOrFail($questionId);
        $this->authorizeQuestionAction($question, auth()->id());
        $question->update(['content' => $request->content]);
        return back()->withSuccess('Question updated successfully');
    }

    public function destroyQuestion($questionId)
    {
        $question = Question::findOrFail($questionId);
        $this->authorizeQuestionAction($question, auth()->id());
        $question->delete();
        return back()->withSuccess('Question deleted successfully');
    }

    public function updateAnswer(Request $request, $answerId)
    {
        $request->validate(['content' => 'required|string|max:1000']);
        $answer = Answer::findOrFail($answerId);
        $this->authorizeAnswerAction($answer, auth()->id());
        $answer->update(['content' => $request->content]);
        return back()->withSuccess('Answer updated successfully');
    }

    public function destroyAnswer($answerId)
    {
        $answer = Answer::findOrFail($answerId);
        $this->authorizeAnswerAction($answer, auth()->id());
        $answer->delete();
        return back()->withSuccess('Answer deleted successfully');
    }

    private function authorizeQuestionAction($question, $userId)
    {
        if ($question->user_id !== $userId || $question->user_type !== \App\Models\Attendee::class) {
            abort(403, 'You are not authorized to perform this action.');
        }
    }

    private function authorizeAnswerAction($answer, $userId)
    {
        if ($answer->user_id !== $userId || $answer->user_type !== \App\Models\Attendee::class) {
            abort(403, 'You are not authorized to perform this action.');
        }
    }
}