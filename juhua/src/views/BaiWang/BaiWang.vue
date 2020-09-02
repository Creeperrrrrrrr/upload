<template>
	<a-row>
		<a-form :form="form">
			<a-row :style="{marginLeft:'20px'}" :gutter="16">
				<a-col :span="4">
					<a-form-item>
            <a-date-picker :style="{width:'100%'}" placeholder="开始时间" v-decorator="['timeFrom',{initialValue:now}]" />
          </a-form-item>
				</a-col>
				<a-col :span="4">
					<a-form-item>
            <a-date-picker :style="{width:'100%'}" placeholder="结束时间" v-decorator="['timeTo',{initialValue:now}]" />
          </a-form-item>
				</a-col>
				<a-col :span="3" :style="{lineHeight:'39px'}">
					<a-button type='primary' @click="search" :loading="loading">搜索</a-button>
				</a-col>
			</a-row>
		</a-form>
		<a-table 
			:loading="loading"
			:data-source="data"
			:columns="columns"
			rowKey="id"
			:pagination="false"
			bordered
		>
			<span slot="option" slot-scope="record">
				<a-button type='primary' @click="goInvoice(record)">开票</a-button>
				<a-button type='primary' @click="outInvoice(record)">退票</a-button>
			</span>
			<span slot="amount" slot-scope="record">
				<div>
					{{record.details.length?record.details[0].amount:''}}
				</div>
			</span>
			<span slot="se">
				<div>
					0
				</div>
			</span>
			<span slot="quantity" slot-scope="record">
				<div>
					{{record.details.length?record.details[0].quantity:''}}
				</div>
			</span>
		</a-table>
	</a-row>
</template>

<script>

import { getBWData, openInvoice, refundInvoice } from '@/api/project'
import moment from 'moment'
export default {
	name: 'BaiWang',
	data () {
		return {
			form: this.$form.createForm(this),
			loading:false,
			isgoInvoice:false,
			isOutInvoice:false,
			now:moment().format('YYYY-MM-DD'),
			data:[{name:'张三',details:[{amount:100}]}],
			columns:[
								{
									title: '发票类型',
									dataIndex: 'ivtype',
									align: 'center',
									width: '6%',
								},
								{
									title: '购方名称',
									dataIndex: 'gfmc',
									align: 'center',
									width: '6%',
								},
								{
									title: '合计金额',
									align: 'center',
									width: '6%',
									scopedSlots: { customRender: 'amount' },
								},
								{
									title: '合计税额',
									align: 'center',
									width: '6%',
									scopedSlots: { customRender: 'se' },
								},
								{
									title: '价税合计',
									align: 'center',
									width: '6%',
									scopedSlots: { customRender: 'amount' },
								},
								{
									title: '单据日期',
									dataIndex: 'createtime',
									align: 'center',
									width: '6%',
								},
								{
									title: '发票号码',
									dataIndex: 'yfphm',
									align: 'center',
									width: '6%',
								},
								{
									title: '发票代码',
									dataIndex: 'yfpdm',
									align: 'center',
									width: '6%',
								},
								{
									title: '开票日期',
									dataIndex: 'age',
									align: 'center',
									width: '6%',
								},
								{
									title: '商品细目数量',
									align: 'center',
									width: '6%',
									scopedSlots: { customRender: 'quantity' },
								},
								{
									title: '备注',
									dataIndex: 'age',
									align: 'center',
									width: '6%',
								},
								{
									title: '操作',
									align: 'center',
									width: '10%',
									scopedSlots: { customRender: 'option' },
								},
							]
		}
	},
	mounted(){
		this.loading = true
		getBWData({timeFrom:moment().format('YYYY-MM-DD'),timeTo:moment().format('YYYY-MM-DD')}).then(res=>{
			this.loading = false
			console.log(res)
			this.data = res.data.data
		}).catch(err=>{
			this.loading = false
		})
	},
	methods:{
		search(){
			this.loading = true
			const { form:{getFieldValue} } = this
			const timeFrom = getFieldValue('timeFrom')?moment(getFieldValue('timeFrom')).format('YYYY-MM-DD'):''
			const timeTo = getFieldValue('timeTo')?moment(getFieldValue('timeTo')).format('YYYY-MM-DD'):''
			console.log(timeFrom)
			console.log(timeTo)
			getBWData({timeFrom,timeTo}).then(res=>{
				this.loading = false
				console.log(res)
				this.data = res.data.data
			}).catch(err=>{
			this.loading = false
		})
		},
		goInvoice(record){
			this.$confirm({
				title:'开票',
				content:`确定要给单据${record.ivno}开票么?`,
				onOk:()=>{
					const now=(new Date()).valueOf()
					const data={
						"vTicket": "",
						"vcreatetime": moment().format('YYYY-MM-DD HH:mm:ss'),
						"vdeposer": "",
						"vdeposetime": "",
						"vfpdm": now,
						"vfphm": now,
						"vivno": record.ivno,
						"vmark_depose": 0,
						"vofpdm": record.yfpdm,
						"vofphm": record.yfphm,
						"vred_flag": 0,
						"vtype": 0
					}
					openInvoice({ret_data:data}).then(res=>{
						console.log(res)
						if(res.status===200){
							this.$message.success('开票成功')
							record.isRefund=true
							record.yfpdm = now
							record.yfphm = now
						}
						
					})
				},
				okText:'确定',
				cancelText:'取消'
			})
		},
		outInvoice(record){
			console.log(record)
			if(!record.isRefund){
				this.$message.error('未开票不能退票')
				return
			}

			this.$confirm({
				title:'退票',
				content:`确定要给单据${record.ivno}退票么?`,
				onOk:()=>{
					const data={
						"vTicket": "",
						"vcreatetime": moment().format('YYYY-MM-DD HH:mm:ss'),
						"vdeposer": "",
						"vdeposetime": "",
						"vfpdm": "",
						"vfphm": "",
						"vivno": record.ivno,
						"vmark_depose": 1,
						"vofpdm": record.yfpdm,
						"vofphm": record.yfphm,
						"vred_flag": 0,
						"vtype": 0
					}
					refundInvoice({ret_data:data}).then(res=>{
						console.log(res)
						if(res.status===200){
							this.$message.success('退票成功')
						}
					})
				},
				okText:'确定',
				cancelText:'取消'
			})
			
		}
	}
}
</script>

<style>

</style>