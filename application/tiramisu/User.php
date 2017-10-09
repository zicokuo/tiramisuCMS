<?php
/**
 * Created by PhpStorm.
 * User: hoo
 * Date: 2017/10/9
 * Time: 15:34
 */

namespace app\tiramisu;
trait User
{
    static function born()
    {
        $time = time();
        $user_gene = base64_encode('tiramisuUser' . $time);
    }
}