<?php

namespace App\Http\Controllers\Api\v1\Organizer;

use App\Http\Controllers\Controller;
use App\Models\Answer;
use App\Models\EventSession;
use App\Models\Question;
use Illuminate\Http\Request;

class QAController extends Controller
{
    public function organizerQA($session_id)
    {
        $event = EventSession::findOrFail($session_id);
        // Fetch organizer questions (user_type = App\Models\User)
        $organizerQuestions = Question::where('event_session_id', $session_id)
            ->where('user_type', \App\Models\User::class)
            ->with(['user', 'answers.user'])
            ->get();
        return response()->json([
            'event' => $event,
            'organizer_questions' => $organizerQuestions,
        ], 200);
    }
    public function attendeeQA($session_id)
    {
        $event = EventSession::findOrFail($session_id);
      

        // Fetch attendee questions (user_type = App\Models\Attendee)
        $attendeeQuestions = Question::where('event_session_id', $session_id)
            ->where('user_type', \App\Models\Attendee::class)
            ->with(['user', 'answers.user'])
            ->get();

        return response()->json([
            'event' => $event,
            'attendee_questions' => $attendeeQuestions,
        ], 200);
    }

    public function storeQuestion(Request $request, EventSession $session_id)
    {
        $request->validate(['content' => 'required|string|max:500']);

        $question = $session_id->questions()->create([
            'user_id' => auth()->id(),
            'user_type' => auth()->user() instanceof \App\Models\User ? \App\Models\User::class : \App\Models\Attendee::class,
            'content' => $request->content,
        ]);

        return response()->json([
            'message' => 'Question added successfully',
            // 'question' => $question->load(['user', 'answers.user']),
        ], 201);
    }

    public function vote(Request $request, $questionId)
    {
        $request->validate(['vote' => 'required|in:1,-1']);

        $question = Question::whereId($questionId)->first();
        if ($question) {
            $question->votes()->updateOrCreate(
                ['user_id' => auth()->id()],
                ['vote' => $request->vote]
            );

            $question->likes_count = $question->votes()->where('vote', 1)->count();
            $question->dislikes_count = $question->votes()->where('vote', -1)->count();
            $question->save();

            return response()->json([
                'message' => 'Vote recorded',
                // 'question' => $question->load(['user', 'answers.user']),
            ], 200);
        }
        return response()->json([
            'message' => 'question not found',
        ], 200);
    }

    public function storeAnswer(Request $request, $questionId)
    {
        $request->validate(['content' => 'required|string|max:1000']);

        $question = Question::whereId($questionId)->first();
        if ($question) {
            $answer = $question->answers()->create([
                'user_id' => auth()->id(),
                'user_type' => auth()->user() instanceof \App\Models\User ? \App\Models\User::class : \App\Models\Attendee::class,
                'content' => $request->content,
            ]);

            return response()->json([
                'message' => 'Answer added successfully',
                // 'answer' => $answer->load('user'),
            ], 201);
        }
        return response()->json([
            'message' => 'question not found',
        ], 200);
    }

    public function updateQuestion(Request $request, $questionId)
    {
        $request->validate(['content' => 'required|string|max:500']);
        $question = Question::whereId($questionId)->first();
        if ($question) {

            // Authorization check (uncomment if needed)
            // if ($question->user_id !== auth()->id() || $question->user_type !== get_class(auth()->user())) {
            //     return response()->json(['error' => 'You are not authorized to update this question'], 403);
            // }

            $question->update(['content' => $request->content]);

            return response()->json([
                'message' => 'Question updated successfully',
                'question' => $question->load(['user', 'answers.user']),
            ], 200);
        }
        return response()->json([
            'message' => 'question not found',
        ], 200);
    }

    public function destroyQuestion($questionId)
    {
        $question = Question::whereId($questionId)->first();
        if ($question) {

            // Authorization check (uncomment if needed)
            // if ($question->user_id !== auth()->id() || $question->user_type !== get_class(auth()->user())) {
            //     return response()->json(['error' => 'You are not authorized to delete this question'], 403);
            // }

            $question->delete();

            return response()->json([
                'message' => 'Question deleted successfully',
            ], 200);
        }
        return response()->json([
            'message' => 'question not found',
        ], 200);
    }

    public function updateAnswer(Request $request, $answerId)
    {
        $request->validate(['content' => 'required|string|max:1000']);
        $answer = Answer::whereId($answerId)->first();
        if ($answer) {

            // Authorization check (uncomment if needed)
            // if ($answer->user_id !== auth()->id() || $answer->user_type !== get_class(auth()->user())) {
            //     return response()->json(['error' => 'You are not authorized to update this answer'], 403);
            // }

            $answer->update(['content' => $request->content]);

            return response()->json([
                'message' => 'Answer updated successfully',
                'answer' => $answer->load('user'),
            ], 200);
        }
        return response()->json([
            'message' => 'Answer not found',
        ], 200);
    }

    public function destroyAnswer($answerId)
    {
        $answer = Answer::whereId($answerId)->first();
        if ($answer) {
            // Authorization check (uncomment if needed)
            // if ($answer->user_id !== auth()->id() || $answer->user_type !== get_class(auth()->user())) {
            //     return response()->json(['error' => 'You are not authorized to delete this answer'], 403);
            // }

            $answer->delete();

            return response()->json([
                'message' => 'Answer deleted successfully',
            ], 200);
        }
        return response()->json([
            'message' => 'Answer not found',
        ], 200);
    }
}
