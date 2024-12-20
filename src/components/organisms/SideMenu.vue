<script lang="ts" setup>
import LogoBrand from '@/assets/logo-brand.svg';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const toggleSidebar = ref(false);

export interface ISubItem {
  name: string;
  href: string;
  dataTestQa?: string;
  active: boolean;
}
export interface IItem {
  name?: string;
  title?: string;
  icon: string;
  href?: string;
  active: boolean;
  dataTestQa?: string;
  subItems?: ISubItem[];
}

export interface ISidebarItems {
  title: string;
  active: boolean;
  items: IItem[];
}

const sidebar: ISidebarItems[] = [
  {
    title: "MENU PRINCIPAL",
    active: true,
    items: [
      {
        name: "Minhas Campanhas",
        icon: "mdi-bullhorn",
        href: "/campanhas",
        active: true,
      },
      {
        name: "Configurações",
        icon: "mdi-cog",
        href: "/configuracoes",
        active: true,
      },
      {
        name: "Ajuda",
        icon: "mdi-help-circle",
        href: "/ajuda",
        active: true,
      },
    ],
  },
];

const route = useRoute();

const isCurrentRoute = (menuRoute: string) => {
  const regexRoute = new RegExp(menuRoute);
  return regexRoute.test(route.path);
};
</script>

<template>
  <aside class="smb-aside-menu position-sticky">
    <header class="smb-aside-menu__brand">
      <img :src="LogoBrand" alt="Logo da marca" class="smb-loading__img">
    </header>
    <article>
      <ul class="smb-aside-menu__menu">
        <template v-for="(item, index) in sidebar" :key="index">
          <template v-if="item.title && item.active">
            <div class="smb-aside-menu__menu-items">
              <li class="smb-aside-menu__subtitle">
                {{ item.title }}
              </li>

              <template v-for="(menu, idx) in item.items" :key="idx">
                <li class="smb-aside-menu__item" v-if="menu.active">
                  <router-link :to="menu.href as string"
                    :class="{ 'smb-aside-menu__active': isCurrentRoute(menu.href || '') }">
                    <v-icon>{{ menu.icon }}</v-icon>
                    <span>{{ menu.name }}</span>
                  </router-link>
                </li>
              </template>
            </div>
          </template>
        </template>
      </ul>
    </article>
  </aside>
</template>

<style lang="scss">
.smb-aside-menu {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  height: 100vh;
  min-width: 230px;
  max-width: 250px;
  transition: width 0.3s ease-out;
  background: #343434;

  &__active {
    color: #df55ff !important;
  }

  >article {
    overflow-y: auto;
    overflow-x: hidden;
    height: calc(100% - 10rem);
    padding: 0 toRem(32px);
    margin-right: 5px;

    @media (max-width: 1915px) {
      padding: 0 idealWidth(35);
    }
  }

  &__brand {
    width: 100%;
    padding: 2.9rem toRem(32px) 3.25rem !important;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;

    @media (max-width: 1915px) {
      padding: 2.9rem idealWidth(35) idealWidth(52) idealWidth(35) !important;
    }

    >img {
      cursor: pointer;
    }

    >i {
      cursor: pointer;
      background-color: #ffffff;
    }

    >img.logo-brand {
      width: toRem(116px);
      height: toRem(52px);
      transition: all 0.4s ease;
    }

    >img.logo-icon {
      width: toRem(20px);
      height: toRem(30px);
      transition: all 0.1s ease;
    }

    i.icon-nav-arrow_right {
      color: #ffffff;
      background-color: transparent;
      display: inline-block;
      transform: rotate(180deg);
      vertical-align: middle;
      align-self: start;
      font-size: toRem(16px);
    }
  }

  &__submenu {
    padding: 0;
    margin-bottom: toRem(21px);
    font-size: toRem(16px);
    color: #ffffff;

  }

  &__submenu-list {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    cursor: pointer;

    &:hover {
      color: #df55ff;
    }

    .dynamic-icon {
      font-size: toRem(20px);
    }

    .icon-nav-bullet_up,
    .icon-nav-bullet_down {
      font-size: toRem(14px);
    }
  }

  &__submenu-item {
    list-style: none;
    margin-bottom: toRem(9px);

    &:last-child {
      margin-bottom: 0;
    }

    a {
      padding-left: toRem(28px);
      text-decoration: none;
      color: #ffffff;

      font-size: toRem(13px);
      display: flex;
      align-items: center;
      gap: toRem(5px);
      line-height: toRem(15px);

      &:first-child {
        margin-top: toRem(10px);
      }

      &:hover {
        color: #df55ff;
      }

      &.router-link-active {
        color: #df55ff;
      }

      i {
        flex-shrink: 0;
        font-size: toRem(10px);
      }
    }
  }

  &__menu {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  &__menu-items {
    margin-bottom: toRem(50px);
  }

  &__subtitle {
    text-transform: uppercase;
    margin-bottom: toRem(22px);
    color: #767676;

    font-size: toRem(13px);

    @media (max-width: 1915px) {
      margin-bottom: idealWidth(25);
    }
  }

  &__item {
    margin-bottom: toRem(21px);
    font-size: toRem(14px);

    @media (max-width: 1915px) {
      margin-bottom: idealWidth(21);
    }

    a {
      text-decoration: none;
      color: #ffffff;

      display: flex;
      align-items: center;
      gap: 0.6rem;

      &:hover {
        color: #df55ff;
      }

      &.router-link-active {
        color: #df55ff;
      }

      i {
        flex-shrink: 0;
        font-size: toRem(20px);
      }
    }
  }

  &.collapsed-sidebar {
    width: 85px;

    >article {
      padding: 0 28px;
      margin-right: 5px;
    }

    header {
      padding: 2.9rem 25px;
    }

    .smb-aside-menu__brand {
      flex-direction: column;
      gap: 20px;
    }

    .smb-aside-menu__brand-old {
      flex-direction: column;
      gap: 20px;
    }

    .smb-aside-menu__subtitle {
      color: transparent;
      margin: 10px 0 5px;
    }

    .smb-aside-menu__item a {
      justify-content: start;
      gap: 0;
      margin-bottom: 20px;
    }

    i.icon-nav-arrow_right {
      transform: rotate(0deg);
      align-self: auto;
      text-align: center;
    }
  }
}

.sidebar-tip {
  .p-tooltip-text {
    background-color: #ffffff !important;
    font-size: 16px !important;
    font-weight: 500;
    padding: 6px 20px !important;
    color: #ffffff !important;
  }

  .p-tooltip-arrow {
    border-right-color: #ffffff !important;
  }
}
</style>
