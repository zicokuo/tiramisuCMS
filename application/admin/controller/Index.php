<?php
/**
 * Created by PhpStorm.
 * User: hoo
 * Date: 2017/9/28
 * Time: 10:10
 */

namespace app\admin\controller;

use think\Controller;
use app\tiramisu\Base as TiramisuBase;

class Index extends Controller
{
    public function index()
    {
        return 'welcome';
    }

}