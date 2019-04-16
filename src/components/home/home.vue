<template>
    <v-container>
        <v-layout>
            <v-flex xs12>
                <v-card>

                    <v-list subheader>
                        <v-toolbar color="teal" dark>
                            <v-toolbar-title>Все опросы</v-toolbar-title>
                        </v-toolbar>
                        <v-flex xs12 sm6>
                            <div class="text-xs-center">
                                <div>
                                    <v-btn color="warning" dark large to="/new-survey">Создать новый</v-btn>
                                </div>
                            </div>
                        </v-flex>
                    </v-list>

                    <v-divider></v-divider>

                    <v-list
                    >
                        <v-list-tile @click="">
                            <v-list-tile-action>
                                <v-checkbox v-model="notifications"></v-checkbox>
                            </v-list-tile-action>
                            <v-list-tile-content @click="notifications = !notifications">
                                <v-list-tile-title> название опроса</v-list-tile-title>
                                <v-list-tile-sub-title>описание</v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data: () => ({
        }),
        methods: {
        }
    }
</script>

<style>

</style>
