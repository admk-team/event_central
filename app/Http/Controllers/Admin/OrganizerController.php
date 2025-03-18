<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\OrganizerRequest;
use App\Http\Requests\Admin\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrganizerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (! Auth::user()->canAny(['view_organizers', 'create_organizers', 'edit_organizers', 'delete_organizers'])) {
            abort(403);
        }

        $organizers = $this->datatable(User::where('role', 'organizer'));
        return Inertia::render("Admin/Organizers/Index", compact('organizers'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(OrganizerRequest $request)
    {
        if (! Auth::user()->can('create_organizers')) {
            abort(403);
        }

        $input = $request->validated();

        $input['role'] = 'organizer';

        $organizer = User::create($input);
        if ($organizer) {
            setPermissionsTeamId($organizer->owner_id);
            $organizer->syncRoles(['owner']);
        }

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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(OrganizerRequest $request, User $organizer)
    {
        if (! Auth::user()->can('edit_organizers')) {
            abort(403);
        }
    
        $input = $request->validated();
    
        // Handle password update logic correctly
        if ($request->filled('password')) { // Check if password field is provided
            $input['password'] = $request->password; // Hash new password
        } else {
            unset($input['password']); // Remove password field if not updated
        }
    
        $organizer->update($input);
    
        // Assign role logic
        if ($organizer && !$organizer->hasRole('owner')) {
            setPermissionsTeamId($organizer->owner_id);
            $organizer->syncRoles(['owner']);
        }
    
        return back()->withSuccess('Updated');
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        if (! Auth::user()->can('delete_organizers')) {
            abort(403);
        }
        User::find($id)?->delete();
        return back()->withSuccess('Deleted');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroyMany(Request $request)
    {
        if (! Auth::user()->can('delete_organizers')) {
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
