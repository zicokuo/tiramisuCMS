<?php
/**
 * Created by PhpStorm.
 * User: hoo
 * Date: 2017/11/1
 * Time: 12:50
 */

namespace app\weixin;

use think\Config;

class WeixinPDK
{
    private $_config, $_apis;

    public function __construct()
    {
        Config::load(__DIR__ . '/config/weixin_config.php', 'config', 'weixin');
        Config::load(__DIR__ . '/config/weixin_public_api.php', 'apis', 'weixin');
        $this->_config = Config::get('config', 'weixin');
        $this->_apis = Config::get('apis', 'weixin');
    }


    public function get_access_token()
    {
        $params = $this->_config;
        $api = WeixinAPI::buildApi(Config::get('apis.get_access_token'), $params);
        $result = WeixinAPI::send($api);
        var_dump($result);
        return $result;
    }
}