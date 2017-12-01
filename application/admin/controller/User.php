<?php
/**
 * Created by PhpStorm.
 * User: hoo
 * Date: 2017/10/9
 * Time: 15:20
 */

namespace app\admin\controller;

use app\admin\common\BaseController;
use app\admin\model\UserModel;
use app\tiramisu\User as TiramisuUser;
use think\Cache;
use think\Controller;
use think\Cookie;
use think\Exception;
use think\Log;
use think\Request;

class User extends Controller
{
    use BaseController;

    function __construct(Request $request = null)
    {
        parent::__construct($request);
        if ($this->request->action() == 'userlogin') {
//            return $this->user_login();
        }
        $this->request->isAjax(1);
    }

    /**
     * @deprecated checkLogin方法已废弃,被Server取代
     */
    public function checkLogin()
    {
        $token = Cookie::has('user_token') ? Cookie::get('user_token') : null;
        $user = TiramisuUser::born('Visitor');

        if (!is_null($token)) {
            $cacheLogin = Cache::get('logined.' . $token, null);
            if (!is_null($cacheLogin)) {
                $user = $cacheLogin;
            }
        }

        //  todo 添加用户登录验证并返回用户信息
        $this->success('', '', ['user' => $user]);
    }


    /**
     * 用户登录接口
     * TODO:数据均为模拟,后续需要接入用户模型
     */
    public function api_user_login()
    {
        $params = $this->request->param();
        if (!isset($params['account']) || !isset($params['password'])) {
            $this->response_error('请输入正确的登录账户与密码..');
        }
        try {
            $userModel = new UserModel();
            $user = $userModel->get_user($params)->getResult();

            if (empty($user)) {
                $this->response_error('不存在该用户,无法登陆', '', $params);
            } else {
                if (count($user) != 1) {
                    $this->response_error('该用户存在多个记录,无法正常使用和登录', '');
                } else {
                    $user = $user[0];
                }
                //  成功登录 - 记录登录时间,返回用户数据
                unset($user['password']);
                $user = TiramisuUser::born($user['nick_name'], $user);
                $user['isLogin'] = true;
                Cache::set('logined.' . $user['signature'], $user, 7200);
                $user = $this->_user_login_handle($user);
                $this->response_success('您通过用户签名认证', '', $user);
            }
        } catch (Exception $e) {
            echo $e;
        }
    }

    /**
     *  用户登出接口
     *  TODO:用户登出操作数据接口,用于记录用户行为
     */
    public function api_user_logout()
    {
        var_dump($this->request->param());

    }

    /**
     *  用户注册接口
     * TODO:用于处理用户注册行为
     */
    public function api_user_register()
    {
        $params = $this->request->param();
        try {
            if ($params['account'] || $params['password'] || $params['phone']) {
                $userModel = new UserModel();
                $result = $userModel->add_user($params);
                if (true === $result['code']) {
                    $this->success($params['nick_name'] . '用户注册成功', '', $result['result']);
                } else {
                    $this->error($result['msg'], '', $result['result']);
                }
            }
        } catch (Exception $e) {
            var_dump($e);
        }
    }

    /**
     * 用于处理用户登录逻辑流程
     * @param $user
     */
    private function _user_login_handle($user)
    {
        //  记录用户登录时间
        $login_time = time();
        $userModel = new UserModel();
        try {
            $result = $userModel->update_login_time($user['account'], $login_time);
            if ($result['code'] == 1) {
                $user['login_time'] = $login_time;
                return $user;
            } else {
                $this->response_error($result['msg'], $user);
            }
        } catch (Exception $e) {
            Log::error($user['account'] . '无法记录登录时间');
        }
    }
}