<?php
/**
 * Created by PhpStorm.
 * User: hoo
 * Date: 2017/11/1
 * Time: 11:13
 */

namespace app\weixin;

return [
    'code_to_session' =>
        'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code',
    'get_user_info' => 'https://api.weixin.qq.com/cgi-bin/user/info?access_token=%s&openid=%s&lang=zh_CN',
];


