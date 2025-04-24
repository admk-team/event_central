<?php

namespace App\Exceptions;

use Throwable;
use Inertia\Inertia;
use Illuminate\Support\Facades\URL;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        // $this->reportable(function (Throwable $e) {
        //     //
        // });

        // $this->renderable(function (InvalidSignatureException $e) {
        //     return response()->view('error.link-expired', [], 403);
        //     // return Inertia::render('Attendee/Auth/LinkExpired');
        // });

        $this->renderable(function (Throwable $e, $request) {
            if ($e instanceof HttpException) {

                $status = $e->getStatusCode();
                if ($status === 403) {
                    $error = [
                        // 'responseMessage' => 'At the moment, you are unable to utilize this feature. Kindly get in touch with us for assistance.',
                        'responseMessage' => 'We apologize, but access to this feature is currently restricted. To unlock this feature, please consider upgrading your account or contacting support for assistance.',
                        'responseStatus'  => 403,
                    ];
                    $previousroute = URL::previous();
                    return Inertia::render('Error/Cover403', compact('previousroute'));
                }
            }
        });
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  Request  $request
     * @param  Throwable  $e
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws Throwable
     */
    // public function render($request, Throwable $e): JsonResponse
    // {

    //     // 404 page when a model is not found
    //     if ($e instanceof ModelNotFoundException) {
    //         return response()->json(['message' => __('errors.404')], Response::HTTP_NOT_FOUND);
    //     }

    //     if ($e instanceof HttpException) {
    //         // Custom error 500 view
    //         return response()->json(['message' => __('errors.500')], Response::HTTP_INTERNAL_SERVER_ERROR);
    //     }

    //     return parent::render($request, $e);
    // }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  Request  $request
     * @param  Throwable  $e
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws Throwable
     */
    public function render($request, Throwable $e)
    {
        // if ($e instanceof \Exception && $e->getMessage() == "Please set up your GTM account with a valid property ID and file.") {
        //     return response()->view('pages.error.missing-gtm-account', [], 500);
        // }

        return parent::render($request, $e);
    }
}
