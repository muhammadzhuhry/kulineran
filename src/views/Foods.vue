<template>
  <Navbar />
  <div class="container">
    <div class="row mt-4">
      <div class="col">
        <h2><strong>Food</strong> List</h2>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col">
        <div class="input-group mb-3">
          <input
            v-model="search"
            type="text"
            class="form-control"
            placeholder="Search your Favorite food..."
            aria-label="Username"
            aria-describedby="basic-addon1"
            @keyup="searchFood"
          />
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">
              <i class="bi bi-search"></i>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="row mb-4">
      <div class="col-md-4 mt-4" v-for="product in products" :key="product.id">
        <CardProduct :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "@/components/Navbar";
import CardProduct from "@/components/CardProduct";

export default {
  name: "Foods",
  components: {
    Navbar,
    CardProduct,
  },
  data() {
    return {
      products: [],
      search: ''
    };
  },
  methods: {
    setProduct(data) {
      this.products = data;
    },
    searchFood() {
      axios
      .get("http://localhost:3000/products?q="+this.search)
      .then((response) => this.setProduct(response.data))
      .catch((error) => console.log(error));
    }
  },
  mounted() {
    axios
      .get("http://localhost:3000/products")
      .then((response) => this.setProduct(response.data))
      .catch((error) => console.log(error));
  },
};
</script>