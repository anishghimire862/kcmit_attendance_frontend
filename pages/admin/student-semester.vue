<template>
  <div>
    <list
      :headers="headers"
      :items="items"
      :list-title="listTitle"
      @edit="editStudentSemesterDetails"
      @delete="deleteStudentSemesterDetails"
      @add="addNewStudentSemester"
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
                <AutoComplete
                  label="Student"
                  :items="students"
                  :name="editedItem.name"
                />
              </v-col>
              <v-col cols="12">
                <v-select
                  :items="sections"
                  v-model="editedItem.section"
                  label="Select Section"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-select
                  :items="semesters"
                  v-model="editedItem.semester"
                  label="Select Semester"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <DatePicker
                  label="From"
                  :miti="editedItem.from"
                />
              </v-col>
              <v-col cols="12">
                <DatePicker
                  label="To"
                  :miti="editedItem.to"
                />
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
  import DatePicker from "~/components/common/DatePicker.vue"
  import AutoComplete from "~/components/common/AutoComplete.vue"
  export default {
    components: {
      List,
      DatePicker,
      AutoComplete
    },
    data () {
      return {
        dialog: false,
        headers: [
          {
            text: 'S.N.',
            align: 'left',
            sortable: false,
            value: 'sn',
          },
          { text: 'Image', value: 'image' },
          { text: 'Name', value: 'name' },
          { text: 'From', value: 'from' },
          { text: 'To', value: 'to' },
          { text: 'Section', value: 'section' },
          { text: 'Semester', value: 'semester' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        students: ['Anish Ghimire', 'Dipak Raj Badu', 'Saroj Kafle', 'Nimesh Pokhrel'],
        items: [
          {
            name: 'Anish Ghimire',
            image: 'imgpsh_mobile_save.jpeg',
            section: 'A',
            semester: 4,
            from: '2018-01-01',
            to: '2018-06-01'
          },
          {
            name: 'Dipak Raj Badu',
            image: 'imgpsh_mobile_save.jpeg',
            section: 'A',
            semester: 4,
            from: '2018-01-01',
            to: '2018-06-01'
          },
        ],
        listTitle: 'Student Semesters',
        editItem: false,
        addItem: false,
        deleteItem: false,
        editedItem: {
          name: '',
          from: '',
          to: '',
          section: '',
          semester: null
        },
        sections: ['A', 'B'],
        semesters: [1,2,3,4,5,6,7,8],
        apiDataStudents: [],
      }
    },
    computed: {
    formTitle () {
        return this.editItem ? 'Edit Student Semester Details' : 'Add Student Semester Details'
      }
    },
    methods: {
      editStudentSemesterDetails (value) {
        this.dialog = true
        this.addItem = false
        this.editItem = true
        this.editedItem  = Object.assign({}, value)
      },
      deleteStudentSemesterDetails (value) {
        this.addItem = false
        this.editItem = false
        this.dialog = true
        this.deleteItem = true
      },
      addNewStudentSemester() {
        this.dialog = true
        this.editItem = false
        this.addItem = true
        this.editedItem = Object.assign({}, null)
      },
      close () {
        this.dialog = false
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
        const url = '/student_semesters/'
        // for reference inside promise
        let self = this
        this.$axios.post(url, this.editedItem)
          .then (function(response) {
            self.apiDataStudents = response.data.data
          })
      },
    }
  }
</script>
