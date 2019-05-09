<template>
  <v-app>
    <v-toolbar app flat color="primary" dark>
      <v-toolbar-title class="headline">
        <v-layout row justify-center>
          <span>Vimeo Uploader com VueJs</span>
        </v-layout>
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-layout row wrap justify-center class="mt-4">
        <v-flex sm12 md12 lg12>
          <v-layout row wrap justify-center>
            <input type="file" @change="arquivoSelecionado">
          </v-layout>
        </v-flex>
        <v-btn class="mt-3" @click="uploadArquivo" round color="primary">Ralizar upload</v-btn>
      </v-layout>
      <v-layout row wrap justify-center>
        <h3 v-if="progresso">Progresso: {{progresso}}%</h3>
      </v-layout>
      <v-layout row wrap justify-center>
        <h2 v-if="videoID">
          Upload realizado com sucesso!
          <a :href="videoID" target="_blank">Clique aqui</a> para visualizar no vimeo!
        </h2>
      </v-layout>
      <vimeo-player ref="player" :video-id="videoID" @ready="onReady" :player-height="height"></vimeo-player>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
import vueVimeoPlayer from "vue-vimeo-player";
import vimeo from "vimeo";

export default {
  components: {
    vueVimeoPlayer
  },
  data: () => ({
    arquivo: "",
    videoID: null,
    height: 500,
    options: {},
    playerReady: false,
    progresso: null
  }),

  methods: {
    arquivoSelecionado(event) {
      this.arquivo = event.target.files[0];
    },
    uploadArquivo() {
      const Vimeo = vimeo.Vimeo;

      const clientID = "6f79355bb56b195a123596e7060f0a6bbab020b8";
      const clientSecret =
        "2D8wilUihF55v04/4sBKkLgf7zWRQnVvXmVGK8CkF3q6uylWjNTZDIqekEq+feb7R4ilO29hrhszV87UlFgLw9Iwt6ERFBp4chY6kQ3kLjcYplcOKYriycf+3Wmnc0md";
      const tokenPrivateUpload = "4c2d1b01c5740cd0f7b91e90f59bc06c";

      const client = new Vimeo(clientID, clientSecret, tokenPrivateUpload);

      client.upload(
        this.arquivo,
        uri => {
          this.videoID = "https://vimeo.com/" + uri.replace("/videos/", "");
        },
        (bytesUploaded, bytesTotal) => {
          let porcentagem = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
          this.progresso = porcentagem;
        },
        error => {
          console.warn("Falhou por conta de: " + error);
        }
      );
    },
    onReady() {
      this.playerReady = true;
    },
    play() {
      this.$refs.player.play();
    },
    pause() {
      this.$refs.player.pause();
    }
  }
};
</script>

<style>
#botaoArquivo {
  background-color: #fff;
  width: 150px;
  height: 25px;
  border-radius: 5px;
}
</style>

