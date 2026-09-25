document.addEventListener('DOMContentLoaded', () => {
  const dialogueBox = document.getElementById('dialogueBox');
  const dialogueText = document.getElementById('dialogueText');
  const choices = document.getElementById('choices');
  const continueHint = document.getElementById('continueHint');
  const shopkeeper = document.getElementById('shopkeeper');

  const greeting = "よう、ようこそ音源屋へ。\n何か用かい？";
  const menuText = "何か用かい？";

  const simpleChats = [
    "今日はいい天気だな。\n…屋内だけどな。",
    "音源は丁寧に扱ってくれよ。\n大事なやつばかりだ。",
    "たまに客が来る。\nたまにしか来ない。",
    "机の上のやつ、気になるだろ？\n触ってみてもいいぞ。",
    "魂が浮いてるだろ？\nあれも商品だ。",
    "…特に用がないなら、\nゆっくり見てってくれ。",
    "…また来たのか。暇なんだな。",
    "今日は何を探してる。\n前に見ていたものなら、まだあるぞ。",
    "その香は眠りを誘う。...使いすぎるなよ。",
    "利用規約はちゃんと読んでくれよ。\n面倒でも大事なことだ。",
    "その札？厄除けだ。多分効く。",
    "尻尾？触るな。...触りたいなら、せめて一言言え。",
    "ここで買ったものが夢に出てきても、返品は受け付けない。",
    "夜に来る客は多い。\n昼間より、夜の方が正直になる奴が多いからな。",
    "疲れてるなら、少し座っていけ。\n客がいない時間は暇だからな。",
    "また来ればいい。店は逃げない。",
    "それは売り物じゃない。\n...いや、値段をつけられないだけだ。",
    "お前、こういうものが好きなんだな。意外だ。",
    "そんなに眺めるなら、買っていけばいい。\n見ているだけでは逃げないが、他の客に買われることはある。",
    "変なものばかり？\n変じゃないものを置いても、つまらないだろ。",
    "……今日は静かだな。",
    "また散らかったな。誰のせいだ。",
    "……高い？　そうか。",
    "値切るな。俺も生活がある。",
    "今日は冷えるな。",
    "雨の日は嫌いじゃない。店が静かになる。",
    "……花を替えるか。",
    "この香り、少し強すぎるな。",
    "灯りが一つ消えてる……誰だ、消したのは。",
    "……またあいつが来てるな。",
    "夜は長い。急ぐ必要もない。",
    "人間は面白いな。欲しいものほど、欲しくないふりをする。",
    "……願うだけなら、誰にでもできる。",
    "願い事っていうのは、口に出した途端に重くなる。",
    "狐に化かされた？　……それ、本当に俺のせいか？",
    "尻尾が勝手に動くんだ。気にするな。",
    "尻尾が九つもあると、掃除が面倒なんだ。",
    "……腹減った。",
    "茶、どこだ。",
    "今、何か見えたか？\n...見えないほうがいいものもある。気をつけろ。",
    "...話したくないなら話さなくていい。ここでは静かにしていてもいい。"
  ];

  const branchChats = [
    {
      text: "……お前、何か探してる顔だな。\n何が欲しい？",
      choices: [
        { label: "* 音源が欲しい", result: "なら机の上と、浮いてる魂を見てみろ。\n気に入ったやつを持っていけ。" },
        { label: "* 特に用はない", result: "そうか。\n用がないなら、眺めていくだけでもいい。" },
        { label: "* お前の話が聞きたい", result: "……珍しい客だ。\n俺の話なんて、大したものじゃないが。" }
      ]
    },
    {
      text: "尻尾、気になるか？",
      choices: [
        { label: "* 触ってもいい？", result: "……一言あったな。\n軽くなら、いいぞ。乱暴はするな。" },
        { label: "* 九本もあるの？", result: "ああ。掃除が面倒なんだ。\n絡まるし、埃もつく。" },
        { label: "* 別に", result: "そうか。\n賢明だな。" }
      ]
    },
    {
      text: "ここで買ったもの、大事に使えよ。\n……どう使うつもりだ？",
      choices: [
        { label: "* 歌を作る", result: "いいだろう。\n変な使い方さえしなければ、好きにしろ。" },
        { label: "* まだ決めてない", result: "なら、決まるまで置いておけ。\n焦る必要はない。" },
        { label: "* 秘密", result: "……そうか。\n面白い答えだ。" }
      ]
    },
    {
      text: "夜分に来る客は、だいたい何か抱えてる。\nお前は？",
      choices: [
        { label: "* 特に何も", result: "本当か？\n……まあ、無理に聞くつもりはない。" },
        { label: "* 少し疲れてる", result: "なら、少し座っていけ。\n店は逃げない。" },
        { label: "* 答えにくい", result: "無理に答えるな。\nここでは、黙っていてもいい。" }
      ]
    },
    {
      text: "魂が浮いてるだろ。\n触ってみるか？",
      choices: [
        { label: "* 触る", result: "……案外思い切りがいいな。\n壊れないようにはなってる。たぶん。" },
        { label: "* やめておく", result: "賢明だ。\n見えているものが、全部安全とは限らない。" },
        { label: "* それ、何？", result: "商品だ。\n……それ以上は、買ってからの楽しみにしておけ。" }
      ]
    },
    {
      text: "俺の音源、欲しいか？",
      choices: [
        { label: "* 欲しい", result: "なら「あなたの音源がほしい」を選べ。\nメニューからな。" },
        { label: "* まずは他を見る", result: "いいだろう。\n机と魂を好きに見ていけ。" },
        { label: "* 高いだろ", result: "……値段の話か。\nここは、そういう店じゃない。" }
      ]
    }
  ];

  let isFirstTalk = !localStorage.getItem('talkedToShopkeeper');
  let isDialogueOpen = false;
  let currentMode = null;
  let currentBranch = null;

  shopkeeper.addEventListener('click', function () {
    if (isDialogueOpen) return;
    showMenu();
  });

  document.querySelectorAll('.item').forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.stopPropagation();
      var link = item.getAttribute('data-link');
      if (link) {
        window.location.href = link;
      }
    });
  });

  choices.addEventListener('click', function (e) {
    var btn = e.target.closest('.choice-btn');
    if (!btn) return;
    e.stopPropagation();

    var choice = btn.getAttribute('data-choice');
    var index = btn.getAttribute('data-index');

    if (choice === 'want') {
      window.location.href = 'detail-shopkeeper.html';
      return;
    }
    if (choice === 'chat') {
      localStorage.setItem('talkedToShopkeeper', 'true');
      isFirstTalk = false;
      showRandomChat();
      return;
    }
    if (choice === 'kiyaku') {
      window.location.href = 'kiyaku.html';
      return;
    }

    // 分岐の選択肢
    if (index !== null && currentBranch) {
      var i = parseInt(index, 10);
      if (currentBranch.choices[i]) {
        showBranchResult(currentBranch.choices[i].result);
      }
    }
  });

  dialogueBox.addEventListener('click', function (e) {
    if (e.target.closest('.choice-btn')) return;
    if (currentMode === 'chat' || currentMode === 'result') {
      closeDialogue();
    }
  });

  function showMenu() {
    isDialogueOpen = true;
    currentMode = 'menu';
    currentBranch = null;
    dialogueBox.style.display = 'block';
    continueHint.style.display = 'none';
    dialogueText.textContent = isFirstTalk ? greeting : menuText;

    choices.style.display = 'flex';
    choices.innerHTML = '';

    var items = [
      { choice: 'want', label: '* あなたの音源がほしい' },
      { choice: 'chat', label: '* 雑談' },
      { choice: 'kiyaku', label: '* 利用規約' }
    ];

    items.forEach(function (item) {
      var btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.setAttribute('data-choice', item.choice);
      btn.textContent = item.label;
      choices.appendChild(btn);
    });
  }

  function showRandomChat() {
    if (Math.random() < 0.4) {
      showBranchChat();
    } else {
      showSimpleChat();
    }
  }

  function showSimpleChat() {
    isDialogueOpen = true;
    currentMode = 'chat';
    currentBranch = null;
    dialogueBox.style.display = 'block';
    choices.style.display = 'none';
    choices.innerHTML = '';
    continueHint.style.display = 'block';
    dialogueText.textContent = simpleChats[Math.floor(Math.random() * simpleChats.length)];
  }

  function showBranchChat() {
    isDialogueOpen = true;
    currentMode = 'branch';
    dialogueBox.style.display = 'block';
    continueHint.style.display = 'none';

    currentBranch = branchChats[Math.floor(Math.random() * branchChats.length)];
    dialogueText.textContent = currentBranch.text;

    choices.style.display = 'flex';
    choices.innerHTML = '';

    currentBranch.choices.forEach(function (c, i) {
      var btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.setAttribute('data-index', String(i));
      btn.textContent = c.label;
      choices.appendChild(btn);
    });
  }

  function showBranchResult(text) {
    currentMode = 'result';
    currentBranch = null;
    choices.style.display = 'none';
    choices.innerHTML = '';
    continueHint.style.display = 'block';
    dialogueText.textContent = text;
  }

  function closeDialogue() {
    dialogueBox.style.display = 'none';
    isDialogueOpen = false;
    currentMode = null;
    currentBranch = null;
    choices.innerHTML = '';
  }
});