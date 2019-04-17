<template>
    <v-card flat>
        <v-toolbar
                color="primary"
                dark
                extended
                flat
        >
            <v-toolbar-side-icon @click="goBack()">
                <v-icon>keyboard_arrow_left</v-icon>
            </v-toolbar-side-icon>
        </v-toolbar>

        <v-layout row pb-2>
            <v-flex xs10 offset-xs1>
                <v-card class="card--flex-toolbar">
                    <v-toolbar card prominent>
                        <v-toolbar-title class="body-2 orange--text">{{ test.title }}</v-toolbar-title>

                        <v-spacer></v-spacer>
                    </v-toolbar>

                    <v-divider></v-divider>

                    <v-card-text>
                        <template v-for="quest in test.questions">
                            <p class="title">{{ quest.question  }}</p>
                            <v-text-field
                                    v-if="quest.type==0"
                                    label="Краткий ответ"
                                    single-line
                                    :rules="[rules.required]"
                            ></v-text-field>
                            <v-textarea
                                    v-if="quest.type==1"
                                    rows="2"
                                    box
                                    auto-grow
                                    label="Развернутый ответ"
                                    :rules="[rules.required]"
                            ></v-textarea>
                            <v-text-field
                                    v-if="quest.type==2"
                                    label="Email"
                                    :rules="[rules.required, rules.email]"
                                    single-line
                            ></v-text-field>
                            <v-text-field
                                    v-if="quest.type==3"
                                    label="ИИН"
                                    :mask="IINmask"
                                    single-line
                                    :rules="[rules.required]"
                            ></v-text-field>
                            <v-text-field
                                    v-if="quest.type==4"
                                    label="Целое число"
                                    :mask="IINmask"
                                    single-line
                                    :rules="[rules.required]"
                            ></v-text-field>
                            <v-text-field
                                    v-if="quest.type==5"
                                    label="Дробное число"
                                    single-line
                                    :rules="[rules.required]"
                            ></v-text-field>
                            <v-text-field
                                    v-if="quest.type==7"
                                    label="День/Месяц/Год"
                                    :mask="date"
                                    single-line
                                    :rules="[rules.required]"
                            ></v-text-field>
                            <v-text-field
                                    v-if="quest.type==8"
                                    label="+7 (---) --- ----"
                                    :mask="phone"
                                    single-line
                                    :rules="[rules.required]"
                            ></v-text-field>
                            <template v-if="quest.type==6">
                                <v-radio-group>
                                    <v-radio
                                            v-for="n in quest.answer"
                                            :key="n.id"
                                            :label="`${n.name}`"
                                            :value="n.id"
                                    ></v-radio>
                                </v-radio-group>
                            </template>
                            <template v-if="quest.type==9">
                                <v-checkbox
                                        v-for="n in quest.answer"
                                        :key="n.id"
                                        :label="`${n.name}`"
                                        :value="n.id"
                                ></v-checkbox>
                            </template>
                        </template>
                        <v-btn block color="primary" @click="">Отправить
                        </v-btn>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-card>
</template>
<script>
    export default {
        data () {
            return {
                IINmask: '#############',
                phone: '+7 (###) ### - ####',
                date: '##/##/##',
                rules: {
                    required: value => !!value || 'Обязательное поле',
                    counter: value => value.length <= 20 || 'Max 20 characters',
                    email: value => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        return pattern.test(value) || 'Некорректный e-mail.'
                   }
                }
            }
        },
        computed: {
            test () {
                return this.$store.state.test
            }
        },
        methods: {
            goBack() {
                this.$router.push('/')
            }
        }
    }
</script>

<style>
.card--flex-toolbar {
    margin-top: -64px;
}
</style>
