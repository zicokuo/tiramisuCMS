<?php
/**
 * Created by PhpStorm.
 * User: hoo
 * Date: 2017/11/1
 * Time: 10:15
 */

namespace app\weixin;

use think\Cache;
use think\Config;

class WeixinSDK
{
    private $_config, $_apis;

    public function __construct()
    {
        Config::load(__DIR__ . '/config/weixin_config.php', 'config', 'weixin');
        Config::load(__DIR__ . '/config/weixin_applet_api.php', 'apis', 'weixin');
        $this->_config = Config::get('config', 'weixin');
        $this->_apis = Config::get('apis', 'weixin');
    }

    /**
     * js_code 换 session_key 和 openid
     * @param $js_code
     * @return mixed
     */
    public function get_session($js_code)
    {
        $param = $this->_config;
        $param['js_code'] = $js_code;
        $api = WeixinAPI::buildApi(Config::get('apis.code_to_session', 'weixin'), $param);
//        var_dump($api);
        $result = WeixinAPI::send($api);
        return $result;
    }

    /**
     * 检测cache中的3rd
     * @param $srd
     */
    public function check_session_3rd($srd)
    {
        return $session_3rd = Cache::get($srd, false);
    }

    /**
     * 生成128位随机数
     * @param $sign
     * @return string
     */
    public function get_third_session($sign = null)
    {
        $r = rand(0, 2);
        $string = '';
        for ($a = 0; $a < 3; $a++) {
            $string .= ($a == $r) ? sha1($sign) : sha1($this->generate_code(8));
        }
        return $string . $this->generate_code(8);
    }


    public function generate_code($length = 4)
    {
        return rand(pow(10, ($length - 1)), pow(10, $length) - 1);
    }


}