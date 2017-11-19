<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017-11-19
 * Time: 14:28
 */

namespace app\tiramisu\units;

class ticket
{


    static public function build($sign = null)
    {
        return base64_encode(md5($sign));
    }

    static public function explain($ticket)
    {
        return base64_decode($ticket);
    }

    static public function check($ticket)
    {
        return $ticket == self::build(session_id());
    }

}