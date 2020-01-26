
<template>
  <v-data-table
    :headers="headers"
    :items="items"
    sort-by="name"
    class="elevation-1"
    :show-expand="expandTable ? true : false"
    @item-expanded="clickedAssignTeacher"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title
          v-text="listTitle"
        >
        </v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          dark
          class="mb-2"
          @click="$emit('add')"
        >
          Add New {{ listTitle.slice(0, -1) }}
        </v-btn>
      </v-toolbar>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="$emit('edit', item)"
      >
        mdi-table-edit
      </v-icon>
      <v-icon
        small
        @click="$emit('delete', item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:item.image="{ item }">
      <v-avatar class="" size="25">
        <img :src="'http://localhost:8001/' +item.image" />
      </v-avatar>
    </template>
    <template v-slot:item.data-table-expand="{ expand, isExpanded }">
      <div class="my-2">
        <v-btn @click="expand(!isExpanded)" text small color="primary">Assign Teacher</v-btn>
      </div>
    </template>
    <template v-slot:expanded-item="{ headers }">
      <td :colspan="headers.length">
        <slot name="subject"> Anish </slot>
      </td>
    </template>
  </v-data-table>
</template>
<script>
  export default {
    props: {
      headers: {
        type: Array,
        required: true
      },
      items: {
        type: Array,
        required: true
      },
      listTitle: {
        type: String,
        required: true
      },
      expandTable: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      clickAssignTeacher(val) {
        this.$emit('clickedAssignTeacher', val)
      }
    }
  }
</script>
