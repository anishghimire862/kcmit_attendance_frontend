<template>
  <div>
    <list
      :headers="headers"
      :items="apiDataStudents"
      :list-title="listTitle"
      @edit="editStudentDetails"
      @delete="deleteStudentDetails"
      @add="addNewStudent"
    />
    <v-dialog
      v-model="dialog"
      max-width="500px"
    >
      <v-card
        v-if="addItem || editItem"
      >
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Full Name"
                  v-model="editedItem.name"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  :items="batchList"
                  v-model="editedItem.batch"
                  label="Select Batch"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-select
                  :items="facultyList"
                  v-model="editedItem.faculty"
                  label="Select Faculty"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <FileUpload
                  :url-link="url"
                  @preview="openPreview"
                />
                <v-img
                  v-if="url"
                  :src="url"
                  width="100%"
                  height="24vw"
                  contain
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email"
                  v-model="editedItem.email"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="close"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="submitData"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card
        v-else
      >
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                Are you sure you want to delete this ?
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="close"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  import List from "~/components/lists.vue";
  import FileUpload from '~/components/common/FileUpload.vue'
  export default {
    components: {
      List,
      FileUpload
    },
    data () {
      return {
        dialog: false,
        url: '',
        headers: [
          {
            text: 'S.N.',
            align: 'left',
            sortable: false,
            value: 'sn',
          },
          { text: 'Image', value: 'image' },
          { text: 'Name', value: 'name' },
          { text: 'Email', value: 'email' },
          { text: 'Batch', value: 'batch' },
          { text: 'Faculty', value: 'faculty', sortable: false },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        items: [
          {
            name: 'Frozen Yogurt',
            image: 'imgpsh_mobile_save.jpeg',
            email: 'anishg@gmail.com',
            batch: 2016,
            faculty: 'BIM',
          },
          {
            name: 'Ice cream sandwich',
            image: 'imgpsh_mobile_save.jpeg',
            email: 'anish@gmail.cp',
            batch: 2016,
            faculty: 'BIM',
          }
        ],
        listTitle: 'Students',
        editItem: false,
        addItem: false,
        deleteItem: false,
        batchList: [],
        facultyList: ['BIM', 'BBA', 'BCA'],
        editedItem: {
          name: '',
          batch: null,
          faculty: null,
          email: '',
        },
        apiDataStudents: []
      }
    },
    computed: {
      formTitle () {
        return this.editItem ? 'Edit Student Details' : 'Add Student Details'
      }
    },
    created () {
      this.batchListGenerator()
      this.getData()
    },
    methods: {
      editStudentDetails (value) {
        this.dialog = true
        this.addItem = false
        this.editItem = true
        this.editedItem  = Object.assign({}, value)
      },
      deleteStudentDetails (value) {
        this.addItem = false
        this.editItem = false
        this.dialog = true
        this.deleteItem = true
      },
      addNewStudent() {
        this.dialog = true
        this.editItem = false
        this.addItem = true
        this.editedItem = Object.assign({}, null)
      },
      close () {
        this.dialog = false
      },
      batchListGenerator  () {
        let getYear = new Date().getFullYear()
        this.batchList = Array.from({ length: getYear - 2000 }, (value, key) => 2000 + key)
      },
      openPreview (file) {
        this.url = URL.createObjectURL(file)
      },
      getData () {
        const url = '/students/'
        // for reference inside promise
        let self = this
        this.$axios.get(url)
          .then (function(response) {
            self.apiDataStudents = response.data.data
          })
      },
      submitData () {
        const url = '/students/'
        let self = this
        this.$axios.post(url, this.editedItem)
          .then(function (response) {
            console.log('Submitted')
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
</script>
