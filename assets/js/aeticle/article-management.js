$(function () {
    // let md = template('tpl-table')
    // console.log(123);

    function uo() {
        $('.form-2').on('keyup', function (e) {
            console.log(e.keyCode);
        })
        // layui.layer.close(indexEdit)
    }

    // 获取文章列表
    function addArticle() {
        $.get('/my/article/cates', function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取文章失败');
            }
            let lb = template('tpl-table', res)
            $('tbody').html(lb)
            // console.log(lb);
        })
    }
    addArticle()
    // 添加文章
    let indexadd = null
    $('.layui-btn-normal').on('click', function () {
        // let f = template('tpl-add')
        indexadd = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#tpl-add').html()
        });
        // 确认递交按钮
        $('body').on('submit', '#form-1', function (e) {
            e.preventDefault();
            $.post("/my/article/addcates", $(this).serialize(),
                function (res) {
                    if (res.status !== 0) {
                        return layui.layer.msg('添加失败');
                    }
                    layui.layer.msg('添加成功');
                    addArticle()
                    layui.layer.close(indexadd)
                }
            );
        })

    });
    // 修改文件表单
    let indexEdit = null
    $('tbody').on('click', '.btn-edit', function (e) {
        e.preventDefault();
        indexEdit = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#add-edit').html()
        });
        let id = $(this).parent().attr('data-id')
        // console.log(e.keyCode);
        uo()
        // console.log(id);
        $.ajax({
            type: "get",
            url: "/my/article/cates/" + id,
            success: function (res) {
                layui.form.val('for', res.data)
            }
        });
        // 修改确定按钮
        $('#form-2').submit(function (e) {
            e.preventDefault();
            const s = $(this).serialize()
            console.log(s);
            $.ajax({
                type: "post",
                url: "/my/article/updatecate",
                data: s,
                success: function (res) {
                    if (res.status !== 0) {
                        return layui.layer.msg('修改失败');
                    }
                    layui.layer.msg('修改成功');
                    addArticle()
                    layui.layer.close(indexEdit)
                }
            });
        })
    })
    // 删除按钮

    $('tbody').on('click', '.deleteButton', function () {
        //eg1
        let idd = $(this).parent().attr('data-id')
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
            //do something

            $.ajax({
                type: "get",
                url: "/my/article/deletecate/" + idd,
                success: function (res) {
                    if (res.status !== 0) {
                        return layui.layer.msg('删除失败');
                    }
                    layui.layer.msg('删除成功');
                    console.log(res);
                    layer.close(index);
                    addArticle()

                }
            });

        });

    })

})