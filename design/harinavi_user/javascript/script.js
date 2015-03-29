//-----------------------------------
//harinavi javascript
//-----------------------------------

/*---------------------------------
	なし
-----------------------------------*/

//各フォームの警告を、一度にすべて取り除く
function reset_form_alert(obj_class){
	$(obj_class).html("&nbsp;");
}
//【入力確認】
function  checking_entered(obj){
	//入力されていればtrue
	return (0 != obj.length);
}
//【エラーメッセージ】
function error_message(err_id,err_type){
	//err_typeは文字列を受け取る　その種類によってエラーメッセージを返す
	switch(err_type){
		//入力フォームすべてに利用
		case "未入力"					:		$(err_id).html("※未入力です");																break;	
		
		//ID登録ページでのエラー表示
		case "アドレスエラー"		:		$(err_id).html("※入力内容の形式は利用できません");					break;	
		case "パスワードエラー"		:		$(err_id).html("※文字数、または形式が不適切です");							break;	
		case "不一致"					:		$(err_id).html("※入力内容が一致しておりません");									break;		
		case	"形式エラー"				:		$(err_id).html("※利用できない文字が入力されました");								break;
		
		//口座振替登録ページでのエラー表示
		case "フリガナ入力ミス"		:		$(err_id).html("※全角カタカナ以外は使用できません");								break;
		case "名前入力ミス"			:		$(err_id).html("※使用できない文字が入力されました。");					break;
		case "郵便番号入力ミス"	:		$(err_id).html("※半角数字での入力をお願いします");					break;
		case "住所入力ミス"			:		$(err_id).html("※使用できない文字が入力されました。");					break;
		case "電話番号入力ミス"	:		$(err_id).html("※半角数字での入力をお願いします。");					break;
	}
}

