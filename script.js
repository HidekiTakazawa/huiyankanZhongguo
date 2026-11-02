// script.js
document.addEventListener("DOMContentLoaded", () => {
  // ----- ここから編集してください -----
  // 各アプリの情報を記述します。
  // id: HTML要素のID接頭辞として使用 (ユニークな文字列にしてください)
  // name: アプリの正式名称
  // description: アプリの簡単な紹介文
  // images: 表示する画像の配列。各画像は { src: "画像のパス", caption: "画像の説明文" } の形式です。
  //         画像パスは "images/ファイル名.png" のように指定します。
  // appUrl: アプリへジャンプするためのURL
  const appsData = [
    {
      id: "chinese-conversation-master", // 例: アプリ1のID
      name: "App①教科書の本文",
      description:
        "各課の本文が各ページに掲載されており、それぞれ音声の確認ができます。シート選択をクリックすると課を選択できます。",
      images: [
        // { src: "images/honbunIni.jpg", caption: "初期表示画面：最初の学習内容が表示されます。" },
        {
          src: "images/慧眼看中国本文1.png",
          caption:
            "先頭のレッスンの内容が選択されています。学びたいレッスンを選択できます。中国語の文章をクリックすると中国語の音色が流れます。",
        },
        
        // { src: "images/app1_screen3.png", caption: "テスト結果：間違えた単語を復習できます。" }
      ],
      appUrl: " https://script.google.com/macros/s/AKfycbzqKj-f4MGkfdaTmNLdIzSNP9Q-zgvTvrW_1iMgfuJp1r13iU94n9CYPxhrhAEdT57X8Q/exec", // あなたのアプリ1への実際のURLに置き換えてください
    },

    {
      id: "newtango-trainer", // 例: アプリ2のID
      name: "App②新単語カード",

      description:
        "単語学習画面は、主に以下の3つのエリアに分かれています。上部メニュー: 「テストモードへ」の切り替え、レッスン選択、一覧表示。中央「カード」画面: 単語の学習エリア。下部メニュー: 「学習」「My帳」「検索」「登録」の主要機能。　このアプリは艾老师がAIと相談して作られました。",
      images: [
        {
          src: "images/新単語初期画面.jpg",
          caption:
            "初期画面　先頭のレッスンの日本語訳がカード形式で表示されます。カードの表を日本語訳にするか中国語にするかの選択もできます",
        },

        {
          src: "images/新単語一覧.jpg",
          caption:
            "一覧ボタンをクリックすれば、その課で学習する単語一覧が表示されます。個々の単語の右端に表示されている☆マークをクリックすればMy単語帳に登録できます",
        },
        {
          src: "images/新単語検索.jpg",
          caption:
            "検索ボタンをクリックすれば、すべてのレッスンの単語が研削できます。検索文字列が日本語、中国語、ピンインの一部と合致すれば表示されます。",
        },
        {
          src: "images/新単語my単語帳.jpg",
          caption:
            "下部メニューの「My帳」をクリックすれば、登録されているMy単語帳が表示されます。フラッシュカード形式と、一覧形式で表示できます。",
        },
      ],
      appUrl:
        "https://script.google.com/macros/s/AKfycbzT4lbXSl6qNlw9uPwby7lw9fMKHpqymkJoZ8khEqhIhkqVHuQhkzo30NJFX9Lxp2QlAw/exec", // あなたのアプリ2への実際のURLに置き換えてください
    },
    
    {
      id: "omakenochizuapp", // 例: アプリ4のID
      name: "App➂中国地図",
      description:
        "中国大陸について学習するアプリです。中国各地の情報はAIから得ています。関連するyoutubeにジャンプする機能もあります。",
      images: [
        {
          src: "images/地図紹介画像１.jpg",
          caption:
            "アプリの初期画面です。いろいろな省の情報を見ることができます。",
        },
      ],
      appUrl:
        "https://script.google.com/macros/s/AKfycbye75vr_sq9t0qbGTN5fxnvWIl3v4vpQObWKv4rKMYOMQNGfkNU_DJ1lL266JgkaQji7w/exec", // あなたのアプリ4への実際のURLに置き換えてください
    },
    
    {
      id: "ziyouShuShuo", // 例: アプリ4のID
      name: "App④自由说中文",
      description:
        "気になる中国語の文章を正しく発音できるかチェックするアプリです。中国語文章を入力して、何回も発音を聞きましょう。その後、中国語の発音練習に進みます。自分の勉強の記録をクリップボードにコピーする機能もあります。",
      images: [
        {
          src: "images/自由说说初期画面.jpg",
          caption: "アプリの初期画面です。",
        },
        {
          src: "images/自由说说音声入力1.jpg",
          caption:
            "聞くボタンで、音声を聞きます。音声入力ボタンをクリックすると、入力モードになり、音声入力ができます。ボタンの背景色は赤に変わり、レコード中と表示されます。",
        },
        {
          src: "images/自由说说音声入力２.jpg",
          caption: "音声入力が終われば、判定結果が表示されます。",
        },
      ],
      appUrl: "https://hidekitakazawa.github.io/htCyonwenVoiceIn/",
    },
     {
        id: "cyuugokugobunnpou4taku", // 例: アプリ4のID
        name: "App⑤中国文法4択",
        description: "中国語の文法知識を4択問題で学習するアプリです。艾老师がnotebookLMというAIを利用して作られました。文法の理解を助ける画像、スライドを見る機能もあります。",
        images: [
            { src: "images/文法アプリ初期画面.jpg",
              caption: "アプリの初期画面です。学習する文法の課題を選択します。"
            },
            { src: "images/連動文.jpg",
              caption: "連動文を選んだ時の画面です。4択問題を楽しむことができます。上部に、画像、スライドのボタンがあります。"
            },
            { src: "images/連動文画像.jpg",
              caption: "画像ボタンをクリックしたときに表示されます。"
            },
            
           
        ],
        appUrl: "https://tamagenai.github.io/YUFA/" // あなたのアプリ4への実際のURLに置き換えてください
    },
    {
      id: "aiCalendar", // 例: アプリ4のID
      name: "App⑥カレンダーアプリ",
      description:
        "中華人民共和個の旧暦を学習するアプリです。旧暦の月日を入力すると、干支、二十四節気、月齢、旧暦の月日が表示されます。旧暦の月日を入力することで、干支、二十四節気、月齢が表示されます。",
      images: [
        {
          src: "images/aiCalendar.png",
          caption: "アプリの初期画面です。",
        },
       
      ],
      appUrl: "https://hidekitakazawa.github.io/aiCalendar/",
    },
  ];
  // ----- ここまで編集してください -----

  const appListContainer = document.getElementById("app-list-container");
  if (!appListContainer) {
    console.error(
      'Error: App list container (id="app-list-container") not found in HTML.',
    );
    return;
  }

  appsData.forEach((appData) => {
    const showcaseItem = createAppShowcaseElement(appData);
    appListContainer.appendChild(showcaseItem);
  });

  function createAppShowcaseElement(appData) {
    const item = document.createElement("div");
    item.className = "app-showcase-item";
    item.id = `${appData.id}-showcase`;

    const nameElement = document.createElement("h2");
    nameElement.className = "app-name";
    nameElement.textContent = appData.name;
    item.appendChild(nameElement);

    const descriptionElement = document.createElement("p");
    descriptionElement.className = "app-description";
    descriptionElement.textContent = appData.description;
    item.appendChild(descriptionElement);

    const sliderElement = document.createElement("div");
    sliderElement.className = "image-slider";

    const imageContainer = document.createElement("div");
    imageContainer.className = "image-container";
    const imageElement = document.createElement("img");
    imageElement.className = "slider-image";
    imageElement.alt = `${appData.name} screenshot`; // 初期alt
    imageContainer.appendChild(imageElement);
    sliderElement.appendChild(imageContainer);

    const captionElement = document.createElement("p");
    captionElement.className = "image-caption";
    sliderElement.appendChild(captionElement);

    const controlsElement = document.createElement("div");
    controlsElement.className = "slider-controls";
    const prevButton = document.createElement("button");
    prevButton.className = "prev-btn";
    prevButton.textContent = "◀ Back";
    const nextButton = document.createElement("button");
    nextButton.className = "next-btn";
    nextButton.textContent = "Next ▶";
    controlsElement.appendChild(prevButton);
    controlsElement.appendChild(nextButton);
    sliderElement.appendChild(controlsElement);

    item.appendChild(sliderElement);

    const linkElement = document.createElement("a");
    linkElement.className = "app-link";
    // linkElement.href = appData.appUrl;
    linkElement.textContent = `「${appData.name}」へ`;
    // linkElement.target = '_blank'; // 新しいタブで開く
    // linkElement.rel = 'noopener noreferrer'; // セキュリティ対策
    // iPhoneでの動作を考慮し、クリックイベントで window.open を使用
    linkElement.addEventListener("click", (event) => {
      event.preventDefault(); // aタグのデフォルトの遷移を防ぎます

      // window.open() を使用して新しいタブで開く
      // 'noopener,noreferrer' はセキュリティ上の推奨事項です
      const newWindow = window.open(
        appData.appUrl,
        "_blank",
        "noopener,noreferrer",
      );

      // ポップアップがブロックされた場合のフォールバック（任意）
      if (
        !newWindow ||
        newWindow.closed ||
        typeof newWindow.closed === "undefined"
      ) {
        // ユーザーに通知するか、同じウィンドウで開くなどの代替手段を検討
        // alert('新しいタブを開けませんでした。ポップアップブロックの設定を確認してください。\nまたは、以下のURLを直接ブラウザで開いてください：\n' + appData.appUrl);
        // もしポップアップブロックで開けない場合、同じタブで開くことを試みる
        // window.location.href = appData.appUrl;
      }
    });
    item.appendChild(linkElement);

    // スライダーの状態とロジック
    let currentImageIndex = 0;

    function updateSliderDisplay() {
      if (!appData.images || appData.images.length === 0) {
        imageContainer.innerHTML =
          '<p style="padding: 20px; color: #777;">このアプリの画像はまだありません。</p>';
        captionElement.textContent = "";
        prevButton.style.display = "none"; // 画像がない場合はボタンも非表示
        nextButton.style.display = "none";
        return;
      }

      imageElement.style.display = "block"; // 画像がある場合は表示
      prevButton.style.display = "inline-block";
      nextButton.style.display = "inline-block";

      const currentImage = appData.images[currentImageIndex];
      imageElement.src = currentImage.src;
      imageElement.alt =
        currentImage.caption ||
        `${appData.name} screen ${currentImageIndex + 1}`;
      captionElement.textContent = currentImage.caption || "";

      prevButton.disabled = currentImageIndex === 0;
      nextButton.disabled = currentImageIndex === appData.images.length - 1;
    }

    prevButton.addEventListener("click", () => {
      if (currentImageIndex > 0) {
        currentImageIndex--;
        updateSliderDisplay();
      }
    });

    nextButton.addEventListener("click", () => {
      if (currentImageIndex < appData.images.length - 1) {
        currentImageIndex++;
        updateSliderDisplay();
      }
    });

    // スワイプ機能
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50; // スワイプと判定する最小距離 (px)

    imageContainer.addEventListener(
      "touchstart",
      (e) => {
        if (!appData.images || appData.images.length <= 1) return;
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true },
    );

    imageContainer.addEventListener("touchend", (e) => {
      if (!appData.images || appData.images.length <= 1) return;
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    function handleSwipe() {
      const swipeDistance = touchEndX - touchStartX;
      if (Math.abs(swipeDistance) >= swipeThreshold) {
        if (swipeDistance < 0) {
          // 左スワイプ (Next)
          if (currentImageIndex < appData.images.length - 1) {
            currentImageIndex++;
          }
        } else {
          // 右スワイプ (Back)
          if (currentImageIndex > 0) {
            currentImageIndex--;
          }
        }
        updateSliderDisplay();
      }
    }

    updateSliderDisplay(); // 初期表示
    return item;
  }
});
