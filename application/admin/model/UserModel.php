<?php
/**
 * Created by PhpStorm.
 * User: hoo
 * Date: 2017/11/28
 * Time: 9:40
 */

namespace app\admin\model;

use app\admin\common\BaseModel;
use think\Model;

class UserModel extends BaseModel
{
    // 设置当前模型对应的完整数据表名称
    protected $table = 't_user';

    public function getResult()
    {
        return parent::getResultArray(); // TODO: Change the autogenerated stub
    }

    public function get_user_by_id($id)
    {
        return $this->where('id', '=', $id)->find();
    }

    /**
     * 获取单个用户
     * @param $params
     * @return array|false|\PDOStatement|string|Model
     */
    public function get_user($params = [])
    {
        $params['is_enable'] = isset($params['is_enable']) ?: true;
        //  密码加密匹配
        isset($params['password']) ? $params['password'] = md5($params['password']) : '';
        $this->where($params)->allowField(true);
        return $this;
    }

    /**
     * 获取多个用户
     * @param $params
     * @param $page
     * @param $limit
     * @return false|\PDOStatement|string|\think\Collection
     * @internal param $total
     */
    public function get_users($params = [])
    {
        $params['is_enable'] = isset($params['is_enable']) ?: true;
        $this->where($params);
        return $this->getResult();
    }

    public function add_user($params = [])
    {
        //  检测用户碰撞
        $userExist = $this->where('account', $params['account'])->find();
        if (empty($userExist)) {
            $params['password'] = md5($params['password']);
            $params['register_time'] = time();
            //  储存用户 - 开始
            $result = $this->allowField(true)->save($params);
            return $this->returnResult(true, '用户保存成功', $result);
        } else {
            return $this->returnResult(false, '用户已经存在', $params);
        }
    }
}