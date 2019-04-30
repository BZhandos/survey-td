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


                    <template v-for="value in data">
                        <v-btn block color="primary" @click="GoToSurvey(value)">
                            {{ value.name }}
                        </v-btn>
                    </template>

            </v-card>
</template>

<script>
import axios from 'axios'
// import Json from './in.json';
    export default {
        data() {
            return {
                data: null
            };
        },
        mounted() {
            if ( ! navigator.onLine) {
                console.log ('OFFline now');
                this.data = JSON.parse(localStorage.storeApi);
            } else {
                console.log ('online now');
                this.fetchDataForToday();
            }
        },
        methods: {
            fetchDataForToday() {
                axios
                    .get("https://172.16.12.104:9002/api/all")
                    .then(response => {
                        localStorage.storeApi = JSON.stringify(response.data);
                        this.data = response.data
                    });
            },
            GoToSurvey (value) {
                this.$store.state.test = value;
                this.$router.push('/survey/' + value.id)
            }
        },
        // created() {
        //     window.addEventListener('online', () => {
        //         if (this.offlineBank != '') {
        //             axios.post('URL HERE', this.offlineBank)
        //                 .then(res => console.log(res))
        //                 this.offlineBank=''
        //                 .catch(error => console.log(error))
        //         }
        //     })
        // }
    }
</script>

