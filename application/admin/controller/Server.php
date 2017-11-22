<?php
/**
 * Created by PhpStorm.
 * User: hoo
 * Date: 2017/10/13
 * Time: 11:15
 */

namespace app\admin\controller;

use app\admin\common\BaseController;
use think\Controller;
use think\Request;

class Server extends Controller
{
    use BaseController;

    function __construct(Request $request = null)
    {
        $this->initialization();
        parent::__construct($request);

    }

    /**
     *  前端同步用户身份接口
     */
    public function get_user_signature()
    {
        $signature = $this->userInfo['signature'];
        $this->response_success('用户身份已生成' . $this->userInfo['nick_name'], $this->request->url(), ['user_signature' => $signature]);
    }



    public function index()
    {
        return 'welcome';
    }
}