/*-----------------------------------
形式チェック群
------------------------------------*/
//【furigana 形式チェック】
function checking_furigana(obj){
	//すべて[全角カタカナ]であるならtrue
	return /^[ァ-ンー]+$/.test(obj);
}
//【name 形式チェック】
function checking_name(obj){
	//[漢字][全角カタカナ][ひらがな]の組み合わせでのみ、true
	//改行　空白も弾く
	return /^[ぁ-んァ-ヶー一-龠]+$/.test(obj);
}
//【zip_code 形式チェック】
function checking_zip_code(obj){
	//半角数字以外は弾く
	return /^[0-9]+$/.test(obj);
}
//【address 形式チェック】
function checking_address(obj){
	//漢字半角数字アルファベットカタカナひらがなは通す
	return /^[ぁ-んァ-ヶー―一-龠０-９a-zA-Z\-\s]+$/.test(obj);
}
//【detailed_address 形式チェック】
function checking_detailed_address(obj){
	return /^[ぁ-んァ-ヶー一-龠0-9a-zA-Z\-\s]+$/.test(obj);
}
//【phone_number 形式チェック】
function checking_phone_number(obj){
	//半角数字以外弾く
	return /^[0-9]+$/.test(obj);
}
//【mailaddressの形式チェック】
function checking_mail_address(obj){
	//形式があっていればtrue
	var checker = /^(?:(?:(?:(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+)(?:\.(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+))*)|(?:"(?:\\[^\r\n]|[^\\"])*")))\@(?:(?:(?:(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+)(?:\.(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+))*)|(?:\[(?:\\\S|[\x21-\x5a\x5e-\x7e])*\])))$/;
	return checker.test(obj);	
}
//【passwordの形式チェック】
function checking_password(obj) {
	//文字数チェック　objが1文字-7文字かどうか
	if(8 > obj.length && 0 < obj.length){
		return false;
	}
	else{
		//正規表現チェック 正しければtrue　間違っていればfalse
		return /^[a-zA-Z0-9@]+$/.test(obj);
	}
}
//【入力情報の比較】
function conpare_input(obj1,obj2){
	return (obj1 == obj2);
}
//【入力内容の照合 all】
function checking_all(mail1,mail2,pass1,pass2,nameA){
	//各項目の形式確認　問題なければtrue
	var bool_mail 		= checking_mail_address(mail1);
	var bool_mail_con	= checking_mail_address(mail2);
	var bool_pass			= checking_password(pass1);
	var bool_pass_con	= checking_password(pass2);
	var bool_name_o_a	= checking_entered(nameA);
	
	checking_elements	= new Array(bool_mail, bool_mail_con, bool_pass, bool_pass_con, bool_name_o_a);
	//すべての形式が正しい
	if(bool_mail == bool_mail_con && bool_pass == bool_pass_con && bool_name_o_a == true && bool_name_o_a == bool_mail && bool_name_o_a == bool_pass){
		var mail_conpare = conpare_input(mail1,mail2);
		var pass_conpare = conpare_input(pass1,pass2);
		
		//比較して一致
		if(mail_conpare == true && pass_conpare == true){return -1;}
		//比較して不一致
		else{
			//優先度　mail＞pass
			if(mail_conpare == false){return 1;}
			else if(pass_conpare == false){return 3;}
		}
	}
	//一つでも形式が異なる
	else{
		//ページ上部からfalseを調査、falseが見つかった段階でreturn
		for(counter = 0; counter < 5; counter++){if(checking_elements[counter] == false){return counter;}}
	}
};
//【入力内容の照合 all】
function checking_all_form_account_transfer_entry(furigana_obj,name_obj,z_code,add,d_add,p_num){
	
	//各項目の形式確認　問題なければtrue
	var bool_furigana 				= checking_furigana(furigana_obj);
	var bool_name							= checking_name(name_obj);
	var bool_zip_code					= checking_zip_code(z_code);
	var bool_address					= checking_address(add);
	var bool_detailed_address	= checking_detailed_address(d_add);
	var bool_phone_number			= checking_phone_number(p_num);
	
	checking_elements	= new Array(bool_furigana, bool_name, bool_zip_code, bool_address, bool_detailed_address, bool_phone_number);
	
	//いずれかの値が間違っていた場合、この段階でリターン
	for(counter=0; counter<6; counter++){
		if(checking_elements[counter] == false){return counter;}
	}
	//すべての形式が正しい
	return -1;
};

//アイテムに入力値チェックをつける
function addOnBlurInputTextCheck(str_input_item,boolean_required,regexp_match){
	$(str_input_item).blur(function(){
		if (($(this).val() == "") && (boolean_required)){
			$(this).parents('.input_form_shape').find('.form_member_entry_elements_mistake').html("必須項目です");
		} else if (!$(this).val().match(regexp_match)){
			$(this).parents('.input_form_shape').find('.form_member_entry_elements_mistake').html("文字数、または形式が不適切です");
		} else {
			$(this).parents('.input_form_shape').find('.form_member_entry_elements_mistake').html("");
		}
	});
};
//.form_member_entry_elements_mistakeにエラーメッセージがあるかどうか判定する（入力値チェック自体は行わない）
function allCheckBlankMistakeMessage(){
	var return_value = true;
	$('.form_member_entry_elements_mistake').each(function() {
		if ($(this).html().length != 0 ){
			return_value = false;
		}
	});
	return return_value;
}

/*--------------------------------
	マイページ
----------------------------*/

//入力内容の確認(個別)
$(function(){
	//いずれかの入力フォームからカーソルが外れた時起動:type=text,textareaのどちらか対象
	$(".form_edit_mypage_elements").blur(function(){

		
		//var this_id = $(this).attr("id"); , var this_id_value = $("#"+this_id).val();
		//上記二つをまとめたもの
		//直前にフォーカスしていた入力フォームのIDを取得、中身を抜き出す
		var this_id_value = $( "#" + ($(this).attr("id")) ).val();
		
		//入力確認
		if(checking_entered(this_id_value)){
			//入力されたフォームを特定>入力フォーマットの確認
			switch($(this).attr("id")){
				//漢字　全角数字　全角カタカナ　ひらがな　記号許容
				case	'staff':
				case	'staff_role':
				case	'staff_introduction':
				case	'mypage_detailed_address':
				case	'access':
				case	'acupuncture_name':{
					if(checking_address(this_id_value)){
						alert("形式おけ―");
					}
					else{
						error_message('#acupuncture_mistake',"形式エラー");
					}
				};break;
				
				//半角数字のみ
				case	'mypage_phone_number':{
					checking_phone_number(this_id_value);
					//以降、処理
				};break;
				
				
				//ホームページURL
				case	'home_page_url':{
					
				};break;
			}
		}
		else{
			error_message("#" + ($(this).attr("id")) + "_mistake","未入力");
		}
	});
});

//------------------------------------------登録情報変更ページ用 Ver2---------------------------------------------------//
//入力チェック
$(function(){
	//鍼灸院名
	$('.form_check_registration_information input#ezcoa-634_name').blur(function(){
		if ($(this).val() == ""){
			$(this).parents('.input_form_shape').find('.form_member_entry_elements_mistake').html("必須項目です");
		} else if (255 < $(this).val().length ){
			$(this).parents('.input_form_shape').find('.form_member_entry_elements_mistake').html("文字数、または形式が不適切です");
		} else {
			$(this).parents('.input_form_shape').find('.form_member_entry_elements_mistake').html("");
		}
	});
	//メールアドレス
	addOnBlurInputTextCheck(
		'.form_check_registration_information input#ezcoa-635_user_account_email',
		true,
		/^(?:(?:(?:(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+)(?:\.(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+))*)|(?:"(?:\\[^\r\n]|[^\\"])*")))\@(?:(?:(?:(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+)(?:\.(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+))*)|(?:\[(?:\\\S|[\x21-\x5a\x5e-\x7e])*\])))$/
	);
	//確認用メールアドレス
	$('.form_check_registration_information input#ezcoa-635_user_account_email_confirm').blur(function(){
		if ($(this).val() == ""){
			$(this).parents('.input_form_shape').find('.form_member_entry_elements_mistake').html("必須項目です");
		} else if ($(this).val() != $('.form_check_registration_information input#ezcoa-635_user_account_email').val() ){
			$(this).parents('.input_form_shape').find('.form_member_entry_elements_mistake').html("内容が一致しません");
		} else {
			$(this).parents('.input_form_shape').find('.form_member_entry_elements_mistake').html("");
		}
	});
	//フォーム送信時全チェック
	$('form.form_check_registration_information').submit(function(){
		$('.form_check_registration_information input').blur();
		if (allCheckBlankMistakeMessage() == true){
			return true;
		} else {
			return false;
		}
	});
});

//画像フォーム 読み込み時
$(function(){
	 if ($('#editform .edit_mypage_input_section').size()==0){return 0;}//マイ鍼灸院の編集ページのみ実行するため
		//2
	if($("#section_attr_photo1 img").size() > 0 || $("#section_attr_photo2 img").size() > 0){$('#section_attr_photo2').show();	/*img 有*/}
	else{$('#section_attr_photo2').hide();	/*img 無*/ }
		//3
	if($("#section_attr_photo2 img").size() > 0 || $("#section_attr_photo3 img").size() > 0){$('#section_attr_photo3').show();	/*img 有*/}
	else{$('#section_attr_photo3').hide();	/*img 無*/ }
		//4
	if($("#section_attr_photo3 img").size() > 0 || $("#section_attr_photo4 img").size() > 0){$('#section_attr_photo4').show();	/*img 有*/}
	else{$('#section_attr_photo4').hide();	/*img 無*/ }
		//5
	if($("#section_attr_photo4 img").size() > 0 || $("#section_attr_photo5 img").size() > 0){$('#section_attr_photo5').show();	/*img 有*/}
	else{$('#section_attr_photo5').hide();	/*img 無*/ }
		//6
	if($("#section_attr_photo5 img").size() > 0 || $("#section_attr_photo6 img").size() > 0){$('#section_attr_photo6').show();	/*img 有*/}
	else{$('#section_attr_photo6').hide();	/*img 無*/ }
		//7
	if($("#section_attr_photo6 img").size() > 0 || $("#section_attr_photo7 img").size() > 0){$('#section_attr_photo7').show();	/*img 有*/}
	else{$('#section_attr_photo7').hide();	/*img 無*/ }
		//8
	if($("#section_attr_photo7 img").size() > 0 || $("#section_attr_photo8 img").size() > 0){$('#section_attr_photo8').show();	/*img 有*/}
	else{$('#section_attr_photo8').hide();	/*img 無*/ }
		//9
	if($("#section_attr_photo8 img").size() > 0 || $("#section_attr_photo9 img").size() > 0){$('#section_attr_photo9').show();	/*img 有*/}
	else{$('#section_attr_photo9').hide();	/*img 無*/ }
		//10
	if($("#section_attr_photo9 img").size() > 0 || $("#section_attr_photo10 img").size() > 0){$('#section_attr_photo10').show();	/*img 有*/}
	else{$('#section_attr_photo10').hide();	/*img 無*/ }
	
	if($("#section_attr_photo10 img").size() > 0 ){$('#section_attr_photo9').show();$('#section_attr_photo8').show();$('#section_attr_photo7').show();$('#section_attr_photo6').show();$('#section_attr_photo5').show();$('#section_attr_photo4').show();$('#section_attr_photo3').show();}
	if($("#section_attr_photo9 img").size() > 0 ){$('#section_attr_photo8').show();$('#section_attr_photo7').show();$('#section_attr_photo6').show();$('#section_attr_photo5').show();$('#section_attr_photo4').show();$('#section_attr_photo3').show();}	
	if($("#section_attr_photo8 img").size() > 0 ){$('#section_attr_photo7').show();$('#section_attr_photo6').show();$('#section_attr_photo5').show();$('#section_attr_photo4').show();$('#section_attr_photo3').show();}		
	if($("#section_attr_photo7 img").size() > 0 ){$('#section_attr_photo6').show();$('#section_attr_photo5').show();$('#section_attr_photo4').show();$('#section_attr_photo3').show();}
	if($("#section_attr_photo6 img").size() > 0 ){$('#section_attr_photo5').show();$('#section_attr_photo4').show();$('#section_attr_photo3').show();}			
	if($("#section_attr_photo5 img").size() > 0 ){$('#section_attr_photo4').show();$('#section_attr_photo3').show();}				
	if($("#section_attr_photo4 img").size() > 0 ){$('#section_attr_photo3').show();}
});
$(function(){
	//各ファイルフォームに対して、内容の変更が行われた場合の処理
	$('#section_attr_photo1').change(function(){$('#section_attr_photo2').show();});
	$('#section_attr_photo2').change(function(){$('#section_attr_photo3').show();});
	$('#section_attr_photo3').change(function(){$('#section_attr_photo4').show();});
	$('#section_attr_photo4').change(function(){$('#section_attr_photo5').show();});
	$('#section_attr_photo5').change(function(){$('#section_attr_photo6').show();});
	$('#section_attr_photo6').change(function(){$('#section_attr_photo7').show();});
	$('#section_attr_photo7').change(function(){$('#section_attr_photo8').show();});
	$('#section_attr_photo8').change(function(){$('#section_attr_photo9').show();});
	$('#section_attr_photo9').change(function(){$('#section_attr_photo10').show();});
});

//マイメニュー
function bool_section_attr_two_elements(title,body){
	if(title){bool_obj_1=true;}else{bool_obj_1=false;}
	if(body){bool_obj_2=true;}else{bool_obj_2=false;}
	if(bool_obj_1 == false && bool_obj_2 == false){return true;}
	return false;
}
function bool_section_attr_three_elements(title,body,image){
	if(title){bool_obj_1=true;}else{bool_obj_1=false;}
	if(body){bool_obj_2=true;}else{bool_obj_2=false;}
	
	if(image==0){bool_obj_3=false;}
	else{bool_obj_3=true;}
	//すべての項目がブランクならば、true
	if(bool_obj_1 == false && bool_obj_2 == false && bool_obj_3 == false ){return true;}
	return false;
}
$(function(){
  if ($('#editform .edit_mypage_input_section').size()==0){return 0;}//マイ鍼灸院の編集ページのみ実行するため
	//直前のファンクション使って、読み込み時に内容が入ってるかどうかを判断する
	bool1	=bool_section_attr_three_elements(	$("#section_attr_menu_1_title input").val(),	$("#section_attr_menu_1_body textarea").val(),	$("#section_attr_menu_1_image img").size()	);
	bool2	=bool_section_attr_three_elements(	$("#section_attr_menu_2_title input").val(),	$("#section_attr_menu_2_body textarea").val(),	$("#section_attr_menu_2_image img").size()	);
	bool3	=bool_section_attr_three_elements(	$("#section_attr_menu_3_title input").val(),	$("#section_attr_menu_3_body textarea").val(),	$("#section_attr_menu_3_image img").size()	);
	bool4	=bool_section_attr_three_elements(	$("#section_attr_menu_4_title input").val(),	$("#section_attr_menu_4_body textarea").val(),	$("#section_attr_menu_4_image img").size()	);
	bool5	=bool_section_attr_three_elements(	$("#section_attr_menu_5_title input").val(),	$("#section_attr_menu_5_body textarea").val(),	$("#section_attr_menu_5_image img").size()	);
	bool6	=bool_section_attr_two_elements(	$("#section_attr_menu_6_title input").val(),	$("#section_attr_menu_6_body textarea").val()	);
	bool7	=bool_section_attr_two_elements(	$("#section_attr_menu_7_title input").val(),	$("#section_attr_menu_7_body textarea").val()	);
	bool8	=bool_section_attr_two_elements(	$("#section_attr_menu_8_title input").val(),	$("#section_attr_menu_8_body textarea").val()	);
	bool9	=bool_section_attr_two_elements(	$("#section_attr_menu_9_title input").val(),	$("#section_attr_menu_9_body textarea").val()	);
	bool10	=bool_section_attr_two_elements($("#section_attr_menu_10_title input").val(),	$("#section_attr_menu_10_body textarea").val());

	if(bool10 && bool9){$('#section_attr_menu_10_title').hide();$('#section_attr_menu_10_body').hide();
		if(bool9 && bool8){$('#section_attr_menu_9_title').hide();	$('#section_attr_menu_9_body').hide();
			if(bool8 && bool7){$('#section_attr_menu_8_title').hide();	$('#section_attr_menu_8_body').hide();
				if(bool7 && bool6 ){$('#section_attr_menu_7_title').hide();	$('#section_attr_menu_7_body').hide();
					if(bool6 && bool5){$('#section_attr_menu_6_title').hide();	$('#section_attr_menu_6_body').hide();
						if(bool5 && bool4){$('#section_attr_menu_5_title').hide();	$('#section_attr_menu_5_body').hide();	$('#section_attr_menu_5_image').hide();
							if(bool4 && bool3){$('#section_attr_menu_4_title').hide();	$('#section_attr_menu_4_body').hide();	$('#section_attr_menu_4_image').hide();
								if(bool3 && bool2){$('#section_attr_menu_3_title').hide();	$('#section_attr_menu_3_body').hide();	$('#section_attr_menu_3_image').hide();
									if(bool2 && bool1){$('#section_attr_menu_2_title').hide();	$('#section_attr_menu_2_body').hide();	$('#section_attr_menu_2_image').hide();
	}	}	}	}	}	}	}	}	}
});
$(function(){
	//各ファイルフォームに対して、内容の変更が行われた場合の処理
	$('#section_attr_menu_1_title').change(function(){	$('#section_attr_menu_2_title').show();	$('#section_attr_menu_2_body').show();	$('#section_attr_menu_2_image').show();	});
	$('#section_attr_menu_1_body').change(function(){	$('#section_attr_menu_2_title').show();	$('#section_attr_menu_2_body').show();	$('#section_attr_menu_2_image').show();	});
	$('#section_attr_menu_1_image').change(function(){$('#section_attr_menu_2_title').show();	$('#section_attr_menu_2_body').show();	$('#section_attr_menu_2_image').show();	});
	
	$('#section_attr_menu_2_title').change(function(){	$('#section_attr_menu_3_title').show();	$('#section_attr_menu_3_body').show();	$('#section_attr_menu_3_image').show();	});
	$('#section_attr_menu_2_body').change(function(){	$('#section_attr_menu_3_title').show();	$('#section_attr_menu_3_body').show();	$('#section_attr_menu_3_image').show();	});
	$('#section_attr_menu_2_image').change(function(){$('#section_attr_menu_3_title').show();	$('#section_attr_menu_3_body').show();	$('#section_attr_menu_3_image').show();	});
	
	
	$('#section_attr_menu_3_title').change(function(){	$('#section_attr_menu_4_title').show();	$('#section_attr_menu_4_body').show();	$('#section_attr_menu_4_image').show();	});
	$('#section_attr_menu_3_body').change(function(){	$('#section_attr_menu_4_title').show();	$('#section_attr_menu_4_body').show();	$('#section_attr_menu_4_image').show();	});
	$('#section_attr_menu_3_image').change(function(){$('#section_attr_menu_4_title').show();	$('#section_attr_menu_4_body').show();	$('#section_attr_menu_4_image').show();	});

	$('#section_attr_menu_4_title').change(function(){	$('#section_attr_menu_5_title').show();	$('#section_attr_menu_5_body').show();	$('#section_attr_menu_5_image').show();	});
	$('#section_attr_menu_4_body').change(function(){	$('#section_attr_menu_5_title').show();	$('#section_attr_menu_5_body').show();	$('#section_attr_menu_5_image').show();	});
	$('#section_attr_menu_4_image').change(function(){$('#section_attr_menu_5_title').show();	$('#section_attr_menu_5_body').show();	$('#section_attr_menu_5_image').show();	});
	
	$('#section_attr_menu_5_title').change(function(){	$('#section_attr_menu_6_title').show();	$('#section_attr_menu_6_body').show();	});
	$('#section_attr_menu_5_body').change(function(){	$('#section_attr_menu_6_title').show();	$('#section_attr_menu_6_body').show(); });
	$('#section_attr_menu_5_image').change(function(){$('#section_attr_menu_6_title').show();	$('#section_attr_menu_6_body').show(); });

	$('#section_attr_menu_6_title').change(function(){	$('#section_attr_menu_7_title').show();	$('#section_attr_menu_7_body').show();	});
	$('#section_attr_menu_6_body').change(function(){	$('#section_attr_menu_7_title').show();	$('#section_attr_menu_7_body').show(); });
	$('#section_attr_menu_6_image').change(function(){$('#section_attr_menu_7_title').show();	$('#section_attr_menu_7_body').show(); });

	$('#section_attr_menu_7_title').change(function(){	$('#section_attr_menu_8_title').show();	$('#section_attr_menu_8_body').show();	});
	$('#section_attr_menu_7_body').change(function(){	$('#section_attr_menu_8_title').show();	$('#section_attr_menu_8_body').show(); });
	$('#section_attr_menu_7_image').change(function(){$('#section_attr_menu_8_title').show();	$('#section_attr_menu_8_body').show(); });

	$('#section_attr_menu_8_title').change(function(){	$('#section_attr_menu_9_title').show();	$('#section_attr_menu_9_body').show();	});
	$('#section_attr_menu_8_body').change(function(){	$('#section_attr_menu_9_title').show();	$('#section_attr_menu_9_body').show(); });
	$('#section_attr_menu_8_image').change(function(){$('#section_attr_menu_9_title').show();	$('#section_attr_menu_9_body').show(); });

	$('#section_attr_menu_9_title').change(function(){	$('#section_attr_menu_10_title').show();	$('#section_attr_menu_10_body').show();	});
	$('#section_attr_menu_9_body').change(function(){	$('#section_attr_menu_10_title').show();	$('#section_attr_menu_10_body').show(); });
	$('#section_attr_menu_9_image').change(function(){$('#section_attr_menu_10_title').show();	$('#section_attr_menu_10_body').show(); });
});

//従業員編集項目
function bool_section_attr_staff_three_elements(title,position,body){
	if(title){bool_obj_1=true;}//中身があればtrue
	if(position){bool_obj_2=true;}
	if(body){bool_obj_3=true;}

	if(bool_obj_1 == false && bool_obj_2 == false && bool_obj_3 == false){return true;}
	return false;
}
function bool_section_attr_staff_four_elements(title,position,body,image){
	if(title){bool_obj_1=true;}else{bool_obj_1=false;}
	if(position){bool_obj_2=true;}else{bool_obj_2=false;}
	if(body){bool_obj_3=true;}else{bool_obj_3=false;}
	if($(image).size()==0){bool_obj_4=false;}
	else{bool_obj_4=true;}
	
	if(bool_obj_1 == false && bool_obj_2 == false && bool_obj_3 == false && bool_obj_4 == false){return true;}
	return false;
}
$(function(){
  if ($('#editform .edit_mypage_input_section').size()==0){return 0;}//マイ鍼灸院の編集ページのみ実行するため
	//直前のファンクション使って、読み込み時に内容が入ってるかどうかを判断する
	bool_S1	=bool_section_attr_staff_four_elements(	$("#section_attr_staff_1_title input").val(),		$("#section_attr_staff_1_position input").val(),	$("#section_attr_staff_1_body textarea").val(),	$("section_attr_staff_1_image img").val());
	bool_S2	=bool_section_attr_staff_four_elements(	$("#section_attr_staff_2_title input").val(),		$("#section_attr_staff_2_position input").val(),	$("#section_attr_staff_2_body textarea").val(),	$("section_attr_staff_2_image img").val());
	bool_S3	=bool_section_attr_staff_four_elements(	$("#section_attr_staff_3_title input").val(),		$("#section_attr_staff_3_position input").val(),	$("#section_attr_staff_3_body textarea").val(),	$("section_attr_staff_3_image img").val());
	bool_S4	=bool_section_attr_staff_four_elements(	$("#section_attr_staff_4_title input").val(),		$("#section_attr_staff_4_position input").val(),	$("#section_attr_staff_4_body textarea").val(),	$("section_attr_staff_4_image img").val());
	bool_S5	=bool_section_attr_staff_four_elements(	$("#section_attr_staff_5_title input").val(),		$("#section_attr_staff_5_position input").val(),	$("#section_attr_staff_5_body textarea").val(),	$("section_attr_staff_5_image img").val());
	bool_S6	=bool_section_attr_staff_three_elements(	$("#section_attr_staff_6_title input").val(),		$("#section_attr_staff_6_position input").val(),	$("#section_attr_staff_6_body textarea").val());
	bool_S7	=bool_section_attr_staff_three_elements(	$("#section_attr_staff_7_title input").val(),		$("#section_attr_staff_7_position input").val(),	$("#section_attr_staff_7_body textarea").val());
	bool_S8	=bool_section_attr_staff_three_elements(	$("#section_attr_staff_8_title input").val(),		$("#section_attr_staff_8_position input").val(),	$("#section_attr_staff_8_body textarea").val());
	bool_S9	=bool_section_attr_staff_three_elements(	$("#section_attr_staff_9_title input").val(),		$("#section_attr_staff_9_position input").val(),	$("#section_attr_staff_9_body textarea").val());
	bool_S10	=bool_section_attr_staff_three_elements(	$("#section_attr_staff_10_title input").val(),	$("#section_attr_staff_10_position input").val(),	$("#section_attr_staff_10_body textarea").val());

	//S(n)+S(n-1)の両者とも値がない場合、S(n)を非表示にする　→少なくともどちらかに値が有れば表示する
	if(bool_S10 && bool_S9){$('#section_attr_staff_10_title').hide();	$('#section_attr_staff_10_position').hide();	$('#section_attr_staff_10_body').hide();
		if(bool_S9 && bool_S8){$('#section_attr_staff_9_title').hide();	$('#section_attr_staff_9_position').hide();	$('#section_attr_staff_9_body').hide();
			if(bool_S8&& bool_S7){$('#section_attr_staff_8_title').hide();	$('#section_attr_staff_8_position').hide();	$('#section_attr_staff_8_body').hide();
				if(bool_S7&& bool_S6){$('#section_attr_staff_7_title').hide();	$('#section_attr_staff_7_position').hide();	$('#section_attr_staff_7_body').hide();
					if(bool_S6&& bool_S5){$('#section_attr_staff_6_title').hide();	$('#section_attr_staff_6_position').hide();	$('#section_attr_staff_6_body').hide();
						if(bool_S5&& bool_S4){$('#section_attr_staff_5_title').hide();	$('#section_attr_staff_5_position').hide();	$('#section_attr_staff_5_body').hide();	$('#section_attr_staff_5_image').hide();
							if(bool_S4&& bool_S3){$('#section_attr_staff_4_title').hide();	$('#section_attr_staff_4_position').hide();	$('#section_attr_staff_4_body').hide();		$('#section_attr_staff_4_image').hide();
								if(bool_S3&& bool_S2){$('#section_attr_staff_3_title').hide();	$('#section_attr_staff_3_position').hide();	$('#section_attr_staff_3_body').hide();		$('#section_attr_staff_3_image').hide();
									if(bool_S2&& bool_S1){$('#section_attr_staff_2_title').hide();	$('#section_attr_staff_2_position').hide();	$('#section_attr_staff_2_body').hide();		$('#section_attr_staff_2_image').hide();
	}	}	}	}	}	}	}	}	}

});
$(function(){
	//各ファイルフォームに対して、内容の変更が行われた場合の処理
	$('#section_attr_staff_1_title').change(function(){	$('#section_attr_staff_2_title').show();	$('#section_attr_staff_2_position').show();	$('#section_attr_staff_2_body').show();	$('#section_attr_staff_2_image').show();	});
	$('#section_attr_staff_1_position').change(function(){	$('#section_attr_staff_2_title').show();	$('#section_attr_staff_2_position').show();	$('#section_attr_staff_2_body').show();	$('#section_attr_staff_2_image').show();	});
	$('#section_attr_staff_1_body').change(function(){	$('#section_attr_staff_2_title').show();	$('#section_attr_staff_2_position').show();	$('#section_attr_staff_2_body').show();	$('#section_attr_staff_2_image').show();	});
	$('#section_attr_staff_1_image').change(function(){$('#section_attr_staff_2_title').show();	$('#section_attr_staff_2_position').show();	$('#section_attr_staff_2_body').show();	$('#section_attr_staff_2_image').show();	});
	
	$('#section_attr_staff_2_title').change(function(){	$('#section_attr_staff_3_title').show();	$('#section_attr_staff_3_position').show();	$('#section_attr_staff_3_body').show();	$('#section_attr_staff_3_image').show();	});
	$('#section_attr_staff_2_position').change(function(){	$('#section_attr_staff_3_title').show();	$('#section_attr_staff_3_position').show();	$('#section_attr_staff_3_body').show();	$('#section_attr_staff_3_image').show();	});
	$('#section_attr_staff_2_body').change(function(){	$('#section_attr_staff_3_title').show();	$('#section_attr_staff_3_position').show();	$('#section_attr_staff_3_body').show();	$('#section_attr_staff_3_image').show();	});
	$('#section_attr_staff_2_image').change(function(){$('#section_attr_staff_3_title').show();	$('#section_attr_staff_3_position').show();	$('#section_attr_staff_3_body').show();	$('#section_attr_staff_3_image').show();	});
	
	$('#section_attr_staff_3_title').change(function(){	$('#section_attr_staff_4_title').show();	$('#section_attr_staff_4_position').show();	$('#section_attr_staff_4_body').show();	$('#section_attr_staff_4_image').show();	});
	$('#section_attr_staff_3_postion').change(function(){	$('#section_attr_staff_4_title').show();	$('#section_attr_staff_4_position').show();	$('#section_attr_staff_4_body').show();	$('#section_attr_staff_4_image').show();	});
	$('#section_attr_staff_3_body').change(function(){	$('#section_attr_staff_4_title').show();	$('#section_attr_staff_4_position').show();	$('#section_attr_staff_4_body').show();	$('#section_attr_staff_4_image').show();	});
	$('#section_attr_staff_3_image').change(function(){$('#section_attr_staff_4_title').show();	$('#section_attr_staff_4_position').show();	$('#section_attr_staff_4_body').show();	$('#section_attr_staff_4_image').show();	});

	$('#section_attr_staff_4_title').change(function(){	$('#section_attr_staff_5_title').show();	$('#section_attr_staff_5_position').show();	$('#section_attr_staff_5_body').show();	$('#section_attr_staff_5_image').show();	});
	$('#section_attr_staff_4_postion').change(function(){	$('#section_attr_staff_5_title').show();	$('#section_attr_staff_5_position').show();	$('#section_attr_staff_5_body').show();	$('#section_attr_staff_5_image').show();	});
	$('#section_attr_staff_4_body').change(function(){	$('#section_attr_staff_5_title').show();	$('#section_attr_staff_5_position').show();	$('#section_attr_staff_5_body').show();	$('#section_attr_staff_5_image').show();	});
	$('#section_attr_staff_4_image').change(function(){$('#section_attr_staff_5_title').show();	$('#section_attr_staff_5_position').show();	$('#section_attr_staff_5_body').show();	$('#section_attr_staff_5_image').show();	});
	
	$('#section_attr_staff_5_title').change(function(){	$('#section_attr_staff_6_title').show();	$('#section_attr_staff_6_position').show();	$('#section_attr_staff_6_body').show();	});
	$('#section_attr_staff_5_postion').change(function(){	$('#section_attr_staff_6_title').show();	$('#section_attr_staff_6_position').show();	$('#section_attr_staff_6_body').show();	});
	$('#section_attr_staff_5_body').change(function(){	$('#section_attr_staff_6_title').show();	$('#section_attr_staff_6_position').show();	$('#section_attr_staff_6_body').show(); });
	$('#section_attr_staff_5_image').change(function(){$('#section_attr_staff_6_title').show();	$('#section_attr_staff_6_position').show();	$('#section_attr_staff_6_body').show(); });

	$('#section_attr_staff_6_title').change(function(){	$('#section_attr_staff_7_title').show();	$('#section_attr_staff_7_position').show();	$('#section_attr_staff_7_body').show();	});
	$('#section_attr_staff_6_position').change(function(){	$('#section_attr_staff_7_title').show();	$('#section_attr_staff_7_position').show();	$('#section_attr_staff_7_body').show();	});
	$('#section_attr_staff_6_body').change(function(){	$('#section_attr_staff_7_title').show();	$('#section_attr_staff_7_position').show();	$('#section_attr_staff_7_body').show(); });
	$('#section_attr_staff_6_image').change(function(){$('#section_attr_staff_7_title').show();	$('#section_attr_staff_7_position').show();	$('#section_attr_staff_7_body').show(); });

	$('#section_attr_staff_7_title').change(function(){	$('#section_attr_staff_8_title').show();	$('#section_attr_staff_8_position').show();	$('#section_attr_staff_8_body').show();	});
	$('#section_attr_staff_7_position').change(function(){	$('#section_attr_staff_8_title').show();	$('#section_attr_staff_8_position').show();	$('#section_attr_staff_8_body').show();	});
	$('#section_attr_staff_7_body').change(function(){	$('#section_attr_staff_8_title').show();	$('#section_attr_staff_8_position').show();	$('#section_attr_staff_8_body').show(); });
	$('#section_attr_staff_7_image').change(function(){$('#section_attr_staff_8_title').show();	$('#section_attr_staff_8_position').show();	$('#section_attr_staff_8_body').show(); });

	$('#section_attr_staff_8_title').change(function(){	$('#section_attr_staff_9_title').show();	$('#section_attr_staff_9_position').show();	$('#section_attr_staff_9_body').show();	});
	$('#section_attr_staff_8_position').change(function(){	$('#section_attr_staff_9_title').show();	$('#section_attr_staff_9_position').show();	$('#section_attr_staff_9_body').show();	});
	$('#section_attr_staff_8_body').change(function(){	$('#section_attr_staff_9_title').show();	$('#section_attr_staff_9_position').show();	$('#section_attr_staff_9_body').show(); });
	$('#section_attr_staff_8_image').change(function(){$('#section_attr_staff_9_title').show();	$('#section_attr_staff_9_position').show();	$('#section_attr_staff_9_body').show(); });

	$('#section_attr_staff_9_title').change(function(){	$('#section_attr_staff_10_title').show();	$('#section_attr_staff_10_position').show();	$('#section_attr_staff_10_body').show();	});
	$('#section_attr_staff_9_position').change(function(){	$('#section_attr_staff_10_title').show();	$('#section_attr_staff_10_position').show();	$('#section_attr_staff_10_body').show();	});
	$('#section_attr_staff_9_body').change(function(){	$('#section_attr_staff_10_title').show();	$('#section_attr_staff_10_position').show();	$('#section_attr_staff_10_body').show(); });
	$('#section_attr_staff_9_image').change(function(){$('#section_attr_staff_10_title').show();$('#section_attr_staff_10_position').show();	$('#section_attr_staff_10_body').show(); });
});

$(function(){
  if ($('#editform .edit_mypage_input_section').size()==0){return 0;}//マイ鍼灸院の編集ページのみ実行するため
	$("input").keypress(function (e) {
		if(e.keyCode == 13){return false;}
	});
});


//------------------------------------------パスワード変更ページ用 Ver2---------------------------------------------------//
//入力チェック
$(function(){
	//旧パスワード
	addOnBlurInputTextCheck(
		'.form_check_password_change input#pass',
		true,
		/^.+$/
	);
	//新パスワード
	addOnBlurInputTextCheck(
		'.form_check_password_change input#newPassword',
		true,
		/^...+$/
	);
	//確認用新パスワード
	$('.form_check_password_change input#confirmPassword').blur(function(){
		if ($(this).val() == "" ){
			$(this).parents('.input_form_shape').find('.form_member_entry_elements_mistake').html("必須項目です");
		} else if ($(this).val() != $('.form_check_password_change input#newPassword').val() ){
			$(this).parents('.input_form_shape').find('.form_member_entry_elements_mistake').html("内容が一致しません");
		} else {
			$(this).parents('.input_form_shape').find('.form_member_entry_elements_mistake').html("");
		}
	});
	//フォーム送信時全チェック
	$('form.form_check_password_change').submit(function(){
		$('.form_check_password_change input').blur();
		if (allCheckBlankMistakeMessage() == true){
			return true;
		} else {
			return false;
		}
	});
});

//----------------------------------------ID登録用スクリプト Ver2-------------------------------------//
//入力チェック
$(function(){
	//鍼灸院名
	addOnBlurInputTextCheck(
		'.form_check_account_register input#ezcoa-634_name',
		true,
		/^.{1,255}$/
	);
	//ユーザー名
	addOnBlurInputTextCheck(
		'.form_check_account_register input#ezcoa-635_user_account_login',
		true,
		/^.+$/
	);
	//パスワード
	addOnBlurInputTextCheck(
		'.form_check_account_register input#ezcoa-635_user_account_password',
		true,
		/^...+$/
	);
	//確認用パスワード
	$('.form_check_account_register input#ezcoa-635_user_account_password_confirm').blur(function(){
		if ($(this).val() == "" ){
			$(this).parents('.input_form_shape').find('.form_member_entry_elements_mistake').html("必須項目です");
		} else if ($(this).val() != $('.form_check_account_register input#ezcoa-635_user_account_password').val() ){
			$(this).parents('.input_form_shape').find('.form_member_entry_elements_mistake').html("内容が一致しません");
		} else {
			$(this).parents('.input_form_shape').find('.form_member_entry_elements_mistake').html("");
		}
	});
	//メールアドレス
	addOnBlurInputTextCheck(
		'.form_check_account_register input#ezcoa-635_user_account_email',
		true,
		/^(?:(?:(?:(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+)(?:\.(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+))*)|(?:"(?:\\[^\r\n]|[^\\"])*")))\@(?:(?:(?:(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+)(?:\.(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+))*)|(?:\[(?:\\\S|[\x21-\x5a\x5e-\x7e])*\])))$/
	);
	//確認用メールアドレス
	$('.form_check_account_register input#ezcoa-635_user_account_email_confirm').blur(function(){
		if ($(this).val() == ""){
			$(this).parents('.input_form_shape').find('.form_member_entry_elements_mistake').html("必須項目です");
		} else if ($(this).val() != $('.form_check_account_register input#ezcoa-635_user_account_email').val() ){
			$(this).parents('.input_form_shape').find('.form_member_entry_elements_mistake').html("内容が一致しません");
		} else {
			$(this).parents('.input_form_shape').find('.form_member_entry_elements_mistake').html("");
		}
	});
	//フォーム送信時全チェック
	$('form.form_check_account_register').submit(function(){
		$('.form_check_account_register input').blur();
		if (allCheckBlankMistakeMessage() == true){
			return true;
		} else {
			return false;
		}
	});
});
//【確認して登録ボタンが押されたとき】
$(function(){
	$("#form_member_entry_confirmation_button a").click(function(){
		//全チェック
		$('.form_check_account_register input').blur();
		//すべてのフォームに、適切な内容が入力されている
		if(allCheckBlankMistakeMessage() == true){
			//システム側出力エラーメッセージを消す
			$('.form_check_account_register .message-warning').hide();
		
			//form_displayの内容を、入力内容に変更
			$('.form_check_account_register input[type="text"]').each(function(){
				$(this).after('<div class="form_display">' + $(this).val() + '</div>');
			}).hide();
			$('.form_check_account_register input[type="password"]').each(function(){
				$(this).after('<div class="form_display">非表示</div>');
			}).hide();
			$('.form_display').show();
			
			$(".article_container .desc_message").html("ご登録情報を確認してください。");
			$(".article_container .form_message").html('<a href="http://www.harinavi.com/kiyaku" target="_blank">はりなび利用規約</a>をお読みいただき、同意される方のみ「同意して送信」ボタンを押してください。<br />本登録用URLを、登録されたメールアドレスに送信します。');

			//同意して確認するボタンを非表示 修正ボタン、登録ボタンを表示
			$("#form_member_entry_confirmation_button").hide();
			$(".correction_or_entry").show();	
		}
	});
});
//修正ボタンが押されたとき
$(function(){
	$("#form_member_entry_correction_a").click(function(){

		$(".article_container .desc_message").html("はりなびID登録で、ご自身の店舗をアピールしましょう！");
		$(".article_container .form_message").html('<a href="http://www.harinavi.com/kiyaku" target="_blank">はりなび利用規約</a>をお読みいただき、同意される方のみ「同意して確認」ボタンを押してください。');

		//form_member_entry_elementsを表示 form_displayを非表示
		$('.form_check_account_register input[type="text"]').show();
		$('.form_check_account_register input[type="password"]').show();
		$(".form_display").remove();
		
		//二つの選択肢を隠して、再度確認ボタンを表示
		$("#form_member_entry_confirmation_button").show();
		$(".correction_or_entry").hide();
	});
});
//登録ボタンが押されたとき
$(function(){
	$("#form_member_entry_submit_a").click(function(){
		//システム用の送信ボタンを作り、押す
		$('form.form_check_account_register').append(form_publish_button_html).find('input[type="submit"]#PublishButton').hide().click();
	});
});
//----------------------------------------プレミアム登録（口座振替）申し込みスクリプト Ver2-------------------------------------//
//入力チェック
$(function(){
	//氏名
	addOnBlurInputTextCheck(
		'.form_check_premium_bankaccount input[name="ContentObjectAttribute_ezstring_data_text_86194"]',
		true,
		/^[ぁ-んァ-ヶー一-龠]+$/
	);
	//フリガナ
	addOnBlurInputTextCheck(
		'.form_check_premium_bankaccount input[name="ContentObjectAttribute_ezstring_data_text_86195"]',
		true,
		/^[ァ-ンー]+$/
	);
	//郵便番号
	addOnBlurInputTextCheck(
		'.form_check_premium_bankaccount input[name="ContentObjectAttribute_ezstring_data_text_86196"]',
		true,
		/^[0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/
	);
	//都道府県・市町村区・町名
	addOnBlurInputTextCheck(
		'.form_check_premium_bankaccount input[name="ContentObjectAttribute_ezstring_data_text_86197"]',
		true,
		/^[^-0-9]+$/
	);
	//地名・番地・建物名
	addOnBlurInputTextCheck(
		'.form_check_premium_bankaccount input[name="ContentObjectAttribute_ezstring_data_text_86198"]',
		true,
		/^[^-0-9]+$/
	);
	//電話番号（固定または携帯電話）
	addOnBlurInputTextCheck(
		'.form_check_premium_bankaccount input[name="ContentObjectAttribute_ezstring_data_text_86199"]',
		true,
		/^[0-9]+$/
	);
	//フォーム送信時全チェック
	$('form.form_check_premium_bankaccount').submit(function(){
		$('.form_check_premium_bankaccount input').blur();
		if (allCheckBlankMistakeMessage() == true){
			return true;
		} else {
			return false;
		}
	});
});
//同意して確認ボタンが押されたとき
$(function(){
	$("#form_premium_bankaccount_confirmation_button a").click(function(){
		//全チェック
		$('.form_check_premium_bankaccount input').blur();
		//すべてのフォームに、適切な内容が入力されている
		if(allCheckBlankMistakeMessage() == true){

			$(".article_container .form_message").html('<a href="http://www.harinavi.com/kiyaku" target="_blank">はりなび利用規約</a>をお読みいただき、同意される方のみ「同意して送信」ボタンを押してください。');		

			//form_displayの内容を、入力内容に変更
			$('.form_check_premium_bankaccount input[type="text"]').each(function(){
				$(this).after('<div class="form_display">' + $(this).val() + '</div>');
			}).hide();
			$('.form_display').show();

			//同意して確認ボタンを非表示 修正ボタン、登録ボタンを表示
			$("#form_premium_bankaccount_confirmation_button").hide();
			$(".correction_or_entry").show();	
		}
	});
});
//修正ボタンが押されたとき
$(function(){
	$("#form_premium_bankaccount_correction").click(function(){

		$(".article_container .form_message").html('<a href="http://www.harinavi.com/kiyaku" target="_blank">はりなび利用規約</a>をお読みいただき、同意される方のみ「同意して確認」ボタンを押してください。');

		//form_member_entry_elementsを表示 form_displayを非表示
		$('.form_check_premium_bankaccount input[type="text"]').show();
		$(".form_display").remove();
		
		//二つの選択肢を隠して、再度確認ボタンを表示
		$("#form_premium_bankaccount_confirmation_button").show();
		$(".correction_or_entry").hide();
	});
});
//登録ボタンが押されたとき
$(function(){
	$("#form_premium_bankaccount_submit").click(function(){
		//システム用の送信ボタンを作り、押す
		$('form.form_check_premium_bankaccount').append(form_publish_button_html).find('input[type="submit"]#SubmitButton').hide().click();
	});
});

//----------------------------------------鍼灸院編集スクリプト Ver2-------------------------------------//
$(function(){
	$store_city_dropdown_list = $('#section_attr_city select').clone();//元の一覧をコピー
	$('#ezcoa-495_prefecture').bind('change', function(){
		var $pref_id = $(this).children(':selected').attr('data-node_id');
		$('#section_attr_city select').children().remove();
		$store_city_dropdown_list.find('option').each( function(){
			if (
				($(this).attr('data-parent_node_id') == $pref_id) ||
				($(this).attr('data-parent_node_id') == "0")
			){
				$('#section_attr_city select').append($('<div>').append($(this).clone()).html());
			}
		})
	});
	$('#ezcoa-495_prefecture').change();
	$store_city_dropdown_list.children(':selected').attr("selected",false);
});
