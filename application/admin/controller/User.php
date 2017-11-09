<?php
/**
 * Created by PhpStorm.
 * User: hoo
 * Date: 2017/10/9
 * Time: 15:20
 */

namespace app\admin\controller;

use app\diavision\common\BaseController;
use app\tiramisu\Base as TiramisuBase;
use app\tiramisu\User as TiramisuUser;
use think\Cache;
use think\Controller;
use think\Cookie;
use think\Request;

class User extends Controller
{
    use BaseController;

    function __construct(Request $request = null)
    {
        parent::__construct($request);
        if ($this->request->action() == 'userlogin') {
            return $this->userLogin();
        }
        if ($this->request->isAjax() && TiramisuBase::interactionCheck()) {

        } else {
            return $this->_package_return('无效的数据交互', '', '', 0);
        }
    }

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
        return $this->success('', '', ['user' => $user]);
    }

    public function userLogin()
    {
        $account = $this->request->get('account', null);
        $password = $this->request->get('password', null);
//        var_dump($account,$password);
        if ($account == '13828471634' || $password == '123456') {
            //  todo 暂时模拟用户登录数据
            $user = TiramisuUser::born($account);
            $user['isLogin'] = true;
            $user['nick'] = $account;
//            var_dump($user);
            Cache::set('logined.' . $user['user_token'], $user, 7200);
            return $this->success('您通过认证..', '/admin/index', $user);
        }
        if (is_null($account) || is_null($password)) {
            return $this->error('请输入正确的登录账户与密码..');
        }

    }
}