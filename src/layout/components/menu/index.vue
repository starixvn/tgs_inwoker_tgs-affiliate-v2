<template>
  <div
    class="layout-menu"
    :class="{ collapse: !globalStore.isMobile && themeConfig.menuCollapse && themeConfig.allowMenuCollapse }"
  >
    <div class="menu-box">
      <el-scrollbar view-class="layout-menu-content">
        <el-menu
          class="el-menu-vertical-demo"
          :default-active="activeMenu"
          :collapse="!globalStore.isMobile && themeConfig.menuCollapse && themeConfig.allowMenuCollapse"
        >
          <layout-menu-item v-for="route in routeStore.routes" :key="route.path" :item="route" />
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>
<script setup lang="ts" name="layoutMenu">
import { useSettingStore, useRouteStore, useGlobalStore } from '@/store';
import { mixColor, getColorLuma } from '@/utils/helper';
const { themeConfig } = useSettingStore();
const routeStore = useRouteStore();
const globalStore = useGlobalStore();
const route = useRoute();
let activeMenu = ref('');
watch(
  route,
  (route) => {
    if (route.meta) {
      if (route.meta.hideMenu) {
        if (route.meta.activeMenu) {
          activeMenu.value = route.meta.activeMenu;
        }
      } else {
        activeMenu.value = route.path;
      }
    }
  },
  { immediate: true },
);
const menuBg1 = computed(() =>
  mixColor(themeConfig.menuBg, getColorLuma(themeConfig.menuBg) < 100 ? '#ffffff' : '#303133', 0.1),
);
const menuActiveColor = computed(() => (getColorLuma(themeConfig.menuBg) < 100 ? '#ffffff' : '#303133'));
const menuTextColor = computed(() => mixColor(themeConfig.menuBg, menuActiveColor.value, 0.8));
</script>
<style lang="scss" scoped>
//add  class name
.el-menu-item.is-active .el-menu-item__content {
  background-color: #07b5bc;
  color: #fff;
}

.layout-menu {
  --el-menu-base-level-padding: 12px;
  --el-menu-text-color: v-bind('menuTextColor');
  --el-menu-active-color: v-bind('menuActiveColor');
  background: #fff;
  height: 100%;
  position: relative;
  .title {
    height: var(--el-menu-item-height);

    font-weight: bold;
    padding: 12px 24px;
    font-size: 1.25em;
    word-break: break-all;
    overflow-y: hidden;
    color: #07b5bc;
    background-color: inherit;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;

    white-space: pre-line;
  }

  &.collapse {
    width: 0;
  }

  .menu-box {
    height: 100%;
    :deep(.layout-menu-content) {
      width: v-bind('themeConfig.menuWidth');
      color: var(--el-menu-text-color);
      transition: width 0.5s;
      border: 0px;

      .menu {
        padding-right: 6px;
        padding-left: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
      }

      .el-menu-item {
        color: #000;
      }

      .el-menu {
        background-color: unset;
        border: 0;
        padding: 0 10px;

        .el-sub-menu.is-active {
          > .el-sub-menu__title {
            background: #07b5bc;
            color: #fff;
            border-radius: 8px;

            .el-icon {
              color: #fff;
            }
          }
        }
        .el-sub-menu__title {
          padding-right: 28px;
          color: #000;
        }
        .el-sub-menu__title:hover,
        .el-menu-item:hover {
          background: transparent;
        }

        .el-menu-item.is-active {
          color: #07b5bc;
          font-weight: bold;
        }

        .el-menu--inline {
          background: transparent;
          position: relative;
        }
        .el-menu--inline::before {
          content: '';
          position: absolute;
          top: 15px;
          left: 10px; /* Set the distance of the line from the left edge */
          bottom: 15px;
          width: 0;

          border-left: 2px solid #b7b7b7;
        }

        .el-sub-menu .el-menu-item {
          padding-left: 10px;
        }

        .el-menu-item,
        .el-sub-menu {
          .el-icon {
            width: 1em;
            margin-left: -1px;
            margin-right: 12px;
            color: #000;
          }
        }
      }
    }
  }
}

.collapse {
  :deep(.layout-menu-content) {
    width: calc(var(--el-menu-icon-width) + var(--el-menu-base-level-padding) * 2) !important;
    span {
      visibility: hidden;
    }
    // .title {
    //   width: calc(var(--el-menu-icon-width) + var(--el-menu-base-level-padding) * 2);
    //   text-align: center;
    //   margin: 0;

    //   span {
    //     display: none;
    //   }
    // }
  }
}
</style>
