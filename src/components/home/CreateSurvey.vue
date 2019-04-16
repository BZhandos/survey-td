<template>
    <v-container>
        <v-layout>
            <v-flex xs12>
                <v-flex mb-4>
                    <v-text-field
                            label="Новый опрос"
                            single-line
                            prepend-icon="whatshot"
                    ></v-text-field>
                    <v-text-field
                            label="Описание"
                            single-line
                            prepend-icon="waves"
                    ></v-text-field>
                    <v-divider></v-divider>

                    <v-text-field
                            label="Вопрос"
                            single-line
                            prepend-icon="question_answer"
                            v-model="question"
                    ></v-text-field>
                    <v-select
                            :items="items"
                            item-value="id"
                            item-text="name"
                            label="Тип ответа"
                            v-model="defaultSelected"
                    ></v-select>
                    <v-text-field
                            v-if="defaultSelected==0"
                            label="Краткий ответ"
                            single-line
                            disabled
                    ></v-text-field>
                    <v-textarea
                            v-if="defaultSelected==1"
                            rows="3"
                            box
                            auto-grow
                            value="Развернутый ответ"
                            disabled
                    ></v-textarea>
                    <v-text-field
                            v-if="defaultSelected==2"
                            label="email"
                            single-line
                            disabled
                    ></v-text-field>
                    <v-text-field
                            v-if="defaultSelected==3"
                            label="ИИН 12 чисел"
                            single-line
                            disabled
                    ></v-text-field>
                    <v-text-field
                            v-if="defaultSelected==4"
                            label="Целое число"
                            single-line
                            disabled
                    ></v-text-field>
                    <template v-for="value in bank">
                        <p> {{ value.question }}</p>
                    </template>
                    <p> Bank: {{ bank.question }}</p>
                    <v-btn
                            color="success"
                            round
                            center
                            @click="AddQuestion()">
                        Еще вопрос</v-btn>
                </v-flex>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data: () => ({
            items: [
                {"id":0, "name":'Текст (однострочный)'},
                {"id":1, "name":'Текст (многострочный)'},
                {"id":2, "name":'Email адрес'},
                {"id":3, "name":'ИНН (12 чисел)'},
                {"id":4, "name":'Целое число'},
                {"id":5, "name":'Вещественное число'},
                {"id":6, "name":'Список ответов (один вариант ответа)'},
                {"id":7, "name":'Дата'},
                {"id":8, "name":'Телефон'},
                {"id":9, "name":'Список ответов (много вариантов ответа)'},
            ],
            defaultSelected: 0,
            question: '',
            bank: [
                { question: '', type: ''}
            ]
        }),
        methods: {
            AddQuestion () {
                this.bank.question = this.question;
                this.bank.type = this.defaultSelected;
                return this.bank
            }
        }
    }
</script>

<style>

</style>
