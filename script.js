$(function () {
  if (window.matchMedia('(max-width: 768px)').matches) {
    //ここにスマホ・タブレットの時のjs
    setTimeout(function () {
      window.scrollTo(0, 1);
    }, 10);

    ////スクロール時の関数まとめ
    var func_fade = function () {
      $('section').each(function () {
        $(this).addClass('fade-in');
      });
    }
    //グローバルナビゲーション アニメ
    var beforePos = 0;//スクロールの値の比較用の設定

    //スクロール途中でヘッダーが消え、上にスクロールすると復活する設定を関数にまとめる
    function ScrollAnime() {
      var elemTop = $('#vanish-top').offset().top;//消える範囲始まり
      //var elemBottum = $('#vanish-bottum').offset().top;//#area-2の位置まできたら
      var scroll = $(window).scrollTop();
      //ヘッダーの出し入れをする
      if (scroll == beforePos) {
        //IE11対策で処理を入れない
        /*} else if (scroll < elemTop) {
          //ヘッダーが上に消える
          $('#nav-updw-anim').removeClass('DownMove');//#headerにDownMoveというクラス名を除き
          $('#nav-updw-anim').addClass('UpMove');//#headerにUpMoveのクラス名を追加*/
      } else if (scroll < elemTop || 0 < beforePos - scroll) {
        //ヘッダーが上から出現する
        $('#nav-updw-anim').removeClass('UpMove');	//#headerにUpMoveというクラス名を除き
        $('#nav-updw-anim').addClass('DownMove');//#headerにDownMoveのクラス名を追加
      } else {
        //ヘッダーが上に消える
        $('#nav-updw-anim').removeClass('DownMove');//#headerにDownMoveというクラス名を除き
        $('#nav-updw-anim').addClass('UpMove');//#headerにUpMoveのクラス名を追加
      }

      beforePos = scroll;//現在のスクロール値を比較用のbeforePosに格納
    }
    //グローバルナビゲーション アニメ ここまで

    //テキスト→背景色が伸びる
    // 動きのきっかけの起点となるアニメーションの名前を定義
    function BgFadeAnime() {
      // 背景色が伸びて出現（左から右）
      $('.bgLRextendTrigger').each(function () { //bgLRextendTriggerというクラス名が
        var elemPos = $(this).offset().top - 50;//要素より、50px上の
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        if (scroll >= elemPos - windowHeight) {
          $(this).addClass('bgLRextend');// 画面内に入ったらbgLRextendというクラス名を追記
        } 
      });

      // 文字列を囲う子要素
      $('.bgappearTrigger').each(function () { //bgappearTriggerというクラス名が
        var elemPos = $(this).offset().top - 50;//要素より、50px上の
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        if (scroll >= elemPos - windowHeight) {
          $(this).addClass('bgappear');// 画面内に入ったらbgappearというクラス名を追記
        } 
      });
    }
    //テキスト→背景色が伸びる→ここまで

    //TOPに戻るボタンの表示・非表示を切り替える関数
    function PageTopAnime() {
      var targetPos = $('#top-list').offset().top; //表示開始の位置を取得
      var scroll = $(window).scrollTop(); //スクロール値を取得
      if (scroll >= targetPos) {//200pxスクロールしたら
        $('#page-top').removeClass('RightMove');		// DownMoveというクラス名を除去して
        $('#page-top').addClass('LeftMove');			// UpMoveというクラス名を追加して出現
      } else {//それ以外は
        if ($('#page-top').hasClass('LeftMove')) {//UpMoveというクラス名が既に付与されていたら
          $('#page-top').removeClass('LeftMove');	//  UpMoveというクラス名を除去し
          $('#page-top').addClass('RightMove');	// DownMoveというクラス名を追加して非表示
        }
      }

      var wH = window.innerHeight; //画面の高さを取得
      var footerPos = $('#footer').offset().top; //footerの位置を取得
      if (scroll + wH >= (footerPos + 10)) {
        var pos = (scroll + wH) - footerPos + 10 //スクロールの値＋画面の高さからfooterの位置＋10pxを引いた場所を取得し
        $('#page-top').css('bottom', pos);	//#page-topに上記の値をCSSのbottomに直接指定してフッター手前で止まるようにする
      } else {//それ以外は
        if ($('#page-top').hasClass('LeftMove')) {//UpMoveというクラス名がついていたら
          $('#page-top').css('bottom', '0px');// 下から10pxの位置にページリンクを指定
        }
      }
    }


    //以下、読み込み後の処理

    func_fade();
    BgFadeAnime();

    //スクロール時の処理まとめ
    $(window).scroll(function () {
      ScrollAnime();//スクロール途中でヘッダーが消え、上にスクロールすると復活する関数を呼ぶ
      BgFadeAnime();/* アニメーション用の関数を呼ぶ*/
      func_fade();// スクロールしたときにセクションをフェードインさせる
      PageTopAnime();//TOPに戻るボタンの表示・非表示を切り替える 
    });

    // ページ内リンクのスクロールをなめらかにする（スムーズスクロール）
    $('a[href*="#"]').click(function () {
      const speed = 500;
      const href = $(this).attr('href');
      let $target;
      if (href == '#') {
        $target = $('html');
      }
      else {
        $target = $(href);
      }
      const position = $target.offset().top;
      $('html, body').animate({ 'scrollTop': position }, speed, 'swing');
      return false;
    });

    // カルーセル
    $('.carousel').slick({
      autoplay: true,
      dots: false,
      infinite: true,
      autoplaySpeed: 2500,
      arrows: false,
      fade: true,
      speed: 1500,
      pauseOnHover: false,
      swipe: false,
    });

  } else {
    //ここにPCの時のjs
    setTimeout(function () {
      window.scrollTo(0, 1);
    }, 10);

    //スクロール時の関数まとめ（フェードイン読み込み関数+左右にパタっと動かす）
    var func_fade = function () {
      const scrollAmount = $(window).scrollTop();
      const windowHeight = $(window).height();

      //フェードイン
      $('section').each(function () {
        const position = $(this).offset().top;
        if (scrollAmount > position - windowHeight + 100) {
          $(this).addClass('fade-in');
        }
      });

      //フェードアップ
      $('.fade-up-trigger').each(function () {
        var position2 = $(this).offset().top;
        if (scrollAmount >= position2 - windowHeight) {
          $(this).addClass('fade-up');
        } else {
          $(this).removeClass('fade-up');
        }
      })
      //左にパタっと動かす
      $('.flip-left-trigger').each(function () {
        var position2 = $(this).offset().top;
        if (scrollAmount >= position2 - windowHeight) {
          $(this).addClass('flip-left');
        } else {
          $(this).removeClass('flip-left');
        }
      });
      //右にパタっと動かす
      $('.flip-right-trigger').each(function () {
        var position2 = $(this).offset().top;
        if (scrollAmount >= position2 - windowHeight) {
          $(this).addClass('flip-right');
        } else {
          $(this).removeClass('flip-right');
        }
      });

    }


    //グローバルナビゲーション アニメ
    var beforePos = 0;//スクロールの値の比較用の設定

    //スクロール途中でヘッダーが消え、上にスクロールすると復活する設定を関数にまとめる
    function ScrollAnime() {
      var elemTop = $('#vanish-top').offset().top;//消える範囲始まり
      //var elemBottum = $('#vanish-bottum').offset().top;//#area-2の位置まできたら
      var scroll = $(window).scrollTop();
      //ヘッダーの出し入れをする
      if (scroll == beforePos) {
        //IE11対策で処理を入れない
        /*} else if (scroll < elemTop) {
          //ヘッダーが上に消える
          $('#nav-updw-anim').removeClass('DownMove');//#headerにDownMoveというクラス名を除き
          $('#nav-updw-anim').addClass('UpMove');//#headerにUpMoveのクラス名を追加*/
      } else if (scroll < elemTop || 0 < beforePos - scroll) {
        //ヘッダーが上から出現する
        $('#nav-updw-anim').removeClass('UpMove');	//#headerにUpMoveというクラス名を除き
        $('#nav-updw-anim').addClass('DownMove');//#headerにDownMoveのクラス名を追加
      } else {
        //ヘッダーが上に消える
        $('#nav-updw-anim').removeClass('DownMove');//#headerにDownMoveというクラス名を除き
        $('#nav-updw-anim').addClass('UpMove');//#headerにUpMoveのクラス名を追加
      }

      beforePos = scroll;//現在のスクロール値を比較用のbeforePosに格納
    }
    //グローバルナビゲーション アニメ ここまで

    //テキスト→背景色が伸びる
    // 動きのきっかけの起点となるアニメーションの名前を定義
    function BgFadeAnime() {
      // 背景色が伸びて出現（左から右）
      $('.bgLRextendTrigger').each(function () { //bgLRextendTriggerというクラス名が
        var elemPos = $(this).offset().top - 50;//要素より、50px上の
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        if (scroll >= elemPos - windowHeight) {
          $(this).addClass('bgLRextend');// 画面内に入ったらbgLRextendというクラス名を追記
        } else {
          $(this).removeClass('bgLRextend');// 画面外に出たらbgLRextendというクラス名を外す
        }
      });

      // 文字列を囲う子要素
      $('.bgappearTrigger').each(function () { //bgappearTriggerというクラス名が
        var elemPos = $(this).offset().top - 50;//要素より、50px上の
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        if (scroll >= elemPos - windowHeight) {
          $(this).addClass('bgappear');// 画面内に入ったらbgappearというクラス名を追記
        } else {
          $(this).removeClass('bgappear');// 画面外に出たらbgappearというクラス名を外す
        }
      });
    }
    //テキスト→背景色が伸びる→ここまで

    //TOPに戻るボタンの表示・非表示を切り替える関数
    function PageTopAnime() {
      var targetPos = $('#top-list').offset().top; //表示開始の位置を取得
      var scroll = $(window).scrollTop(); //スクロール値を取得
      if (scroll >= targetPos) {//200pxスクロールしたら
        $('#page-top').removeClass('RightMove');		// DownMoveというクラス名を除去して
        $('#page-top').addClass('LeftMove');			// UpMoveというクラス名を追加して出現
      } else {//それ以外は
        if ($('#page-top').hasClass('LeftMove')) {//UpMoveというクラス名が既に付与されていたら
          $('#page-top').removeClass('LeftMove');	//  UpMoveというクラス名を除去し
          $('#page-top').addClass('RightMove');	// DownMoveというクラス名を追加して非表示
        }
      }

      var wH = window.innerHeight; //画面の高さを取得
      var footerPos = $('#footer').offset().top; //footerの位置を取得
      if (scroll + wH >= (footerPos + 10)) {
        var pos = (scroll + wH) - footerPos + 10 //スクロールの値＋画面の高さからfooterの位置＋10pxを引いた場所を取得し
        $('#page-top').css('bottom', pos);	//#page-topに上記の値をCSSのbottomに直接指定してフッター手前で止まるようにする
      } else {//それ以外は
        if ($('#page-top').hasClass('LeftMove')) {//UpMoveというクラス名がついていたら
          $('#page-top').css('bottom', '0px');// 下から10pxの位置にページリンクを指定
        }
      }
    }

    //以下、読み込み後の処理

    func_fade();
    BgFadeAnime();

    //スクロール時の処理まとめ
    $(window).scroll(function () {
      ScrollAnime();//スクロール途中でヘッダーが消え、上にスクロールすると復活する関数を呼ぶ
      BgFadeAnime();/* アニメーション用の関数を呼ぶ*/
      func_fade();// スクロールしたときにセクションをフェードインさせる
      PageTopAnime();//TOPに戻るボタンの表示・非表示を切り替える 
    });

    // リンクのホバー時に不透明度をアニメーションで変更する
    $('a').hover(
      function () {
        $(this).animate({ 'opacity': 0.6 }, 300);
      },
      function () {
        $(this).animate({ 'opacity': 1.0 }, 300);
      }
    );

    // ページ内リンクのスクロールをなめらかにする（スムーズスクロール）
    $('a[href*="#"]').click(function () {
      const speed = 500;
      const href = $(this).attr('href');
      let $target;
      if (href == '#') {
        $target = $('html');
      }
      else {
        $target = $(href);
      }
      const position = $target.offset().top;
      $('html, body').animate({ 'scrollTop': position }, speed, 'swing');
      return false;
    });

    // カルーセル
    $('.carousel').slick({
      autoplay: true,
      dots: false,
      infinite: true,
      autoplaySpeed: 2500,
      arrows: false,
      fade: true,
      speed: 1500,
      pauseOnHover: false,
      swipe: false,
    });

  }

    //Modaal用：画像をクリックしたら現れる画面の設定	
    $(".gallery-list").modaal({
      fullscreen: 'true', //フルスクリーンモードにする
      before_open: function () {// モーダルが開く前に行う動作
        $('html').css('overflow-y', 'hidden');/*縦スクロールバーを出さない*/
        history.pushState(null, null, `${location.href}#modal`);//ヒストリーにダミー履歴を追加
      },
      after_close: function () {// モーダルが閉じた後に行う動作
        $('html').css('overflow-y', 'scroll');/*縦スクロールバーを出す*/
        if (location.href.includes('#')) history.back();//履歴を（あれば）消す
      }
    });
  
    $(window).on("popstate", function (e) {
          $(".gallery-list").modaal('close');
    });
  
})
