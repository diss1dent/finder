<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit097101cddf06a1a3c509de9dff72a83e
{
    public static $prefixLengthsPsr4 = array (
        'V' => 
        array (
            'Vimeo\\' => 6,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Vimeo\\' => 
        array (
            0 => __DIR__ . '/..' . '/vimeo/vimeo-api/src/Vimeo',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit097101cddf06a1a3c509de9dff72a83e::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit097101cddf06a1a3c509de9dff72a83e::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}