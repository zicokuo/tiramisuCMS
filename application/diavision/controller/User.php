<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017-11-19
 * Time: 14:12
 */

namespace app\diavision\controller;

use app\admin\common\BaseController;
use app\diavision\model\userModel;
use think\Controller;
use think\Exception;
use think\Request;

class User extends Controller
{
    use BaseController;

    function __construct(Request $request = null)
    {
        $this->initialization();
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
            //  转换用户名 - 处理emoji表情
            $data['formData'][$key]['nick_name'] = json_encode(base64_decode($user['nick_name']));
        }
        $this->response_success('成功:获取用户列表', '', $data);
    }

    /**
     * 禁用用户 - enabled 设置为false
     */
    public function ban_user()
    {
        $uid = $this->request->param('uid', false);
        if ($uid) {
            $userModel = new userModel();
            //  禁止使用
            try {
                $res = $userModel->where('id', '=', $uid)->isUpdate(true)->save(['enabled' => 0]);
                $this->response_success('用户[' . $uid . ']被禁用', $this->request->url(), $res);
            } catch (Exception $e) {
                $this->response_error('禁用用户[' . $uid . ']失败', $this->request->url());
            }
        } else {
            $this->response_error('用户禁用操作缺少参数', $this->request->url());
        }
    }

    public function export_users()
    {
        $data['formData'] = db('weixin_user')->select();
        foreach ($data['formData'] as $key => $user) {
            $data[$key]['nick_name'] = base64_decode($user['nick_name']);
        }
        $name = 'Excelfile';    //生成的Excel文件文件名
        $excelHandle = new \phpToExcel();
        return $res = $excelHandle->push($data['formData'], $name);
    }
}