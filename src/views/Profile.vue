<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-header">
            Informacje o poscie
          </div>
          <div class="card-block">
            <h4 class="card-title">Like posta</h4>
            <p class="card-text">Wpisz id posta</p>
            <div class="input-group">
              <input v-model='input' type="text" class="form-control" placeholder="idposta" aria-describedby="basic-addon1">

            </div>
            <p></p>
            <button type="button" class="btn btn-primary" v-on:click="getPost">Pobierz o profilu</button>
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
             <small class="text-muted text-uppercase font-weight-bold">Like</small>
             <div class="progress progress-xs mt-1 mb-0">
               <div class="progress-bar bg-info" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <br />
                            <p>
                              Osoby, które ostatnio polubiy
                              {{likefeed.data}}
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
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in feed.data">
          <td>{{data.id}}</td>
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
      nestedresponse: []
    }
  },
  methods: {
    getFeed: function () {
      this.urlgraph = this.graph + this.input + this.postinfo + '?access_token=1069468343070863|qYPMFJJzVFygBDNQygaMsMDo0ME'
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
    },
    idGet: function () {
      var ids = []
      var i = 0
      for (i in this.feed['data']) {
        ids.push((this.feed['data'][i]['id']))
      }
      this.idSend(ids)
    },
    idSend (ids) {
      var i = 0
      for (i in ids) {
        var urlsend = 'https://graph.facebook.com/v2.10/' + ids[i] + '/likes?access_token=1069468343070863|qYPMFJJzVFygBDNQygaMsMDo0ME&summary=true'
        axios.get(urlsend)
          .then(response => {
            this.nestedresponse.push(response.data)
          })
      }
      this.nowa()
    },
    nowa: function () {

    }
  }
  // Fetches posts when the component is created.

}
</script>
