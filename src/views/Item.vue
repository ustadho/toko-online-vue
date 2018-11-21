<template>
    <div class="container">
      <div class="row">
        <div class="col-sm">
          <h1>{{judul}}</h1>
          <div>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nama</th>
                  <th scope="col">Harga</th>
                  <th scope="col">Satuan</th>
                  <th scope="col">Kategori</th>
                  <th scope="col">&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(i, index) in items.content" :key="index">
                  <td>{{i.id}}</td>
                  <td>{{i.nama}}</td>
                  <td>{{i.harga}}</td>
                  <td>{{i.satuan}}</td>
                  <td>{{i.kategori ===null? "": i.kategori.nama}}</td>
                  <td>
                    <b-button @click="hapus(i)" size="sm" variant="danger">
                        Hapus
                    </b-button> 
                    
                    <b-button size="sm" variant="success" @click="ubah(i)">
                        Edit
                    </b-button>
                  </td>
                </tr>
                
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-sm">
          <h1>Detail Item</h1>
          <form>
            <div class="form-group">
              <label for="nama">Nama</label>
              <input type="text" class="form-control" id="nama" placeholder="Masukkan Nama Item" v-model="vm.nama">
            </div>
            <div class="form-group">
              <label for="satuan">Satuan</label>
              <input type="text" class="form-control" id="satuan" placeholder="Masukkan Satuan Item"  v-model="vm.satuan">
            </div>
            <div class="form-group">
              <label for="kategori">Kategori</label>
              <v-select v-model="vm.kategori" label="nama" :options="listKategori"></v-select>
            </div>
            <div class="form-group">
              <label for="harga">Harga</label>
              <input type="number" class="form-control" id="harga" placeholder="Masukkan Harga Item"  v-model="vm.harga">
            </div>
            <div class="form-group">
              <b-button size="sm" variant="danger" @click="bersihkan()">
                  Bersihkan
              </b-button> 
              
              <b-button size="sm" variant="success" @click="simpan()">
                  Simpan
              </b-button>
            </div>
          </form>
        </div>
    </div>
    </div>
</template>

<script>
const axios = require("axios");

export default {
  data() {
    return {
      items: [],
      vm : {},
      listKategori: [],
      judul: "Ini halaman Item ya"
    };
  },
  methods : {
    bersihkan(){
      this.vm = {}
    },
    ubah(item){
      this.vm = JSON.parse(JSON.stringify(item));
    },
    simpan(){
      if(this.vm.id!=null){
        axios.put("/api/item/"+this.vm.id, this.vm)
        .then(() => (this.refresh()));
      }else{
        axios.post("/api/item", this.vm)
        .then(() => (this.refresh()));
      }
    },
    hapus(item){
      axios.delete("/api/item/"+item.id)
        .then(() => (this.refresh()));
    },
    refresh(){
      axios.get("/api/item").then(response => (this.items = response.data));
    }
  },
  mounted() {
    this.refresh();
    axios.get("/api/kategori-item/all").then(response => (this.listKategori = response.data));
  }
};
</script>
