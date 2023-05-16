<template>
  <div class="big-container">
    <div class="big-title">{{ $t('myaccount').toUpperCase() }}</div>
    <div class="content-wrapper">
      <div class="contents">
        <div class="another-big-title">{{ $t('myprofile') }}</div>
        <div class="content-inside-content">
          <div>
            <div v-for="item in profileInfo.list" :key="item.name">
              <div class="profile-info">
                <div class="title">{{ $t(item.name) }}:</div>

                <div class="data" >{{ item.value }} 
                  <el-popover   trigger="click"  placement="right" :width="400" v-if="item.editable" @before-enter="resetUpdateEmail" @after-leave="resetUpdateEmail">
                  <template #reference>
                    <el-button size="small" type="primary" :icon="Edit"  >
                  
                </el-button>
                  </template>
                  <div >
                    <el-row style="margin-bottom: 0px">
                      <el-col :span="24">
                        <div class="popover-title">{{ t('updateEmail') }}</div>
                      </el-col>
                      <el-col :span="24">
                        <div class="input-row-no-label">
                          <el-input
                            v-model="state.email"
                            class="textInput"
                            :disabled="state.sceneEmail === 1"
                            :placeholder="t('email')"
                            clearable
                          />
                        </div>
                        <div class="input-row-no-label">
                          <el-input
                            v-model="updateEmail.validatecode"
                            class="textInput"
                            :placeholder="t('verificationCode')"
                            clearable
                          >
                            <template #append>
                              <div v-if="state.timer === 60">
                                <el-button
                                  type="primary"
                                  :disabled="state.email === ''"
                                  @click="getVerificationCodeForEmail"
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
   
                      <el-col :span="24" v-if="state.sceneEmail === 2">
                        <el-row justify="end"
                          ><el-button @click="onBackClick">
                            {{ t('back') }}
                          </el-button>
                          <el-button type="primary" @click="onUpdateEmail"
                          :disabled="updateEmail.validatecode === '' || state.email === ''"
                          >
                            {{ t('submit') }}
                          </el-button></el-row>
                      </el-col>
              
                      <el-col :span="24" v-if="state.sceneEmail === 1"  >
                        <el-row justify="end"
                          ><el-button
                            type="primary"
                            :disabled="updateEmail.validatecode === ''"
                            @click="onVerfiyEmailCode"
                          >
                            {{ t('nextStep') }}
                          </el-button>
                        </el-row>
                      </el-col>
                    </el-row>
                  </div>
                 
                </el-popover>
            
                </div>
       
                 
          

              </div>
            </div>
            <div class="profile-info">
              <div class="title">{{ $t('loginpassword') }}:</div>

              <div class="data">
                <el-popover trigger="click" placement="right" :width="400" @before-enter="onEnterResetPass">
                  <template #reference>
                    <el-button ref="buttonRef" type="primary">{{ t('resetPassword') }}</el-button>
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
                <el-popover trigger="click" placement="right" :width="400" @before-enter="onEnterChangeWithdrawalPass">
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
              <div v-for="item in $state.user.agentdomains" :key="item">
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

<script setup lang="ts" name="profile">
import {
  performUpdatePassword,
  performGetChangeWithdrawalPasswordVerificationCode,
  performGetChangeEmailVerificationCode,
  performUpdateWithdrawalPassword,
  GetEmailVerificationCodeParams,
  verifyEmailCode,VerifyEmailCodeParams
} from '@/api/agent';
import { useLocalesI18n } from '@/locales/hooks';
import { useUserStore } from '@/store';
import { Link } from '@element-plus/icons-vue';
import { reactive,ref } from 'vue';
import { useI18n } from 'vue-i18n';
import {

  Edit,

} from '@element-plus/icons-vue'


// Props
const props = defineProps({
  perform: String
});
const buttonRef = ref(null);
onMounted(() => {
  if(props.perform === "changePass"){
    buttonRef.value?.$el?.click();
  }
});

