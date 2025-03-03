<?php

namespace App\Http\Controllers\Organizer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\RoleRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::where('panel', 'organizer')->latest()->paginate($request->per_page ?? 10);
        return Inertia::render("Organizer/Roles/Index", compact('roles'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $permissions = Permission::where('panel', 'organizer')->get();
        return Inertia::render("Organizer/Roles/CreateOrEdit", compact('permissions'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RoleRequest $request)
    {
        $input = $request->validated();
        $role =  Role::create(['name' => $input['name'], 'panel' => 'organizer']);
        $role->givePermissionTo($input['permissions']);

        return to_route('admin.roles.index')->withSuccess('Created');
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
        $roleSpecific = $role->permissions()->get();
        $permissions = Permission::where('panel', 'organizer')->get();
        return Inertia::render("Organizer/Roles/CreateOrEdit", compact('role', 'permissions', 'roleSpecific'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RoleRequest $request, Role $role)
    {
        $input = $request->validated();
        $role->syncPermissions($input['permissions']);
        return to_route('admin.roles.index')->withSuccess('Updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        $role->delete();

        return back()->withSuccess('Deleted');
    }
}
