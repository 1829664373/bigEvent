$(function () {
    // let md = template('tpl-table')
    function addArticle() {
        $.get('/my/article/cates', function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取文章失败');
            }
            let lb = template('tpl-table', res)
            $('tbody').html(lb)
            // console.log(lb);
        })
    }
    addArticle()
    let indexadd = null
    $('.layui-btn-normal').on('click', function () {
        // let f = template('tpl-add')
        indexadd = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#tpl-add').html()
        });
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

        $.ajax({
            type: "get",
            url: "/my/article/cates/" + id,
            success: function (res) {
                layui.form.val('for', res.data)
            }
        });
        $('#form-2').submit(function (e) {
            e.preventDefault();
            const s = $(this).serialize()
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
                    layer.close(index);
                    addArticle()
                }
            });

        });

    })

})