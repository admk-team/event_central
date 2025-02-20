<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\RoleRequest;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::where('panel', 'admin')->latest()->paginate($request->per_page ?? 10);
        return Inertia::render("Admin/Roles/Index", compact('roles'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $permissions = Permission::where('panel', 'admin')->get();
        return Inertia::render("Admin/Roles/CreateOrEdit", compact('permissions'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RoleRequest $request)
    {
        $input = $request->validated();
        $role =  Role::create(['name' => $input['name'], 'panel' => 'admin']);
        $role->givePermissionTo($input['permissions']);

        return to_route('admin.roles.index');
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
        $permissions = Permission::where('panel', 'admin')->get();
        return Inertia::render("Admin/Roles/CreateOrEdit", compact('role', 'permissions', 'roleSpecific'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RoleRequest $request, Role $role)
    {
        $input = $request->validated();
        $role->syncPermissions($input['permissions']);
        return to_route('admin.roles.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        $role->delete();

        return back();
    }
}
