<?php
/**
 * Created by PhpStorm.
 * User: hoo
 * Date: 2017/11/1
 * Time: 9:07
 */

namespace app\diavision\controller;

use app\diavision\common\BaseController;
use app\weixin\WeixinPDK;
use app\weixin\WeixinSDK;
use think\Controller;
use think\Request;


//  微信小程序接口
class Weixin extends Controller
{
    use BaseController;
    private $_weixin_configs = [];

    public function __construct(Request $request = null)
    {
        parent::__construct($request);
    }

    //  code换session
    public function check_login()
    {
        $weixinApplet = new WeixinSDK();
        $result = $this->request->has('code') ? $weixinApplet->get_session($this->request->param('code')) : false;
        var_dump($result, $this->request->param());

        //  计算用户sha1值
        $signature2 = sha1($this->request->param('rawData') . $this->request->param('sessionKey'));
        if ($signature2 !== $this->request->param('signature')) {
            $this->_package_return("signNotMatch", '', '', 0);
        }

        //



        if ($this->_is($result)) {
            //  取得正确的用户登录参数
            //  检查用户记录
            $userExist = db('weixin_user')->where('openid', '=', $result->openid)->count();
            if ($userExist === 0) {
                //  新用户
                $weixinPublic = new WeixinPDK();
                $userInfo = $weixinPublic->get_access_token();
                db('weixin_user')->insert(['openid' => $result->openid]);
            }

        } else {
            return json_encode(false);
        }
    }
}
