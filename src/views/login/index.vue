<template>
  <div class="login">
    <login-header class="header"></login-header>
    <div id="wrapper">
      <div class="title">Agent Admin 2.0</div>
      <div class="form" @keyup.enter.exact="login">
        <el-form ref="formRef" :rules="rules" :model="loginParams" class="EPForm">
          <el-form-item prop="username">
            <el-input
              v-model="loginParams.username"
              class="textInput"
              autofocus
              :placeholder="t('用户名') + '(示例：admin、editor、viewer)'"
              clearable
            />
          </el-form-item>
          <el-form-item prop="password" class="textInput">
            <el-input
              v-model="loginParams.password"
              class="textInput"
              type="password"
              :placeholder="t('密码') + '(任意填写即可)'"
              clearable
              show-password
            />
          </el-form-item>

          <el-button class="submit" type="primary" @click="login">{{ t('login') }}</el-button>
        </el-form>
      </div>

      <div>
        <el-button text @click="dialogVisible = true">
          {{ $t('iForgotMyPassword') }}
        </el-button>
        <el-dialog v-model="dialogVisible" width="30%">
          <el-input v-model="forgotPassword.email" class="textInput" autofocus :placeholder="'Phone'" clearable>
          </el-input>
          <el-input v-model="forgotPassword.code" class="textInput" :maxlength="6" autofocus clearable>
            <template #append>
              <div :v-show="forgotPassword.timer === 60">
                <el-button @click="startTimer">
                  {{ t('requestCode') }}
                </el-button>
              </div>
              <div :v-show="forgotPassword.timer <= 59">
                <el-button>
                  {{ t('resend') }}
                  {{ forgotPassword.timer > 0 ? '(' + forgotPassword.timer + ')' : '' }}
                </el-button>
              </div>
            </template></el-input
          >
          <template #footer>
            <span class="dialog-footer">
              <el-button type="primary"> {{ t('nextStep') }} </el-button>
            </span>
          </template>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="Login">
import LoginHeader from './components/header.vue';
import { LoginParams } from '@/api/user';
import { useLocalesI18n } from '@/locales/i18n';
import type { FormInstance, FormRules } from 'element-plus';
import { useUserStore } from '@/store';
const userStore = useUserStore();
const formRef = ref<FormInstance>();
const route = useRoute();
const router = useRouter();
let loginParams = reactive(new LoginParams());
let { t } = useLocalesI18n();

let forgotPassword = reactive({
  phone: '',
  email: '',
  code: '',
  timer: 60,
});

const dialogVisible = ref(false);

//start the timer counting down
const startTimer = () => {
  const timer = setInterval(() => {
    forgotPassword.timer--;
    if (forgotPassword.timer <= 0) {
      clearInterval(timer);
    }
  }, 1000);
};

const rules = computed<FormRules>(() => ({
  username: [
    {
      required: true,
      message: t('请填写') + ' ' + t('用户名'),
      trigger: 'blur',
    },
    {
      min: 6,
      max: 30,
      message: t('长度必须在 {0} 到 {1}个字符之间', [3, 8]),
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: t('请填写') + ' ' + t('密码'),
      trigger: 'blur',
    },
    {
      min: 6,
      max: 50,
      message: t('长度必须在 {0} 到 {1}个字符之间', [6, 12]),
      trigger: 'blur',
    },
  ],
}));

const login = async () => {
  formRef.value?.validate(async (valid, fields) => {
    if (valid) {
      await userStore.login(loginParams);
      await router.replace((route.query.redirect as string) || '/');
    } else {
      console.log('提交错误', fields);
    }
  });
};

const performRequestCode = async () => {
  // await userStore.login(loginParams);
  // await router.replace((route.query.redirect as string) || '/');
};
</script>
<style lang="scss" scoped>
.login {
  background-color: var(--el-bg-color-page);
  width: 100%;
  height: 100%;
  position: relative;

  .bg {
    position: absolute;
    left: 50%;
    top: 40%;
    max-width: 500px;
    max-height: 500px;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);

    @media only screen and (max-width: 500px) {
      background-size: contain;
    }
  }

  .header {
    width: 100%;
  }

  .EPForm {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: center;
    width: 100%;
  }

  #wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    min-height: 80%;
  }

  .title {
    text-align: center;
    width: 100%;
    font-weight: bold;
    color: #07b5bc;
    font-size: 25px;
  }

  .form {
    z-index: 1;
    width: 100%;

    max-width: 500px;
    padding: 30px 50px;
    background-color: var(--el-mask-color);
    border-radius: 12px;
    box-shadow: 0 9px 28px rgba(0, 0, 0, 0.1), 0 15px 12px rgba(0, 0, 0, 0.02);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    :deep(.el-input) {
      .captcha {
        margin: 0 -19px;
        height: calc(var(--el-component-size) - 2px);
      }
    }
    :deep(.el-input--large) {
      .captcha {
        height: calc(var(--el-component-size-large) - 2px);
      }
    }

    :deep(.el-input--small) {
      .captcha {
        height: calc(var(--el-component-size-small) - 2px);
      }
    }
    .el-form-item {
      width: 100%;
    }
    .submit {
      width: fit-content;
      padding: 10px 20px;
      display: block;
    }
  }
}
</style>
