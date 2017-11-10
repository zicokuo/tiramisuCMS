<?php
/**
 * Created by PhpStorm.
 * User: hoo
 * Date: 2017/11/1
 * Time: 10:15
 */

namespace app\weixin;

use Couchbase\Exception;
use think\Cache;
use think\Config;

class WeixinSDK
{
    public $config, $apis;

    public function __construct()
    {
        Config::load(__DIR__ . '/config/weixin_config.php', 'config', 'weixin');
        Config::load(__DIR__ . '/config/weixin_applet_api.php', 'apis', 'weixin');
        $this->config = Config::get('config', 'weixin');
        $this->apis = Config::get('apis', 'weixin');
    }

    /**
     * 微信通信接口
     * js_code 换 session_key 和 openid
     * @deprecated 即将废弃,转为WeixinAPI中的get_session
     * @param $js_code
     * @return mixed
     */
    public function get_session($js_code)
    {
        $param = $this->config;
        $param['js_code'] = $js_code;
        $api = WeixinAPI::buildApi(Config::get('apis.code_to_session', 'weixin'), $param);
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
     * 构建weixin session_3rd
     * @param $session_key
     * @param $openid
     * @param $expire
     */
    public function build_session_3rd($session_key, $openid)
    {
        return $session_key . ',' . $openid;
    }

    /**
     * 拆解weixin session_3rd
     * @param $srdValue
     * @return array
     */
    public function explain_session_3rd($srdValue)
    {
        $array = explode(',', $srdValue);
        try {
            return array_combine(['session_key', 'openid'], $array);
        } catch (Exception $e) {
            return $array;
        }
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