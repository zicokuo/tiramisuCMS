<?php

/**
 * Created by PhpStorm.
 * User: hoo
 * Date: 2017/11/1
 * Time: 9:07
 */

namespace app\diavision\controller;

use app\diavision\common\BaseController;
use app\weixin\WeixinAPI as wx;
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

    /**
     * 标准化api返回接口
     *
     * @param string $msg
     * @param integer $code
     * @param array $data
     * @param string $url
     * @return void
     */
    private function _reply_wx($msg = '', $code = 1, $data = [], $url = '')
    {
        echo json_encode(['msg' => $msg, 'code' => $code, 'content' => $data, 'url' => $url]);
        exit();
    }

    /**
     * 获取session_3rd
     *
     * @param string $sKey
     * @param boolean $isRefer
     * @return void
     */
    private function _get_session_3rd($sKey = 'session_3rd', $isRefer = false)
    {
        $sKey != 'session_3rd' ?: $sKey = $this->request->param($sKey, false);
        $weixinApplet = new WeixinSDK();
        if ($sKey) {
            $srd = Cache::get($sKey, false);
            if ($srd) {
                return $weixinApplet->explain_session_3rd($srd);
            }
        }

        return $isRefer ? false : $this->_reply_wx('您的登录已过期,请重新登录', 0, $this->request->param());
    }

    /**
     * 检查用户session_3rd
     */
    public function check_3rd()
    {
        $result = $this->_get_session_3rd();
        $result['session_3rd'] = $this->request->param('session_3rd');
        $this->_reply_wx('用户3rd有效', 1, $result);
    }

    /**
     * 使用js_code换取用户access
     */
    public
    function check_login()
    {
        $weixinApplet = new WeixinSDK();

        $js_code = $this->request->param('code', false);

        if ($js_code) {
            //  使用wx接口获取access_token等
            $result = wx::get_session($js_code, $weixinApplet->config);
            if ($this->_is($result)) {
                // openid 换 128 随机数
                $thirdSession = $weixinApplet->get_third_session($result['openid']);
                //  缓存3rd
                Cache::set($thirdSession, $result['session_key'] . ',' . $result['openid'], $result['expires_in']);
                $result['session_3rd'] = $thirdSession;
                $this->_reply_wx('成功换取用户s3rd和openid', 1, $result);
            } else {
                $this->_reply_wx('换取access_token失败,请提交有效的js_code', 0, $result);
            }
        }
    }

    /**
     * 同步用户信息
     * @param 需要传入用户信息rawData ,session_3rd
     */
    public
    function sync_user()
    {
        $result = $this->_get_session_3rd();
        //  计算用户sha1值 , 验证用户信息真实性
        $signature2 = sha1($this->request->param('rawData') . $this->request->param('session_key'));
        if ($signature2 !== $this->request->param('signature')) {
            $this->error("signNotMatch");
        }
        //  转化字段名
        $userInfo = $this->table_fields_trans(json_decode($this->request->param()['rawData'], 1));

        //  合并用户数据组
        $result = array_merge($this->request->param(), $userInfo);

        //  储蓄用户信息

        //  新用户 - 合并数据
        $userInfo['openid'] = $result['openid'];
        $fields = array_flip(db('weixin_user')->getTableFields());
        $fields = $this->array_match($fields);
        $userInfo = array_intersect_key(array_merge($fields, $userInfo), $fields);
        //  检查用户记录
        $userExist = db('weixin_user')->where('openid', '=', $result['openid'])->find();
        if ($userExist === false || is_null($userExist)) {
            //  新用户
            db('weixin_user')->insert($userInfo);
            $this->success('新微信用户' . $result['nickName'] . '注册和登录成功', '', $result);
        } else {
            db('weixin_user')->where('id', '=', $userExist['id'])->update($userInfo);
            $result['openid_client'] = md5($result['openid']);
            $this->success('微信用户' . $result['nickName'] . '登录成功', '', $result);
        }
    }


    /**
     * 小程序表单提交
     * @return string
     */
    public
    function design_submit()
    {
        $srd = $this->_get_session_3rd();

        $params = $this->request->param();
        if (isset($params['openid'])) {
//            $sql = 'INSERT INTO weixin_design_submit (user_openid,create_time,status,contact,from_data) VALUES (:user,:createTime,:status,:contact,:fromData)';
            $bindData = ['user_openid' => $params['openid'], 'create_time' => time(), 'status' => 0, 'from_data' => json_encode($params)];
            $result = db('weixin_design_submit')->insert($bindData);
            $this->_reply_wx('成功提交设计', 1, $result);
        } else {
            $this->_reply_wx('提交设计需求缺少必要字段,请重试', 1, $this->request->param());
        }
    }

    /**
     * 获取小程序提交内容 by 用户
     * 根据用户提交的status字段进行获取
     * @return void
     */
    public
    function get_user_submits()
    {
        $srd = $this->_get_session_3rd();
        $params = $this->request->param();
        $db = db('weixin_design_submit');
        if (isset($params['status'])) {
            $db->where('status', '=', $params['status']);
        }
        if (isset($params['id'])) {
            $db->where('id', '=', $params['id']);
        }
        $result = $db->where('user_openid', '=', $params['openid'])->order('create_time', 'desc')->select();
        $this->_reply_wx('查询' . $params['openid'] . '用户提交的记录', 1, $result);
    }

    public
    function del_user_submit()
    {
        $srd = $this->_get_session_3rd();
        $rid = $this->request->param('id', false);
        if (false === $rid) {
            $this->_reply_wx('查询缺少必要字段', 0, $this->request->param());
        }
        $result = db('weixin_design_submit')->where('id', '=', $rid)->update(['status' => -1]);
        $this->_reply_wx('设计需求 ' . $rid . ' 已删除', 1, $result);
    }
}
