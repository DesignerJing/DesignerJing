$(document).ready(function(){


	$('#openAccount').click(function(){

    	$('.add_con').hide();
    	$('.create_image').hide();
    	$('.create_user').show();
    	$('.random_phone').hide();

	});

	$('#addMsg').click(function(){

    	$('.add_con').hide();
    	$('.create_image').show();
    	$('.create_user').hide();
    	$('.random_phone').hide();

	});

	$('#addCon').click(function(){

    	$('.add_con').show();
    	$('.random_phone').show();
    	$('.create_image').hide();
    	$('.create_user').hide();
    	
	});


});



// 管理员创建用户
function createUser() {



	var obj = $('#create_user_form').serializeArray();

	if (!obj[0].value && !obj[1].value && !obj[2].value) {
		alert('请填写完整信息');
		return;
	}
	var user = new AV.User();
	user.setUsername(obj[0].value);
	user.setPassword(obj[2].value);
	user.set('phone', obj[1].value);
	user.set('slat', 'A');
	user.signUp().then(function (loginedUser) {
	// 注册成功，跳转到商品 list 页面
		alert('用户添加成功');
		$("input").not(':button, :submit, :reset, :hidden').val('');
	}, (function (error) {
	  alert(JSON.stringify(error));
	}));

	// var Contacts = AV.Object.extend('admin');
 //  	var contacts = new Contacts();
 //  	contacts.set('adminname', obj[0].value);
 //  	contacts.set('phone', obj[1].value);
 //  	contacts.save().then(function (contacts) {
 //    // 成功保存之后，执行其他逻辑.
 //    	alert('添加成功');
 //  	}, function (error) {
 //    // 异常处理
 //    	alert('添加失败');
 //  	});
	return;


	if (obj[0].value && obj[1].value && obj[2].value) {
		var openid = window.localStorage.openid;
		obj.push({"name":"openid","value":openid});
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "http://localhost/tp5/public/index/index/index/registerUser",
			async:false,
			data:obj
			}).done(function( msg ) {

				if (msg.code == 200) {
					alert('恭喜你注册成功');
					window.location.href = "manager.html";
				}else if(msg.code == 205){
					alert(msg.code + msg.msg);
					window.location.href = "./";
				}else{
					alert(msg.code + msg.msg);
				}	

			}).fail(function(a,b,c){  
			    alert('请求失败：'+b);  
			});  
	}else{
		alert('请填写完整信息');
	}


}

function check(){

	var openid = window.localStorage.openid;
	var query = new AV.Query('admin');
	query.equalTo('objectId', openid);
	query.find().then(function (results) {
		var res = results[0];
		if (res) {
			alert('没问题');
		}else{
			alert('非法登录, 请重新登录');
			window.location.href = "./";
			return;
		}
		
	}, function (error) {
		alert(error);
		window.location.href = "./";
		return;
	});
}


// 创建联系人
function createUserPhone(){

	
	var obj1 = $('#create_user_phone').serializeArray();
	if (!obj1[0].value && !obj1[1].value) {
		alert('请填写完整信息');
		return;
	}
	var Contacts = AV.Object.extend('contacts');
  	var contacts = new Contacts();
  	contacts.set('name', obj1[0].value);
  	contacts.set('phone', obj1[1].value);
  	contacts.save().then(function (contacts) {
    // 成功保存之后，执行其他逻辑.
		$("input").not(':button, :submit, :reset, :hidden').val('');
		alert('添加成功');
  	}, function (error) {
    // 异常处理
    	alert('添加失败');
  	});
	return;




	var obj = $('#create_user_phone').serializeArray();
	if (obj[0].value && obj[1].value) {
		var openid = window.localStorage.openid;
		obj.push({"name":"openid","value":openid});
	
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "http://localhost/tp5/public/index/admin/User/addContacts",
			async:false,
			data:obj
			}).done(function( msg ) {
				if (msg.code == 200) {
					alert(msg.msg);
					// window.location.href = "manager.html";
				}else if(msg.code == 205){
					alert(msg.code + msg.msg);
					window.location.href = "./";
				}else{
					
					alert(msg.code + msg.msg);
				}	

			}).fail(function(a,b,c){  
			    alert('请求失败：'+b);  
			});  

	}else{

		alert('请填写完整信息');
	}

}


