<?php
/**
 * Created by PhpStorm.
 * User: hoo
 * Date: 2017/11/20
 * Time: 11:40
 */

namespace app\admin\common;

use app\tiramisu\User;

/**
 * 路由基础复合类
 * 用于增强框架预处理能力
 * Trait BaseController
 * @package app\admin\common
 */
trait BaseController
{
    protected $userInfo;

    /**
     * 初始化
     */
    protected function initialization()
    {
        //  建立用户身份
        $signature = User::get_signature();
        $this->userInfo = $signature ? User::get_user($signature) : User::born();
    }

    /**
     * 服务器接口入口 - 唯一
     * 本入口用于分发接口操作
     * TODO: 以后需要规范化接口分发与调用
     */
    public function api()
    {

    }


    /**
     * 从缓存中检查用户签名
     * @param $signature
     */
    protected function check_user_signature($signature = null)
    {
        $signature = $signature || User::has_signature($signature);
        return false;
    }

}