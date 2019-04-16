<template>
            <v-card
                    flat
                    tile
            >
                <v-toolbar
                        color="cyan"
                        dark
                >
                    <v-toolbar-side-icon to="/login">
                        <v-icon>accessibility</v-icon>
                    </v-toolbar-side-icon>
                    <v-toolbar-title>Добро пожаловать!</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>


                    <template v-for="value in Json.surveys">
                        <v-btn block color="primary" @click="GoToSurvey(value)">
                            {{ value.title }}
                        </v-btn>
                    </template>

            </v-card>
</template>

<script>
import Json from './in.json';
    export default {
        data: () => ({
            Json
        }),
        methods: {
            CreateLink (value) {
                return '/survey/' + value
            },
            GoToSurvey (value) {
                this.$store.state.test = value
                this.$router.push('/survey/:slug')
            }
        }
    }
console.log(Json);
</script>

<style scoped>
</style>
