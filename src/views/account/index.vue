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
          </div>
        </div>
      </div>
      <div class="right-content">
        <div class="contents">
          <div class="another-big-title">{{ $t('mydomain') }}</div>
          <div class="content-inside-content">
            <div v-for="item in user.agentdomains" :key="item">
              <div class="links">
                <div>{{ item }}</div>
                <div>bunch of icons here</div>
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
import { useUserStore } from '@/store';

//get data from userStore
const { $state } = useUserStore();
//from $state get the data
const { user } = $state;

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

const profileInfo = reactive([
  { name: 'agentusername', value: user?.username, editable: false },
  { name: 'realname', value: user?.realname, editable: false },
  { name: 'registeron', value: convertDate(user?.registeredon), editable: false },
  { name: 'balance', value: user?.balance, editable: false },
  { name: 'status', value: user?.status, editable: false },
  { name: 'type', value: user?.type, editable: false },
  { name: 'profitsharept', value: user?.dividendpercentage, editable: false },
  { name: 'email', value: user?.email, editable: true },
  { name: 'phone', value: user?.phone, editable: false },
  { name: 'loginpassword', value: '123', editable: true },
  { name: 'withdrawpassword', value: '123', editable: true },
]);
</script>

<style lang="scss" scoped>
.profit-share-item {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 1px;
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
  margin-bottom: 20px;

  .title {
    text-align: right;
  }

  .data {
    text-align: left;
  }
}
</style>
