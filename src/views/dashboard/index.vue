<template>
  <div class="big-container">
    <div class="big-title">{{ $t('dashboard') }}</div>
    <div class="content-wrapper">
      <div class="">
        <div class="another-big-title">{{ $t('accountOverview') }}</div>
        <div class="content">
          <div class="account-container">
            <div class="title">{{ $t('account') }}</div>
            <div class="data">{{ user.username }}</div>
          </div>
          <div class="account-container">
            <div class="title">{{ $t('walletBalance') }}</div>
            <div class="data">
              <div>{{ user.balance }}</div>
              <el-button type="primary" size="large" :icon="Wallet" @click="navigateTo('/wallet/withdrawal')">{{
                $t('wallet')
              }}</el-button>
            </div>
          </div>
          <div class="account-container">
            <div class="title">{{ $t('referralCode') }}</div>
            <div class="data">
              <div>{{ user.invitationCode }}</div>
              <el-button type="primary" size="large" :icon="CopyDocument" @click="()=>{
                copyText(user.invitationCode)
              }">{{ $t('copy') }}</el-button>
            </div>
          </div>
          <div class="account-container">
            <div class="title">{{ $t('referralLink') }}</div>
            <div class="affiliate-link-container">
              {{ 'https://dev-t1.rpgp.cc/a/' + user.invitationCode + '?do=register' }}
            </div>
            <div class="button-container">
              <el-button type="primary" size="large" :icon="CopyDocument">{{ $t('copy') }}</el-button>
              <el-button type="primary" size="large">{{ $t('addagent') }}</el-button>
              <el-button type="primary" size="large">{{ $t('addplayer') }}</el-button>
              <custom-button />
            </div>
          </div>

          <div>
            <div>{{ $t('referralQRCode') }}</div>
            <div class="qrcode-container">
              <div>
                <img src="https://www.imgonline.com.ua/examples/qr-code-url.png" />
              </div>
              <div class="qrcode-button">
                <el-button type="primary" size="large" :icon="Download" style="width: 100%">{{
                  $t('download')
                }}</el-button>
                <el-button type="primary" size="large" :icon="CopyDocument" style="width: 100%">{{
                  $t('copy')
                }}</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right-content">
        <div>
          <div class="another-big-title">{{ $t('teamOverview') }}</div>
          <div class="content">
            <div class="statistic-container">
              <div v-for="item in statistic" :key="item.name" class="statistic" :class="`${item.color}-gradient`">
                <div class="name">{{ $t(item.name) }}</div>
                <div class="data">{{ item.data }}</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="title-wrapper">
            <div class="another-big-title">{{ $t('statsOverview') }}</div>
            <div>
              2022/09/01 00:00 ~ 2022/09/30 23:59 (GMT+8) <br />
              {{ $t('updatedHourly') }}
            </div>
          </div>
          <div class="content">
            <div class="overview-container">
              <div v-for="item in overview" :key="item.name" class="overview">
                <div class="name" :class="`${item.color}`">{{ $t(item.name) }}</div>
                <div class="data">{{ item.data }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Account">
import { useUserStore } from '@/store';
import { CopyDocument, Wallet, Download } from '@element-plus/icons-vue';
import { router } from '@/router';
//get data from userStore
const { $state } = useUserStore();
//from $state get the data
const { user } = $state;

function navigateTo(path: string) {
  router.push({ name: path });
}

function copyText(text: string) {
  const input = document.createElement('input');
  input.setAttribute('readonly', 'readonly');
  input.setAttribute('value', text);
  document.body.appendChild(input);
  input.select();
  input.setSelectionRange(0, 9999);
  document.execCommand('copy');
  document.body.removeChild(input);
}

const statistic = reactive([
  { name: 'directAgent', data: '29', color: 'blue' },
  { name: 'indirectAgent', data: '76', color: 'purple' },
  { name: 'directPlayer', data: '12', color: 'yellow' },
  { name: 'indirectPlayer', data: '133', color: 'pink' },
]);

const overview = reactive([
  { name: 'estimatedProfitShare', data: '123456', color: 'blue' },
  { name: 'totalNetWorth', data: '123456', color: 'purple' },
  { name: 'totalExpense', data: '123456', color: 'green' },
  { name: 'totalCompanyWinloss', data: '123456', color: 'orange' },
  { name: 'totalTurnover', data: '123456', color: 'black' },
  { name: 'totalValidBet', data: '123456', color: 'darkblue' },
  { name: 'totalDeposit', data: '123456', color: 'darkgreen' },
  { name: 'totalWithdraw', data: '123456', color: 'maroon' },
]);
</script>

<style lang="scss" scoped>
.title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;

  //second child
  > *:nth-child(2) {
    text-align: right;
    font-size: 10px;
  }
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
  grid-template-columns: auto auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.another-big-title {
  font-size: 35px;
  font-weight: bold;
  padding: 10px 20px;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 20px 30px;
  border: solid 1px #e5e5e5;
}

.right-content {
  .content {
    background: transparent;
    border: none;
  }
}

.content-inside-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 50px;
}

.statistic-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;
}

.statistic {
  border-radius: 20px;
  padding: 20px;
  color: #fff;
  display: flex;
  flex-direction: column;

  .data {
    font-size: 30px;
    font-weight: bold;
  }
  &.blue-gradient {
    background: linear-gradient(90deg, #008dce 0%, #00b0ff 100%);
  }

  &.purple-gradient {
    background: linear-gradient(90deg, #6200c4 0%, #a55eea 100%);
  }
  &.yellow-gradient {
    background: linear-gradient(90deg, #d8b400 0%, #f9d423 100%);
  }

  &.pink-gradient {
    background: linear-gradient(90deg, #d30000 0%, #ff5e5e 100%);
  }
}

.overview-container {
  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: 10px;

  .overview {
    display: flex;
    padding: 20px 20px;
    border-radius: 20px;
    background: #fff;
    border: solid 1px #e5e5e5;
    flex-direction: column;
    gap: 10px;

    .blue {
      color: #008dce;
    }
    .purple {
      color: #6200c4;
    }
    .green {
      color: #00b0ff;
    }
    .orange {
      color: #d8b400;
    }
    .black {
      color: #000;
    }
    .darkblue {
      color: #00b0ff;
    }
    .darkgreen {
      color: #00b0ff;
    }
    .maroon {
      color: #d30000;
    }

    .data {
      font-weight: bold;
      font-size: 24px;
    }
  }
}

.account-container {
  padding-bottom: 10px;
  .title {
    padding-bottom: 5px;
  }

  .data {
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;

    .button {
      font-size: 12px;
      font-weight: initial;
    }
  }
  .affiliate-link-container {
    padding: 10px;
    border-radius: 10px;
    border: solid 1px #e5e5e5;
    margin-bottom: 10px;
  }
}

.button-container {
  display: flex;
  gap: 10px;
}

.button {
  background: #07b5bc;
  color: #fff;
  padding: 10px 20px;
  border-radius: 7px;
  cursor: pointer;
}

.qrcode-container {
  display: grid;
  grid-template-columns: auto 1fr;

  .qrcode-button {
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: center;
    padding: 20px;

    max-width: fit-content;
  }
}
</style>