// 管理员登录
function adminLogin() {

		var obj = $('#admin_login').serializeArray();
		var query = new AV.Query('admin');
		query.equalTo('adminname', obj[0].value);
		query.equalTo('password', obj[1].value);
		query.find().then(function (results) {
			var res = results[0];

			if (res) {
				window.localStorage.openid = res.id;
				window.location.href = "manager.html";
				alert('登录成功');
			}else{
				alert('用户名或密码不正确');
			}
		
			
		}, function (error) {
			alert(error);
		});

		return;

		var obj = $('#admin_login').serializeArray();
		if (obj[0].value && obj[1].value) {

			$.ajax({
			type: "POST",
			dataType: "json",
			url: "http://localhost/tp5/public/index/admin/user/adminlogin",
			async:false,
			data:obj
			}).done(function( msg ) {

				if (msg.code == 200) {
					// alert('恭喜你登录成功');
					// alert(msg.openid);
					if(window.localStorage){
						window.localStorage.openid = msg.openid;
						window.location.href = "manager.html";
					}else{
					 	alert('请更换浏览器');
					}

				}else{
					
					alert(msg.code + msg.msg);
					// $("#errormsg").html(msg.msg);
				}	

			}).fail(function(a,b,c){  
			    alert('请求失败：'+ b);  
			});  

		}else{
			alert('请填写完整信息');
		}

}

function uploadImage(){

	var Product = AV.Object.extend('CircleLine');
	var obj = $('#create_cricle').serializeArray();
	var timestamp = Date.parse(new Date());
	var file = $('#chooseImage')[0].files[0];


	var typeOption =$("#selecttype option:selected");  
	var type = typeOption.val();

	var subOption =$("#selectsubtype option:selected");  
	var subtype = subOption.val();
	// alert(type);   //拿到选中项的值
	// alert(subtype);   //拿到选中项的值
	// alert(options.text());   //拿到选中项的文本

	if (!obj[0].value && !file) {
		alert('请填写内容或上传图片');
		return;
	}

	if (file) {
		var name = file.name;
		var avFile = new AV.File(name, file);
		avFile.save().then(function(file) {
        // 文件保存成功
        console.log(file.url());
        var picUrl = file.url();

        var product = new Product();
		product.set('nickname', '朋友圈');
		product.set('insertTime', timestamp.toString());
		product.set('content', obj[0].value);
		product.set('picurlArray', [picUrl]);
		product.set('type', type);
		product.set('subtype', subtype);
		// product.set('image', avFile);
		product.save().then(function() {
		// window.location.href = "./../products-list/products-list.html";
			alert("发布成功");
			$("textarea").val('');
			$("input").not(':button, :submit, :reset, :hidden').val('');
		}, function(error) {
			alert(JSON.stringify(error));
		});



      	}, function(error) {
        // 异常处理
        console.error(error);
      	});
	}else{

		var product = new Product();
		product.set('nickname', '朋友圈');
		product.set('insertTime', timestamp.toString());
		product.set('content', obj[0].value);
		product.set('type', type);
		product.set('subtype', subtype);
		// product.set('image', avFile);
		product.save().then(function() {
			alert("发布成功");
			$("textarea").val('');
			$("input").not(':button, :submit, :reset, :hidden').val('');
		}, function(error) {
			alert(JSON.stringify(error));
		});

	}


}

function uploadImagetest(){

	var obj = $('#create_cricle').serializeArray();
	alert(obj);
	alert(obj[0].name);
	
	var formData = new FormData(); 
	var file = $('#chooseImage')[0].files[0];
	// formData.append('file', $('#chooseImage')[0].files[0]);  //添加图片信息的参数
	formData.append('file', file);  //添加图片信息的参数
	formData.append(obj[0].name,obj[0].value);  //添加其他参数

	$.ajax({
	url: '/material/uploadFile',
	type: 'POST',
	cache: false, //上传文件不需要缓存
	data: formData,
	processData: false, // 告诉jQuery不要去处理发送的数据
	contentType: false, // 告诉jQuery不要去设置Content-Type请求头
	}).done(function( msg ) {

		alert(msg);
	}).fail(function(a,b,c){  
	    alert('请求失败：'+ b);  
	});   


}

