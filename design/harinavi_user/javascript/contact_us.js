/* お問い合わせフォームの確認画面、入力チェックのスクリプト */

//START 画面ロード時のファンクション
$(function(){
    $("input[name='backbutton']").hide();   //「戻る」ボタンを非表示にする
    $("input[class='requestformbutton']").hide();  //「フォームの送信」ボタンを非表示にする
    $("p[class='confirm_message']").hide();  //送信確認メッセージを非表示にする
    $("p[class='error_message']").hide();  //エラーメッセージを非表示にする

//END 画面ロード時のファンクション

//START 「確認」ボタンを押した時のファンクション
    $("input[name='confirmbutton']:button").click(function(){
        $("p[class='error_message']").hide();  //エラーメッセージを非表示にする
        $(".error").remove();  //error要素を削除する

        //初期化
        var
        target = $(".require1 input");  //テキストボックスのrequire要素を変数targetに格納する
        target.css("border","1px solid #A5ACB2");  //cssを適用し

        target = $(".require2 input");  //テキストボックスのrequire要素を変数targetに格納する
        target.css("border","1px solid #A5ACB2");  //cssを適用し

        target = $(".require3 input");  //テキストボックスのrequire要素を変数targetに格納する
        target.css("border","1px solid #A5ACB2");  //cssを適用し

        target = $(".require4 input");  //テキストボックスのrequire要素を変数targetに格納する
        target.css("border","1px solid #A5ACB2");  //cssを適用し

        target = $(".require5 input");  //テキストボックスのrequire要素を変数targetに格納する
        target.css("border","1px solid #A5ACB2");  //cssを適用し

        target = $(".require6 input");  //テキストボックスのrequire要素を変数targetに格納する
        target.css("border","1px solid #A5ACB2");  //cssを適用し

        target = $(".require_email1 input");  //テキストボックスのrequire要素を変数targetに格納する
        target.css("border","1px solid #A5ACB2");  //cssを適用し
        
        target = $(".require_email1_check input");  //テキストボックスのrequire要素を変数targetに格納する
        target.css("border","1px solid #A5ACB2");  //cssを適用し

        target = $(".require_textarea1 textarea");  //テキストエリアのrequire要素を変数targetに格納する
        target.css("border","1px solid #A5ACB2"); //cssを適用し

        target = $(".require_textarea2 textarea");  //テキストエリアのrequire要素を変数targetに格納する
        target.css("border","1px solid #A5ACB2"); //cssを適用し


        // 初期化END
        
        var check_flg = true;  //変数check_flgをtrueにする

        var
        target = $(".require1 input");  //テキストボックスのrequire要素を変数targetに格納する
        if( target.val()==""){  //変数targetに値が入っていなかったら
        target.css("border","1px solid red").before("<span class='error'>必須項目を入力してください</span>");  //cssを適用し
        check_flg = false;  //変数check_flgをfalseにする
        }
        target = $(".require2 input");  //テキストボックスのrequire要素を変数targetに格納する
        if( target.val()==""){  //変数targetに値が入っていなかったら
        target.css("border","1px solid red").before("<span class='error'>必須項目を入力してください</span>");  //cssを適用し
        check_flg = false;  //変数check_flgをfalseにする
        }
        target = $(".require3 input");  //テキストボックスのrequire要素を変数targetに格納する
        if( target.val()==""){  //変数targetに値が入っていなかったら
        target.css("border","1px solid red").before("<span class='error'>必須項目を入力してください</span>");  //cssを適用し
        check_flg = false;  //変数check_flgをfalseにする
        }
        target = $(".require4 input");  //テキストボックスのrequire要素を変数targetに格納する
        if( target.val()==""){  //変数targetに値が入っていなかったら
        target.css("border","1px solid red").before("<span class='error'>必須項目を入力してください</span>");  //cssを適用し
        check_flg = false;  //変数check_flgをfalseにする
        }
        target = $(".require5 input");  //テキストボックスのrequire要素を変数targetに格納する
        if( target.val()==""){  //変数targetに値が入っていなかったら
        target.css("border","1px solid red").before("<span class='error'>必須項目を入力してください</span>");  //cssを適用し
        check_flg = false;  //変数check_flgをfalseにする
        }
        target = $(".require6 input");  //テキストボックスのrequire要素を変数targetに格納する
        if( target.val()==""){  //変数targetに値が入っていなかったら
        target.css("border","1px solid red").before("<span class='error'>必須項目を入力してください</span>");  //cssを適用し
        check_flg = false;  //変数check_flgをfalseにする
        }

        target = $(".require_email1 input");  //テキストボックスのrequire要素を変数targetに格納する
        if( target.val()==""){  //変数targetに値が入っていなかったら
        target.css("border","1px solid red").before("<span class='error'>必須項目を入力してください</span>");  //cssを適用し
        check_flg = false;  //変数check_flgをfalseにする
        } else if (
		!target.val().match(/^(?:(?:(?:(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+)(?:\.(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+))*)|(?:"(?:\\[^\r\n]|[^\\"])*")))\@(?:(?:(?:(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+)(?:\.(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+))*)|(?:\[(?:\\\S|[\x21-\x5a\x5e-\x7e])*\])))$/)
	){ //変数targetがメールアドレスでなければ
        target.css("border","1px solid red").before("<span class='error'>形式が不適切です。</span>");  //cssを適用し
        check_flg = false;  //変数check_flgをfalseにする
	}
        
        target = $(".require_email1_check input");  //テキストボックスのrequire要素を変数targetに格納する
        target_src = $(".require_email1 input");  //比較元の要素
        if( ( target.val()=="" ) || ( target.val()!=target_src.val() ) ){
        target.css("border","1px solid red").before("<span class='error'>eメールが一致しません。</span>");  //cssを適用し
        check_flg = false;  //変数check_flgをfalseにする
        }

        target = $(".require_textarea1 textarea");  //テキストエリアのrequire要素を変数targetに格納する
        if( target.val()==""){  //変数targetに値が入っていなかったら
        target.css("border","1px solid red").before("<span class='error'>必須項目を入力してください</span>");  //cssを適用し
        check_flg = false;  //変数check_flgをfalseにする
        }
        target = $(".require_textarea2 textarea");  //テキストエリアのrequire要素を変数targetに格納する
        if( target.val()==""){  //変数targetに値が入っていなかったら
        target.css("border","1px solid red").before("<span class='error'>必須項目を入力してください</span>");  //cssを適用し
        check_flg = false;  //変数check_flgをfalseにする
        }

        if(!check_flg){
            $(".error").css("color","red");
        $("p[class='error_message']").show();  //エラーメッセージを表示にする
            return false;
        }
        $("input[name='confirmbutton']").hide();  //「確認」ボタンを非表示にする
        $("input[name='backbutton']").show();  //「戻る」ボタンを表示にする
        $(":submit").show();  //「フォームの送信」ボタンを表示にする
        $("p[class='confirm_message']").show();  //送信確認メッセージを表示にする
        $("input:not(:button,:submit)").css("border","1px solid #AEAEAE");
        $(".require textarea").css("border","1px solid #AEAEAE");
        $("input:not(:button,:submit)").attr("disabled","disabled");  //テキストボックスを操作不可にする
        $("textarea").attr("disabled","disabled");  //テキストエリアを操作不可にする
        $("select").attr("disabled","disabled");  //選択リストを操作不可にする
    });
//END 「確認」ボタンを押した時のファンクション

//START 「戻る」ボタンを押した時のファンクション
    $("input[name='backbutton']:button").click(function(){
        
        $("input[name='confirmbutton']").show();  //「確認」ボタンを表示にする
        $("input[name='backbutton']").hide();  //「戻る」ボタンを非表示にする
        $("input[class='requestformbutton']").hide();  //「フォームの送信」ボタンを非表示にする
        $("p[class='confirm_message']").hide();  //送信確認メッセージを非表示にする
        $("p[class='error_message']").hide();  //エラーメッセージを非表示にする
        $("input").removeAttr("disabled");  //テキストボックスを操作可能にする
        $("textarea").removeAttr("disabled");  //テキストエリアを操作可能にする
        $("select").removeAttr("disabled");  //選択リストを操作可能にする

    });
//END 「戻る」ボタンを押した時のファンクション

//START 「フォームの送信」ボタンを押した時のファンクション
    $(":submit").click(function(){
        $("p[class='error_message']").hide();  //エラーメッセージを非表示にする
        $("input").removeAttr("disabled");  //テキストボックスを操作可能にする
        $("select").removeAttr("disabled");  //選択リストを操作可能にする
        $("textarea").removeAttr("disabled");  //テキストエリアを選択可能にする
    });
//END 「フォームの送信」ボタンを押した時のファンクション
});
