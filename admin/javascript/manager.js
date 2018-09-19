$(document).ready(function(){


	$('#openAccount').click(function(){

    	$(".create_user").addClass("active").siblings().removeClass('active');

	});

	$('#addMsg').click(function(){

		$(".create_image").addClass("active").siblings().removeClass('active');

	});

	$('#addCon').click(function(){


		$(".addContact").addClass("active").siblings().removeClass('active');
    	
	});

	$('#addKnow').click(function(){

		$(".addKnowledge").addClass("active").siblings().removeClass('active');
    	
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
	}else if (parseInt(num) > 10000 || !obj[1].value) {
		alert('每次生成数量不超过10000');
	}else{

		var arrayObj = new Array();
		for (var i = 0; i < parseInt(num); i++) {
			// console.log(getName());
			// console.log(getPhone(prefix));
			
			var phone = getPhone(prefix);
			var name = '客户' + phone;
			// var name = getName() + phone.substr(-4);
			// console.log(name);
			var Contacts = AV.Object.extend('contacts');
		  	var contacts = new Contacts();
		  	contacts.set('name', name);
		  	contacts.set('phone', phone);

		  	arrayObj.push(contacts);
		  	// console.log(arrayObj);
		  	// contacts.save().then(function (contacts) {
		   //  // 成功保存之后，执行其他逻辑.
		   //  	console.log('保存成功');
		  	// }, function (error) {
		   //  // 异常处理
		   //  	console.log(error);
		   //  	// alert('添加失败');
		  	// });
		}
		AV.Object.saveAll(arrayObj).then(function (objects) {
			    // 成功
			alert('添加成功');
		}, function (error) {
			// 异常处理
			alert('生成失败');
			console.log(error);
		});
		$("input").not(':button, :submit, :reset, :hidden').val('');
		

	}

	
}

function createKonwledge(){

	var obj = $('#create_Konwledge').serializeArray();

	var Knowledge = AV.Object.extend('knowledge');
	var title = obj[0].value;
	var text = obj[1].value;
	var state =$("#selectstate option:selected");  
	var statetype = state.val();

	var knowledge = new Knowledge();
	knowledge.set('title', title);
	knowledge.set('content', text);
	knowledge.set('state', statetype);
	knowledge.save().then(function() {
		alert("发布成功");
		$("textarea").val('');
		$("input").not(':button, :submit, :reset, :hidden').val('');
	}, function(error) {
		alert(JSON.stringify(error));
	});


}


function getPhone(prefix){

	var lenth = 11 - prefix.length;	
	
	for (var k = 0; k < lenth; k++) {
		prefix += Math.floor(Math.random()*10)
	}
	return prefix;
}







