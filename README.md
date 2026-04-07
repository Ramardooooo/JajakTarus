<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('home');
});

Route::get('/about', function () {
    return view('about');
});

Route::prefix('post') -> group(function () {
    route::get('/', function () {
    return "<h1>Ini adalah halaman post</h1>";
});

Route::get('/create', function () {
    return "<h1>Ini adalah halaman post</h1>";
});

Route::get('/edit', function () {
    return "<h1>Ini adalah halaman post</h1>";
});

});

Route::get('/activity', function () {
    return view('activity');
});

Route::get('/contact', function () {
    return "<h1>Ini adalah halaman contact</h1>";
});
