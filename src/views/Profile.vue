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
              <input type="text" class="form-control" placeholder="idposta" aria-describedby="basic-addon1">
              <button type="button" class="btn btn-primary">Wyświetl</button>
            </div>
            <p></p>
            <button type="button" class="btn btn-primary" v-on:click="getpost">Pobierz o poscie</button>
            <button type="button" class="btn btn-primary" v-on:click="getfeed">Pobierz o feedzie</button>
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
             <div class="h4 mb-0">{{postlikes.summary.total_count}}</div>
             <small class="text-muted text-uppercase font-weight-bold">Like</small>
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
      postlikes: {data: [], paging: {}, summary: {}},
      feed: {},
      urlgraph: 'https://graph.facebook.com/v2.10/529133257138951_1659781247407474/likes?summary=true&&access_token=1069468343070863|qYPMFJJzVFygBDNQygaMsMDo0ME',
      urlfeed: 'https://graph.facebook.com/v2.10/JulaPolska/posts?access_token=1069468343070863|qYPMFJJzVFygBDNQygaMsMDo0ME'

    }
  },
  methods: {

    getpost: function () {
      axios.get(this.urlgraph)
        .then(response => {
        // JSON responses are automatically parsed.
          this.postlikes = response.data
        })
    },
    getfeed: function () {
      axios.get(this.urlfeed)
        .then(response => {
        // JSON responses are automatically parsed.
          this.feed = response.data
        })
    },

    resetuj: function () {
      this.postlikes.data = ''
      this.postlikes.paging = ''
      this.postlikes.summary = ''
      this.feed = ''
    }

  }
  // Fetches posts when the component is created.

}
</script>
