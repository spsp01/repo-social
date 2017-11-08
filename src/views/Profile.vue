<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-header">
            Informacje o profilu
          </div>
          <div class="card-block">
            <h4 class="card-title">Profil</h4>
            <p class="card-text">Wpisz nazwę profilu</p>
            <div class="input-group">
              <input v-model='input' type="text" class="form-control" placeholder="idposta" aria-describedby="basic-addon1">

            </div>
            <p></p>
            <button type="button" class="btn btn-primary" v-on:click="getFeed">1. Pobierz feed</button>
            <button type="button" class="btn btn-primary" v-on:click="oprofilu">2. Pobierz o profilu</button>
            <button type="button" class="btn btn-secondary" v-on:click="resetuj">Resetuj</button>

          </div>
        </div>
    </div>
      <div class="col">  <div class="card">
        <div class="card-header">
          Informacje o profilu
        </div>
        <div class="card-block pb-0">


          <div class="row">
              <div class="col-8">
                 <h4 class="card-title"> </h4>
                 <p class="card-text"></p>
               </div>

            </div>

      </div>

           <div class="card-block pt-0">
             {{postlikes.id}}
             <h4 class="card-title"> {{postlikes.name}}</h4>
             @{{input}}
             <p>{{shortdesc}}</p>
             <div class="h4 mb-0">{{postlikes.fan_count}}</div>
             <small class="text-muted text-uppercase font-weight-bold">Lubi ten profil</small>
             <div class="progress progress-xs mt-1 mb-0">
               <div class="progress-bar bg-info" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <div class="h4 mb-0">{{avglikes10}}</div>
                            <small class="text-muted text-uppercase font-weight-bold">Średnia like 10</small>
                            <div class="progress progress-xs mt-1 mb-0">
                              <div class="progress-bar .bg-success" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                           </div>
                                           <div  class="h4 mb-0">{{avglikes100}}</div>
                                           <small class="text-muted text-uppercase font-weight-bold">Średnia like 100</small>
                                           <div class="progress progress-xs mt-1 mb-0">
                                             <div class="progress-bar bg-success" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                          </div>
                            <br />
                            <div><center><img v-if ="postlikes.picture.data.url!=null" v-bind:src="postlikes.picture.data.url" /></center></div>

           </div>

  </div>
</div>

    </div>
    <div class="card">
      <div class="card-header">
        Informacje o feedzie
      </div>
      <div class="card-block">
        <table v-if="feed!=null" class="table">
      <thead>
        <tr>
          <td><strong>Id</strong></td>
          <td><strong>Utworzony</strong></td>
          <td><strong>Post</strong></td>
          <td><strong>Akcja</strong></td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in feed.data">
          <td><a v-bind:href="'https://www.facebook.com/'+data.id">Idź do posta</a></td>
          <td>{{data.created_time}}</td>
          <td>{{data.message}}</td>
          <td><a v-on:click="removeRow(index)">Usun</a></td>
        </tr>
      </tbody>
      </table>

      </div>
    </div>

</div>


</template>

<script>
import axios from 'axios'
import Vue from 'vue'

export default {
  data () {
    return {
      postlikes: {name: '', fancount: '', about: '', category: '', picture: {data: {}}},
      feed: {},
      urlgraph: 'https://graph.facebook.com/v2.10/529133257138951_1659781247407474/likes?summary=true&access_token=1069468343070863|qYPMFJJzVFygBDNQygaMsMDo0ME',
      urlfeed: 'https://graph.facebook.com/v2.10/JulaPolska/posts?access_token=1069468343070863|qYPMFJJzVFygBDNQygaMsMDo0ME',
      graph: 'https://graph.facebook.com/v2.10/',
      postinfo: '/posts',
      fields: '&fields=name,fan_count,description,picture.width(160)',
      input: 'Google',
      profileid: '',
      likefeed: [],
      ids: [],
      nestedresponse: [],
      avglikes10: '',
      avglikes100: '',
      shortdesc: '',
      counter: ''
    }
  },
  methods: {
    oprofilu: function () {
      this.getPost()
      this.suma()
    },

    getFeed: function () {
      this.urlgraph = this.graph + this.input + this.postinfo + '?access_token=1069468343070863|qYPMFJJzVFygBDNQygaMsMDo0ME' + '&limit=100'
      axios.get(this.urlgraph)
        .then(response => {
        // JSON responses are automatically parsed.
          this.feed = response.data
          this.idGet()
        })
    },

    getPost: function () {
      this.urlgraph = this.graph + this.input + '?access_token=1069468343070863|qYPMFJJzVFygBDNQygaMsMDo0ME' + this.fields
      axios.get(this.urlgraph)
        .then(response => {
        // JSON responses are automatically parsed.
          this.postlikes = response.data
          this.shortdesc = response.data.description.slice(0, 150)
        })
    },
    short: function () {
      var short = this.postlikes.description.slice(0, 150)
      console.log(short)
      this.shortdesc = short
    },
    getApi: function () {
      axios.get(this.urlgraph)
        .then(response => {
        // JSON responses are automatically parsed.
          this.feed = response.data
        })
    },

    resetuj: function () {
      this.postlikes = {name: '', fancount: '', about: '', category: '', picture: {data: {}}}
      this.feed = ''
      this.avglikes10 = ''
      this.avglikes100 = ''
    },
    idGet: function () {
      var i = 0
      for (i in this.feed['data']) {
        Vue.set(this.ids, i, this.feed['data'][i]['id'])
      }
      this.idSend(this.ids)
    },
    idSend: function () {
      this.nestedresponse = []
      var i = 0
      for (i in this.ids) {
        var urlsend = 'https://graph.facebook.com/v2.10/' + this.ids[i] + '/likes?access_token=1069468343070863|qYPMFJJzVFygBDNQygaMsMDo0ME&summary=true'
        axios.get(urlsend)
          .then(response => {
            this.nestedresponse.push(response.data.summary.total_count)
          })
      }
    },
    suma: function () {
      var sum10 = this.nestedresponse.slice(0, 10).reduce((pv, cv) => pv + cv, 0)
      console.log(sum10)
      var avg10 = sum10 / this.nestedresponse.slice(0, 10).length

      var sum100 = this.nestedresponse.slice(0, 100).reduce((pv, cv) => pv + cv, 0)
      console.log(sum100)
      var avg100 = sum100 / this.nestedresponse.slice(0, 100).length

      this.avglikes10 = avg10
      this.avglikes100 = avg100
    }
  }
  // Fetches posts when the component is created.
}
</script>
