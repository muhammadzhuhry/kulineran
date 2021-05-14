<template>
  <div class="food-detail">
    <Navbar />
    <div class="container">
      <!-- breadrumb -->
      <div class="row mt-4">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-dark">Home</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/" class="text-dark">Foods</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Food Order
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <!-- food detail -->
      <div class="row mt-3">
        <div class="col-md-6">
          <img
            :src="'/assets/images/' + product.gambar"
            class="img-fluid shadow"
          />
        </div>
        <div class="col-md-6">
          <h2>
            <strong>{{ product.nama }}</strong>
          </h2>
          <hr />
          <h4>
            Harga: <strong>Rp. {{ product.harga }}</strong>
          </h4>
          <form class="mt-4" v-on:submit.prevent>
            <div class="form-group">
              <label for="total">Total Order</label>
              <input
                type="number"
                class="form-control"
                v-model="order.total_order"
              />
            </div>
            <div class="form-group">
              <label for="notes">Notes</label>
              <textarea
                class="form-control"
                v-model="order.notes"
                placeholder="notes example: spice, sweet, etc..."
              ></textarea>
            </div>

            <button type="submit" class="btn btn-success" @click="makeOrder">
              <i class="bi bi-cart"></i> Order
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "@/components/Navbar";
export default {
  name: "FoodDetail",
  components: {
    Navbar,
  },
  data() {
    return {
      product: {},
      order: {},
    };
  },
  methods: {
    setProduct(data) {
      this.product = data;
    },
    makeOrder() {
      this.order.product = this.product;
      if (this.order.total_order) {
        axios
          .post("http://localhost:3000/keranjangs", this.order)
          .then(() => {
            this.$router.push({ path: '/cart' })
            this.$toast.success("Sukses Masuk Keranjang", {
              type: "success",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
          })
          .catch((error) => console.log(error));
      } else {
        this.$toast.error("Jumlah pesanan harus diisi", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
      }
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/products/" + this.$route.params.id)
      .then((response) => this.setProduct(response.data))
      .catch((error) => console.log(error));
  },
};
</script>