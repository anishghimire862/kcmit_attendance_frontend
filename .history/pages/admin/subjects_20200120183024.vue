<template>
  <div>
    <list
      :headers="headers"
      :items="apiDataSubjects"
      :list-title="listTitle"
      :expand-table="true"
      @edit="editSubjectDetails"
      @delete="deleteSubjectDetails"
      @add="addNewSubject"
      @clickedAssignTeacher="clickedAssignTeacher"
    >
      <template v-slot:subject>
        <v-row no-gutters>
          <v-col md-6 sm-12>
            <div class="pa-2">
              <v-autocomplete
                label="Teacher"
                :items="teachers"
                item-text="name"
                item-value="id"
                v-model="teacherId"
              ></v-autocomplete>
              <v-select
                :items="semesters"
                v-model="semester"
                label="Semester"
              ></v-select>
              <v-select
                :items="faculties"
                v-model="faculty"
                label="Faculty"
              ></v-select>
              <div
                class="text-right"
              >
                <v-btn
                  class="ma-2"
                  outlined
                  color="indigo"
                  @click="assignTeacher"
                >
                  Submit
                </v-btn>
              </div>
            </div>
          </v-col>
          <v-divider
            vertical
            color="primary"
          > </v-divider>
          <v-col md-6 sm-12>
            <p class="caption grey--text pl-2"> This subject has been assigned to the following teachers: </p>
            <v-list class="pa-0 ma-0" v-if="subjectDetails.length">
              <v-list-item
                v-for="item in subjectDetails"
               :key="item.id"
              >
                <v-list-item-avatar>
                  <img :src="'http://localhost:8001/' +item.teacherImage" />
                </v-list-item-avatar>

                <v-list-item-content class="subtitle">
                  <v-list-item-title v-text="item.teacherName"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <span v-else>
              <p class="subtitle pl-2"> N/A </p>
            </span>
          </v-col>
        </v-row>
      </template>
    </list>
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
            @click="deleteSubject"
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
    </v-dialog>
    <v-snackbar/>
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
        deleteDialog: false,
        url: '',
        headers: [
          { text: 'Subject Code', value: 'subject_code' },
          { text: 'Subject Name', value: 'subject_name' },
          { text: 'Actions', value: 'actions', sortable: false },
          { text: '', value: 'data-table-expand' }
        ],
        listTitle: 'Subjects',
        editItem: false,
        addItem: false,
        deleteItem: false,
        editedItem: {
          subject_code: '',
          subject_name: ''
        },
        apiDataSubjects: [],
        subjectDetails: [],
        deleteItemId: null,
        teachers: [],
        semesters: [1,2,3,4,5,6,7,8],
        semester: null,
        faculties: ['BIM', 'BBA', 'BCA'],
        faculty: null,
        teacherId: '',
        subjectId: ''
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
        this.dialog = false
        this.deleteItem = true
        this.deleteDialog = true
        this.deleteItemId = value.id
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
        if(this.editItem) {
          this.$axios.patch(url, this.editedItem)
            .then (function(response) {
              self.$toast('Subject updated successfully')
              self.getData()
              self.close()
            })
        } else {
          this.$axios.post(url, this.editedItem)
            .then (function(response) {
              self.$toast('Subject added successfully')
              self.getData()
              self.close()
            })
        }
      },
      deleteSubject () {
        const url = '/subjects/' + this.deleteItemId
        let self = this
        this.$axios.delete(url)
          .then(function (response) {
            self.$toast('Subject deleted successfully.')
            self.getData()
          })
          .catch(function (error) {
            self.$toast.error('There was a problem.')
          })
          .finally(function() {
            self.deleteDialog = false
          })
      },
      clickedAssignTeacher(val) {
        console.log(val)
        this.subjectId = val.item.id;
        console.log(this.subjectId)
        const url = '/subject_details/' + this.subjectId
        // for reference inside promise
        let self = this
        this.$axios.get(url)
          .then (function(response) {
            self.subjectDetails = response.data.data
            self.getTeachers()
        })
      },
      getTeachers () {
        const url = '/teachers/'
        let self = this
        this.$axios.get(url)
          .then (function(response) {
            self.teachers = response.data.data
          })
      },

      assignTeacher() {
        let subject = this.subjectId
        let semester = this.semester
        let faculty = this.faculty
        let teacher = this.teacherId
        let url = '/teacher_subjects'

        let self = this

        this.$axios.post(url, {subjectId: subject, semester: semester, faculty: faculty, teacherId: teacher })
          .then (function(response) {
            // console.log('response' +response)
            // self.subjectDetails.push(response.data)
            // console.log('arr'+ self.subjectDetails)
            self.clickedAssignTeacher(subject)
        })
      },

      closeDeleteDialog () {
        this.deleteDialog = false
      }
    }
  }
</script>
