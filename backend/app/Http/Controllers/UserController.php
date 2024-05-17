<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'firstName'             => 'required|string|max:20',
                'otherName'             => 'string|max:50',
                'surname'               => 'required|string|max:20',
                'secondSurname'         => 'required|string|max:20',
                'country'               => 'required|string|max:50',
                'identificationType'    => 'required|string|max:80',
                'identificationNumber'  => 'required|alpha_num|max:50',
                'area'                  => 'required|string|max:80',
                'admissionDate'         => 'required|date_format:Y-m-d'
            ]);

            $user = User::create($validatedData);

            # CREATE EMAIL
            $surnames = $user->surname."".$user->secondSurname;
            $surnames = str_replace(' ', '', trim($surnames));
            $domain   = strtoupper($user->country) == "COLOMBIA" 
                ? "global.com.co"
                : "global.com.us";

            $email = strtolower($user->firstName.".".$surnames.".".$user->id."@".$domain);

            $user = User::updateOrCreate(
                ['id'    => $user->id],
                ['email' => $email]
            );
        } catch (\Illuminate\Validation\ValidationException $e) {
            $errors = $e->errors();
            foreach ($errors as $field => $messages) {
                $error = "error $field: ".implode(', ', $messages);
                break;
            }
            
            return response()->json((object)[
                    "error"   => (object)['internalError' => $error, 'message' => "Error de validación"],
                    'message' => "Error de validación"
                ], 404);
        } catch (\Exception $e) {
            return response()->json((object)[
                    "error" => (object)['internalError' => $e->getMessage(), 'message' => "Error de validación"],
                    'message' => "Error de validación"
                ], 404);
        }
        
        return response()->json([
            'message' => 'Usuario creado exitosamente', 
            'user' => $user
        ], 201);
    }

    public function index(Request $request)
    {
        $limit = $request->input('limit', 10);
        $page = $request->input('page', 1);

        $query = User::query();
        $query = $request->has('firstName') 
            ? $query->where('firstName', 'like', '%'.$request->input('firstName').'%') 
            : $query;

        $query = $request->has('otherName') 
            ? $query->where('otherName', 'like', '%'.$request->input('otherName').'%') 
            : $query;

        $query = $request->has('surname') 
            ? $query->where('surname', 'like', '%'.$request->input('surname').'%') 
            : $query;

        $query = $request->has('secondSurname') 
            ? $query->where('secondSurname', 'like', '%'.$request->input('secondSurname').'%') 
            : $query;

        $query = $request->has('identificationNumber') 
            ? $query->where('identificationNumber', 'like', '%'.$request->input('identificationNumber').'%') 
            : $query;

        $query = $request->has('email') 
            ? $query->where('email', 'like', '%'.$request->input('email').'%') 
            : $query;

        $query = $request->has('identificationType') ? $query->where('identificationType', $request->input('identificationType')) : $query;
        $query = $request->has('country') ? $query->where('country', $request->input('country')) : $query;
        $query = $request->has('state') ? $query->where('state', $request->input('state')) : $query;
        $users = $query->paginate($limit, ['*'], 'page', $page);

        return response()->json($users);
    }

    public function destroy(Request $request)
    {   
        if($request->has('id')){
            $user = User::find($request->input('id'));
            if ($user) {
                $user->delete();
                return response()->json(['message' => 'Usuario eliminado correctamente'], 200);
            }
        }

        return response()->json((object)[
                "error" => (object)['internalError' => "Usuario no encontrado.", 'message' => "Usuario no encontrado."],
                'message' => "Usuario no encontrado."
            ], 404);
    }

    public function update(Request $request)
    {
        try{
            $validatedData = $request->validate([
                'id'                    => 'required|integer',
                'firstName'             => 'string|max:20',
                'otherName'             => 'string|max:50',
                'surname'               => 'string|max:20',
                'secondSurname'         => 'string|max:20',
                'country'               => 'string|max:50',
                'identificationType'    => 'string|max:80',
                'identificationNumber'  => 'alpha_num|max:50',
                'area'                  => 'string|max:80',
                'admissionDate'         => 'date_format:Y-m-d',
                'state'                 => 'string|max:20',
            ]);

            $id = $validatedData["id"];
            unset($validatedData["id"]);
            
            if(count($validatedData) == 0){
                throw new \Exception("Error sin datos para modificar.");
            }

            $user = User::find($id);
            if($user){
                $user->update($validatedData);
            }else{
                throw new \Exception("Error usuario no encontrado");
            }

        } catch (\Illuminate\Validation\ValidationException $e) {
            $errors = $e->errors();
            foreach ($errors as $field => $messages) {
                $error = "error $field: ".implode(', ', $messages);
                break;
            }
            
            return response()->json((object)[
                    "error"   => (object)['internalError' => $error, 'message' => "Error de validación"],
                    'message' => "Error de validación"
                ], 404);
        } catch (\Exception $e) {
            return response()->json((object)[
                    "error" => (object)['internalError' => $e->getMessage(), 'message' => "Error al actualizar el usuario"],
                    'message' => "Error al actualizar el usuario"
                ], 404);
        }

        return response()->json([
            'message' => 'Usuario actualizado exitosamente', 
            'user' => $user
        ], 201);
    }
}
