import NoteTabBar from '../../components/TabBar/NoteTabBar.vue'
import TabBar from '../../components/TabBar/TabBar.vue'
import SettingList from '../../components/SettingList/SettingList.vine'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import ItemSpace from '../../components/ItemBox/ItemSpace/ItemSpace.vine'
import ItemButton from '../../components/ItemBox/ItemButton/ItemButton.vue'
import ItemText from '../../components/ItemBox/ItemText/ItemText.vine'
import { ref } from 'vue'
import { createToast } from '../../components/Toast'
import { readFile, writeFile } from '../../util/rnwFile'
import emitter from '../../util/bus'

type ExtType = "uut" | "uuc"

function ToDoBackup() {
  const { t } = useI18n()
  const router = useRouter()
  const isNoteUI = localStorage.getItem('newNoteUI') === 'true'
  
  const todoData = localStorage.getItem('ToDo')
  const cateData = localStorage.getItem('cate')

  function exportFile(name: string, text: string, ext: ExtType) {
    writeFile<ExtType>(
      {name, text, ext},
      (data) => {
        if (data) {
          createToast({msg: t('backupT.exportSuccess')})
        }
      }
    )
  }
  function importFile(ext: ExtType) {
    readFile<ExtType>(ext, (data) => {
      if (data) {
        if (ext === 'uut') {
          localStorage.setItem('ToDo', `${data}`)
          emitter.emit('changeList')
        } else if (ext === 'uuc') {
          localStorage.setItem('cate', `${data}`)
          emitter.emit('lisCateChange', data)    
        }
        createToast({msg: t('backupT.importSuccess')})
      }
    })
  }

  return vine`
    <NoteTabBar v-if="isNoteUI" :title="t('anotherSettings.backup')" />
    <TabBar
      v-else
      :title="t('anotherSettings.backup')"
      :right-img-show="false"
      :left-img-show="true"
      @left-click="router.back()"
    />
    <SettingList :h="isNoteUI ? '![calc(100vh-63px)]' : '![calc(100%-105px)]'">
      <ItemSpace items-center c="dark:#bbb">
        <div text-18 mb-2 i-icon-park:save-one />
        <span text-center font-bold>{{ t('backup') }}</span>
      </ItemSpace>
      <ItemText>{{ t('backupT.export') }}</ItemText>
      <ItemButton @click="exportFile(t('backupT.todo'), todoData!, 'uut')">{{t('backupT.exportToDo')}}</ItemButton>
      <ItemButton @click="exportFile(t('backupT.cate'), cateData!, 'uuc')">{{t('backupT.exportCate')}}</ItemButton>
      <ItemText>{{ t('backupT.import') }}</ItemText>
      <ItemButton mode="primary" @click="importFile('uut')">{{t('backupT.importToDo')}}</ItemButton>
      <ItemButton mode="primary" @click="importFile('uuc')">{{t('backupT.importCate')}}</ItemButton>
      <ItemText>
        <div i-emojione-v1:warning mr-2 />
        <span font-bold>{{ t('backupT.warn') }}</span>
      </ItemText>
      <ItemText>
        <div i-emojione-v1:warning mr-2 />
        <span font-bold>{{ t('backupT.warn2') }}</span>
      </ItemText>
    </SettingList>
  `
}

export default ToDoBackup