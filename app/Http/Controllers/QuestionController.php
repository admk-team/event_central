<?php

namespace App\Http\Controllers;

use App\Models\Answer;
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
    public function updateQuestion(Request $request, $questionId) {
        $request->validate(['content' => 'required|string|max:500']);
        $question = Question::findOrFail($questionId);
        // $this->authorizeQuestionAction($question, auth()->id());
        $question->update(['content' => $request->content]);
        return back()->withSuccess('Question updated successfully');
    }
    
    public function destroyQuestion($questionId) {
        $question = Question::findOrFail($questionId);
        // $this->authorizeQuestionAction($question, auth()->id());
        $question->delete();
        return back()->withSuccess('Question deleted successfully');
    }
    
    public function updateAnswer(Request $request, $answerId) {
        $request->validate(['content' => 'required|string|max:1000']);
        $answer = Answer::findOrFail($answerId);
        // $this->authorizeAnswerAction($answer, auth()->id());
        $answer->update(['content' => $request->content]);
        return back()->withSuccess('Answer updated successfully');
    }
    
    public function destroyAnswer($answerId) {
        $answer = Answer::findOrFail($answerId);
        // $this->authorizeAnswerAction($answer, auth()->id());
        $answer->delete();
        return back()->withSuccess('Answer deleted successfully');
    }
}
