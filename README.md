## 技术栈
- 脚手架: create-react-app
- react
- redux
- react-router
- antd
- less
- webpack

## todolist

1. - [x] 使用`create-react-app`初始化项目
2. - [x] 降低`react`、`react-dom`的版本号为`v16.3.2`
3. - [x] 安装`react-router`、`axios`
4. - [x] 安装`AntD`
5. - [x] 暴露`webpack`配置
6. - [x] 安装`less-loader`
7. - [x] 安装并配置`babel-plugin-import` *(实现按需加载AntD组件的代码及样式，优化性能)*
8. - [x] 分析项目页面结构并搭建项目目录结构
9. - [x] 完成左侧菜单组件的基本功能
     - [x] 学习使用`AntD`的菜单组件
     - [x] 根据提供的`menuList.js`文件初始化菜单
     - [x] 调整菜单样式
10. - [x] 完成右侧头部组件的基本功能
        - [x] 完成组件结构及样式的开发
        - [x] 学习使用百度天气API
        - [x] 安装`jsonp`插件，使用`jsonp`实现调用天气API获取数据的功能
        - [x] 封装`axios`
11. - [x] 开发右侧底部组件
12. - [x] 开发主内容区，实现基本的静态展示功能
13. - [x] 学习`react-router` *(动手敲一遍根据官方文档的demo)*
       - [x] 安装`react-router-dom`
14. - [x] 完成【UI】菜单的各个子页面开发，掌握`AntD`常用组件的使用
       - [x] 按钮页面: `Button`
       - [x] 弹框页面: `Modal`
       - [x] Loading页面: `Spin`
       - [x] 通知提醒页面: `notification`
       - [x] 全局提示页面: `message`
       - [x] Tab页签页面：`Tabs`
       - [x] 图片画廊页面
       - [x] 轮播图页面：`Carousel`
15. - [x] 开发【表单】菜单。掌握`AntD`的`Form`以及相关表单项组件(`Input`、`Upload`、`Select`、`Switch`、`Radio`、`DatePicker`等)的使用方法
       - [x] 用于登录的表单
       - [x] 用于注册的表单
       - [x] `<DatePicker />`组件初始化值时依赖`moment`包，所以需提前安装
16. - [x] 开发【表格】菜单。学习`AntD`的表格组件
       - [x] 创建一个基础表格
       - [x] 创建使用动态数据渲染的表格。使用`easy-mock`平台，创建表格数据的请求接口(扩展学习`mockjs`语法)，使用接口返回的数据渲染表格，将表格中数据是编码的列使用`render`配置项转换为中文含义（如性别是0/1的转换为女/男）
       - [x] 在表格中添加单选框列或复选框列，点击表格行时选中当前行
       - [x] 设置表格的分页，将分页的配置项提取到公共配置文件中`src/utils/index.js`
       - [x] 学习使用表格的头部固定、左侧/右侧固定、排序、嵌套操作按钮等高级用法
17. - [x] 开发【城市管理】菜单。
       - [x] 开发查询条件表单
       - [x] 使用`easy-mock`创建请求列表数据的api，并完成表格的动态渲染
       - [x] 点击【开通城市】按钮，弹出表单的模态框。在`easy-mock`中创建接收表单数据的api，模拟表单提交
18. - [x] 开发【订单管理】菜单
       - [x] 开发查询条件表单
       - [x] 创建请求列表数据的api`/order/list`，并完成表格的动态渲染，添加单选列
       - [x] 点击【订单详情】按钮，打开新的标签页，创建新页面布局`src/common.js`，该页面与主页面共用一个`<Header />`组件，`<Header />`组件根据父组件传递的`menuType`属性调整样式
       - [x] 创建订单详情api`/order/detail`，完成订单详情页面中基础信息展示部分
       - [x] 引入百度地图SDK，初始化地图，根据返回的坐标数据描绘起始位置的行驶路线以及服务区域
       - [x] 创建查询单条订单的api`/order/end`和结束订单的api`/order/update`，点击【结束订单】按钮，调用接口并弹出模态框显示订单信息，点击【确定】按钮提交表单，然后关闭模态框并刷新列表