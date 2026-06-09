<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    public function index()
    {
        return response()->json(
            Experience::latest()->get()
        );
    }

    public function store(Request $request)
    {
        $experience = Experience::create([
            'company_name' => $request->companyName,
            'role' => $request->role,
            'description' => $request->description,
            'duration' => $request->duration,
        ]);

        return response()->json($experience);
    }

    public function update(Request $request, $id)
    {
        $experience = Experience::findOrFail($id);

        $experience->update([
            'company_name' => $request->companyName,
            'role' => $request->role,
            'description' => $request->description,
            'duration' => $request->duration,
        ]);

        return response()->json($experience);
    }

    public function destroy($id)
    {
        Experience::findOrFail($id)->delete();

        return response()->json([
            'message' => 'Deleted Successfully'
        ]);
    }
}