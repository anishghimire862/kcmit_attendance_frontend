<template>
  <div>
      <v-card>
        <v-flex
          d-flex
        >
          <v-flex
          >
            <kcmit-image />
          </v-flex>
          <v-flex
            class="mx-5 my-5"
          >
          <v-container fluid fill-height>
            <v-layout align-center justify-center>
              <v-flex>
                <v-form>
                  <v-text-field
                    label="Email"
                    prepend-icon="mdi-mail"
                    v-model="email"
                  >
                  </v-text-field>
                  <v-text-field
                    label="Password"
                    prepend-icon="mdi-lock"
                    v-model="password"
                  >
                  </v-text-field>
                </v-form>
                <div class="text-xs-right">
                  <v-btn @click="submitLogin" color="secondary" width="100">
                    Login
                  </v-btn>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
          </v-flex>
        </v-flex>
      </v-card>
  </div>
</template>
<script>
  import KcmitImage from '@/components/KcmitImage'
  export default {
    components: {
      KcmitImage
    },
    data () {
      return{
        email: '',
        password: ''
      }
    },
    created () {
    if (this.$auth.loggedIn) {
      this.$router.push('/selection')
    }
  },

    methods: {
      async submitLogin() {
        try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })
        this.$router.push('/selection')
      } catch (e) {
        console.log(e + 'error')
      }

      }
    }
  }
</script>
