$(function () {
    // 点击去注册的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从layui 中获取form 对象
    var form = layui.form
    // 通过form.verify函数叫做pwd的校验规则
    form.verify({

        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd != value) {
                return '两次密码不一致'
            }
        }
    })


    //监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功,请登录')
            $('#link_login').click()

        })
    })

    // 监听登录页面 表单提交事件
    $('#form_login').submit(function (e) {
        //阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'post',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                //将token值本地存储 
                localStorage.setItem('token', res.token)
                location.href = '/Code/index.html'
            }
        })
    })
})