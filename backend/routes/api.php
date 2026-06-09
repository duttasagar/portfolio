<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\SkillController;
use App\Http\Controllers\Admin\HeroController;
use App\Http\Controllers\Admin\SummaryController;
use App\Http\Controllers\Admin\QualificationController;
use App\Http\Controllers\Admin\ExperienceController;
use App\Http\Controllers\Admin\WorkController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\User\ContactMessageController;

Route::get('/skills', [SkillController::class, 'displaySkill']);
Route::post('/skills', [SkillController::class, 'store']);
Route::put('/skills/{id}', [SkillController::class, 'update']);
Route::delete('/skills/{id}', [SkillController::class, 'destroy']);


Route::get('/hero', [HeroController::class, 'displayHero']);
Route::post('/hero', [HeroController::class, 'store']);
Route::put('/hero/{id}', [HeroController::class, 'update']);


Route::get('/summary', [SummaryController::class, 'displaySummary']);
Route::post('/summary', [SummaryController::class, 'store']);


Route::get('/qualifications', [QualificationController::class, 'index']);
Route::post('/qualifications', [QualificationController::class, 'store']);
Route::put('/qualifications/{id}', [QualificationController::class, 'update']);
Route::delete('/qualifications/{id}', [QualificationController::class, 'destroy']);


Route::get('/experiences', [ExperienceController::class, 'index']);
Route::post('/experiences', [ExperienceController::class, 'store']);
Route::put('/experiences/{id}', [ExperienceController::class, 'update']);
Route::delete('/experiences/{id}', [ExperienceController::class, 'destroy']);


Route::get('/works', [WorkController::class, 'index']);
Route::post('/works', [WorkController::class, 'store']);
Route::post('/works/{id}', [WorkController::class, 'update']);
Route::delete('/works/{id}', [WorkController::class, 'destroy']);



Route::get('/contacts', [ContactController::class, 'index']);
Route::post('/contacts', [ContactController::class, 'store']);
Route::put('/contacts/{id}', [ContactController::class, 'update']);
Route::delete('/contacts/{id}', [ContactController::class, 'destroy']);


Route::post('/contact-messages', [ContactMessageController::class, 'store']);
Route::get('/contact-messages', [ContactMessageController::class, 'index']);
Route::delete('/contact-messages/{id}', [ContactMessageController::class, 'destroy']);