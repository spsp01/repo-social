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
            <p class="card-text">Wpisz id posta</p>
            <div class="input-group">
              <input v-model='input' type="text" class="form-control" placeholder="idposta" aria-describedby="basic-addon1">

            </div>
            <p></p>
            <button type="button" class="btn btn-primary" v-on:click="oprofilu">Pobierz o profilu</button>
            <button type="button" class="btn btn-primary" v-on:click="getFeed">Pobierz o feedzie</button>
            <button type="button" class="btn btn-primary" v-on:click="resetuj">Resetuj</button>
            
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
             {{postlikes.name}}
             {{postlikes.id}}
             <div class="h4 mb-0">{{postlikes.fan_count}}</div>
             <small class="text-muted text-uppercase font-weight-bold">Lubi ten profil</small>
             <div class="progress progress-xs mt-1 mb-0">
               <div class="progress-bar bg-info" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <div class="h4 mb-0">{{avglikes10}}</div>
                            <small class="text-muted text-uppercase font-weight-bold">Średnia like 10</small>
                            <div class="progress progress-xs mt-1 mb-0">
                              <div class="progress-bar bg-info" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                           </div>
                                           <div  class="h4 mb-0">{{avglikes100}}</div>
                                           <small class="text-muted text-uppercase font-weight-bold">Średnia like 100</small>
                                           <div class="progress progress-xs mt-1 mb-0">
                                             <div class="progress-bar bg-info" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                          </div>
                            <br />
                            <p>
                              Osoby, które ostatnio polubiy
                            </p>
                            <div class="card" style="width: 20rem;">
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item" v-if="feed!=null" v-for="data in postlikes.data">{{data.name}} </li>
                    </ul>

                  </div>

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
          <td><strong>Like</strong></td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in feed.data">
          <td>{{data.id}}</td>
          <td>{{data.created_time}}</td>
          <td>{{data.message}}</td>
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
      postlikes: {},
      feed: {},
      urlgraph: 'https://graph.facebook.com/v2.10/529133257138951_1659781247407474/likes?summary=true&access_token=1069468343070863|qYPMFJJzVFygBDNQygaMsMDo0ME',
      urlfeed: 'https://graph.facebook.com/v2.10/JulaPolska/posts?access_token=1069468343070863|qYPMFJJzVFygBDNQygaMsMDo0ME',
      api: '?access_token=1069468343070863|qYPMFJJzVFygBDNQygaMsMDo0ME',
      graph: 'https://graph.facebook.com/v2.10/',
      postinfo: '/posts',
      fields: '&fields=name,fan_count,description',
      input: 'makropolska',
      profileid: '',
      likefeed: [],
      ids: [],
      nestedresponse: [],
      avglikes10: [],
      avglikes100: []
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
      this.urlgraph = this.graph + this.input + this.api + this.fields
      axios.get(this.urlgraph)
        .then(response => {
        // JSON responses are automatically parsed.
          this.postlikes = response.data
        })
    },
    getApi: function () {
      axios.get(this.urlgraph)
        .then(response => {
        // JSON responses are automatically parsed.
          this.feed = response.data
        })
    },

    resetuj: function () {
      this.postlikes.data = ''
      this.postlikes.paging = ''
      this.postlikes.summary = ''
      this.postlikes = ''
      this.feed = ''
      this.avglikes = ''
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
      this.suma()
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
