<?php
/**
 * Created by PhpStorm.
 * User: hoo
 * Date: 2017/10/9
 * Time: 15:20
 */

namespace app\admin\controller;

use think\Controller;
use think\Session;

class User extends Controller
{
    public function checkLogin()
    {
        Session::start();
        $usid = Session::init();
        return ['sid' => $usid];
    }
}