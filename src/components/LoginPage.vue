<template>
    <v-container>
        <v-layout
                text-xs-center
                wrap
        >
            <v-flex xs12>
                <h3 class="display-1 font-weight-bold mb-3">
                    Вход в админку
                </h3>
            </v-flex>
            <v-flex mb-4>
                <v-text-field
                        label="Логин"
                        single-line
                        prepend-icon="person"
                        v-model="email"
                ></v-text-field>
                <v-text-field
                        :type="'password'"
                        label="Пароль"
                        single-line
                        prepend-icon="lock"
                        v-model="password"
                ></v-text-field>
                <v-btn
                        color="success"
                        round
                        center
                        @click="Login()">
                    Войти</v-btn>
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data: () => ({
            email: '',
            password: '',
            online: false
        }),
        methods: {
            Login () {
                if (this.email === 'admin' && this.password === 'admin') {
                    this.online = true
                    this.$session.start()
                    this.$router.push('/home')
                } else alert('неверный пароль или логин')
            }
        }
    }
</script>

<style>

</style>
