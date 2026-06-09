<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index()
    {
        return response()->json(Contact::latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'phone' => 'required',
            'linkedin' => 'required|url',
        ]);

        $contact = Contact::create($validated);

        return response()->json($contact);
    }

    public function update(Request $request, $id)
    {
        $contact = Contact::findOrFail($id);

        $validated = $request->validate([
            'email' => 'required|email',
            'phone' => 'required',
            'linkedin' => 'required|url',
        ]);

        $contact->update($validated);

        return response()->json($contact);
    }

    public function destroy($id)
    {
        Contact::findOrFail($id)->delete();

        return response()->json(["message" => "Deleted"]);
    }
}