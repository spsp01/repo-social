<template>
  <div class="animated fadeIn">


    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-header">
            Wybieranie profilu
          </div>
          <div class="card-block">
            <h4 class="card-title">Informacje o profilu</h4>
            <p class="card-text">Wpisz nazwę fanpage</p>
            <div class="input-group">
              <span class="input-group-addon" id="basic-addon1">@</span>
              <input v-model='url' type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1">
              <button v-on:click='geturl' type="button" class="btn btn-primary">Wyświetl</button>
            </div>

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
                  @{{url}}
                 <h4 class="card-title">{{posts.name}} </h4>
                 <p class="card-text">{{posts.about}}</p>
               </div>
                <div class="col-4"><img v-bind:src="posts.picture.data.url" /></div>
            </div>

      </div>

           <div class="card-block pt-0">
             <div class="h4 mb-0">{{posts.fan_count}}</div>
             <small class="text-muted text-uppercase font-weight-bold">Fanów</small>
             <div class="progress progress-xs mt-1 mb-0">
               <div class="progress-bar bg-info" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
              <br>
             <button type="button" class="btn btn-primary" v-on:click="addRow">Dodaj do tabeli</button>

           </div>

  </div>
</div>
<hr />
    </div>
    <div class="card">
  <div class="card-header">
    Social
  </div>
  <div class="card-block">
    <h4 class="card-title">Tabela profile FB</h4>
    <p class="card-text">Wszystkie dodane profile FB</p>
    <table class="table">
  <thead>
    <tr>
      <td><strong>Url</strong></td>
      <td><strong>Nazwa</strong></td>
      <td><strong>Fanów</strong></td>
      <td><strong>Opis</strong></td>
      <td><strong>Akcja</strong></td>
    </tr>
  </thead>
  <tbody>
    <tr v-for="row in rows">
      <td>{{row.url}}</td>
      <td>{{row.name}}</td>
      <td>{{row.like}}</td>
      <td>{{row.desc}}</td>
      <td><a v-on:click="removeRow(index)">Usun</a></td>
    </tr>
  </tbody>
</table>
<div>
  <button type="button" class="btn btn-primary" v-on:click="addRow">Dodaj do tabeli</button>
</div>
  </div>
</div>




<ul>
    <li v-if = "postlikes.data!=null" v-for= "data in postlikes.data">  {{data.name}}
    </li>
</ul>

</div>


</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      posts: {name: '', fancount: '', about: '', category: '', picture: {data: {}}},
      errors: {},
      index: '0',
      url: 'rybyswiatapl',
      fbgraph: 'https://graph.facebook.com/v2.10?id=http%3A%2F%2Fwww.facebook.com%2F',
      api: '&access_token=1069468343070863|qYPMFJJzVFygBDNQygaMsMDo0ME&fields=name,fan_count,about,category,picture.width(160)',
      urlfb: 'https://graph.facebook.com/v2.10?id=http%3A%2F%2Fwww.facebook.com%2Frybyswiatapl&access_token=1069468343070863|qYPMFJJzVFygBDNQygaMsMDo0ME&fields=name,fan_count',
      urlgraph: 'https://graph.facebook.com/v2.10/529133257138951_1659781247407474/likes?summary=true&&access_token=1069468343070863|qYPMFJJzVFygBDNQygaMsMDo0ME',
      postlikes: {data: [], paging: {}, summary: {}},
      rows: [
      ]
    }
  },
  methods: {
    geturl: function () {
      this.urlfb = this.fbgraph + this.url + this.api
      axios.get(this.urlfb)
        .then(response => {
        // JSON responses are automatically parsed.
          this.posts = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
      return this.urlfb
    },
    getpost: function () {
      axios.get(this.urlgraph)
        .then(response => {
        // JSON responses are automatically parsed.
          this.postlikes = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    },

    addRow: function (index) {
      this.rows.splice(index + 1, 0, {url: this.url, name: this.posts.name, like: this.posts.fan_count, desc: this.posts.about})
    },
    removeRow: function (index) {
      this.rows.splice(index, 1)
    }
  }
  // Fetches posts when the component is created.

}
</script>
