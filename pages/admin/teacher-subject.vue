<template>
  <div>
    <list
      :headers="headers"
      :items="items"
      :list-title="listTitle"
      @edit="editTeacherSubjectDetails"
      @delete="deleteTeacherSubjectDetails"
      @add="addNewTeacherSubject"
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
                  label="Teacher"
                  :items="teachers"
                  :name="editedItem.name"
                />
              </v-col>
              <v-col cols="12">
                <AutoComplete
                  label="Subject"
                  :items="subjects"
                  :name="editedItem.subject"
                />
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
        url: '',
        headers: [
          { text: 'Image', value: 'image' },
          { text: 'Name', value: 'name' },
          { text: 'Subject', value: 'subject' },
          { text: 'From', value: 'from' },
          { text: 'To', value: 'to' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        teachers: ['Indra PC', 'Harendra Subedi', 'Dinesh Bajhracharya', 'Nimesh Pokhrel'],
        subjects: ['Digital Logic Design', 'C Programming', 'Java', 'Web'],
        items: [
          {
            name: 'Indra PC',
            image: 'imgpsh_mobile_save.jpeg',
            subject: 'Digital Logic Design',
            from: '2018-01-01',
            to: '2018-06-01'
          },
          {
            name: 'Harendra Subedi',
            image: 'imgpsh_mobile_save.jpeg',
            subject: 'C Programming',
            from: '2018-02-01',
            to: '2018-06-01'
          },
          {
            name: 'John Lennon',
            image: 'imgpsh_mobile_save.jpeg',
            subject: 'The Beatles',
            from: '2018-01-01',
            to: '2018-06-01'
          },
          {
            name: 'Ozzy Osbourne',
            image: 'imgpsh_mobile_save.jpeg',
            subject: 'Black Sabbath',
            from: '2018-01-01',
            to: '2018-06-01'
          },
        ],
        listTitle: 'Teacher Subjects',
        editItem: false,
        addItem: false,
        deleteItem: false,
        editedItem: {
          name: '',
          subject: '',
          from: '',
          to: ''
        },
        apiDataTeachers: [],
        apiDataSubjects: []
      }
    },
    computed: {
    formTitle () {
        return this.editItem ? 'Edit Teacher Subject Details' : 'Add Teacher Subject Details'
      }
    },
    created () {
      this.getTeachers()
      this.getSubjects()
    },
    methods: {
      editTeacherSubjectDetails (value) {
        this.dialog = true
        this.addItem = false
        this.editItem = true
        this.editedItem  = Object.assign({}, value)
      },
      deleteTeacherSubjectDetails (value) {
        this.addItem = false
        this.editItem = false
        this.dialog = true
        this.deleteItem = true
      },
      addNewTeacherSubject() {
        this.dialog = true
        this.editItem = false
        this.addItem = true
        this.editedItem = Object.assign({}, null)
      },
      close () {
        this.dialog = false
      },
      getTeachers () {
        const url = '/teachers/'
        // for reference inside promise
        let self = this
        this.$axios.get(url)
          .then (function(response) {
            self.apiDataTeachers = response.data.data
          })
      },
      getSubjects () {
        const url = '/subjects/'
        // for reference inside promise
        let self = this
        this.$axios.get(url)
          .then (function(response) {
            console.log(response.data.data)
            self.apiDataSubjects = response.data.data
          })
      },
    }
  }
</script>
