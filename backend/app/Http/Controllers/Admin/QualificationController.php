<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Qualification;
use Illuminate\Http\Request;

class QualificationController extends Controller
{
    public function index()
    {
        return response()->json(Qualification::all());
    }

    public function store(Request $request)
    {
        $qualification = Qualification::create($request->all());

        return response()->json($qualification);
    }

    public function update(Request $request, $id)
    {
        $qualification = Qualification::findOrFail($id);

        $qualification->update($request->all());

        return response()->json($qualification);
    }

    public function destroy($id)
    {
        Qualification::destroy($id);

        return response()->json([
            'message' => 'Deleted Successfully'
        ]);
    }
}