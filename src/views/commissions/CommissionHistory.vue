<script setup>
import { ref, onMounted } from "vue";
import store from "@/store/index.js";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus"; // For displaying error/success notifications

const loader = ref(false);
const commissionData = ref(null);
const route = useRoute();

// Function to format date
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric", hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const getCommissionHistory = () => {
  loader.value = true;
  commissionData.value = null;

  store
      .dispatch("fetchList", {
        url: `commissions/1/history/?commission=${store?.state?.commissionData?.id}`,
      })
      .then((res) => {
        commissionData.value = res.data;
        loader.value = false;
      })
      .catch((err) => {
        loader.value = false;
        ElMessage.error("Failed to fetch commission history");
      });
};

onMounted(() => {
  getCommissionHistory();
});
</script>

<template>
  <el-card >
    <!-- Loader -->
    <el-skeleton v-if="loader" animated></el-skeleton>

    <el-table v-if="commissionData" :data="commissionData" stripe style="width: 100%">
      <!-- Date formatting using formatDate -->
      <el-table-column prop="created_at" label="Created At" width="180">
        <template #default="scope">
          {{ formatDate(scope.row.created_at) }}
        </template>
      </el-table-column>

      <el-table-column label="Description">
        <template #default="scope">
          <div v-for="(desc, index) in scope.row.description" :key="index">
            <p v-for="(value, key) in desc" :key="key">
              <strong>{{ key }}:</strong> {{ value }}
            </p>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- Fallback when no data -->
    <el-empty v-if="!commissionData && !loader" description="No commission history available"></el-empty>
  </el-card>
</template>

<style scoped>
.box-card {
  margin: 20px;
}
</style>
