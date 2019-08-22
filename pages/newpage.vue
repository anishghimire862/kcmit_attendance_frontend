<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          dark
          v-on="on"
        >
        {{  getEventStatus }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="item in filterList"
          :key="item.id"
          @click="event = !event"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <template>
      {{Object.values(response)}}
      <v-data-table
        :headers="headers"
        :items="Object.values(response)"
      >
      </v-data-table>
    </template>
    <div
      v-for="item in title"
      :key="item.id"
    >
      <card :title="item.text" />
    </div>
  </div>
</template>
<script>
  import Card from '@/components/card'
  export default {
    components: {
      Card
    },
    data: () => ({
      title: [
        { text: 'Hello' },
        { text: 'Word' }
      ],
      event: true,
      items: [
        { title: 'Enable' },
        { title: 'Disable' }
      ],
      eventDetail: '',
      headers: [
        { text: 'Date', value: 'date' },
        { text: 'Break In', value: 'break_in' },
        { text: 'Break Out', value: 'break_out' }
      ],
      response: {
        "0": {
          date: '2019-01-01',
          break_in: 'aaa',
          break_out: 'aa',
          pairs: [
            { break_in: '09:00:00am', break_out: '09:12:00am' },
            { break_in: '09:00:00am', break_out: '09:12:00am' },
            { break_in: '09:00:00am', break_out: '09:12:00am' }
          ]
        },
        "1": {
          date: '2019-01-02',
          pairs: [
            { break_in: '09:00:00am', break_out: '09:12:00am' },
            { break_in: '09:00:00am', break_out: '09:12:00am' }
          ]
        },
        "2": {
          date: '2019-01-03',
          pairs: [
            { break_in: '09:00:00am', break_out: '09:12:00am' }
          ]
        }
      },
      // <!-- {{ response['0'].pairs.length }} -->
      // {{ Object.values(response) }}
    }),
    computed: {
      getEventStatus() {
        return this.event ? 'Enabled' : 'Disabled'
      },
      filterList () {
        if(this.event)
          return this.items.filter(list => list.title !== 'Enable')
        else
          return this.items.filter(list => list.title !== 'Disable')
      }
    },
    mounted () {
      console.log(Object.values(this.response))
      for(let i=0; i<3; i++) {
        console.log(Object.values(this.response[i].pairs))
      }
    },
    methods: {
      toggle() {
        this.event = !this.event ? true : false
      }
    }
  }
</script>
