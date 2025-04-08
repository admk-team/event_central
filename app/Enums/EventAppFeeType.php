<?php

namespace App\Enums;

enum EventAppFeeType: string
{
    case Flat = 'flat';
    case Percentage = 'percentage';
}
