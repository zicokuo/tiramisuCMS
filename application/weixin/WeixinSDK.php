<?php
/**
 * Created by PhpStorm.
 * User: hoo
 * Date: 2017/11/1
 * Time: 10:15
 */

namespace app\weixin;

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


}