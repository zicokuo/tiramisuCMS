<?php
/**
 * Created by PhpStorm.
 * User: hoo
 * Date: 2017/10/9
 * Time: 15:20
 */

namespace app\admin\controller;

use think\Controller;
use think\Cookie;
use app\tiramisu\User as TiramisuUser;

class User extends Controller
{
    public function checkLogin()
    {
        $token = Cookie::has('user_token') ? Cookie::get('user_token') : null;
        if (is_null($token)) {
            $user = TiramisuUser::born();
        }

        //  todo 添加用户登录验证并返回用户信息
        return $user;
    }
}