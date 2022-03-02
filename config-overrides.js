const {override,fixBabelImports, addLessLoader} = require('customize-cra');

module.exports = override(
     //配置上babe1- plugin- import
    fixBabelImports('import',{
        libraryName:'antd',     //针对的是antd
        libraryDirectory:'es',  //源码文件夹中的es文件夹
        style:true,  //自动打包相关的css
    }),
    addLessLoader({
        javascriptEnabled:true,
        modifyVars:{'@primary-color':'#1990FF'}
    })
)
    
