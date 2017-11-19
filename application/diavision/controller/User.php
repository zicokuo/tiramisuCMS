<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017-11-19
 * Time: 14:12
 */

namespace app\diavision\controller;

use app\diavision\model\userModel;
use phpToExcel;
use think\Controller;
use think\Request;

class User extends Controller
{
    function __construct(Request $request = null)
    {
        parent::__construct($request);

    }

    public function index()
    {
        return 'welcome';
    }

    /**
     * 获取用户列表
     * @return string
     */
    public function get_user()
    {
        $data['formData'] = db('weixin_user')->select();
        foreach ($data['formData'] as $key => $user) {
            //  转换用户名 - 处理emoji
            $data['formData'][$key]['nick_name'] = json_encode(base64_decode($user['nick_name']));
        }
        $this->success('成功:获取用户列表', '', $data);
    }

    /**
     * 
     */
    public function del_user()
    {
        $uid = $this->request->param('uid', false);
        if ($uid) {
            $userModel = new userModel();
        }
    }

    public function export_users()
    {
        $data['formData'] = db('weixin_user')->select();
        foreach ($data['formData'] as $key => $user) {
            $data[$key]['nick_name'] = base64_decode($user['nick_name']);
        }
        $name = 'Excelfile';    //生成的Excel文件文件名
        $excelHandle = new phpToExcel\;
        return $res = $excelHandle->push($data['formData'], $name);
    }
}