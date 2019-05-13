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
                        <v-toolbar-title class="body-2 orange--text">{{ test.name }}</v-toolbar-title>

                        <v-spacer></v-spacer>
                    </v-toolbar>

                    <v-divider></v-divider>

                    <v-card-text>
                        <v-form
                                ref="form"
                                v-model="valid"
                                lazy-validation
                        >
                        <template v-for="quest in test.Questions">
                                <p class="title"> {{ quest.name  }}</p>
                                <v-text-field
                                        v-if="quest.type==0"
                                        label="Краткий ответ"
                                        :rules="[rules.required, rules.counter]"
                                        v-model="quest.Answers"
                                ></v-text-field>
                                <v-textarea
                                        v-if="quest.type==1"
                                        rows="2"
                                        box
                                        auto-grow
                                        label="Развернутый ответ"
                                        :rules="[rules.required]"
                                        v-model="quest.Answers"
                                ></v-textarea>
                                <v-text-field
                                        v-if="quest.type==2"
                                        label="Email"
                                        :rules="[rules.required, rules.email]"
                                        single-
                                        v-model="quest.Answers"
                                ></v-text-field>
                                <v-text-field
                                        v-if="quest.type==3"
                                        label="ИИН"
                                        :mask="IINmask"
                                        single-line
                                        :rules="[rules.required]"
                                        v-model="quest.Answers"
                                ></v-text-field>
                                <v-text-field
                                        v-if="quest.type==4"
                                        label="Целое число"
                                        :mask="IINmask"
                                        single-line
                                        :rules="[rules.required]"
                                        v-model="quest.Answers"
                                ></v-text-field>
                                <v-text-field
                                        v-if="quest.type==5"
                                        label="Дробное число"
                                        single-line
                                        :rules="[rules.required]"
                                        v-model="quest.Answers"
                                ></v-text-field>
                                <v-text-field
                                        v-if="quest.type==7"
                                        label="День/Месяц/Год"
                                        :mask="date"
                                        single-line
                                        :rules="[rules.required]"
                                        v-model="quest.Answers"
                                ></v-text-field>
                                <v-text-field
                                        v-if="quest.type==8"
                                        label="+7 (---) --- ----"
                                        :mask="phone"
                                        single-line
                                        :rules="[rules.required]"
                                        v-model="quest.Answers"
                                ></v-text-field>
                                <!--<template v-if="quest.type==6">-->
                                    <!--<v-radio-group>-->
                                        <!--<v-radio-->
                                                <!--v-for="n in quest.Answers"-->
                                                <!--:label="`${n.name}`"-->
                                                <!--:value="n.id"-->
                                        <!--&gt;</v-radio>-->
                                    <!--</v-radio-group>-->
                                <!--</template>-->
                                <template v-if="quest.type==9">
                                    <v-checkbox
                                        v-for="n in quest.Answers"
                                        :label="`${n.name}`"
                                        :value= false
                                        :key= false
                                        v-model="n.checked"
                                        required
                                    ></v-checkbox>
                                </template>
                        </template>
                        </v-form>
                        <v-btn block color="primary"
                               @click="validate"
                        >
                            Отправить
                        </v-btn>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-card>
</template>
<script>
    import axios from 'axios'
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
                },
                connectivityStatus: true,
                valid: false,
                email: '',
                respondentanswer: {
                    id: null,
                    name: '',
                    content: '',
                    surveyId: ''
                }
            }
        },
        created() {
            window.addEventListener('offline', () => {
                this.connectivityStatus = false;
            })
            window.addEventListener('online', () => {
                this.connectivityStatus = true;
            })

        },
        computed: {
            test () {
                return this.$store.state.test
            }
        },
        methods: {
            goBack() {
                this.$router.push('/')
            },
            validate () {
                // if (this.$refs.form.validate()) {
                //     this.snackbar = true;
                //     this.Send()
                // }
                let value = 0;
                let question = '';
                let answer = '';
                for (value; value< this.test.Questions.length; value++) {
                    if (this.test.Questions[value].type == 2) {
                        this.email = this.test.Questions[value].Answers;
                    }
                    question = this.test.Questions[value].name;
                    answer = this.test.Questions[value].Answers;
                    this.respondentanswer.content += "<h3>" + question + "</h3>";
                    this.respondentanswer.content += "<p>" + answer + "</p>";
                }
                this.Send()
            },
            Send() {
                this.respondentanswer.name = this.email;
                this.respondentanswer.surveyId = this.test.id;
                this.respondentanswer.userId = localStorage.userId;
                localStorage.respondentAnswer = JSON.stringify(this.respondentanswer);
                var emails= [];
                emails.push(this.respondentanswer.name);
                emails.push(localStorage.eSputnicEmail);
                localStorage.eSputnicEmail = emails;
                this.$refs.form.reset();
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
