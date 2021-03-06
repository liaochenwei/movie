/**
 * 加载完页面调用的函数
 * 返回浏览记录
 */
let page;

function getcount() {
    $.post("doGetCount.histories", function (data) {
        console.log(data);
        new Pagination({
            element: '#historyPage', // 元素
            type: 1, // 样式类型，可选[1,2]
            pageIndex: 1, // 初始页码
            pageSize: 6, // 每页数量
            pageCount: 5, // 页码数量
            total: data, // 数据总条数
            jumper: false, // 显示输入框跳转
            singlePageHide: false, // 只有一页时不显示分页
            prevText: '上一页', // 上一页文字
            nextText: '下一页', // 下一页文字
            disabled: true, // 是否显示禁用
            currentChange: function (index) {
                // 页码改变时回调
                console.log(index);
                doShow(index);
                window.location.href = "#top";
            }
        });
        doShow(1);
    });
}

function doShow(page) {
    $.post("doShow.histories", {"page": page}, function (data) {
        if (data == "false") {
            alert("错误");
        }
        console.log(data);
        if(data=="[]"){
            $("#nohistory").css("display","inline");
        }else{
            $("#nohistory").css("display","none");
        }
        $("#historyBody").empty();
        $.each($.parseJSON(data), function (i, obj) {
            var hour = parseInt(obj.progress / 3600);
            var min = parseInt((obj.progress % 3600) / 60);
            var sec = (obj.progress % 3600) % 60;
            var movie_id = obj.movie_id;
            $("#historyBody").append(
                "<li class='historyLi'>" +
                "<div class='historyDiv'>" +
                "<div class='historyImg'>" +
                "<a target='_parent' href='gotoIntroduction.movie?movie_id=" + movie_id + "'><img src=" + obj.image_url + " onerror='imgError(this)'></a>" +
                "</div>" +
                "<div class='historyInfo'>" +
                "<div class='historyName'>" +
                "<span>【" + obj.type + "】</span>" +
                "<span>" + obj.name + "</span>" +
                "</div>" +
                "<div class='historyActor'>" +
                "<span>" + obj.actor + "</span>" +
                "</div>" +
                "<div class='historyTime'>" +
                "<span>" + "已观看时间" + hour + ":" + min + ":" + sec + "</span>" +
                "</div>" +
                "</div>" +
                "<div class='historyInput'>" +
                "<input type='checkbox' class='historyChoose' value='" + obj.history_id + "'>" +
                "</div>" +
                "</div>" +
                "</li>" + "<hr class='hr'/>"
            );
        }, "json");
    });
}

$(function () {

    /**
     * 点击全选按钮
     * 所有都选择
     */
    $(".chooseAll").click(function () {
        $(".historyChoose").prop("checked", true);
        $(".historyChoose").css("display", "inline");
    });


    /**
     * 点击反选按钮
     * 已经选择的变成取消
     * 没有选择的变成选择状态
     */
    $(".chooseReverse").click(function () {
        $(".historyChoose").each(function () {
            if ($(this).prop("checked") == true) {
                $(this).prop("checked", false);
                $(this).css("display", "none");
            } else {
                $(this).prop("checked", true);
                $(this).css("display", "inline");
            }
        });
    });


    /**
     * 删除选择的历史记录
     */
    $(".delete").click(function () {
        var id = "";
        $(".historyChoose").each(function () {
            if ($(this).prop("checked") == true) {
                id = id + $(this).val() + ",";
            }
        });
        if (id == "") {
            alert("请至少选择一个");
            return;
        }
        var temp = confirm("确定删除???");
        if (temp == false)
            return;
        $.post("doDelete.histories", {"id": id}, function (data) {
            if (data == "true")
                alert("删除成功");
            else
                alert("删除失败")
            getcount();
        });
    });


    /**
     * 清空历史记录
     */
    $(".empty").click(function () {
        var temp = confirm("确定清空浏览记录???");
        if (temp == false)
            return;
        $.post("doEmpty.histories", function (data) {
            if (data == "true")
                alert("浏览记录清空成功");
            else
                alert("浏览记录清空失败")
            getcount();
        });
    });


    /**
     * 复选框的显示
     */
    $("body").on("mouseover", ".historyDiv", function () {
        $(this).find(".historyChoose").css("display", "inline");
    });
    $("body").on("mouseout", ".historyDiv", function () {
        if ($(this).find(".historyChoose").prop("checked") != true) {
            $(this).find(".historyChoose").css("display", "none");
        }
    });

    /**
     * 图片加载失败
     */
    /*$("body").on("click","img",function () {
        console.log(111);
    });*/
});

function imgError(cell) {
    cell.src = "https://s1.ax1x.com/2020/09/21/wbQoTg.jpg"
    console.log(222);
}