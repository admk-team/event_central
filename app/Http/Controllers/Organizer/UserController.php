<?php

namespace App\Http\Controllers\Organizer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $users = $this->datatable(User::where('role', 'organizer')->with('roles:name'));
        $roles = $roles = Role::where('panel', 'organizer')->get()->pluck('name');
        return Inertia::render("Organizer/Users/Index", compact('users', 'roles'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        $input = $request->validated();
        $role = $input['role'];

        $input['role'] = 'organizer'; // User type

        $user = User::create($input);

        $user->syncRoles([$role]);

        return back()->withSuccess("Created");
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, User $user)
    {
        $input = $request->validated();
        $role = $input['role'];

        $input['role'] = 'organizer'; // User type

        $user->update($input);

        $user->syncRoles([$role]);

        return back()->withSuccess('Updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return back()->withSuccess('Deleted');
    }

    public function destroyMany(Request $request)
    {   
        $request->validate([
            'ids' => 'required|array'
        ]);

        foreach ($request->ids as $id) {
            User::find($id)?->delete();
        }

        return back()->withSuccess('Deleted');
    }
}
