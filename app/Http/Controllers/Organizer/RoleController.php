<?php

namespace App\Http\Controllers\Organizer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\RoleRequest;
use App\Models\Role;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (! Auth::user()->can('view_roles')) {
            abort(403);
        }

        $roles = $this->datatable(
            Role::ofOwner()
        );
        return Inertia::render("Organizer/Roles/Index", compact('roles'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (! Auth::user()->can('create_roles')) {
            abort(403);
        }

        $allPermissions = Permission::where('panel', 'organizer')->get();
        return Inertia::render("Organizer/Roles/CreateOrEdit", compact('allPermissions'));
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
        $role =  Role::create([
            'name' => $input['name'], 
            'panel' => 'organizer',
            'organizer_id' => Auth::user()->owner_id
        ]);
        $role->givePermissionTo($input['permissions']);

        return back()->withSuccess('Created');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        if (! Auth::user()->can('edit_roles')) {
            abort(403);
        }

        if (in_array($role->name, ['superadmin', 'owner'])) {
            return back()->withError("System defined roles cannot be edited");
        }

        $roleSpecific = $role->permissions()->get();
        $allPermissions = Permission::where('panel', 'organizer')->get();
        return Inertia::render("Organizer/Roles/CreateOrEdit", compact('role', 'allPermissions', 'roleSpecific'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RoleRequest $request, Role $role)
    {
        if (! Auth::user()->can('edit_roles')) {
            abort(403);
        }

        if (in_array($role->name, ['superadmin', 'owner'])) {
            return back()->withError("System defined roles cannot be edited");
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

        if (in_array($role->name, ['superadmin', 'owner'])) {
            return back()->withError("System defined roles cannot be deleted");
        }
        
        $role->delete();

        return back()->withSuccess('Deleted');
    }
}
