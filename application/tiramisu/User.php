<?php
/**
 * Created by PhpStorm.
 * User: hoo
 * Date: 2017/10/9
 * Time: 15:34
 */

namespace app\tiramisu;

use think\Cache;
use think\Cookie;

class User
{
    /**
     * 用户初始化
     * 返回用户角色
     * @return array
     */
    static function born($who = 'visitor', $data = [])
    {
        return array_merge(['nick_name' => $who, 'isLogin' => false, 'signature' => self::build_signature($who)], $data);
    }

    /**
     * 根据签名从Cache中获取用户信息
     * @param $signature
     */
    static function get_user($signature)
    {
        return Cache::get('user_signatures.' . $signature);
    }

    /**
     * 根据签名保存用户信息到Cache
     * 只需要保存有意义的签名即可
     * @param $signature
     * @param array $userInfo
     */
    static function save_user($signature, $userInfo = [])
    {
        Cache::set('user_signatures.' . $signature, $userInfo, 7200);
    }

    /**
     * 获取签名
     * 从访问参数与cookies2个方面获取签名
     * @return mixed
     */
    static function get_signature()
    {
        $signature = request()->param('user_signature', false);
        $signature || $signature = Cookie::get('tiramisu_signature', 'tiramisu');
        return $signature || false;
    }

    /**
     * 生成用户签名
     * @param null $sign
     * @return string
     */
    static function build_signature($sign = null)
    {
        $signature = base64_encode(self::_build_sign($sign));
//        var_dump(base64_decode($signature));
        Cookie::set('tiramisu_signature', $signature);
        return $signature;
    }

    static private function _build_sign($sign = null)
    {
        return md5(is_null($sign) ? 'visitor' : $sign) . ',' . time();
    }


    /**
     * 缓存中是否存在用户签名
     * @param $signature
     * @return mixed | false
     */
    static function has_signature($signature)
    {
        return $signature = Cache::get('user_signatures.' . $signature, false);
    }

    /**
     * 基础检查签名
     * 1.检查签名字段是否为visitor
     * 2.检查缓存中是否含有签名
     * @param $signature
     * @return bool
     */
    static function check_signature($signature)
    {
        //  1.初步检察
        $signArray = explode(',', base64_decode($signature));
        if (is_array($signArray) && $signArray[0] === md5('visitor')) {
            return false;
        }
        //  2.不是访客签名,则进行缓存判断
        $cacheSignature = self::has_signature($signature);
        if (false == $cacheSignature) {
            return false;
        }
        return $signature;
    }
}