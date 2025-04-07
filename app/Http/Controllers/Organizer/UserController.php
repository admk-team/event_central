<?php

namespace App\Http\Controllers\Organizer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\UserRequest;
use App\Models\EventApp;
use App\Models\EventSession;
use App\Models\ModelPermission;
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
        if (! Auth::user()->can('view_users')) {
            abort(403);
        }

        $users = $this->datatable(
            User::ofOwner()
                ->with(['roles:id,name', 'accessibleEvents', 'accessibleEventSessions'])
        );
        $roles = Role::ofOwner()->get();
        $events = EventApp::ofOwner()->with('event_sessions')->get();

        return Inertia::render("Organizer/Users/Index", compact('users', 'roles', 'events'));
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

        $accessibleEvents = $input['accessible_events'] ?? [];
        unset($input['accessible_events']);

        $accessibleEventSessions = $input['accessible_event_sessions'] ?? [];
        unset($input['accessible_event_sessions']);

        $input['parent_id'] = Auth::user()->owner_id;
        $input['role'] = 'organizer'; // User type

        $user = User::create($input);

        $user->syncRoles(Role::whereIn('id', [$role_id])->get());

        EventApp::syncModelPermissions($accessibleEvents, $user);

        EventSession::syncModelPermissions($accessibleEventSessions, $user);

        return back()->withSuccess("Created");
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

        $accessibleEvents = $input['accessible_events'] ?? [];
        unset($input['accessible_events']);

        $accessibleEventSessions = $input['accessible_event_sessions'] ?? [];
        unset($input['accessible_event_sessions']);

        $input['role'] = 'organizer'; // User type

        $user->update($input);

        $user->syncRoles(Role::whereIn('id', [$role_id])->get());

        EventApp::syncModelPermissions($accessibleEvents, $user);

        EventSession::syncModelPermissions($accessibleEventSessions, $user);

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
