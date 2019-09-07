<template>
  <v-app
    class="background-color"
  >
    <v-card
    >
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant="miniVariant"
        :clipped="clipped"
        fixed
        app
        color="#e7e7e7"
      >
        <v-list-item
          dense
        >
          <v-list-item-content
            dense
          >
            <v-list-item-title class="title body-1">
              KCMIT Attendance
            </v-list-item-title>
            <v-list-item-subtitle
              class="subtitle"
              v-if="user"
            >
              Welcome, {{ user }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list
          v-if="user === 'admin'"
          dense
        >
          <v-list-item
            v-for="(item, i) in adminItems"
            :key="i"
            :to="item.to"
            router
            dense
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list
          v-if="user === 'teacher'"
          dense
        >
          <v-list-item
            v-for="(item, i) in teacherItems"
            :key="i"
            :to="item.to"
            router
            dense
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="primary"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        v-if="drawer"
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-icon
        v-if="isUserLoggedIn"
        @click="logout"
        color="white"
      >
        mdi-logout
      </v-icon>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; 2019 KCMIT</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      adminItems: [
        {
          icon: 'mdi-newspaper',
          title: 'Attendance',
          to: '/selection'
        },
        {
          icon: 'mdi-account',
          title: 'Students',
          to: '/admin/students'
        },
        {
          icon: 'mdi-account-check',
          title: 'Teachers',
          to: '/admin/teachers'
        },
        {
          icon: 'mdi-book-open-page-variant',
          title: 'Subjects',
          to: '/admin/subjects'
        },
        {
          icon: 'mdi-account',
          title: 'Student Semesters',
          to: '/admin/student-semester'
        },
        {
          icon: 'mdi-account-check',
          title: 'Teacher Subjects',
          to: '/admin/teacher-subject'
        }
      ],
      teacherItems: [
        {
          icon: 'mdi-apps',
          title: 'Attendance',
          to: '/selection'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'View Attendance',
          to: '/sheet'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'KCMIT',
    }
  },
  methods: {
    async logout () {
      await this.$auth.logout()
    }
  },
  computed: {
    isUserLoggedIn () {
      return this.$auth.loggedIn
    },
    user () {
      if(this.$auth.loggedIn)
        return this.$auth.user.role
    }
  }
}
</script>
<style scoped>
  .background-color {
    background-color: #e7e7e7
  }
</style>
