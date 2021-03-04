$(function () {
    let q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    initTable()
    // 获取文章列表数据
    function initTable() {
        $.ajax({
            method: 'get',
            url: "/my/article/list",
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取失败');
                }
                // console.log(res);
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                // renderPage()
                fy(res.total)
            }
        });
    }
    syuu()
    // 筛选标签
    function syuu() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: function (res) {
                // console.log(res);
                var htmlYuss = template('tpls-yil', res)
                $('#sort').html(htmlYuss)
                layui.form.render();
            }
        });
    }
    saixuan()
    function saixuan() {
        $('#screen').on('submit', function (e) {
            e.preventDefault();
            let sort = $('#sort').val()
            let state = $('#state').val()
            q.cate_id = sort
            q.state = state
            initTable()
        })
    }

    function fy(tate) {
        layui.laypage.render({
            elem: 'pagination'
            , count: tate
            , layout: ['count', 'limit', 'prev', 'page', 'next', 'skip']
            , limits: [2, 3, 5, 10]
            , limit: q.pagesize
            , curr: q.pagenum
            , jump: function (obj, first) {
                // console.log(obj.layout)
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {

                    initTable()
                }
            }

        });
    }
    compile()
    function compile() {
        $('tbody').on('click', '.deleteButton', function () {
            let id = $(this).attr('lay-id')
            console.log(id);
            layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {

                $.ajax({
                    type: "get",
                    url: "/my/article/delete/" + id,
                    success: function (res) {
                        if (res.status !== 0) {
                            layui.layer.msg('删除失败');
                        }
                        layui.layer.msg('删除成功');
                        initTable()
                    }
                });
            })
        })
    }
})