<template>
  <div class="big-container">
    <div class="big-title">{{ $t('myaccount') }}</div>
    <div class="content-wrapper">
      <div class="contents">
        <div class="another-big-title">{{ $t('myprofile') }}</div>
        <div class="content-inside-content">
          <div>
            <div v-for="item in profileInfo" :key="item.name">
              <div class="profile-info">
                <div class="title">{{ $t(item.name) }}:</div>

                <div class="data">{{ item.value }}</div>
              </div>
            </div>
            <div class="profile-info">
              <div class="title">{{ $t('loginpassword') }}:</div>

              <div class="data">
                <el-popover trigger="click" placement="right" :width="400">
                  <template #reference>
                    <el-button type="primary">{{ t('resetPassword') }}</el-button>
                  </template>
                  <div>
                    <el-row style="margin-bottom: 0px">
                      <el-col :span="24">
                        <div class="popover-title">{{ t('loginpassword') }}</div>
                      </el-col>
                      <el-col :span="24">
                        <div class="input-row">
                          <div class="label">{{ t('currentPassword') }}</div>
                          <el-input
                            v-model="updatePassword.oldpwd"
                            class="textInput"
                            type="password"
                            :placeholder="t('currentPassword')"
                            clearable
                            show-password
                          />
                        </div>

                        <div class="input-row">
                          <div class="label">{{ t('newPassword') }}</div>
                          <el-input
                            v-model="updatePassword.newpwd"
                            class="textInput"
                            type="password"
                            :placeholder="t('newPassword')"
                            clearable
                            show-password
                          />
                        </div>

                        <div class="input-row">
                          <div class="label">{{ t('confirmPassword') }}</div>
                          <el-input
                            v-model="state.confirmpassword"
                            class="textInput"
                            type="password"
                            :placeholder="t('confirmPassword')"
                            clearable
                            show-password
                          />
                        </div>
                      </el-col>
                    </el-row>
                    <el-row style="margin-bottom: 0px">
                      <el-col :span="24">
                        <el-form :label-width="80" label-position="left"> </el-form>
                      </el-col>
                      <el-col :span="24">
                        <el-row justify="end"
                          ><el-button type="primary" @click="updateNewPassword">
                            {{ t('submit') }}
                          </el-button></el-row
                        >
                      </el-col>
                    </el-row>
                  </div>
                </el-popover>
              </div>
            </div>
            <div class="profile-info">
              <div class="title">{{ $t('withdrawpassword') }}:</div>

              <div class="data">
                <el-popover trigger="click" placement="right" :width="400">
                  <template #reference>
                    <el-button>{{ t('withdrawpassword') }}</el-button>
                  </template>
                  <div v-if="state.scene === 1">
                    <el-row style="margin-bottom: 0px">
                      <el-col :span="24">
                        <div class="popover-title">{{ t('withdrawpassword') }}</div>
                      </el-col>
                      <el-col :span="24">
                        <div class="input-row-no-label">
                          <el-input
                            v-model="state.email"
                            class="textInput"
                            disabled
                            :placeholder="t('email')"
                            clearable
                          />
                        </div>
                        <div class="input-row-no-label">
                          <el-input
                            v-model="updateWithdrawalPassword.validatecode"
                            class="textInput"
                            :placeholder="t('verificationCode')"
                            clearable
                          >
                            <template #append>
                              <div v-if="state.timer === 60">
                                <el-button
                                  type="primary"
                                  :disabled="state.email === ''"
                                  @click="getVerificationCodeForWithdrawalPassword"
                                >
                                  {{ t('requestCode') }}
                                </el-button>
                              </div>
                              <div v-else>
                                <el-button>
                                  {{ t('resend') }}
                                  {{ state.timer > 0 ? '(' + state.timer + ')' : '' }}
                                </el-button>
                              </div>
                            </template></el-input
                          >
                        </div>
                      </el-col>
                      <el-col :span="24">
                        <el-row justify="end"
                          ><el-button
                            type="primary"
                            :disabled="updateWithdrawalPassword.validatecode === ''"
                            @click="state.scene = 2"
                          >
                            {{ t('nextStep') }}
                          </el-button></el-row
                        >
                      </el-col>
                    </el-row>
                  </div>
                  <div v-else>
                    <el-row style="margin-bottom: 0px">
                      <el-col :span="24">
                        <div class="popover-title">{{ t('withdrawpassword') }}</div>
                      </el-col>
                      <el-col :span="24">
                        <div class="input-row">
                          <div class="label">{{ t('newPassword') }}</div>
                          <el-input
                            v-model="updateWithdrawalPassword.newpwd"
                            class="textInput"
                            type="password"
                            :placeholder="t('newPassword')"
                            clearable
                            show-password
                          />
                        </div>

                        <div class="input-row">
                          <div class="label">{{ t('confirmPassword') }}</div>
                          <el-input
                            v-model="state.confirmwithdrawpassword"
                            class="textInput"
                            type="password"
                            :placeholder="t('confirmPassword')"
                            clearable
                            show-password
                          />
                        </div>
                      </el-col>
                    </el-row>
                    <el-row style="margin-bottom: 0px">
                      <el-col :span="24">
                        <el-row justify="end"
                          ><el-button @click="state.scene = 1">
                            {{ t('back') }}
                          </el-button>
                          <el-button type="primary" @click="updateTheWithdrawalPassword">
                            {{ t('submit') }}
                          </el-button></el-row
                        >
                      </el-col>
                    </el-row>
                  </div>
                </el-popover>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right-content">
        <div>
          <div class="contents">
            <div class="another-big-title">{{ $t('mydomain') }}</div>
            <div class="content-inside-content">
              <div v-for="item in user.agentdomains" :key="item">
                <div class="links">
                  <div>{{ item }}</div>
                  <div>
                    <el-button @click="performCopyText(item)">
                      <el-icon><Link /></el-icon>
                    </el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="contents">
          <div class="another-big-title">{{ $t('profitshare') }}</div>
          <div class="content-inside-content">
            <div class="table-background">
              <div v-for="item in profitShare" :key="item.name">
                <div class="profit-share-item">
                  <div class="table-content">{{ $t(item.name) }}</div>
                  <div class="table-content">{{ item.value }}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Account">
