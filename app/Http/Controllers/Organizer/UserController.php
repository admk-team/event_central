<?php

namespace App\Http\Controllers\Organizer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\UserRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if (! Auth::user()->canAny(['view_users', 'create_users', 'edit_users', 'delete_users'])) {
            abort(403);
        }

        $users = $this->datatable(User::ofOwner()->with('roles:name'));
        $roles = Role::ofOwner()->get();
        return Inertia::render("Organizer/Users/Index", compact('users', 'roles'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        if (! Auth::user()->can('create_users')) {
            abort(403);
        }

        $input = $request->validated();
        $role_id = (int) $input['role_id'];
        unset($input['role_id']);

        $input['parent_id'] = Auth::user()->owner_id;
        $input['role'] = 'organizer'; // User type

        $user = User::create($input);

        $user->syncRoles([$role_id]);

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
        if (! Auth::user()->can('edit_users')) {
            abort(403);
        }

        $input = $request->validated();
        $role_id = $input['role_id'];
        unset($input['role_id']);

        $input['role'] = 'organizer'; // User type

        $user->update($input);

        $user->syncRoles([$role_id]);

        return back()->withSuccess('Updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        if (! Auth::user()->can('delete_users')) {
            abort(403);
        }

        $user->delete();

        return back()->withSuccess('Deleted');
    }

    public function destroyMany(Request $request)
    {   
        if (! Auth::user()->can('delete_users')) {
            abort(403);
        }
        
        $request->validate([
            'ids' => 'required|array'
        ]);

        foreach ($request->ids as $id) {
            User::find($id)?->delete();
        }

        return back()->withSuccess('Deleted');
    }
}
