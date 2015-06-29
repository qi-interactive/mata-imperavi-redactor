<?php
/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

namespace mata\imperavi;
use yii\web\AssetBundle;


class VideoImperaviRedactorPluginAsset extends AssetBundle
{
    public $sourcePath = '@vendor/mata/mata-imperavi-redactor/assets/plugins/video';

    public $js = [
        'video.js',
    ];

    public $css = [

    ];
    public $depends = [
        'mata\imperavi\ImperaviRedactorAsset'
    ];

}