import {
  performUpdatePassword,
  performGetChangeWithdrawalPasswordVerificationCode,
  performUpdateWithdrawalPassword,
} from '@/api/agent';
import { useLocalesI18n } from '@/locales/hooks';
import { useUserStore } from '@/store';
import { Link } from '@element-plus/icons-vue';
import { useI18n } from 'vue-i18n';

//get data from userStore
const { $state } = useUserStore();
//from $state get the data
const { user } = $state;

let { t } = useLocalesI18n();

function performCopyText(text: string) {
  const input = document.createElement('input');
  input.setAttribute('readonly', 'readonly');
  input.setAttribute('value', text);
  document.body.appendChild(input);
  input.select();
  input.setSelectionRange(0, 9999);
  document.execCommand('copy');
  document.body.removeChild(input);

  ElMessage.success(t('copied'));
}

const state = reactive({
  confirmpassword: '',
  confirmwithdrawpassword: '',
  timer: 60,
  scene: 1,
  email: user?.email,
});

const updatePassword = reactive({
  oldpwd: '',
  newpwd: '',
});

const updateWithdrawalPassword = reactive({
  newpwd: '',
  securitykey: '',
  validatecode: '',
});

const profitShare = reactive([
  { name: 'live', value: 70 },
  { name: 'sportsbook', value: 70 },
  { name: 'egame', value: 70 },
  { name: 'lottery', value: 70 },
  { name: 'esports', value: 70 },
  { name: 'qipai', value: 70 },
  { name: 'visualsports', value: 70 },
  { name: 'cockfight', value: 70 },
  { name: 'horserace', value: 70 },
]);

//convert datetime into readable format with date and time
const convertDate = (date: string) => {
  const newDate = new Date(date);
  return newDate.toLocaleString();
};

const translate = (value: any) => {
  var altered = value.toString().replace(/,/g, '');
  return t(altered);
};

const startTimer = () => {
  const timer = setInterval(() => {
    if (state.timer === 0) {
      clearInterval(timer);
      state.timer = 60;
    } else {
      state.timer--;
    }
  }, 1000);
};

const getVerificationCodeForWithdrawalPassword = async () => {
  const res = await performGetChangeWithdrawalPasswordVerificationCode()();
  if (res) {
    updateWithdrawalPassword.securitykey = res.data;
    startTimer();
  }
};

const updateTheWithdrawalPassword = async () => {
  if (updateWithdrawalPassword.newpwd !== state.confirmwithdrawpassword) {
    ElMessage.error(t('passwordNotSame'));
    return;
  }
  const res = await performUpdateWithdrawalPassword()(updateWithdrawalPassword);
};

const profileInfo = reactive([
  { name: 'agentusername', value: user?.username, editable: false },
  { name: 'realname', value: user?.realname, editable: false },
  { name: 'registeron', value: convertDate(user?.registeredon), editable: false },
  { name: 'balance', value: user?.balance, editable: false },
  { name: 'status', value: t(user?.status), editable: false },
  { name: 'type', value: t(user?.type), editable: false },
  { name: 'profitSharePT', value: user?.dividendpercentage, editable: false },
  { name: 'email', value: user?.email, editable: true },
  { name: 'phone', value: user?.phone, editable: false },
]);

const updateNewPassword = async () => {
  if (updatePassword.newpwd !== state.confirmpassword) {
    ElMessage.error(t('passwordNotSame'));
    return;
  }
  const res = await performUpdatePassword()(updatePassword);
};
</script>

<style lang="scss" scoped>
.profit-share-item {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 1px;
}

.popover-title {
  font-weight: bold;
  padding-bottom: 10px;
}

.big-title {
  font-size: 40px;
  font-weight: bold;
  padding: 20px 30px;
}

.content-wrapper {
  display: grid;
  width: 100%;
  gap: 20px;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.another-big-title {
  font-size: 35px;
  font-weight: bold;
  padding: 10px 20px;
}

.contents {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 20px 30px;
}

.right-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.content-inside-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 50px;
}

.links {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 30px;

  //on mobile
  @media (max-width: 768px) {
    > :first-child {
      //elipsis
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 200px;
    }
  }
}

.input-row {
  display: grid;
  grid-template-columns: 30% auto;
  gap: 10px;
  padding-bottom: 10px;

  .label {
    text-align: right;
  }
}

.input-row-no-label {
  padding-bottom: 10px;
}

.table-background {
  background: #efefef;
  padding: 1px;
  display: grid;
  gap: 1px;
  grid-template-columns: 1fr 1fr;
}

.table-content {
  background: #fff;
  padding: 10px 20px;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.profile-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;
  max-height: 30px;

  .title {
    text-align: right;
  }

  .data {
    text-align: left;
  }
}
</style>
