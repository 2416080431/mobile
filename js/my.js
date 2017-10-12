$(function(){
	
	$(".my-head-right h4").text(localStorage.username);
	$(".my-head-left img").attr("src",localStorage.img);
	
	/////////////////////////退出
	$("#logout").on("touchstart",function(){
		localStorage.clear();
		location.href = "login.html";
	})
})