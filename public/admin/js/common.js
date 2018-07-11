/******************可通用*******************/


/*
ajax有6个全局事件
ajaxStart()
ajaxSend()
ajaxSuccess()
ajaxError()
ajaxComplete()
ajaxStop()
*/ 
$(document).ajaxStart(function(){
    //ajax请求之前
    NProgress.start();
})

$(document).ajaxStop(function(){
    
    setTimeout(function(){
        //ajax请求之后
        NProgress.done();   
    }, 500);
})