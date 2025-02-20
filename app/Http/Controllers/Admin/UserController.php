<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UserRequest;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if (! Auth::user()->canAny(['view_users', 'create_users', 'edit'])) {
            abort(403);
        }

        $users = $this->datatable(User::with('roles:name'));
        $roles = $roles = Role::where('panel', 'admin')->get()->pluck('name');
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
        $role = $input['role'];

        $input['role'] = 'admin'; // User type

        $user = User::create($input);

        $user->syncRoles([$role]);

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
        $role = $input['role'];

        $input['role'] = 'admin'; // User type

        $user->update($input);

        $user->syncRoles([$role]);

        return back();
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

        return back();
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

        return back();
    }
}
