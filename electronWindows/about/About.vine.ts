import vitePackage from 'vite/package.json'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import vuePackage from 'vue/package.json'
import CloseButton from '../../src/components/CloseButton/CloseButton.vine'
import { createToast } from '../../src/components/Toast'
import { versionText } from '../../src/util/appVersionCode'
import openUrlInBrowser from '../../src/util/openUrlInBrowser'
import { isMac } from '../../src/util/os'

function About() {
  const { t } = useI18n()

  // eslint-disable-next-line node/prefer-global/process
  const electronVersion = process.versions.electron

  const viteVersion = vitePackage.version
  const vueVersion = vuePackage.version

  const showWin95Btn = ref(localStorage.getItem('win95') ? Number(localStorage.getItem('win95')) : 0)

  watch(showWin95Btn, (newValue) => {
    if (newValue === 6) {
      createToast({ msg: t('win95Btn.Toast') })
      localStorage.setItem('win95', `${newValue}`)
    }
  })

  vineStyle.scoped(scss`
    .win95-button {
      background: silver;
      border: none;
      border-radius: 0;
      box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px grey, inset 2px 2px #dfdfdf;
      box-sizing: border-box;
      color: transparent;
      min-height: 23px;
      min-width: 75px;
      padding: 0 12px;
      text-shadow: 0 0 #222;
    
      &:active {
        box-shadow: inset -1px -1px #fff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px grey;
      text-shadow: 1px 1px #222;
      }
    }
  `)

  return vine`
    <div
      drag
      bg-transparent
      flex="~ col"
      justify-center
      items-center
      w-screen
      h-screen
    >
      <img
        no-drag
        w-130px
        h-130px
        m="b-20px t-40px"
        src="../../logo.png"
        alt="logo"
        @click="showWin95Btn++"
      />
      <span c="#555 dark:#bbb" font-bold text-24px>
        uyou ToDo v{{ versionText }}
      </span>
      <span block mt-10px text-14px c="#555 dark:#bbb" font-bold>
        Copyright (c) 2022-{{ new Date().getFullYear() }}, Anthony Lu
      </span>
      <button
        no-drag
        m="t-4 b-4"
        :opacity="showWin95Btn > 5 ? '100' : '0'"
        class="win95-button"
        :disabled="showWin95Btn < 5"
        @click="openUrlInBrowser('https://95.todo.uyou.org.cn')"
      >
        {{ t("win95Btn.Button") }}
      </button>
      <div
        flex
        justify-center
        items-center
        mt-6
        text-12px
        mb-4
        c="#555/50 dark:#bbb/50"
        font-bold
      >
        <span>Power By</span>
        <div flex="~ col gap-2">
          <div flex items-center>
            <div p-4px bg="#2c2e3a" rounded-full mx-2 mr-1>
              <div i-logos:electron text-3 block></div>
            </div>
            <span>Electron v{{ electronVersion }} </span>
          </div>
          <div flex items-center>
            <div i-logos:vitejs text-5 block mx-2 mr-1 mt--1></div>
            <span>Vite v{{ viteVersion }} </span>
          </div>
          <div flex items-center>
            <div i-logos:vue text="4.3" block mx-2 mr-1></div>

            <span>Vue v{{ vueVersion }} </span>
          </div>
        </div>
      </div>
      <CloseButton v-if="!isMac()" windowName="about" />
    </div>
  `
}

export default About
