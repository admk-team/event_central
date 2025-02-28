<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PlatFormRequest;
use App\Models\PlatForm;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlatFormController extends Controller
{
    public function index(){
        // $platforms=PlatForm::all();
        // $data=PlatForm::
        $platforms=$this->datatable(PlatForm::query());
        return Inertia::render('Admin/PlatForm/index',compact('platforms'));
    }

    public function store(PlatFormRequest $request){
        $data=$request->validated();
        PlatForm::create($data);
        return back();
    }
    public function update (PlatFormRequest $request,PlatForm $platform){
        $data=$request->validated();
        $platform->update($data);
        return back();
    }

    public function destroy(PlatForm $platform){
        $platform->delete();
        return back();
    }

    public function destroyMany(Request $request){
        $input=$request->validate([
            'ids' => 'required|array'
        ]);
        foreach($request->ids as $id ){
            PlatForm::destroy($id);
        }
    }
}
