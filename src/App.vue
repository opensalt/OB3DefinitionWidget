<script setup>
import CredentialMaker from "@/components/CredentialMaker.vue";
import { useCredentialStore } from "@/stores/credential";

const credential = useCredentialStore();
</script>

<template>
  <main class="container">
    <CredentialMaker />

    {{ credential.credential }}
  </main>
</template>

<style scoped>
</style>
