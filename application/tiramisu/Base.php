<?php

/**
 * Created by PhpStorm.
 * User: hoo
 * Date: 2017/10/11
 * Time: 11:34
 */

namespace app\tiramisu;

/**
 * Trait Base
 * @package app\tiramisu
 * @deprecated 本基础类即将废弃
 */
trait Base
{
    //  注射用户基因
    static function pin_gene()
    {

    }

    /**
     * 验证用户门票
     * @deprecated 即将废弃,改用tiramisu/units/ticket.class.php 中的 check_ticket 方法进行验证
     * @return mixed
     */
    static function check_ticket()
    {
        return request()->param('user_ticket', false);
    }
}