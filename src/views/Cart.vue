<template>
  <div class="cart">
    <Navbar :updateCart="carts" />
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
              <li class="breadcrumb-item active" aria-current="page">Cart</li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <h2><strong>My </strong>Cart</h2>
          <div class="table-responsive mt-3">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Photo</th>
                  <th scope="col">Food</th>
                  <th scope="col">Notes</th>
                  <th scope="col">Total</th>
                  <th scope="col">Price</th>
                  <th scope="col">Total Price</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(cart, index) in carts" :key="cart.id">
                  <th>{{ index + 1 }}</th>
                  <td>
                    <img
                      :src="'/assets/images/' + cart.product.gambar"
                      class="img-fluid shadow"
                      width="250"
                    />
                  </td>
                  <td>{{ cart.product.nama }}</td>
                  <td>{{ cart.notes ? cart.notes : "-" }}</td>
                  <td>{{ cart.total_order }}</td>
                  <td align="right">Rp. {{ cart.product.harga }}</td>
                  <td align="right">
                    <strong
                      >Rp. {{ cart.product.harga * cart.total_order }}</strong
                    >
                  </td>
                  <td class="text-danger" align="center">
                    <i class="bi bi-trash" @click="deleteCart(cart.id)"></i>
                  </td>
                </tr>

                <tr>
                  <td colspan="6" align="right">
                    <strong>Total Harga :</strong>
                  </td>
                  <td align="right">
                    <strong>Rp. {{ totalPrice }}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- form checkout -->
      <div class="row justify-content-end">
        <div class="col-md-4">
          <form class="mt-4" v-on:submit.prevent>
            <div class="form-group">
              <label for="name">Name :</label>
              <input type="text" class="form-control" v-model="order.name" />
            </div>

            <div class="form-group">
              <label for="table">Table :</label>
              <input type="text" class="form-control" v-model="order.table" />
            </div>

            <button
              type="submit"
              class="btn btn-success float-right"
              @click="checkout"
            >
              <i class="bi bi-cart"></i> Checkout
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
  name: "Cart",
  components: {
    Navbar,
  },
  data() {
    return {
      carts: [],
      order: {},
    };
  },
  methods: {
    setCarts(data) {
      this.carts = data;
    },
    deleteCart(id) {
      axios
        .delete("http://localhost:3000/keranjangs/" + id)
        .then(() => {
          this.$toast.error("Sukses hapus keranjang", {
            type: "error",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });

          // update data keranjang
          axios
            .get("http://localhost:3000/keranjangs")
            .then((response) => this.setCarts(response.data))
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    },
    checkout() {
      if (this.order.name && this.order.table) {
        this.order.carts = this.carts;
        axios.post("http://localhost:3000/pesanans", this.order).then(() => {
          // hapus keranjang
          this.carts.map(function(item) {
            return axios
              .delete("http://localhost:3000/keranjangs/" + item.id)
              .catch((error) => console.log(error));
          })

          this.$router.push({ path: "/order-complete" });
          this.$toast.success("Sukses Dipesan", {
            type: "success",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });
        });
      } else {
        this.$toast.error("Name dan Table harus diisi", {
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
      .get("http://localhost:3000/keranjangs")
      .then((response) => this.setCarts(response.data))
      .catch((error) => console.log(error));
  },
  computed: {
    totalPrice() {
      return this.carts.reduce(function (items, data) {
        return items + data.product.harga * data.total_order;
      }, 0);
    },
  },
};
</script>