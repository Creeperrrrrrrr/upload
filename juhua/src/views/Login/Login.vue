<template>
  <div class="login" :style="{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}">
		<div :style="{fontSize:'30px',marginBottom:'30px'}">百旺模拟器</div>
		<div :style="{width:'370px'}">
			<a-form @submit.prevent="doLogin" :form="form">
        <div>
          <a-form-item>
            <a-input size="large"  v-decorator="[
              'username',
              {rules: [{ required: true, message: '请输入账户名', whitespace: true}]}
              ]"
            >
              <a-icon slot="prefix" type="user"></a-icon>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input v-decorator="[
                'password',
                {rules: [{ required: true, message: '请输入密码', whitespace: true}]}
              ]" size="large" type="password"
            >
              <a-icon slot="prefix" type="lock"></a-icon>
            </a-input>
          </a-form-item>
        </div>
      <a-form-item>
        <a-button :loading="loading" style="width: 100%; margin-top: 4px" size="large" htmlType="submit" type="primary">
          登录
        </a-button>
      </a-form-item>
    </a-form>
		</div>
    
  </div>
</template>

<script>
import { login } from '@/api/login'
import {mapMutations} from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
			form: this.$form.createForm(this),
			loading:false
    }
	},
  methods: {
		...mapMutations({
      setToken: 'account/setToken',
    }),
    doLogin () {
			const { form: { validateFields } } = this
      validateFields(['username', 'password'], (err, values) => {
        if (!err) {
          this.loading = true
          login(values).then((res) => {
						console.log(res)
						console.log(this.$store)
						this.setToken(res.data.data.token)
						this.$router.push('/main')
          }).catch(() => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .login {
    .icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;
      &:hover {
        color: #189F92;
      }
    }
  }
</style>