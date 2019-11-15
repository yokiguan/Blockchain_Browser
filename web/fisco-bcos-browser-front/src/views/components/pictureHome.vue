<template>
    <div class="picture-home" >
        <div class="container">
            <div class="picture-home-head">
                <!--blockChain Statistics-->
                <div class="picture-home-head-data"
                     v-loading="loading1" element-loading-text="数据加载中..."  element-loading-background="rgba(0, 0, 0, 0.8)">
                    <ul>
                        <li v-for="item in totalPictureList" :class="item.class" @click="linkPage(item.route,chainType)" :key="item.label" class="picture-lg-width">
                            <span class="picture-home-head-data-label">{{item.label}}</span>
                            <span class="picture-home-head-data-content"> {{item.value}}</span>
                        </li>
                    </ul>
                </div>
                <!--Chart statistics-->
                 <div class="picture-home-head-chart margin-left-10" ref="chart" v-loading="loading2"  element-loading-text="数据加载中..." element-loading-background="rgba(0, 0, 0, 0.8)">
                    <v-chart ref="linechart" :type="'line'" :id="'homeId'" :data="chartStatistics.date"
                             :transactionDataArr="chartStatistics.dataArr" :size="chartStatistics.chartSize" :title="'home'"></v-chart>
                </div>
            </div>
           <!--Node statistics-->
        </div>
    </div>
