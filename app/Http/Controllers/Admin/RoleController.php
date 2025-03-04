<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\RoleRequest;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (! Auth::user()->canAny(['view_roles', 'create_roles', 'edit_roles', 'delete_roles'])) {
            abort(403);
        }
        
        $roles = $this->datatable(Role::where('panel', 'admin'));
        return Inertia::render("Admin/Roles/Index", compact('roles'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (! Auth::user()->can('create_roles')) {
            abort(403);
        }

        $permissions = Permission::where('panel', 'admin')->get();
        return Inertia::render("Admin/Roles/CreateOrEdit", compact('permissions'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RoleRequest $request)
    {
        if (! Auth::user()->can('create_roles')) {
            abort(403);
        }

        $input = $request->validated();
        $role =  Role::create(['name' => $input['name'], 'panel' => 'admin']);
        $role->givePermissionTo($input['permissions']);

        return back()->withSuccess('Created');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        if (! Auth::user()->can('edit_roles')) {
            abort(403);
        }

        $roleSpecific = $role->permissions()->get();
        $permissions = Permission::where('panel', 'admin')->get();
        return Inertia::render("Admin/Roles/CreateOrEdit", compact('role', 'permissions', 'roleSpecific'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RoleRequest $request, Role $role)
    {
        if (! Auth::user()->can('edit_roles')) {
            abort(403);
        }

        $input = $request->validated();
        $role->update(['name' => $input['name']]);
        $role->syncPermissions($input['permissions']);
        return back()->withSuccess('Updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        if (! Auth::user()->can('delete_roles')) {
            abort(403);
        }

        $role->delete();

        return back()->withSuccess('Deleted');
    }
}
