<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function displaySkill()
    {
        return response()->json(Skill::all());
    }



    public function store(Request $request)
    {
        $request->validate([
            'skill_name' => 'required',
        ]);

        $skill = Skill::create($request->all());

        return response()->json($skill);
    }

    public function update(Request $request, $id)
    {
        $skill = Skill::findOrFail($id);

        $skill->update([
            'skill_name' => $request->skill_name,
            'percentage' => $request->percentage
        ]);

        return response()->json($skill);
    }



    public function destroy($id)
    {
        Skill::findOrFail($id)->delete();

        return response()->json([
            'message' => 'Skill Deleted'
        ]);
    }
}