</template>
<style>
    .picture-home{
        width: 80%;
        background-image: url("../../assets/images/header-ng.png");
        float: right;
    }
    .picture-home-head{
        font-size: 0;
    }
    .picture-home-head-data{
        width: calc(100% - 0px);
        height: 100px;
        padding: 10px;
        background-color: #3300FF;
        vertical-align: middle;
        background-image: url("../../assets/images/header-ng.png");
    }
        .picture-lg-width{
            width: 21.5%;
        }
    .picture-home-head-data ul{
        list-style: none;
        margin: 0;
        padding: 0;
        background-image: url("../../assets/images/bg-one.png");
    }
    .picture-home-head-data ul li{
        display: inline-block;
        height: 120px;
        padding: 25px 12px;
        font-size: 14px;
        cursor: pointer;
        color: #fff;
        box-sizing: border-box;
        background-image: linear-gradient(-90deg, #29bdd9 0%, #276ace 100%);
        text-shadow: 0 0 20px #fdec84,
                     10px -10px 30px #ffae35,
                     20px -20px 40px #ec760c,
                     -20px -60px 50px #cd4607,
                     0px -80px 60px #973717,
                     10px -40px 70px #451b0e;
    }

    .picture-home-head-data-label{
        color: white;
        font-size: 18px;
    }

    .picture-home-head-data-content{
        display: block;
        color: white;
        font-size: 40px;
        text-align: right;
    }
    
   .picture-home-head-chart{
        padding-top: 200px;
        width: calc(59% - 10px) !important;
        height: 300px;
        vertical-align: middle;
    }

    .picture-home-head-chart .el-picture__inner{
        background-color: #fff;
        color: #fff;
        background-image: url("../../assets/images/header-ng.png");
    }

    .picture-home-head-chart .el-range-picture{
        background-color: #3300FF;
        color: #fff;
    }.el-range-separator{
        color: #fff !important;
    }

    @media screen and (max-width: 1000px){
        .home-head-data{
            display: inline-block;
            width: calc(41% - 10px);
            box-sizing: border-box;
            padding: 10px 10px;
            background-color: #3b3e54;
            vertical-align: middle;
        }
        .home-head-chart{
            width: calc(59% - 10px) !important;
            height: 270px;
            vertical-align: middle;
        }
        .home-head-data-content{
            display: block;
            color: white;
            padding-top: 10px;
            font-size: 24px;
            text-align: right;
        }
        .home-head-data ul li{
            display: inline-block;
            height: 110px;
            padding: 25px 10px;
            font-size: 14px;
            cursor: pointer;
            color: #fff;
            box-sizing: border-box;
        }
        .home-foot-box-content .item{
            border-bottom: 1px solid #999;
            overflow: hidden;
            line-height: 28px;
            padding: 12px 20px;
        }
        .home-foot-box-content .item .transaction{
            width: 200px;
            overflow: hidden;
            text-overflow: ellipsis !important;
            white-space: nowrap !important;  
            vertical-align: middle;
        }
        .home-foot-box-content .number{
            display: inline-block;
            width: 85px;
            overflow: hidden;
            text-overflow: ellipsis !important;
            white-space: nowrap !important;  
            vertical-align: middle;
        }
        .home-foot-box-content .item .txn {
            float: right;
            width: 70px;
            height: 28px;
            line-height: 28px;
            background-color: #2196f3;
            color: #fff;
            text-align: center;
            cursor: pointer;
        }
    }
</style>
<script type="text/babel">
    import {getTbBlcokChainInfo,getdatalately,gettradelately,getTxnByLastFourteenDay,getdataamount,gettrade,getcopy,getauth} from '@/api/api'
    import { Message } from 'element-ui';
    import {message} from '@/util/util'
    import {timeState,MonthState,MonthNumber,intiDate} from '@/util/util'
    import {goPage} from '@/util/util'
    import {spliceData} from '@/util/util'
    import url from '@/api/url'
    import charts from '@/components/chart'
    import router from '@/router'
    import constant from '@/util/constant'
    import errorcode from "@/util/errorCode"
    import '@/assets/css/layout.css'
    import '@/assets/css/public.css'

    let minMonthDate = null;
    let maxMonthDate = null;
    let dateTimeBegin = timeState((new Date()).getTime());
    let dataTimeEnd = timeState((new Date()).getTime()-14*24*3600*1000);
    let monthNumber = MonthNumber((new Date()).getTime());

    export default {
        name: 'home',
        components: {
            'v-chart': charts
        },
        data: function () {
            return {
                totalPictureList: constant.TOTAL_PICTURE_LIST,
                chartStatistics: {
                    chartSize:{
                        width: 0,
                        height: 0
                    },
                    date: [],
                    dataArr: [],
                    show: false,
                    // time: months,
                },
                TbNodesList: [],
                blockList: [],
                transactionList: [],
                loading1: false,
                loading2: false,
                loading3: false,
                loading4: false,
                loading5: false,
                loading6: false,
                chainType: this.$route.query.chainType || "01",
                setInterval: {
                    timer1: null,
                    timer2: null,
                    timer3: null,
                    timer4: null,
                    timer5: null,
                    timer6: null,
                    timer7: null,
                },
                setSetIntervaling: false,
                groupId: null,
                tranList: [],
                codeList: [],
                newData: [],
                oladata: ""
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.groupId = localStorage.getItem("groupId")
                if(this.groupId){
                    // this.getContracts();
                    this.chartStatistics.chartSize.width = this.$refs.chart.offsetWidth;
                    this.chartStatistics.chartSize.height = this.$refs.chart.offsetHeight;
                    this.searchFourteenDayTrade();
                    this.searchgetdatalately();
                    this.searchTbBlcokChainInfo();
                    this.searchgetdataamount();
                    this.searchgettrade();
                    this.searchgetcopy();
                    this.searchgetauth();
                }    
            });
        },
        //Clear all timers before component destruction
        beforeDestroy: function () {
            this.clear();
            window.localStorage.setItem('project',"");
            window.localStorage.setItem('chain',"");
        },
        watch: {
            setSetIntervaling: function () {
                this.setSetInterval();
            }
        },
        methods: {
            copyPubilcKey: function(val){
                if (!val) {
                this.$message({
                    type: "fail",
                    showClose: true,
                    message: "key为空，不复制。",
                    duration: 2000
                });
            } else {
                this.$copyText(val).then(e => {
                    this.$message({
                        type: "success",
                        showClose: true,
                        message: "复制成功",
                        duration: 2000
                    });
                });
            }
            },
            changChart: function (val) {
                this.chartStatistics.time = MonthState(val);
                this.searchFourteenDayTrade()
            },
            dateBlur: function (val) {
                if(val.value && val.value.length){
                    let time1 = (new Date(val.value[0])).getTime();
                    let time2 = (new Date(val.value[1])).getTime();
                    let times = time2 - time1;
                    let monthTime = 29*24*3600*1000;
                    if(times > monthTime){
                        time2 = time1 + monthTime
                    }
                   val.value[1] = timeState(time2)
                }
            },
            //create timer
            setSetInterval: function () {
                this.setInterval.timer1 = window.setInterval(() => {this.searchFourteenDayTrade()}, constant.INTERVALTIME);
                this.setInterval.timer2 = window.setInterval(() => {this.searchTbBlcokChainInfo()}, constant.INTERVALTIME);
                this.setInterval.timer3 = window.setInterval(() => {this.searchgetdataamount()}, constant.INTERVALTIME);
                this.setInterval.timer4 = window.setInterval(() => {this.searchgetauth()}, constant.INTERVALTIME);
                this.setInterval.timer5 = window.setInterval(() => {this.searchgetcopy()}, constant.INTERVALTIME);
                this.setInterval.timer6 = window.setInterval(() => {this.searchgettrade()}, constant.INTERVALTIME);
                this.setInterval.timer7 = window.setInterval(() => {this.searchgetdatalately()}, constant.INTERVALTIME);
            },
            //clear timer
            clear: function () {
                window.clearInterval(this.setInterval.timer1);
                window.clearInterval(this.setInterval.timer2);
                window.clearInterval(this.setInterval.timer3);
                window.clearInterval(this.setInterval.timer4);
                window.clearInterval(this.setInterval.timer5);
                window.clearInterval(this.setInterval.timer6);
                window.clearInterval(this.setInterval.timer7);
                Message.closeAll()
            },
            //Page Jump
            linkPage: function (name,label,data) {
              return goPage(name,label,data);
            },
            tableRowClassName: function () {
              return 'table-style'
            },
            nodeFalse: function (item) {
                if(item.row.active){
                    if(item.row.active === 'false'){
                        return 'node-false'
                    }
                }
            },
            //get blockChain overview ，  start the timer after receiving the correct response
            searchTbBlcokChainInfo : function () {
                this.loading1 = true;
                this.loading6 = true;
                getdataamount(this.groupId).then((res)=>{
                    this.setSetIntervaling = true;
                    localStorage.setItem("pictureamount",res.data.data);
                }).catch(err =>{
                    console.log("err in getdataamount");
                })
            
                this.loading7 = true;
                gettrade(this.groupId).then((res)=>{
                    this.setSetIntervaling = true;
                    localStorage.setItem("picturetrade",res.data.data);
                    //console.log(res.data.data);
                }).catch(err =>{
                    console.log("err in getdataamount");
                })

                this.loading8 = true;
                getcopy(this.groupId).then((res)=>{
                    this.setSetIntervaling = true;
                    localStorage.setItem("picturecopy",res.data.data);
                    //console.log(res.data.data);
                }).catch(err =>{
                    console.log("err in getdataamount");
                })


                this.loading9 = true;
                getauth(this.groupId).then((res)=>{
                    this.setSetIntervaling = true;
                    localStorage.setItem("pictureauth",res.data.data);
                    //console.log(res.data.data);
                }).catch(err =>{
                    console.log("err in getdataamount");
                })


                getTbBlcokChainInfo(this.groupId).then((res) =>{
                    this.setSetIntervaling = true;
                    this.loading1 = false;
                    let data={
                        pictureamount : localStorage.getItem("pictureamount"),
                        picturetrade : localStorage.getItem("picturetrade"),
                        picturecopy : localStorage.getItem("picturecopy"),
                        pictureauth : localStorage.getItem("pictureauth")
                    };
                    //console.log(data.pictureamount);
                    if(res.data.code === 0){
                        if(res.data.data){
                            this.totalPictureList[0].value = data.pictureamount;
                            this.totalPictureList[1].value = data.picturetrade;
                            this.totalPictureList[2].value = data.pictureamount;
                            this.totalPictureList[3].value = data.pictureauth;
                        }else{
                            for (let i = 0; i < this.totalPictureList.length; i++){
                                this.totalPictureList[i].value = 0;
                            }
                        }
                    }else{
                        message(errorcode[res.data.code].cn,'error');
                        for (let i = 0; i < this.totalPictureList.length; i++){
                            this.totalPictureList[i].value = 0;
                        }
                    }
                }).catch(err => {
                    this.clear();
                    this.loading1 = false;
                    for (let i = 0; i < this.totalPictureList.length; i++){
                        this.totalPictureList[i].value = 0;
                    }
                    if(err.response && err.response.status !== 200){
                        message(constant.ERROR,'error');
                    }
                })
            },


            searchgetdatalately: function() {
                let data = {
                    groupId: this.groupId,
                    dateTimeEnd:dataTimeEnd,
                    dateTimeBegin: dateTimeBegin
                };
                getdatalately(data,{}).then(res=>{
                }).catch(err =>{
                    console.log("err in getdatalately");
                })
            },


            //The amount of transaction information to obtain the current group for a certain period of time
            searchFourteenDayTrade: function () {
                this.chartStatistics.show = false;
                this.loading2 = true;
                this.chartStatistics.date = [];
                this.chartStatistics.dataArr = [];
                let data = {
                    groupId: this.groupId,
                    dateTimeEnd:dataTimeEnd,
                    dateTimeBegin: dateTimeBegin
                };
                gettradelately(data,{}).then( res => {
                    // console.log(data.dateTimeEnd);
                    // console.log(dateTimeBegin);
                    //console.log(res.data);
                    this.loading2 = false;
                    if(res.data.code === 0) {
                        if (res.data.data && res.data.data.length){
                            res.data.data = intiDate(res.data.data);
                            for (let i = 0; i < res.data.data.length; i++) {
                                this.chartStatistics.date.push(res.data.data[i].dateStr);
                                this.chartStatistics.dataArr.push(res.data.data[i].txn);
                            }
                        }else{
                            res.data.data = intiDate(res.data.data);
                            for (let i = 0; i < res.data.data.length; i++) {
                                this.chartStatistics.date.push(res.data.data[i].dateStr);
                                this.chartStatistics.dataArr.push(res.data.data[i].txn);
                            }
                        }
                        this.chartStatistics.show = true;
                    }else{
                        this.chartStatistics.show = true;
                        message(errorcode[res.data.code].cn,'error');
                    }
                }).catch(err => {
                    this.clear();
                    this.loading2 = false;
                    if(err.response && err.response.status !== 200){
                        message(constant.ERROR,'error');
                    }
                    this.chartStatistics.show = true;
                })
            },
            dateChange: function () {
                this.searchFourteenDayTrade();
                minMonthDate = null;
                maxMonthDate = null;
            },

        },
        filters: {
            toUpperCase: function(value){
                return value.toUpperCase();
            }
        }
    }
</script>
