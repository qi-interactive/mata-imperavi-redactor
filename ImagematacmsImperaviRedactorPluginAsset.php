<?php
/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

namespace mata\imperavi;
use yii\web\AssetBundle;

/**
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */
class ImagematacmsImperaviRedactorPluginAsset extends AssetBundle
{
	public $sourcePath = '@vendor/mata/mata-imperavi-redactor/assets/plugins/imagematacms';

	public $js = [
		'imagematacms.js'
	];

    public $css = [

    ];

	public $depends = [
		'mata\imperavi\ImperaviRedactorAsset'
	];
}
