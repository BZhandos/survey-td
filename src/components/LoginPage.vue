<template>
    <v-container>
        <v-layout
                text-xs-center
                wrap
                v-if="!$session.exists()"
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
        <v-layout
                text-xs-center
                wrap
                v-if="this.$session.exists()"
        >

            <v-flex xs12>
                <h3 class="display-1 font-weight-bold mb-3">
                    Выход из учетной записи
                </h3>
            </v-flex>
            <v-flex mb-4>
                <v-btn
                        color="info"
                        round
                        center
                        large
                        @click="Stay()">
                    Вернутся</v-btn>
            </v-flex>
            <v-flex mb-4>
                <v-btn
                        color="error"
                        round
                        center
                        large
                        @click="LogOut()">
                    Выйти</v-btn>
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data: () => ({
            email: '',
            password: '',
        }),
        methods: {
            Login () {
                if (this.email === 'admin' && this.password === 'admin') {
                    this.$session.start();
                    this.$router.push('/')
                } else alert('неверный пароль или логин')
            },
            LogOut () {
                this.$session.destroy()
                this.$router.push('/')
            },
            Stay () {
                this.$router.push('/')
            }
        }
    }
</script>

<style>

</style>
