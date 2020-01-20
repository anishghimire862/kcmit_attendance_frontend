<template>
  <div>
    <list
      :headers="headers"
      :items="apiDataTeachers"
      :list-title="listTitle"
      @edit="editTeacherDetails"
      @delete="deleteTeacherDetails"
      @add="addNewTeacher"
    />
    <v-dialog
      v-model="deleteDialog"
      width="400"
    >
       <v-card
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
            @click="closeDeleteDialog"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="deleteTeacher"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
                <v-text-field
                  label="Phone"
                  v-model="editedItem.phone"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <FileUpload
                  :url-link="url"
                  @preview="openPreview"
                />
                <v-img
                  v-model="editedItem.image"
                  v-if="url || editedItem.image"
                  :src="url || 'http://localhost:8001/' +editedItem.image"
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
    </v-dialog>
    <v-snackbar/>
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
        deleteDialog: false,
        url: '',
        headers: [
          { text: 'Image', value: 'image' },
          { text: 'Name', value: 'name' },
          { text: 'Email', value: 'email' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        listTitle: 'Teachers',
        editItem: false,
        addItem: false,
        deleteItem: false,
        editedItem: {
          name: '',
          phone: null,
          email: null,
          image: ''
        },
        apiDataTeachers: [],
        file: '',
        deleteItemId: null
      }
    },
    computed: {
    formTitle () {
        return this.editItem ? 'Edit Teacher Details' : 'Add Teacher Details'
      }
    },
    created () {
      this.batchListGenerator()
      this.getData()
    },
    methods: {
      editTeacherDetails (value) {
        this.dialog = true
        this.addItem = false
        this.editItem = true
        this.editedItem  = Object.assign({}, value)
      },
      deleteTeacherDetails (value) {
        this.addItem = false
        this.editItem = false
        this.dialog = false
        this.deleteItem = true
        this.deleteDialog = true
        this.deleteItemId = value.id
      },
      addNewTeacher() {
        this.dialog = true
        this.editItem = false
        this.addItem = true
        this.editedItem = Object.assign({}, null)
      },
      close () {
        this.dialog = false
        this.url = ''
      },
      batchListGenerator  () {
        let getYear = new Date().getFullYear()
        this.batchList = Array.from({ length: getYear - 2000 }, (value, key) => 2000 + key)
      },
      openPreview (file) {
        this.url = URL.createObjectURL(file)
        this.file = file
      },
      getData () {
        const url = '/teachers/'
        // for reference inside promise
        let self = this
        this.$axios.get(url)
          .then (function(response) {
            self.apiDataTeachers = response.data.data
          })
      },
      submitData () {
        const url = '/teachers/'
        let self = this
        let formData = new FormData()
        formData.append('image', this.file)
        formData.append('name', this.editedItem.name)
        formData.append('email', this.editedItem.email)
        formData.append('phone', this.editedItem.phone)
        if(this.editItem) {
          formData.append('id', this.editedItem.id)
          this.$axios.patch(url, formData)
            .then(function (response) {
              self.$toast('Teacher updated successfully')
              self.getData()
              self.close()
            })
            .catch(function (error) {
              self.$toast.error('There was an error, please try again.')
            })
        } else {
          this.$axios.post(url, formData)
            .then(function (response) {
              self.$toast('Please inform to check email for login details')
              self.getData()
              self.close()
            })
            .catch(function (error) {
              self.$toast.error('There was an error, please try again.')
            })
        }
      },
      deleteTeacher () {
        const url = '/teachers/' + this.deleteItemId
        let self = this
        this.$axios.delete(url)
          .then(function (response) {
            self.$toast('Teacher deleted successfully.')
            self.getData()
          })
          .catch(function (error) {
            self.$toast.error('There was a problem.')
          })
          .finally(function() {
            self.deleteDialog = false
          })
      },
      closeDeleteDialog () {
        this.deleteDialog = false
      }
    }
  }
</script>
