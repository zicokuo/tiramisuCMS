<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017-11-19
 * Time: 14:28
 */

namespace app\tiramisu\units;

use think\Cookie;

/**
 * Class Ticket
 * @package app\tiramisu\units
 * @deprecated 门票系统即将废弃,改用用户签名字段
 */
class Ticket
{

    /**
     * 建立ticket
     * 需要传入用户签名
     * @param null $signature
     * @return string
     */
    static public function build($signature = null)
    {
        //  尝试使用Cookies中的签名sign
        $signature = $signature || Cookie::get('user_signature', null);
        return base64_encode(md5($signature));
    }

    /**
     * 派发门票
     * @param $ticket
     */
    static public function dispatch($ticket)
    {

    }

    static public function explain($ticket)
    {
        return base64_decode($ticket);
    }

    static public function check($ticket)
    {
        return $ticket === self::build(session_id());
    }


}