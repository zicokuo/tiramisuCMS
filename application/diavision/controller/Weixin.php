<?php
/**
 * Created by PhpStorm.
 * User: hoo
 * Date: 2017/11/1
 * Time: 9:07
 */

namespace app\diavision\controller;

use app\diavision\common\BaseController;
use app\weixin\WeixinSDK;
use think\Cache;
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
//        var_dump($result, $this->request->param());

        if ($this->_is($result)) {
            //  取得正确的用户登录参数

            //  计算用户sha1值
            $signature2 = sha1($this->request->param('rawData') . $result['session_key']);
//            dump($signature2);
            if ($signature2 !== $this->request->param('signature')) {
                $this->_package_return("signNotMatch", '', '', 0);
            }

            $userInfo = $this->table_fields_trans(json_decode($this->request->param()['rawData'], 1));

            // openid 换 128 随机数
            $thirdSession = $weixinApplet->get_third_session($result['openid']);
            //  缓存3rd
            Cache::set($thirdSession, $result['session_key'] . $result['openid'], $result['expires_in']);
            $result['session_3rd'] = $thirdSession;

            //  合并用户数据组
            $result = array_merge($result, $userInfo);

            //  检查用户记录
            $userExist = db('weixin_user')->where('openid', '=', $result['openid'])->find();
//            dump($userExist);
            if ($userExist === false || is_null($userExist)) {
                //  新用户 - 合并数据
                $userInfo['openid'] = $result['openid'];
                $fields = array_flip(db('weixin_user')->getTableFields());
                $fields = $this->clear_array_values($fields);
                $userInfo = array_intersect_key(array_merge($fields, $userInfo), $fields);
//                var_dump($userInfo);
                //  新用户
                db('weixin_user')->insert($userInfo);
                return $this->_package_return('新微信用户' . $result['nickName'] . '注册和登录成功', '', $result, 1);
            }
            return $this->_package_return('微信用户' . $result['nickName'] . '登录成功', '', $result, 1);
        } else {
            return $this->_package_return('无效访问参数,非法访问', '', '', 0);
        }
    }

    /**
     * 小程序表单提交
     * @return string
     */
    public function design_submit()
    {
        
        $params = $this->request->param();
//        var_dump($params);
        if (isset($params['userInfo']['nickName'])) {
            $sql = 'INSERT INTO weixin_design_submit (user_id,create_time,status,contact,from_data) VALUES (:user,:createTime,:status,:contact,:fromData)';
            $bindData = ['user_id' => 1, 'create_time' => time(), 'status' => 0, 'from_data' => json_encode($params)];
            $db = db('weixin_design_submit')->insert($bindData);
            return $this->_package_return('成功提交设计', null, '', 1);
        } else {
            return $this->_package_return('提交失败,请重试', null, '', 0);
        }
    }
}
