<template>
  <!-- ヘッダー -->
  <header class="bg-dark text-white">
    <div class="container" style="margin: 0;padding: 0;max-width: none;">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="/about" style="font-weight: bold;margin-left: 50px;">
            <img src="../components/icons/logo.png" width="30" style="margin-right: 10px;margin-top: -5px;">
            <span style="margin: 2px;display: inline-block;">Openkitchen</span>
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent" style="position: absolute; left: 50vw; transform: translateX(-50%);">
            <ul class="navbar-nav mb-2 mb-lg-0" style="margin-left: 20px;">
              <li class="nav-item">
                仕組みについて
              </li>
            </ul>
            <ul class="navbar-nav mb-2 mb-lg-0" style="margin-left: 20px;">
              <li class="nav-item">
                Github
              </li>
            </ul>
            <ul class="navbar-nav mb-2 mb-lg-0" style="margin-left: 20px;">
              <li class="nav-item">
                我々の理念
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>

  <!-- ヒーローセクション -->
  <section class="text-white text-center py-5">
    <div class="container">
      <h1 class="display-4">OpenKitchen</h1>
      <p class="lead">GAFAから解放された高度な文化の循環圏</p>
    </div>
  </section>

  <!-- 主要な機能 -->
  <section class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <div class="card">
            <img src="/image/lofi.jpg" class="card-img-top" alt="instance" height="230">
            <div class="card-body">
              <h5>1. GitHubからInstanceを取得</h5>
              <p><a href="https://github.com/OpenKitchens/clientserver" target="_blank">ここ</a>からインスタンスのリポジトリをフォークまたはダウンロードしよう</p>
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
              <p><a href="https://openkitchen.vercel.app/signIn" target="_blank">ここ</a>でurlのformにメモしたURLを入力し設定を終えましょう</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

h1 {
  font-weight: bold;
}

.navbar {
  background-color: rgba(0, 0, 0, 0) !important;
  border-bottom: rgba(0, 0, 0, 0) !important;
}

h5 {
  font-weight: bold;
}

header {
  background-color: rgba(0, 0, 0, 0) !important;
  border-bottom: rgba(0, 0, 0, 0) !important;
}

.card{
  margin-bottom: 30px;
}
</style>