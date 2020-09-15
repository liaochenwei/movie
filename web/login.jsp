<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Insert title here</title>
    <link rel="stylesheet" href="/static/css/bootstrap.min.css">
    <link rel="stylesheet" href="/static/css/me.css">
    <style>
        .row-center{
            text-align:center;
            margin-top: 120px;
        }
        .col-center {
            display:inline-block;
            float:none;
            text-align:left;
            width: 400px;
        }
     /*   body{
            background-image: url("/static/img/登录背景.jpg");
            background-size: 100%;
        }*/
    </style>
</head>
<body>
<div class="container">
    <div  class="row  row-center" >
        <div class="col-center">
            <form action="login.do" method="post">
                <div style=" padding: 28px;border-radius: 8px;border-color: #c059a3;border-width: 2px  ">
                    <div style="height: 80px;">
                        <h3 style="text-align: center;color: #000000; font-size: 35px;">会员登录</h3>
                    </div>
                    <div  class="form-group">
                        <input name="name" class="form-control " placeholder="请输入您的用户名">
                    </div>

                    <div class="form-group">
                        <input name="password" type="password" class="form-control" placeholder="请输入您的密码">
                    </div>
                    <div class="form-group checked-1">
                       <input type="text" name="code" class="form-control" placeholder="验证码"/>
                        <img class="checked checked-1" src="${pageContext.request.contextPath}/code"  onclick="changecode()"><div style="margin-top: 30px;float: right"><a style="margin-top: 20px;margin-left: 0px" href="javascript:changecode()"  >看不清换一张</a></div><br>
                    </div>
                        <span style="color: red">${msg}</span>
                    <div class="submit " style="margin-top: 15px">
                        <button style="border-radius:10px; background-color: #75a0ff;color: white" onclick="login()" class="btn btn-lg  btn-login btn-block">登录</button>
                    </div>
                    <div class="form-group">
                        <a class="a_reg" href="register.jsp">还未拥有账号？注册</a>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
</div>


<script src="static/js/bootstrap.min.js"></script>
<script src="static/js/jquery-3.2.1.js"></script>
<script type="text/javascript">
    function changecode(){
        //得到图片元素
        var img = document.getElementsByTagName("img")[0];
        img.src = "${pageContext.request.contextPath}/code?time="+new Date().getTime();//最新
    }
</script>
</body>
</html>