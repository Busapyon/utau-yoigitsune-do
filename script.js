document.addEventListener('DOMContentLoaded', () => {
  const dialogueBox = document.getElementById('dialogueBox');
  const dialogueText = document.getElementById('dialogueText');
  const choices = document.getElementById('choices');
  const continueHint = document.getElementById('continueHint');
  const shopkeeper = document.getElementById('shopkeeper');

  // ===== 音声プレイヤー =====
  const bgm = new Audio('audio/bgm.mp3');
  bgm.loop = true;
  bgm.volume = 0.35;          // BGMの音量（0.0〜1.0）

  let voiceAudio = null;      // 台詞用
  let bgmStarted = false;

  // ===== 台詞データ（テキスト + 音声ファイル） =====
  const greeting = {
    text: "よう、ようこそ音源屋へ。\n何か用かい？",
    audio: "audio/voice/greeting.mp3"
  };

  const menuText = {
    text: "何か用かい？",
    audio: "audio/voice/menu.mp3"
  };

  const randomDialogues = [
    { text: "今日はいい天気だな。\n…屋内だけどな。", audio: "audio/voice/chat01.mp3" },
    { text: "音源は丁寧に扱ってくれよ。\n大事なやつばかりだ。", audio: "audio/voice/chat02.mp3" },
    { text: "たまに客が来る。\nたまにしか来ない。", audio: "audio/voice/chat03.mp3" },
    { text: "机の上のやつ、気になるだろ？\n触ってみてもいいぞ。", audio: "audio/voice/chat04.mp3" },
    { text: "魂が浮いてるだろ？\nあれも商品だ。", audio: "audio/voice/chat05.mp3" },
    { text: "…特に用がないなら、\nゆっくり見てってくれ。", audio: "audio/voice/chat06.mp3" },
    { text: "…また来たのか。暇なんだな。", audio: "audio/voice/chat07.mp3" },
    { text: "今日は何を探してる。\n前に見ていたものなら、まだあるぞ。", audio: "audio/voice/chat08.mp3" },
    { text: "その香は眠りを誘う。...使いすぎるなよ。", audio: "audio/voice/chat09.mp3" },
    { text: "利用規約はちゃんと読んでくれよ。\n面倒でも大事なことだ。", audio: "audio/voice/chat10.mp3" },
    { text: "その札？厄除けだ。多分効く。", audio: "audio/voice/chat11.mp3" },
    { text: "尻尾？触るな。...触りたいなら、せめて一言言え。", audio: "audio/voice/chat12.mp3" },
    { text: "ここで買ったものが夢に出てきても、返品は受け付けない。", audio: "audio/voice/chat13.mp3" },
    { text: "夜に来る客は多い。\n昼間より、夜の方が正直になる奴が多いからな。", audio: "audio/voice/chat14.mp3" },
    { text: "疲れてるなら、少し座っていけ。\n客がいない時間は暇だからな。", audio: "audio/voice/chat15.mp3" },
    { text: "また来ればいい。店は逃げない。", audio: "audio/voice/chat16.mp3" },
    { text: "それは売り物じゃない。\n...いや、値段をつけられないだけだ。", audio: "audio/voice/chat17.mp3" },
    { text: "お前、こういうものが好きなんだな。意外だ。", audio: "audio/voice/chat18.mp3" },
    { text: "そんなに眺めるなら、買っていけばいい。\n見ているだけでは逃げないが、他の客に買われることはある。", audio: "audio/voice/chat19.mp3" },
    { text: "変なものばかり？\n変じゃないものを置いても、つまらないだろ。", audio: "audio/voice/chat20.mp3" },
    { text: "……今日は静かだな。", audio: "audio/voice/chat21.mp3" },
    { text: "また散らかったな。誰のせいだ。", audio: "audio/voice/chat22.mp3" },
    { text: "……高い？　そうか", audio: "audio/voice/chat23.mp3" },
    { text: "値切るな。俺も生活がある。", audio: "audio/voice/chat24.mp3" },
    { text: "今日は冷えるな。", audio: "audio/voice/chat25.mp3" },
    { text: "雨の日は嫌いじゃない。店が静かになる。", audio: "audio/voice/chat26.mp3" },
    { text: "……花を替えるか。", audio: "audio/voice/chat27.mp3" },
    { text: "この香り、少し強すぎるな。", audio: "audio/voice/chat28.mp3" },
    { text: "灯りが一つ消えてる……誰だ、消したのは。", audio: "audio/voice/chat29.mp3" },
    { text: "……またあいつが来てるな。", audio: "audio/voice/chat30.mp3" },
    { text: "夜は長い。急ぐ必要もない。", audio: "audio/voice/chat31.mp3" },
    { text: "人間は面白いな。欲しいものほど、欲しくないふりをする。", audio: "audio/voice/chat32.mp3" },
    { text: "……願うだけなら、誰にでもできる。", audio: "audio/voice/chat33.mp3" },
    { text: "願い事っていうのは、口に出した途端に重くなる。", audio: "audio/voice/chat34.mp3" },
    { text: "狐に化かされた？　……それ、本当に俺のせいか？", audio: "audio/voice/chat35.mp3" },
    { text: "尻尾が勝手に動くんだ。気にするな。", audio: "audio/voice/chat36.mp3" },
    { text: "尻尾が九つもあると、掃除が面倒なんだ。", audio: "audio/voice/chat37.mp3" },
    { text: "……腹減った。", audio: "audio/voice/chat38.mp3" },
    { text: "茶、どこだ。", audio: "audio/voice/chat39.mp3" },
    { text: "今、何か見えたか？\n...見えないほうがいいものもある。気をつけろ。", audio: "audio/voice/chat40.mp3" },
    { text: "...話したくないなら話さなくていい。ここでは静かにしていてもいい。", audio: "audio/voice/chat41.mp3" },
  ];

  let isFirstTalk = !localStorage.getItem('talkedToShopkeeper');
  let isDialogueOpen = false;
  let currentMode = null; // 'menu' | 'chat'

  // ===== BGM開始（ブラウザ制限対策：最初の操作で再生） =====
  function startBgm() {
    if (bgmStarted) return;
    bgm.play().then(() => {
      bgmStarted = true;
    }).catch(() => {
      // 自動再生がブロックされた場合は無視（次の操作で再試行）
    });
  }

  // ===== 台詞音声を再生 =====
  function playVoice(src) {
    // 前の音声を止める
    if (voiceAudio) {
      voiceAudio.pause();
      voiceAudio.currentTime = 0;
    }
    if (!src) return;

    voiceAudio = new Audio(src);
    voiceAudio.volume = 1.0;
    voiceAudio.play().catch(() => {
      // ファイルがない場合などは静かに失敗
    });
  }

  // ===== 店主クリック =====
  shopkeeper.addEventListener('click', () => {
    startBgm();
    if (isDialogueOpen) return;
    showMenu();
  });

  // ===== 商品・魂クリック =====
  document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      startBgm();
      const link = item.getAttribute('data-link');
      if (link) {
        window.location.href = link;
      }
    });
  });

  // ===== 選択肢クリック =====
  document.querySelectorAll('.choice-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      startBgm();
      const choice = btn.getAttribute('data-choice');

      if (choice === 'want') {
        window.location.href = 'detail-shopkeeper.html';
      } else if (choice === 'chat') {
        localStorage.setItem('talkedToShopkeeper', 'true');
        isFirstTalk = false;
        showRandomChat();
      } else if (choice === 'kiyaku') {
        window.location.href = 'kiyaku.html';
      }
    });
  });

  // ===== 台詞ボックスをクリックで閉じる =====
  dialogueBox.addEventListener('click', (e) => {
    if (e.target.classList.contains('choice-btn')) return;

    if (currentMode === 'chat') {
      // 閉じるときに音声も止める
      if (voiceAudio) {
        voiceAudio.pause();
        voiceAudio.currentTime = 0;
      }
      closeDialogue();
    }
  });

  // ===== 関数群 =====
  function showMenu() {
    isDialogueOpen = true;
    currentMode = 'menu';
    dialogueBox.style.display = 'block';
    choices.style.display = 'flex';
    continueHint.style.display = 'none';

    if (isFirstTalk) {
      dialogueText.textContent = greeting.text;
      playVoice(greeting.audio);
    } else {
      dialogueText.textContent = menuText.text;
      playVoice(menuText.audio);
    }
  }

  function showRandomChat() {
    isDialogueOpen = true;
    currentMode = 'chat';
    dialogueBox.style.display = 'block';
    choices.style.display = 'none';
    continueHint.style.display = 'block';

    const item = randomDialogues[Math.floor(Math.random() * randomDialogues.length)];
    dialogueText.textContent = item.text;
    playVoice(item.audio);
  }

  function closeDialogue() {
    dialogueBox.style.display = 'none';
    isDialogueOpen = false;
    currentMode = null;
  }

  // デバッグ用：初回状態に戻す
  // localStorage.removeItem('talkedToShopkeeper');
});