<template>
    <div class="container">
      <div class="row">
        <div class="col-sm">
          <h1>Penjualan</h1>
          <div>
            <b-form-group horizontal
                :label-cols="2"
                label-size="sm"
                label="Tanggal"
                label-for="input_sm">
                <vuejs-datepicker v-model="vm.tanggal"></vuejs-datepicker>
            </b-form-group>
            <b-form-group horizontal
                :label-cols="2"
                label-size="sm"
                label="Keterangan"
                label-for="input_sm">
                <b-form-input id="input_sm" size="sm" v-model="vm.keterangan"></b-form-input>
            </b-form-group>
            <b-form-group>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Qty</th>
                            <th>Harga</th>
                            <th>Sub Total</th>
                            <th>&nbsp;</th>
                        </tr>
                       
                    </thead>
                    <tbody>
                        <tr v-for="(d , index) in vm.detail" :key="index">
                            <td>{{d.item.nama}}</td>
                            <td>{{d.qty}}</td>
                            <td>{{d.harga}}</td>
                            <td>{{d.qty*d.harga}}</td>
                            <td>
                                <b-button size="sm" variant="warning" @click="hapusItem(index)">
                                    Hapus
                                </b-button> 
                            </td>
                            
                        </tr>
                    </tbody>
                    <tfoot>
                         <tr>
                            <td style="margin: 0; padding: 0;">
                                <v-select v-model="det.item" label="nama" :options="listItem"></v-select>
                            </td>
                            <td style="margin: 0; padding: 0;">
                                <input class="form-control" type="number" v-model="det.qty" />
                            </td>
                            <td style="margin: 0; padding: 0;">
                                <input class="form-control" type="number" v-model="det.harga" />
                            </td>
                            <td>
                                {{det.qty * det.harga}}
                            </td>
                            <td>
                                <b-button size="sm" variant="primary" @click="tambahItem()">
                                    Tambahkan
                                </b-button> 
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </b-form-group>
            <b-form-group>
                <b-button size="lg" variant="primary" @click="simpan()">
                    Simpan Transaksi
                </b-button> 
            </b-form-group>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
const axios = require("axios");
export default {
  data() {
    return {
      det: {},
      listItem: [],
      vm: {
        tanggal: new Date(),
        detail: []
      }
    };
  },
  methods: {
    tambahItem() {
      this.vm.detail.push(JSON.parse(JSON.stringify(this.det)));
      this.det = {};
    },
    hapusItem(idx) {
      this.vm.detail.splice(idx, 1);
    },
    simpan() {
        
      axios.post("/api/penjualan", this.vm).then(() => 
      {
          alert("simpan penjualan sukses!")
          this.bersihkan()
          });
    },
    bersihkan() {
      this.vm = {
        tanggal: new Date(),
        detail: []
      };
    }
  },
  mounted() {
    axios
      .get("/api/item/all")
      .then(response => (this.listItem = response.data));
  }
};
</script>

