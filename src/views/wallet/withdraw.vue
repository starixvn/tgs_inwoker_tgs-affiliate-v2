<template>
  <div class="wrapper">
    <div class="page-title">Withdraw</div>
    <div class="section">
      <div class="left">
        <div class="theimage">{{ user.balance }}</div>
      </div>
      <div class="middle">
        <div class="subtitle">Withdraw</div>
        <div class="items">
          <div>Bank Card</div>

          <el-dropdown class="me-size-select fullwidth" trigger="click" max-height="500px">
            <div class="pointer" v-bind="$attrs" style="width: 100%">
              <div class="dropdown">123</div>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item> something here </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="items">
          <div>Amount</div>
          <el-input size="large" :placeholder="'Enter withdraw amount'" clearable> </el-input>
        </div>
        <div class="items">
          <div>Withdrawal Password</div>
          <el-input size="large" :placeholder="'Enter withdrawal password'" :prefix-icon="Search" clearable> </el-input>
        </div>
        <div class="button">Submit</div>
      </div>
      <div class="right">
        <div class="content">
          <div class="title">Type:</div>
          <div class="data">123</div>
        </div>
        <div class="content">
          <div class="title">Bank:</div>
          <div class="data">123</div>
        </div>
        <div class="content">
          <div class="title">Branch:</div>
          <div class="data">123</div>
        </div>
        <div class="content">
          <div class="title">Account Name:</div>
          <div class="data">123</div>
        </div>
        <div class="content">
          <div class="title">Account no.:</div>
          <div class="data">123</div>
        </div>
      </div>
    </div>
    <div class="section y">
      <div class="subtitle">Manage Bank Card</div>
      <div class="card-container">
        <div class="cards pointer">
          <div class="card-title">Bank</div>
          <div>Bank - Branch</div>
          <div>Name</div>
          <div>Ending in 1234</div>
          <div class="delete" />
        </div>
        <div class="cards pointer">
          <div class="card-title">Crypto</div>
          <div>Ethereum</div>
          <div>Ending in 1234</div>
          <div class="delete" />
        </div>
        <div class="cards empty pointer">
          <div>123</div>
        </div>
      </div>
    </div>
  </div>
  <div></div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/store';
const { user } = useUserStore();
</script>
<style lang="scss" scoped>
.page-title {
  font-size: 30px;
  font-weight: bold;
}
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.subtitle {
  font-weight: bold;
  font-size: 20px;
}
.section {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  background: #fff;
  border-radius: 10px;
  padding: 50px;

  &.y {
    flex-direction: column;
  }

  .left {
    .theimage {
      width: 200px;
      height: 200px;
    }
  }

  .middle {
    gap: 10px;
    display: flex;
    flex-direction: column;
    .items {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
    }
  }

  .right {
    border: solid 2px #07b5bc;
    padding: 20px;

    .content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      .title {
        font-weight: bold;
        text-align: right;
      }
    }
  }
}

.button {
  background: #07b5bc;
  color: #fff;
  padding: 10px 20px;
  border-radius: 7px;
  cursor: pointer;
  text-align: center;
}
.fullwidth {
  width: 100%;
}

.dropdown {
  display: inline-flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  padding: 12px;
  width: 100%;
  background-color: var(--el-input-bg-color, var(--el-fill-color-blank));
  background-image: none;
  border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
  transition: var(--el-transition-box-shadow);
  transform: translate3d(0, 0, 0);
  box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
}

.card-container {
  gap: 10px;
  padding-top: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  .cards {
    position: relative;
    background: red;
    padding: 15px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    background: linear-gradient(125deg, #dddddd, #f2f2f2);
    gap: 2.5px;
    .card-title {
      font-weight: bold;
      font-size: 15px;
    }

    .delete {
      position: absolute;
      top: 10px;
      right: 10px;
      background: #f34235;
      width: 25px;
      height: 25px;
      border-radius: 20px;
    }

    &.empty {
      color: #000;
      background: #fff;
      border: 2px dashed var(--el-color-primary);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
