<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Tymon\JWTAuth\Commands\JWTGenerateCommand as BaseJWTGenerateCommand;

class JWTGenerateCommand extends BaseJWTGenerateCommand
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate:jwt {--show}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Wrapper for tymon jwt:generate command';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        parent::fire();
    }
}
