<?php

Route::post('/auth/login', '\App\Http\Controllers\AuthController@check');

Route::group(['prefix' => '/sites'], function () {
    Route::get('/', '\App\Http\Controllers\SiteController@index');
});

Route::group(['prefix' => '/reasons'], function () {
    Route::get('/transfer', '\App\Http\Controllers\TransferReasonController@index');
    Route::get('/termination', '\App\Http\Controllers\TerminationReasonController@index');
});

Route::group(['prefix' => '/employees'], function () {
    Route::get('/', '\App\Http\Controllers\EmployeeController@index');
    Route::get('/{id}', '\App\Http\Controllers\EmployeeController@show');
    Route::post('/', '\App\Http\Controllers\EmployeeController@store');
    Route::put('/{id}', '\App\Http\Controllers\EmployeeController@update');

    Route::get('/{id}/tenures', '\App\Http\Controllers\TenureController@showByUser');
    Route::get('/{id}/transfers', '\App\Http\Controllers\TransferController@showByUser');
});

Route::group(['prefix' => '/tenures'], function () {
    Route::get('/', '\App\Http\Controllers\TenureController@index');
    Route::get('/{id}', '\App\Http\Controllers\TenureController@show');
    Route::post('/', '\App\Http\Controllers\TenureController@store');
    Route::delete('/{id}', '\App\Http\Controllers\TenureController@destroy');
    Route::put('/{id}', '\App\Http\Controllers\TenureController@update');
});

Route::group(['prefix' => '/transfers'], function () {
    Route::get('/', '\App\Http\Controllers\TransferController@index');
    Route::get('/{id}', '\App\Http\Controllers\TransferController@show');
    Route::post('/', '\App\Http\Controllers\TransferController@store');
    Route::delete('/{id}', '\App\Http\Controllers\TransferController@destroy');
    Route::put('/{id}', '\App\Http\Controllers\TransferController@update');
});
