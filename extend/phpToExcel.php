<?php

/**
 * Created by PhpStorm.
 * User: hoo
 * Date: 2017/11/17
 * Time: 15:00
 */


class phpToExcel
{
    public $fields = [];

    public function __construct()
    {
        /*导入phpExcel核心类    注意 ：你的路径跟我不一样就不能直接复制*/
        include_once('./../vendor/phpoffice/phpexcel/Classes/PHPExcel.php');
        include_once('./../vendor/iamcal/php-emoji/lib/emoji.php');
    }


    /* 导出excel函数*/
    /**
     * @param $data
     * @param string $name
     */
    public function push($data, $fields, $name = 'Excel')
    {
        //  保存字段
        $this->fields = $fields;
//        $fields = ['id', 'create_time', 'status', 'from_data'];
        error_reporting(E_ALL);
        date_default_timezone_set('Asia/Shanghai');
        $objPHPExcel = new PHPExcel();
        /*以下是一些设置 ，什么作者  标题啊之类的*/
        $objPHPExcel->getProperties()->setCreator("TiramisuCMS")
            ->setLastModifiedBy("TiramisuCMS")
            ->setTitle("EXCEL EXPORT")
            ->setSubject("EXCEL EXPORT")
            ->setDescription("DATA BACKUP")
            ->setKeywords("excel")
            ->setCategory("result file");
        /*以下就是对处理Excel里的数据， 横着取数据，主要是这一步，其他基本都不要改*/
//                    var_dump($data);
//        首行为表头字段
        $colBegin = '65';   //  ascii码,需要进行转换
        $colExtBegin = $colBegin + count($fields);

        foreach ($fields as $k => $field) {
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue(chr($colBegin + $k) . '1', $field);
        }
        foreach ($data as $k => $v) {
            $row = $k + 2;
            $objPHPExcel->setActiveSheetIndex(0)
                //Excel的第A列，uid是你查出数组的键值，下面以此类推
                ->setCellValue(chr($colBegin + $col) . $row, $v[$fields[$col]]);
        }
        $objPHPExcel->getActiveSheet()->setTitle('User');
        $objPHPExcel->setActiveSheetIndex(0);
        header('Content-Type: application/vnd.ms-excel;charset=utf-8');
        header('Content-Disposition: attachment;filename="' . $name . '.xls"');
        header('Cache-Control: max-age=0');
        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
        $filePath = 'export/' . $name . '-' . time() . '.xls';
        $objWriter->save(__DIR__ . '/../public/' . $filePath);
//        $objWriter->save('php://output');
        return 'http://tiramisu.localhost.com/' . $filePath;
    }


}