function createRandomPhone(){

	var obj = $('#create_random_phone').serializeArray();

	var prefix = obj[0].value;
	var num = obj[1].value;

	if(!(/^1[356789]\d{1,9}$/.test(prefix))){ 
        alert("手机前缀有误，请重填");  
        return false; 
    } 
	if (prefix.length < 3) {
		alert('前缀不能小于3位数');
	}else if (parseInt(num) > 100 || !obj[1].value) {
		alert('每次生成数量不超过100');
	}else{

		for (var i = 0; i < parseInt(num); i++) {
			// console.log(getName());
			// console.log(getPhone(prefix));
			// var name = getName();
			var phone = getPhone(prefix);
			var name = getName() + phone.substr(-4);
			// console.log(name);
			var Contacts = AV.Object.extend('contacts');
		  	var contacts = new Contacts();
		  	contacts.set('name', name);
		  	contacts.set('phone', phone);
		  	contacts.save().then(function (contacts) {
		    // 成功保存之后，执行其他逻辑.
		    	// console.log('保存成功');
		  	}, function (error) {
		    // 异常处理
		    	console.log(error);
		    	// alert('添加失败');
		  	});
		}

		$("input").not(':button, :submit, :reset, :hidden').val('');
		alert('添加成功');

	}

	

	

	
}


function getName(){
	var familyNames = new Array(
	"赵", "钱", "孙", "李", "周", "吴", "郑", "王", "冯", "陈", 
	"褚", "卫", "蒋", "沈", "韩", "杨", "朱", "秦", "尤", "许",
	"何", "吕", "施", "张", "孔", "曹", "严", "华", "金", "魏", 
	"陶", "姜", "戚", "谢", "邹", "喻", "柏", "水", "窦", "章",
	"云", "苏", "潘", "葛", "奚", "范", "彭", "郎", "鲁", "韦", 
	"昌", "马", "苗", "凤", "花", "方", "俞", "任", "袁", "柳",
	"酆", "鲍", "史", "唐", "费", "廉", "岑", "薛", "雷", "贺", 
	"倪", "汤", "滕", "殷", "罗", "毕", "郝", "邬", "安", "常",
	"乐", "于", "时", "傅", "皮", "卞", "齐", "康", "伍", "余", 
	"元", "卜", "顾", "孟", "平", "黄", "和", "穆", "萧", "尹"
	);
	var givenNames = new Array(
	"子璇", "淼", "国栋", "夫子", "瑞堂", "甜", "敏", "尚", "国贤", "贺祥", "晨涛", 
	"昊轩", "易轩", "益辰", "益帆", "益冉", "瑾春", "瑾昆", "春齐", "杨", "文昊", 
	"东东", "雄霖", "浩晨", "熙涵", "溶溶", "冰枫", "欣欣", "宜豪", "欣慧", "建政", 
	"美欣", "淑慧", "文轩", "文杰", "欣源", "忠林", "榕润", "欣汝", "慧嘉", "新建", 
	"建林", "亦菲", "林", "冰洁", "佳欣", "涵涵", "禹辰", "淳美", "泽惠", "伟洋", 
	"涵越", "润丽", "翔", "淑华", "晶莹", "凌晶", "苒溪", "雨涵", "嘉怡", "佳毅", 
	"子辰", "佳琪", "紫轩", "瑞辰", "昕蕊", "萌", "明远", "欣宜", "泽远", "欣怡", 
	"佳怡", "佳惠", "晨茜", "晨璐", "运昊", "汝鑫", "淑君", "晶滢", "润莎", "榕汕", 
	"佳钰", "佳玉", "晓庆", "一鸣", "语晨", "添池", "添昊", "雨泽", "雅晗", "雅涵", 
	"清妍", "诗悦", "嘉乐", "晨涵", "天赫", "玥傲", "佳昊", "天昊", "萌萌", "若萌"
	);

	var i = parseInt(Math.round(Math.random()*10) * Math.floor(Math.random()*10));
	var familyName = familyNames[i];
	var j = parseInt(Math.round(Math.random()*10) * Math.floor(Math.random()*10));
	var givenName = givenNames[i];
	var name = familyName + givenName;
	
	return name;

	
}

function getPhone(prefix){

	var lenth = 11 - prefix.length;	
	
	for (var k = 0; k < lenth; k++) {
		prefix += Math.floor(Math.random()*10)
	}
	return prefix;
}







