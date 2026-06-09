<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Hero;
use Illuminate\Http\Request;

class HeroController extends Controller
{

public function displayHero()
{
    $hero = Hero::first();

    return response()->json([
        'hero' => $hero,
        'image_path' => $hero?->image,
        'image_url' => $hero ? asset('storage/' . $hero->image) : null,
    ]);
}

    public function store(Request $request)
{
    $hero = Hero::first();

    $data = $request->all();

    if ($request->hasFile('cv_link')) {
        $data['cv_link'] = $request->file('cv_link')->store('cv', 'public');
    }

    if ($request->hasFile('image')) {
        $data['image'] = $request->file('image')->store('heroes', 'public');
    }

    if ($hero) {
        $hero->update($data);
        return response()->json($hero);
    }

    $hero = Hero::create($data);

    return response()->json($hero);
}

    public function update(Request $request, $id)
    {
        $hero = Hero::findOrFail($id);

        $data = $request->all();

        if ($request->hasFile('cv_link')) {
            $data['cv_link'] = $request->file('cv_link')->store('cv', 'public');
        }

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('heroes', 'public');
        }

        $hero->update($data);

        return response()->json($hero);
    }
}