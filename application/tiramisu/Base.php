<?php

/**
 * Created by PhpStorm.
 * User: hoo
 * Date: 2017/10/11
 * Time: 11:34
 */

namespace app\tiramisu;
trait Base
{
    static function interactionCheck()
    {
        return $ticket = request()->param('user_ticket', false);
    }
}