<template>
  <div>
    <LayoutHeader />
    <LayoutMain />
    <LayoutNav />
  </div>
</template>

<script>
import LayoutHeader from "./Components/Header";
import LayoutMain from "./Components/Main";
import LayoutNav from "./Components/Nav";

export default {
  name: "Index",
  components: { LayoutHeader, LayoutMain, LayoutNav }
};
</script>

<style scoped></style>
