module.exports = {
  common: {
    account_login: '账号密码登录',
    phone_login: '手机登录',
    welcome: '欢迎, { username }!',
    configuration: '配置',
    settings: '设置',
    dn_logo_text: 'DeviceNetworks',
    has_no_affirmed_alarm: '您没有未确认的告警',
    view: '查看',
    clear: '清空',
    no_data: '没有数据',
    picture: '图片',
    bind: '绑定',
    unbind: '解绑',
    confirm: '确认',
    cancel: '取消',
    yes: '是',
    no: '否',
    operation: '操作',
    detail: '详情',
    query: '查询',
    add: '添加',
    update:'修改',
    delete: '删除',
    submit: '提交',
    test: '测试',
    check_all: '全选',
    all: '全部',
    pagination_footer: '共 {total} 条记录 第 {current} / {pages} 页',
    notice: '提示',
    confirmupdate:"确认保存?"
  },
  management: {
    site: '现场',
    gateway: '网关',
    online: '在线',
    offline: '离线',
  },
  home: {
    // 首页
    home: '首页',
    monitor: '概览',
  },
  notice: {
    // 通知
    notice: '通知',
    alarms: '告警',
    logs: '日志',
    level: '等级',
    serious_warning: '严重警告',
    important_warning: '重要警告',
    minor_warning: '次要警告',
    caution: '警告',
    remind: '提醒',
    alarm_state: '告警状态',
    alarm_occur: '未消除',
    alarm_remove: '已消除',
    sure_state: '确认状态',
    unconfirmed: '未确认',
    confirmed: '已确认',
    sites: '现场',
    type: '类型',
    alarm_time: '告警时间',
    clear_time: '消除时间',
    description: '描述',
    confirm_account: '确认账户',
    alarm_processing: '告警处理',
    confirmalarm: '确认告警?',
    alarm_detail: '告警详情',
    site_name: '现场名称',
    alarm_origin: '告警来源',
    confirm_time: '确认时间',
    state: '状态',
    comment: '备注',
  },
  repair: {
    // 维修管理
    repair_manage: '维修管理',
    orderlist: '工单列表',
    schedule: '预防性计划',
  },
  report: {
    // 报表
    reports: '报表',
    report_performance: '绩效统计',
    report_workload: '工作量统计',
    report_gateway: '网关报表',
  },
  site: {
    // 现场管理
    site_management: '点位',
    site: '点位管理',
    line: '线路管理',
    area:{
        area: '区域管理',
        areaName: '区域名称',
        charger:"负责人",
        phone:"联系方式",
        description:"描述",
        createTime:"创建时间",
        areaDetail:"区域详情"
    }
  },
  org: {
    organ: '机构',
    user: '用户',
    role: '角色',
    config: '配置',
    logs: '日志',
  },
  system: {
    // 系统
    system: '系统',
    net_state: '网络状态',
    task_state: '任务状态',
    log: '操作日志',
    history_export_plan: '导出计划',
    loop: '执行频率',
    unit: '单位',
    vars: '变量',
    last_execute_time: '上次执行时间',
    days: '天',
    hours: '小时',
    minutes: '分钟',
    seconds: '秒',
    day: '天',
    hour: '小时',
    minute: '分钟',
    second: '秒',
    delete_plan: '删除计划?',
    delete_plan_describe: '请确定将要删除这些计划。',
    create_schedule_plan: '创建计划',
    update_schedule_plan: '修改计划',
    plan_information: '计划信息',
    config_vars: '配置变量',
    config_ftp: '配置FTP',
    exportplan_time_limit: '10分钟～7天',
    group: '分组',
    has_no_grouping: '无分组',
    varible_type: '变量类型',
    instantaneous: '瞬时',
    statistics: '统计',
    variables_select: '选择变量',
  },
  task: {
    // 任务
    task: '任务',
    batch_recover_confirm: '确定恢复？',
    batch_pause_confirm: '确认暂停？',
    batch_cancel_confirm: '确认取消？',
    batch_pause: '批量暂停',
    batch_recover: '批量恢复',
    batch_share: '批量共享',
    batch_cancel: '批量取消',
  },
  download: {
    // 下载
    download: '下载',
    devicetouch: '设备快线',
    device_cloud_app: '设备云App',
    how_to_maintain_channel: '只需三步，即可使用“设备快线”服务远程维护您的设备',
    download_dt_client_install: '下载并安装设备快线客户端软件',
    login_dt_client: '运行设备快线客户端软件，使用您的账号登录',
    create_channel_success:
      '选择要维护的设备所在的现场，建立远程维护通道，开始远程维护',
    scan_to_download: '扫描以下二维码下载设备云APP',
    real_time_data_overview: '实时数据概览',
    centralized_monitoring: '精准集中监测',
    real_time_alerts: '即时预警推送',
    gis_location: '精准GIS定位',
  },
  validate: {
    cannot_contain_special_chars: '不能包含特殊字符',
    required: '此处不可空白',
    number_one_to_another: '不能超出 {one} ~ {another} 的范围.',
  },
};