const { $state } = useUserStore();
//from $state get the data


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
  sceneEmail:1,
  email: $state.user?.email,
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
const updateEmail = reactive({
  email: '',
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
let autoSaveInterval: any = null;
const startTimer = () => {
  autoSaveInterval = setInterval(() => {
    if (state.timer === 0) {
      clearInterval(autoSaveInterval);
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
const getVerificationCodeForEmail= async () => {


    const getEmailVerificationCodeParams = new GetEmailVerificationCodeParams();
    getEmailVerificationCodeParams.email = state.email;

    const res = await performGetChangeEmailVerificationCode()(getEmailVerificationCodeParams);

    if (res) {
      updateEmail.securitykey = res.data;
      startTimer();
    }

};
const onEnterResetPass= () => {
  state.email = $state.user?.email;
  updatePassword.newpwd = '';
  updatePassword.oldpwd = '';
  state.confirmpassword = '';
  
};
const onEnterChangeWithdrawalPass = () => {
  state.email = $state.user?.email;
  updateWithdrawalPassword.newpwd = '';
  updateWithdrawalPassword.securitykey = '';
  updateWithdrawalPassword.validatecode = '';
  state.confirmwithdrawpassword= '';
};
const updateTheWithdrawalPassword = async () => {
  if (updateWithdrawalPassword.newpwd !== state.confirmwithdrawpassword) {
    ElMessage.error(t('passwordNotSame'));
    return;
  }
  const res = await performUpdateWithdrawalPassword()(updateWithdrawalPassword);
  if(res.err ===0){
    ElMessage.success(t('withdrawalPasswordResetSuccess'));
    updateWithdrawalPassword.newpwd = '';
    updateWithdrawalPassword.securitykey = '';
    updateWithdrawalPassword.validatecode = '';
    document.getElementsByTagName("body")[0].click();
  }
};

interface ListItem {
  name: string;
  value: string;
  editable:boolean;
}


const profileInfo = reactive({
  list: [] as ListItem[]
});


profileInfo.list.push({ name: 'agentusername', value: $state.user?.username, editable: false });
profileInfo.list.push({ name: 'realname', value: $state.user?.realname, editable: false });
profileInfo.list.push({ name: 'registeron', value: convertDate($state.user?.registeredon), editable: false });
profileInfo.list.push({ name: 'balance', value: $state.user?.balance.toFixed(2), editable: false });
profileInfo.list.push({ name: 'status', value: t($state.user?.status), editable: false });
profileInfo.list.push({ name: 'type', value: t($state.user?.type), editable: false });
profileInfo.list.push({ name: 'profitSharePT', value: $state.user?.dividendpercentage.toFixed(2), editable: false });
profileInfo.list.push({ name: 'email', value: $state.user?.email, editable: true });
profileInfo.list.push({ name: 'phone', value: $state.user?.phone, editable: false });



const updateNewPassword = async () => {
  if (updatePassword.newpwd !== state.confirmpassword) {
    ElMessage.error(t('passwordNotSame'));
    return;
  }
  const res = await performUpdatePassword()(updatePassword);
  if(res.err ===0){
    ElMessage.success(t('passwordResetSuccess'));
    updatePassword.newpwd = '';
    updatePassword.oldpwd = '';
    document.getElementsByTagName("body")[0].click();
  }
};
const resetUpdateEmail = () =>{

  updateEmail.validatecode = '';
  state.sceneEmail = 1;
  state.timer = 60;


  clearInterval(autoSaveInterval);
    
}
const onBackClick = () =>{

  document.getElementsByTagName("body")[0].click();
}
const onUpdateEmail = async () => {

const res = await onVerfiyEmailCode();
};

const onVerfiyEmailCode = async () => {
  const verifyEmailCodeParams = new VerifyEmailCodeParams();
  verifyEmailCodeParams.securitykey = updateEmail.securitykey;
  verifyEmailCodeParams.validatecode = updateEmail.validatecode;
  
  const res = await verifyEmailCode()(verifyEmailCodeParams);
  if(res.err ===0){
    if(state.sceneEmail === 1){
      state.sceneEmail = 2;
      state.email = '';
      state.timer = 60;
      clearInterval(autoSaveInterval);
      updateEmail.validatecode = '';
    }else{
      await useUserStore().init();


      const itemIndex = profileInfo.list.findIndex(item => item.name === 'email');
      if (itemIndex !== -1) {
        profileInfo.list[itemIndex].value = state.email;
      }

      ElMessage.success(t('emailUpdateSuccess'));
      document.getElementsByTagName("body")[0].click();
    }
    
  }else{
    ElMessage.error(t('invalidCode'));

  }
}

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
