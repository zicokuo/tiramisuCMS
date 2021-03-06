<?php
/**
 * Created by PhpStorm.
 * User: hoo
 * Date: 2017/11/28
 * Time: 10:00
 */

namespace app\admin\common;


use think\Model;

class BaseModel extends Model
{
    //  数据集形式输出结果
    protected $resultSetType = 'collection';

    /**
     * 数据库结果处理
     * @return false|\PDOStatement|string|\think\Collection
     */
    protected function getResultArray()
    {
        $result = $this->select();
        if (false === empty($result)) {
            return $result = collection($result)->toArray();
        }
        return $result;
    }

    /**
     * 数据库分页处理
     * @param $page
     * @param $limit
     * @return $this
     */
    protected function setPage($page, $limit)
    {
        $this->page($page, $limit);
        return $this;
    }

    protected function setOrder($field, $order = 'desc')
    {
        $this->order($field, $order);
        return $this;
    }

    /**
     * 数据模型返回结果标准化
     * @param $code true/false 成与败
     * @param string $msg 返回的信息
     * @param string $result 结果数据
     */
    protected function returnResult($code, $msg = '', $result = '')
    {
        return ['code' => $code, 'msg' => $msg, 'result' => $result];
    }

    /**
     * 过滤查询字段
     * @param $data
     * @param array $fields
     * @return array
     */
    protected function filterFields($data, $fields = [])
    {
        $tableFields = array_flip($this->getTableFields());
        $fields = empty($fields) ? $tableFields : array_merge(array_flip($fields), $tableFields);
        return array_intersect_key($data, $fields);
    }
}