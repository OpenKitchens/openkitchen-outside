<template>
  <!-- ヘッダー -->
  <nav class="navbar navbar-expand-lg">
    <div class="container">
      <a class="navbar-brand" href="/about" style="margin-left: 70px;">
        <img src="../components/icons/logo.png" width="30" style="margin-right: 10px;margin-top: -5px;">
        <span style="font-weight: bold;">Openkitchen</span>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav" style="position: absolute;left:50vw;transform: translateX(-50%);width: 1000px;">
        <ul class="navbar-nav ml-auto" style="position: absolute;left:50%;transform: translateX(-50%);background-color: #232323;border-radius: 100px;padding: 0 10px;border: solid 1px #444">
          <li class="nav-item">
            <a class="nav-link" href="#sikumi">仕組みについて</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#rinen">Openの理念</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://github.com/OpenKitchens">GitHub</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- ヒーローセクション -->
  <section class="text-white text-center py-5 hero">
    <div class="container title">
      <h1 class="display-4">OpenKitchen</h1>
      <p class="lead">GAFAから解放された高度な文化の循環圏</p>
      <a href="#create" class="btn btn-light rounded-pill" style="margin-top: 20px; font-weight: bold;">アカウントを作成</a>
    </div>
  </section>

  <section class="py-5" id="create">
    <div class="container">
      <h3>アカウントを新規作成する方法</h3>
      <div class="row">
        <div class="col-md-4">
          <div class="card">
            <img src="/image/lofi.jpg" class="card-img-top" alt="instance" height="230">
            <div class="card-body">
              <h5>1. GitHubからInstanceを取得</h5>
              <p><a href="https://github.com/OpenKitchens/clientserver"
                  target="_blank">ここ</a>からインスタンスのリポジトリをフォークまたはダウンロードしよう</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <img src="/image/lofi2.png" class="card-img-top" alt="instance" height="230">
            <div class="card-body">
              <h5>2. Instanceをデプロイ</h5>
              <p>Node.jsの環境デプロイをし、URLまたはIPアドレスをメモしてください</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <img src="/image/computer.png" class="card-img-top" alt="instance" height="230">
            <div class="card-body">
              <h5>3. OpenKitchenにサインイン</h5>
              <p><a href="https://openkitchen.vercel.app/signIn" target="_blank">ここ</a>でurlのformにメモしたURLを入力し設定を終えましょう
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="py-5" id="sikumi">
    <div class="container">
      <h3>仕組みについて</h3>
      <div class="row">
        <div class="col-md-4">
          <div class="card">
            <img src="/image/Authority.png" class="card-img-top" alt="instance" height="230">
            <div class="card-body">
              <h5>権力が一点集中しない</h5>
              <p>全ての情報は全て他人に依存しています。ユーザー自身がアカウント兼コミュニティーサーバーのinstanceをデプロイすることにより権力はユーザー自身に還元されます。</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <img src="/image/good.png" class="card-img-top" alt="instance" height="230">
            <div class="card-body">
              <h5>Seasonと評価</h5>
              <p>ソーシャルサービスにシーズン制を導入することで一人のインフルエンサーがユーザーを独占することとマンネリ化を防ぎます。評価値は自分のサーバーの情報の多さで評価されます</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <img src="/image/coin.jpeg" class="card-img-top" alt="instance" height="230">
            <div class="card-body">
              <h5>課金システムや広告がない</h5>
              <p>OpenKitchenの実態はユーザー同士の通信そのものであり、開発者はOpenKitchenのサーバー代がいらないのです。開発者はまだ子供で親にご飯を食べさせてもらえるので経済的に困っていません。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="py-5" id="rinen">
    <div class="container" style="text-align: center;">
      <h3>Openの理念</h3>
      <div>
        <p>OpenKitchenは大人、資本主義の象徴であるGAFAへの反逆精神のもと運営されています。</p>
        <p>MOYASIとは権力の集中や人間性を消費して発展をつげる現代のインターネットへの絶望感やゼロ年代へのセンチメンタルそのものであります</p>
        <p>Winnyで違法ダウンロードしたりねとらんでディープな世界に潜ったり... そんな時代への憧れまたは逃避?</p>
        <p>そんなインターネットの救済性、楽しさと引き換えにハイパー資本主義、陽キャ絶対値制度(いいね、フォロワー)の導入により目まぐるしい発展を進めてきたこの世界</p>
        <p>こんな世界を僕はまるでセカイ系のラノベのようだと感じます。</p>
        <p>しかしセカイ系のラノベはいつもヒロインを選び世界が滅びます。</p>
        <p>そう、「インターネットの精神性」というヒロインよりも我々ネットユーザーである主人公は「インターネットにおける資本」を選択してしまったのです</p>
        <p>いいんです。「インターネットの精神性」を選択してGAFAが倒産し世界恐慌が起ころうとも</p>
        <p>ゼロ年代DNAを引き継ぐ私の血がいいます。ヒロインを選べと。</p>
        <p>センチメンタルに縛られて息も苦しいこのネットで、私と共にヒロインを選びましょう</p>
        <p>君にとっての大丈夫になりたい</p>
      </div>
    </div>
  </section>

  <footer class="bg-dark text-white py-3">
    <div class="container">
      <p>&copy; 2023 OpenKitchen. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.hero {
  background-image: url("/image/vaporwave.png");
  height: calc(100vh - 15px);
  margin-bottom: 100px;
}

.hero::before {
  content: '';
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
}

h1 {
  font-weight: bold;
}

h5 {
  font-weight: bold;
}

h3 {
  margin-top: 50px;
  margin-bottom: 50px;
}

.card {
  margin-bottom: 30px;
}

.navbar {
  background-color: rgba(0, 0, 0, 0);
  /* 50%透明度の黒色背景 */
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}

.title {
  position: absolute;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
}
</style>