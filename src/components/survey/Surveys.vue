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


                    <template
                            v-if="$session.exists()"
                            v-for="value in data"
                    >
                        <v-btn block color="primary" @click="GoToSurvey(value)">
                            {{ value.name }}
                            <!--<br><span class="caption"><br> w: {{ 0 + ' '}} </span>-->
                            <!--<span class="caption"><br> M: {{ 0 }} </span>-->
                        </v-btn>
                    </template>

            </v-card>
</template>

<script>
import axios from 'axios'
    export default {
        data() {
            return {
                data: null,
                eSputnicEmail: []
            };
        },
        mounted() {
            if ( ! navigator.onLine) {
                console.log ('OFFline now');
                this.data = JSON.parse(localStorage.storeApi);
            } else {
                console.log ('online now');
                this.fetchDataForToday();
                this.SendtoBack();
            }
        },
        methods: {
            fetchDataForToday() {
                axios
                    .get("https://172.16.12.104:9008/api/all")
                    .then(response => {
                        localStorage.storeApi = JSON.stringify(response.data);
                        this.data = response.data
                    });
            },
            GoToSurvey (value) {
                this.$store.state.test = value;
                this.$router.push('/survey/' + value.id)
            },
            SendtoBack () {
                if (localStorage.respondentAnswer!= '') {
                    axios.post("https://172.16.12.104:9008/api/respondents", JSON.parse(localStorage.respondentAnswer))
                        .then(res => {
                            console.log ('Send to Back!');
                            window.localStorage.removeItem("respondentAnswer");
                            this.eSputnicEmail = localStorage.eSputnicEmail;
                            // console.log(this.eSputnicEmail);
                            this.sendToSputnic(this.eSputnicEmail);
                        })
                }
            },
            sendToSputnic (value) {
                value= value.split(",");
                console.log (value);
                if (value.length !== 0) {
                    for (let i=0; i < value.length; i++) {
                        if (value[i] != '') {
                            axios.post("https://esputnik.com.ua/api/v1/event", {
                                    "eventTypeKey" : "ApplicationOffline",
                                    "keyValue" : value[i],
                                    "params": [
                                        {
                                            "name": "EmailAddress",
                                            "value": value[i]
                                        }
                                    ]

                                },
                                {
                                    auth: {
                                        username: 'techodom.api@esputnik.com.ua',
                                        password: 'techno123dom'
                                    }
                                })
                                .then(res => console.log('Send to eSputnic!'))
                        }
                    }
                }
                window.localStorage.removeItem("eSputnicEmail");
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

