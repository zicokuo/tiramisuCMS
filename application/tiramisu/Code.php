<?php
/**
 * Created by PhpStorm.
 * User: hoo
 * Date: 2017/11/20
 * Time: 13:29
 */

namespace app\tiramisu;

class Code
{
    public static function encode($data)
    {
        //  使用json转化数组
        is_array($data) || $data = json_encode($data);
        //  基础加密
        $code = base64_encode($data);
        //  进阶加密
        $number = round(mt_rand(0, 9));
        $code = $number . str_replace($number, '_', $code);
    }
}