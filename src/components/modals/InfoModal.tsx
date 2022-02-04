import { HintKey } from '../keyboard/HintKey'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="遊玩說明" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        請根據謎面猜中謎底的國字
        <br />
        下面是謎面範例，有三張字卡
        <br />
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <HintKey symbol={20} />
        <HintKey symbol={88} />
        <HintKey symbol={73} />
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-300">
        字卡上是拆解國字後得到的部件
        <br />
        所有組成謎底的部件都藏在謎面中
        <br />
        <br />
        共有六次機會找出謎底，每次可試一字
        <br />
        用字的部件打謎面，改變字卡的顏色
        <br />
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <HintKey symbol={20} status="correct" />
        <HintKey symbol={88} />
        <HintKey symbol={73} />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        例如猜「友」，打中左邊的卡
        <br />
        卡片變綠色表示謎底有這個部件
        <br />
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <HintKey symbol={20} />
        <HintKey symbol={88} status="absent" />
        <HintKey symbol={73} />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        例如猜「古」，打中中間的卡
        <br />
        卡片變紅色表示謎底沒有這個部件
        <br />
        <br />
        謎底跟可以猜的字出自
        <a
          href="https://language.moe.gov.tw/result.aspx?classify_sn=23&subclassify_sn=437&content_sn=46"
          className="underline font-bold"
        >
          「教育部常用字表」
        </a>
        <br />
        文字拆解的規則出自
        <a
          href="https://www.cns11643.gov.tw/pageView.jsp?ID=104"
          className="underline font-bold"
        >
          「全字庫」
        </a>
        <br />
        順帶一提，這關的謎底是「左」
      </p>
    </BaseModal>
  )
}
