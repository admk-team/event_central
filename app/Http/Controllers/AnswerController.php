<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;
use chillerlan\QRCode\QRCode;
use chillerlan\QRCode\QROptions;
use chillerlan\QRCode\Common\EccLevel;
use chillerlan\QRCode\Output\QRImage;


class AnswerController extends Controller
{
    public function store(Request $request, Question $question)
    {
        $request->validate(['content' => 'required|string|max:1000']);

        $answer = $question->answers()->create([
            'user_id' => auth()->id(),
            'content' => $request->content,
        ]);

        return response()->json($answer->load('user'));
    }

    public function generate(Request $request)
    {
        $data = 'https://www.google.com';
        $options = new QROptions([
            'version' => 5,
            'eccLevel' => EccLevel::L,
            'scale' => 10,
            'outputType' => QRCode::OUTPUT_IMAGE_PNG,
            'imageBase64' => false,
        ]);

        $qrcode = new QRCode($options);

        // Clear any buffer to avoid output issues
        if (ob_get_length()) {
            ob_end_clean();
        }

        // Set the correct content type
        return response($qrcode->render($data))
            ->header('Content-Type', 'image/png');
    }
}
