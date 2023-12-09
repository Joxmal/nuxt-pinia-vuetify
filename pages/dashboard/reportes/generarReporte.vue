<template>
    <v-data-table-server v-model:items-per-page="itemsPerPage" :search="search" :headers="headers"
        :items-length="totalItems" :items="serverItems" :loading="loading" item-value="name" @update:options="loadItems">
        <template v-slot:tfoot>
            <tr>
                <td>
                    <v-text-field v-model="name" hide-details placeholder="Search name..." class="ma-2"
                        density="compact"></v-text-field>
                </td>
                <td>
                    <v-text-field v-model="calories" hide-details placeholder="Minimum calories" type="number" class="ma-2"
                        density="compact"></v-text-field>
                </td>
            </tr>
        </template>
    </v-data-table-server>
    {{search}}
</template>

<script setup>
import { ref, watch } from 'vue';

const desserts = [
  {
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: "1",
  },
  {
    name: "Frozen2 Yogurt",
    calories: 180,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: "1",
  },
  {
    name: "Frozen3 Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: "1",
  },
  // ... rest of the desserts data ...
];

const FakeAPI = {
  async fetch({ page, itemsPerPage, sortBy, search }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const items = desserts.slice().filter((item) => {
          if (
            search.name &&
            !item.name.toLowerCase().includes(search.name.toLowerCase())
          ) {
            return false;
          }

          if (search.calories && !(item.calories >= Number(search.calories))) {
            return false;
          }

          return true;
        });

        if (sortBy.length) {
          const sortKey = sortBy[0].key;
          const sortOrder = sortBy[0].order;
          items.sort((a, b) => {
            const aValue = a[sortKey];
            const bValue = b[sortKey];
            return sortOrder === "desc" ? bValue - aValue : aValue - bValue;
          });
        }

        const paginated = items.slice(start, end);

        resolve({ items: paginated, total: items.length });
      }, 100);
    });
  },
};

const itemsPerPage = ref(5);
const headers = [
  {
    title: "Dessert (100g serving)",
    align: "start",
    sortable: false,
    key: "name",
  },
  { title: "Calories", key: "calories", align: "end" },
  { title: "Fat (g)", key: "fat", align: "end" },
  { title: "Carbs (g)", key: "carbs", align: "end" },
  { title: "Protein (g)", key: "protein", align: "end" },
  { title: "Iron (%)", key: "iron", align: "end" },
];
const serverItems = ref([]);
const loading = ref(true);
const totalItems = ref(0);
const name = ref("");
const calories = ref("");
const search = ref("");

watch([name, calories], () => {
  search.value = String(Date.now());
});

const loadItems = ({ page, itemsPerPage, sortBy }) => {
  loading.value = true;
  FakeAPI.fetch({
    page,
    itemsPerPage,
    sortBy,
    search: { name: name.value, calories: calories.value },
  }).then(({ items, total }) => {
    serverItems.value = items;
    totalItems.value = total;
    loading.value = false;
  });
};
</script>

