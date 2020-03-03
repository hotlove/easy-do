<template>
    <div class="sign-info">
        <div class="sign-info-calendar">
            <el-calendar v-model="currentDate">
                <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
                <template slot="dateCell" slot-scope="{date, data}">
                    <span class="calendar-item" :class="data.isSelected ? 'is-selected' : ''" @click="showAlert">
                        {{ $moment(date).format('DD') }} {{ data.isSelected ? '✔️' : ''}}
                    </span>
                </template>
            </el-calendar>
        </div>
    </div>
</template>
<script lang="ts">
    import {Vue, Component, Watch} from 'vue-property-decorator';

    @Component
    export default class SignInfo extends Vue{
        private currentDate: Date = new Date();

        @Watch('currentDate')
        public onCurrentDateChange() {
            console.log(this.currentDate);
        }

        public showAlert(): void {

        }
    }
</script>
<style lang="scss">
    .sign-info {
        .sign-info-calendar {
            width: 100%;
            height: calc(100vh - 223px);

            .calendar-item {
                display: inline-block;
                width: 100%;
                height: 100%;
                padding: 8px;
            }

            .is-selected {
                color: #1989FA;
            }

            .el-calendar {
                background: #fcfcfc;
            }

            .el-calendar__header {
                padding: 5px 10px;
            }

            .el-calendar-table .el-calendar-day {
                height: auto;
                padding: 0;
            }
        }

        .sign-info-desc {
            width: 100%;
            height: 190px;

            .sign-info-desc-title {
                width: 100%;
                height: 30px;
                box-shadow:0 -5px 10px -8px #000;
                border-bottom: 1px solid #e2e2e2;
            }

            .sign-info-desc-content {
                width: 100%;
                height: 134px;
            }
        }
    }
</style>
