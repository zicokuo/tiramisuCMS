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

    private function _get_session_3rd($sKey = 'session_3rd')
    {
        $sKey = $this->request->param($sKey, false);
        if ($sKey) {
            $srd = Cache::get($sKey, false);
            if ($srd) {
                return $srdArray = array_combine(['session_key', 'openid'], explode(',', $srd));
            }
        }
        return false;
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
            Cache::set($thirdSession, $result['session_key'] . ',' . $result['openid'], $result['expires_in']);
            $result['session_3rd'] = $thirdSession;

            //  合并用户数据组
            $result = array_merge($result, $userInfo);

            //  检查用户记录
            $userExist = db('weixin_user')->where('openid', '=', $result['openid'])->find();
//            dump($userExist);
            //  新用户 - 合并数据
            $userInfo['openid'] = $result['openid'];
            $fields = array_flip(db('weixin_user')->getTableFields());
            $fields = $this->clear_array_values($fields);
            $userInfo = array_intersect_key(array_merge($fields, $userInfo), $fields);
//                var_dump($userInfo);
            if ($userExist === false || is_null($userExist)) {
                //  新用户
                db('weixin_user')->insert($userInfo);
                //  加密openid
                $result['openid_client'] = md5($result['openid']);
                return $this->_package_return('新微信用户' . $result['nickName'] . '注册和登录成功', '', $result, 1);
            } else {
                db('weixin_user')->where('id', '=', $userExist['id'])->update($userInfo);
                $result['openid_client'] = md5($result['openid']);
                return $this->_package_return('微信用户' . $result['nickName'] . '登录成功', '', $result, 1);
            }
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
        $srd = $this->_get_session_3rd();
        if (false == $srd) {
            return $this->_package_return('访问缺少s3rd字段信息', '', '', 0);
        }

        $params = $this->request->param();
//        var_dump($params);
        if (isset($params['openid'])) {
//            $sql = 'INSERT INTO weixin_design_submit (user_openid,create_time,status,contact,from_data) VALUES (:user,:createTime,:status,:contact,:fromData)';
            $bindData = ['user_openid' => $params['openid'], 'create_time' => time(), 'status' => 0, 'from_data' => json_encode($params)];
            $db = db('weixin_design_submit')->insert($bindData);
            return $this->_package_return('成功提交设计', null, '', 1);
        } else {
            return $this->_package_return('提交设计需求缺少必要字段,请重试', null, '', 0);
        }
    }

    /**
     * 获取小程序提交内容 by 用户
     * @return string
     */
    public function get_user_submits()
    {
        $srd = $this->_get_session_3rd();
        if (false == $srd) {
            return $this->_package_return('访问缺少s3rd字段信息', '', '', 0);
        }
        $params = $this->request->param();
        $result = db('weixin_design_submit')->where('status', '=', $params['status'])->where('user_openid', '=', $params['openid'])->select();
        return $this->_package_return('查询' . $params['openid'] . '用户提交的记录', '', $result, 1);
    }
}
