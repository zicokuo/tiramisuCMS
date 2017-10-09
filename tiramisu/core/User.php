<?php
/**
 * Created by PhpStorm.
 * User: hoo
 * Date: 2017/9/28
 * Time: 10:49
 */

namespace tiramisu\core;

trait User
{

    public static function get_UserInCache()
    {
        session_start();
        $user_session = session_id();

    }
}


