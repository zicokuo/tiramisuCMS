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

        try {
            $userModel = new UserModel();
            $userModel->get_user($params)->getResultArray();
            if (empty($userModel)) {

            }
        } catch (Exception $e) {
            var_dump($e);
        }


        $account = $this->request->get('account', null);
        $password = $this->request->get('password', null);
//        var_dump($account,$password);
        if ($account == '13828471634' || $password == '123456') {
            //  todo 暂时模拟用户登录数据
            $user = TiramisuUser::born('Azusakuo', ['account' => $account, 'mail' => '21520993@qq.com']);
            $user['isLogin'] = true;
            Cache::set('logined.' . $user['signature'], $user, 7200);
            $this->response_success('您通过用户签名认证', '', $user);
        }
        if (is_null($account) || is_null($password)) {
            $this->response_error('请输入正确的登录账户与密码..');
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
}