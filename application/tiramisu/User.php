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
    /**
     * 用户初始化
     * 返回用户角色
     * @return array
     */
    static function born($who, $data = [])
    {
        return array_merge(['nick' => $who, 'isLogin' => false, 'user_token' => self::coding(self::token($who))], $data);
    }

    /**
     * 用户基因生成的基因用于验证用户身份与用户行为跟踪
     * @return string
     */
    static function token($sign)
    {
        $time = time();
        return md5('tiramisuUser' . $sign);
    }

    static function coding($token)
    {
        return base64_encode($token);
    }

    static function decoding($token)
    {
        return base64_decode($token);
    }
}