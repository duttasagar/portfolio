<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\ContactMessage;

class ContactMessageController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'subject' => 'required',
            'message' => 'required',
        ]);

        $message = ContactMessage::create($data);

        return response()->json([
            'message' => 'Message sent successfully',
            'data' => $message
        ]);
    }

    public function index()
{
    return response()->json(
        ContactMessage::latest()->get()
    );
}

public function destroy($id)
{
    ContactMessage::findOrFail($id)->delete();

    return response()->json([
        'message' => 'Deleted Successfully'
    ]);
}
}