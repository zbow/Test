function ajaxFunction(url,fn)
   {
    var xmlHttp;
    try
    {
  // Firefox, Opera 8.0+, Safari
  xmlHttp = new XMLHttpRequest();    // 实例化对象
    }
    catch( e )
    {
     // Internet Explorer
     try
     {
      xmlHttp = new ActiveXObject( "Msxml2.XMLHTTP" );
     }
     catch ( e )
     {
      try
      {
       xmlHttp = new ActiveXObject( "Microsoft.XMLHTTP" );
      }
      catch( e )
      {
       alert("您的浏览器不支持AJAX！");
       return false;
      }
     }
    }
    xmlHttp.onreadystatechange = function()
    {
     if( xmlHttp.readyState == 4  && xmlHttp.status == 200 )
     {
		data=eval("("+xmlHttp.responseText+")")
       //data =  xmlHttp.responseText;
	   if(fn){
			fn();   
		}
     }
    }
    xmlHttp.open( "GET", url, true );
    xmlHttp.send( null );
   }

function getClass(tagname, className) { 
    if (document.getElementsByClassName) {   
        return document.getElementsByClassName(className);
    }
    else {   
        var tagname = document.getElementsByTagName(tagname);
        var tagnameAll = [];     
        for (var i = 0; i < tagname.length; i++) {     
            if (tagname[i].className == className) {     
                //tagnameAll[tagnameAll.length] = tagname[i];
                tagnameAll.push(tagname[i]);
            }
        }
        return tagnameAll;
    }
}

function commonHeight(){
    var leftList = getClass("div", "left_list");
     var rightList = getClass('div','right_list');
    // alert(leftList.length);
     for(var i=0; i<leftList.length; i++){
        rightList[i].style.height = leftList[i].offsetHeight + 'px';
     }
}

function showLoading(){
  document.getElementById('mark').style.display = 'block';
  document.getElementById('loading').style.display = 'block';
}

function hideLoading(){
  document.getElementById('mark').style.display = 'none';
  document.getElementById('loading').style.display = 'none';
}

function showError(){
  document.getElementById('mark').style.display = 'block';
  document.getElementById('error').style.display = 'block';
}

function hideError(){
  document.getElementById('mark').style.display = 'none';
  document.getElementById('error').style.display = 'non';
}

function setSessionPage(){
  sessionStorage.page = page;
}

function ajaxDom(){
  ajaxFunction(domain+'/focus/information_list?type='+news+'&page='+page,function(){
		//console.log(data.school[0].name);
		if(data.code == 20200){
			var el, li, i;
		el = document.getElementById('thelist');
		//el.removeChild();
		while(el.hasChildNodes()) //当div下还存在子节点时 循环继续
		{
			el.removeChild(el.firstChild);
		}
			successAjax();
			totalPage = data.data.totalPage-1;
		}else{
			errorAjax();
		}
	});
}

function successAjax(){
  hideError();
  hideLoading();
  var el,li,i,oList = '';
  el = document.getElementById('thelist');
  for(i=0; i<getJsonLength(data.data);i++){

        oList = '<a href='+ data.data[i].url + ' onclick="setSessionPage()"><li class="fixed">'+
           '<div class="left_list">'+
           '<img src='+ data.data[i].img +' />'+
           '</div>'+'<div class="right_list">'+
           '<p>'+ data.data[i].name +'</p>'+
           '<span>'+data.data[i].time+'</span>'+
           '</div></li></a>'
    
        el.innerHTML+=oList;  
  }
  commonHeight();
}


function errorAjax(){
  showError();
}

function getJsonLength(jsonData){
  var jsonLength = 0;
  for(var item in jsonData){
    jsonLength++;
  }
  return jsonLength-1;
}