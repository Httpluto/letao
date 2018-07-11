$(function(){

    //1. 表单校验  bootstrap会在表单提交的时候做校验,如果失败了,组织表单提交,显示错误信息
    $("form").bootstrapValidator({
        //配置检验的规则,根据表单中的name属性
        fields:{
            // username的校验规则
            username: {
                //可以配置username所有的校验
                validators: {
                    notEmpty: {
                        message: "用户名不能为空"
                    },
                    stringLength: {
                        min: 3,
                        max: 6,
                        message: "用户名长度必须是3-6位"
                    },
                    callback: {
                        message: "用户名不存在"
                    }
                }
            },
            // password的校验规则
            password: {
                validators: {
                    notEmpty: {
                        message: "密码不能为空"
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: "密码长度必须是6-12位"
                    },
                    callback: {
                        message: "密码错误"
                    }
                }
            }
        },

        //配置小图标
        feedbackIcons: {
            valid: "glyphicon glyphicon-thumbs-up",
            invalid: "glyphicon glyphicon-thumbs-down",
            validating: "glyphicon glyphicon-refresh"
        }
    });

    //2. 给表单注册一个 校验成功 的时间
    $("form").on("success.form.bv", function(e){
        e.preventDefault();  //阻止浏览器默认跳转

        $.ajax({
            type: 'post',
            url: 'employee/employeeLogin',
            data: $("form").serialize(),
            success: function(info){
                // console.log(info);

                if(info.error === 1000){
                    // alert("用户名不存在");
                    //参数1: 修改哪个字段
                    //参数2: 修改状态 NOT-VALIDATED  VALIDATING INVALID VALID
                    $("form").data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
                }

                if(info.error === 1001){
                    // alert("密码错误");
                    $("form").data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
                }

                if(info.success){
                    //登录成功
                    location.href = "index.html";
                }
            }
        })
    });

    //3. 点击重置按钮, 需要把内容及样式都清空, 需要调用bootstrapValidator提供的方法
    $("[type='reset']").on("click", function (){
        $("form").data("bootstrapValidator").resetForm(true);
    });
})