<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UserRequest;
use App\Models\Role;
use Illuminate\Support\Facades\Auth;

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

        $users = $this->datatable(User::where('role', 'admin')->with('roles:id,name'));
        $roles = $roles = Role::where('panel', 'admin')->get();
        return Inertia::render("Admin/Users/Index", compact('users', 'roles'));
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
        $role_id = $input['role_id'];
        unset($input['role_id']);

        $input['role'] = 'admin'; // User type

        $user = User::create($input);

        $user->syncRoles(Role::whereIn('id', [$role_id])->get());

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

        if (in_array($user->id, [1])) {
            return back()->withError('This user cannot be edited');
        }

        $input = $request->validated();
        $role_id = $input['role_id'];
        unset($input['role_id']);

        $input['role'] = 'admin'; // User type

        if (! $input['password']) {
            unset($input['password']);
        }

        $user->update($input);

        $user->syncRoles(Role::whereIn('id', [$role_id])->get());

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

        if (in_array($user->id, [Auth::id(), 1])) {
            return back()->withError('This user cannot be deleted');
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
            if (in_array($id, [Auth::id(), 1])) {
                return back()->withError('This user cannot be deleted');
            }

            User::find($id)?->delete();
        }

        return back()->withSuccess('Deleted');
    }
}
