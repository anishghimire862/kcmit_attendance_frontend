<template>
  <div>
    <list
      :headers="headers"
      :items="apiDataSubjects"
      :list-title="listTitle"
      @edit="editSubjectDetails"
      @delete="deleteSubjectDetails"
      @add="addNewSubject"
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
                  label="Subject Code"
                  v-model="editedItem.subject_code"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Subject Name"
                  v-model="editedItem.subject_name"
                >
                </v-text-field>
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
  import List from "~/components/lists.vue"
  export default {
    components: {
      List
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
          { text: 'Subject Code', value: 'subject_code' },
          { text: 'Subject Name', value: 'subject_name' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        items: [
          {
            subjectName: 'Frozen Yogurt',
            subjectCode: '0001'
          },
          {
            subjectName: 'Frozen Yogurt',
            subjectCode: '0001'
          }
        ],
        listTitle: 'Subjects',
        editItem: false,
        addItem: false,
        deleteItem: false,
        editedItem: {
          subject_code: '',
          subject_name: ''
        },
        apiDataSubjects: []
      }
    },
    created () {
      this.getData()
    },
    computed: {
    formTitle () {
        return this.editItem ? 'Edit Subject Details' : 'Add Subject Details'
      }
    },
    methods: {
      editSubjectDetails (value) {
        this.dialog = true
        this.addItem = false
        this.editItem = true
        this.editedItem  = Object.assign({}, value)
      },
      deleteSubjectDetails (value) {
        this.addItem = false
        this.editItem = false
        this.dialog = true
        this.deleteItem = true
      },
      addNewSubject() {
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
      getData () {
        const url = '/subjects/'
        // for reference inside promise
        let self = this
        this.$axios.get(url)
          .then (function(response) {
            self.apiDataSubjects = response.data.data
          })
      },
      submitData () {
        const url = '/subjects/'
        // for reference inside promise
        let self = this
        this.$axios.post(url, this.editedItem)
          .then (function(response) {
            console.log('Done')
          })
      },
    }
  }
</script>
