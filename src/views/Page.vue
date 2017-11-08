<template>
  <div class="animated fadeIn">


    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-header">
      URl tester
          </div>
          <div class="card-block">
            <h4 class="card-title">Informacje o url</h4>
            <p class="card-text">Wpisz nazwę adres url</p>
            <div class="input-group">
              <input v-model='url' type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1">
              <button v-on:click='geturl' type="button" class="btn btn-primary">Wyświetl</button>
            </div>

          </div>
        </div>
    </div>
      <div class="col">  <div class="card">
        <div class="card-header">
          Informacje o Urlu
        </div>
        <div class="card-block ">


          <div class="row">
              <div class="col">

                <h4 class="card-title">{{urlinfo.og_object.title}}</h4>
                  <p>  {{url}} </p>
                    <p>{{urlinfo.og_object.description}}</p>
               </div>

            </div>

      </div>

           <div class="card-block pt-0">
             <div class="h4 mb-0">{{urlinfo.share.share_count}}</div>
             <small class="text-muted text-uppercase font-weight-bold">Social action</small>
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
      <td><strong>Tytuł</strong></td>
      <td><strong>Opis</strong></td>
      <td><strong>Social action</strong></td>
      <td><strong>Akcja</strong></td>
    </tr>
  </thead>
  <tbody>
    <tr v-for="row in rows">
      <td>{{row.url}}</td>
      <td>{{row.title}}</td>
      <td>{{row.desc}}</td>
      <td>{{row.like}}</td>
      <td><a href='' v-on:click="removeRow(index)">Usuń</a></td>
    </tr>
  </tbody>
</table>
<div>
  <button type="button" class="btn btn-primary" v-on:click="addRow">Dodaj do tabeli</button>
</div>

  </div>
</div>

<p></p>

</div>


</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {

      urlinfo: {id: '', og_object: {}, share: {}},
      errors: {},
      index: '0',
      url: 'http://domena.pl',
      urlfb: '',
      fbgraph: 'https://graph.facebook.com/',
      rows: [
      ]
    }
  },
  methods: {
    geturl: function () {
      this.urlfb = this.fbgraph + this.url
      axios.get(this.urlfb)
        .then(response => {
        // JSON responses are automatically parsed.
          this.urlinfo = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
      return this.urlfb
    },
    addRow: function (index) {
      this.rows.splice(index + 1, 0, {url: this.url, title: this.urlinfo.og_object.title, desc: this.urlinfo.og_object.description, like: this.urlinfo.share.share_count})
    },
    removeRow: function (index) {
      this.rows.splice(index, 1)
    }
  }
  // Fetches posts when the component is created.

}
</script>
