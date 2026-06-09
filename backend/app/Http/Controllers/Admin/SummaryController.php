<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Summary;
use Illuminate\Http\Request;

class SummaryController extends Controller
{
    public function displaySummary()
    {
        return response()->json(
            Summary::first()
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'role' => 'required',
            'summary' => 'required',
        ]);

        $summary = Summary::first();

        if ($summary) {
            $summary->update([
                'role' => $request->role,
                'summary' => $request->summary,
            ]);

            return response()->json($summary);
        }

        $summary = Summary::create([
            'role' => $request->role,
            'summary' => $request->summary,
        ]);

        return response()->json($summary);
    }
}