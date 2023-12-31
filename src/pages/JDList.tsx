import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn', {
  months:
    '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split(
      '_',
    ),
  monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
  weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
  weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
  weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'YYYY-MM-DD',
    LL: 'YYYY年MM月DD日',
    LLL: 'YYYY年MM月DD日Ah点mm分',
    LLLL: 'YYYY年MM月DD日ddddAh点mm分',
    l: 'YYYY-M-D',
    ll: 'YYYY年M月D日',
    lll: 'YYYY年M月D日 HH:mm',
    llll: 'YYYY年M月D日dddd HH:mm',
  },
  meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
  meridiemHour: function (hour: number, meridiem: string) {
    if (hour === 12) {
      hour = 0
    }
    if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
      return hour
    } else if (meridiem === '下午' || meridiem === '晚上') {
      return hour + 12
    } else {
      // '中午'
      return hour >= 11 ? hour : hour + 12
    }
  },
  meridiem: function (hour, minute) {
    const hm = hour * 100 + minute
    if (hm < 600) {
      return '凌晨'
    } else if (hm < 900) {
      return '早上'
    } else if (hm < 1130) {
      return '上午'
    } else if (hm < 1230) {
      return '中午'
    } else if (hm < 1800) {
      return '下午'
    } else {
      return '晚上'
    }
  },
  calendar: {
    sameDay: '[今天]LT',
    nextDay: '[明天]LT',
    nextWeek: '[下]ddddLT',
    lastDay: '[昨天]LT',
    lastWeek: '[上]ddddLT',
    sameElse: 'L',
  },
  dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
  // @ts-ignore
  ordinal: function (number: string, period: unknown) {
    switch (period) {
      case 'd':
      case 'D':
      case 'DDD':
        return number + '日'
      case 'M':
        return number + '月'
      case 'w':
      case 'W':
        return number + '周'
      default:
        return number
    }
  },
  relativeTime: {
    future: '%s内',
    past: '%s前',
    s: '几秒',
    ss: '%d秒',
    m: '1分钟',
    mm: '%d分钟',
    h: '1小时',
    hh: '%d小时',
    d: '1天',
    dd: '%d天',
    M: '1个月',
    MM: '%d个月',
    y: '1年',
    yy: '%d年',
  },
  week: {
    // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
    dow: 1, // Monday is the first day of the week.
    doy: 4, // The week that contains Jan 4th is the first week of the year.
  },
})

import { Typography } from '@/components/Typography'

import weChatQRcode from '@/assets/company/wechat-qrcode.png'
import logoUrl from '@/assets/logo-image.svg'
import locationIconUrl from '@/assets/job-description/location.svg'
import clockIconUrl from '@/assets/job-description/clock.svg'
import calendarIconUrl from '@/assets/job-description/calendar.svg'

const { Heading, Paragraph } = Typography
const { CNTitleMedium, CNTitleSmall } = Heading
const { CNBodySmall, CNMarkSmall, CNBodyLarge, CNMarkMedium } = Paragraph

const ViewWrapper = styled.div`
  background: #fafafa;
`
const ViewContainer = styled.div`
  display: flex;
  max-width: 1440px;
  margin-inline: auto;
  padding-block: 0.87rem;
  padding-inline: 1.28rem;
  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
`
const LeftSidebarContainer = styled.aside`
  display: block;
  width: 250px;
  margin-right: 0.48rem;
  @media screen and (max-width: 1024px) {
    order: 2;
    width: 100%;
    margin-right: 0;
    margin-bottom: 0.32rem;
  }
`
const MainContainer = styled.main`
  flex-grow: 1;
  @media screen and (max-width: 1024px) {
    order: 3;
  }
`
const RightSidebarContainer = styled.aside`
  width: 200px;
  margin-left: 0.48rem;
  @media screen and (max-width: 1024px) {
    order: 1;
    width: 100%;
    margin-left: 0;
    margin-bottom: 0.32rem;
  }
`
const Filters = styled.section`
  position: sticky;
  top: calc(0.84rem + 0.48rem);
  left: 0;
  padding: 0.22rem;
  color: #141414;
  background: #fff;
  border-radius: 0.07rem;
  box-shadow: 0 0.01rem 0.02rem 0 rgba(0, 0, 0, 0.03);
`
const DescriptionCard = styled.section`
  padding: 0.16rem;
  margin-bottom: 0.12rem;
  min-height: 100px;
  background: #fff;
  color: rgba(20, 20, 20, 0.8);
  :last-child {
    margin-bottom: 0;
  }
`
const LinkCard = styled(DescriptionCard)`
  position: sticky;
  top: calc(84px + 48px);
  left: 0;
`
const DescriptionClass = styled(CNTitleSmall)`
  padding-bottom: 0.11rem;
  color: #7680dd;
`
const DescriptionText = styled.div`
  padding-bottom: 0.06rem;
  font-size: 0.14rem;
  line-height: 0.2rem;
  font-weight: 400;
  color: ${props => props.theme.themeDark};
  &:last-child {
    padding-bottom: 0;
  }
`
const DescriptionTextBold = styled.span`
  font-weight: 600;
`
const LinkTitle = styled(CNBodySmall)`
  font-weight: 600;
  padding-bottom: 0.11rem;
  position: relative;
  padding-left: 0.24rem;
  &::before {
    position: absolute;
    top: -0.03rem;
    left: 0;
    content: '📨';
  }
`
const LinkSebTitle = styled(CNBodySmall)`
  font-weight: 600;
  /* padding-bottom: 0.04rem; */
`
const DescriptionTitle = styled(CNMarkMedium)`
  font-weight: 600;
  font-size: 0.16rem;
  padding-bottom: 0.12rem;
`
const DescriptionSubTitle = styled(CNMarkMedium)`
  padding-bottom: 0.11rem;
`
const LinkText = styled(CNBodySmall)`
  font-weight: 400;
`
const ColorText = styled.span`
  color: #7680dd;
`
const Img = styled.img`
  display: block;
  width: 0.8rem;
  margin-inline: auto;
  padding-top: 0.12rem;
`
const FiltersTitle = styled(CNTitleMedium)`
  padding-bottom: 0.14rem;
`
const FiltersClass = styled(CNTitleMedium)`
  margin-bottom: 0.11rem;
`
const JDList = styled.section`
  min-height: 200px;
  color: rgba(20, 20, 20, 0.7);
`
const JDCard = styled.div`
  display: flex;
  min-height: 200px;
  margin-bottom: 0.16rem;
  padding: 0.22rem;
  background: #fff;
  border-radius: 0.12rem;
  cursor: pointer;
  box-shadow: 0 0.01rem 0.018rem rgba(0, 0, 0, 0.03);
  :last-child {
    margin-bottom: 0;
  }
`
const Logo = styled.img`
  height: min-content;
  width: 0.625rem;
  margin-right: 0.22rem;
`
const ContentContainer = styled.div`
  flex-grow: 1;
  position: relative;
`
const CardTags = styled(CNMarkSmall)`
  color: #7767a0;
`
const CardTitle = styled(CNBodyLarge)`
  margin-bottom: 0.07rem;
  color: #141414;
`
const TagContainer = styled.div`
  display: flex;
  margin-bottom: 0.13rem;
  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
`
const Placeholder = styled.div`
  font-size: 0.15rem;
  font-weight: 400;
  padding-right: 0.22rem;
  @media screen and (max-width: 1024px) {
    display: none;
  }
`
interface TagProps {
  icon: string
}
const Tag = styled(CNBodySmall)<TagProps>`
  position: relative;
  padding-left: 0.2rem;
  padding-right: 0.22rem;
  &::before {
    position: absolute;
    top: 0.035rem;
    left: 0;
    display: inline-block;
    content: '';
    width: 0.14rem;
    height: 0.14rem;
    background-image: url(${props => props.icon});
    background-size: cover;
  }
`
const ContentSection = styled.div`
  padding-bottom: 0.24rem;
`
const ContentList = styled.ol`
  padding-left: 0.24rem;
`
const ContentItem = styled(CNBodySmall)``
const ContentTitle = styled(CNBodySmall)`
  color: #7680dd;
`
// const Button = styled.button`
//   padding: 6px 12px;
//   color: #d9dbef;
//   font-size: 12px;
//   font-weight: 600;
//   line-height: 1;
//   background: #7680dd;
//   border: none;
//   border-radius: 4px;
// `
const Container = styled.div`
  width: 96%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const CheckboxContainer = styled(CNBodySmall)`
  display: flex;
  align-items: center;
  margin-bottom: 0.07rem;
  color: #393f47;
`
const Checkbox = styled.input`
  margin: 0;
  margin-right: 0.07rem;
  height: 0.145rem;
  width: 0.145rem;
  cursor: pointer;
  &:checked {
    accent-color: ${props => props.theme.secondary01};
  }
`

const workTypeMap = new Map([
  ['fullTime', '全职'],
  ['internship', '兼职'],
])

type JDdataProps = {
  id: string
  label: string
  tag: string[]
  workNature: string
  workType: 'fullTime' | 'internship'
  releaseTime: string
  content: {
    title: string
    body: string[]
  }[]
}[]
const JDdata: JDdataProps = [
  {
    id: 'Distributed storage software development senior engineer'
      .split(' ')
      .join('-')
      .toLowerCase(),
    label: '分布式存储软件开发资深工程师',
    tag: ['全职', '急招'],
    workNature: '远程办公',
    workType: 'fullTime',
    releaseTime: '2023-5-17',
    content: [
      {
        title: '【岗位职责】',
        body: [
          '参与开源分布式存储项目DatenLord的开发和维护；',
          '完善DatenLord的测试，构建新的DatenLord测试框架；',
          '提高DatenLord分布式性能表现。 ',
        ],
      },
      {
        title: '【岗位要求】',
        body: [
          '至少5年的分布式系统开发或研究经验，最好是分布式存储系统研发或研究经验；',
          '具有HDFS 、Ceph、GlusterFS等分布式存储系统具有相关开发和使用经验；',
          '熟悉Rust、C或C++语言；',
          '具有开源项目的开发和维护经验。',
        ],
      },
    ],
  },
  {
    id: 'Rust distributed storage development'
      .split(' ')
      .join('-')
      .toLowerCase(),
    label: 'Rust分布式存储开发',
    tag: ['实习', '即将招满'],
    workNature: '远程办公',
    workType: 'internship',
    releaseTime: '2023-5-17',
    content: [
      {
        title: '【岗位职责】',
        body: [
          '参与高性能分布式存储系统研发，涉及的开发内容包括但不限于：',
          '分布式存储系统开发；',
          '分布式数据一致性协议研究和开发；',
          '分布式缓存、数据管理服务；',
          '使用 Rust 语言进行内核驱动开发。',
        ],
      },
      {
        title: '【岗位要求】',
        body: [
          '熟练使用Rust语言，熟悉多线程、高并发编程；',
          '熟悉Linux操作系统存储管理相关功能；',
          '具有很强的学习能力，自我驱动以及团队合作意识；',
          '实习时间6个月以上，每周4~5天。',
        ],
      },
      {
        title: '【加分项】',
        body: [
          '熟悉Rust异步编程、有tokio或async-std使用经验优先；',
          '熟悉分布式一致性协议Paxos或Raft、分布式KV存储etcd、有K8S的CSI接口编程经验优先；',
          '有过开源项目/开源贡献经验者优先。',
        ],
      },
    ],
  },
  {
    id: 'FPGA development'.split(' ').join('-').toLowerCase(),
    label: 'FPGA开发',
    tag: ['实习'],
    workNature: '远程办公',
    workType: 'internship',
    releaseTime: '2023-5-17',
    content: [
      {
        title: '【岗位职责】',
        body: [
          '负责基于FPGA实现网络IO加速，以及加密、压缩、编码等算法加速的设计与RTL实现；',
          '实现常用外设接口IP的RTL设计、集成和验证；',
          '配合上层软件实现软硬件联调。',
        ],
      },
      {
        title: '【岗位要求】',
        body: [
          '熟悉基于FPGA的设计流程，熟悉Xilinx的FPGA芯片架构，熟练掌握Xilinx的FPGA开发工具；',
          '熟练掌握Verilog、SystemVerilog以及SystemVerilog Assertion的使用；',
          '熟练掌握TCL、Python脚本语言；',
          '具有很强的学习能力，自我驱动以及团队合作意识；',
          '实习时间6个月以上，每周4~5天。',
        ],
      },
      {
        title: '【加分项】',
        body: [
          '熟悉Bluespec、SpinalHDL、Chisel、Clash等至少一种新一代HDL语言；',
          ' 熟悉CXL、PCIe、AXI、ACE、CHI等相关总线接口开发优先；',
          '熟悉TCP/IP、RDMA、NVMe协议，有加密、压缩、编码开发经验优先。',
        ],
      },
    ],
  },
  {
    id: 'The joint hardware and software research and development internship'
      .split(' ')
      .join('-')
      .toLowerCase(),
    label: '软硬件联合研发实习生',
    tag: ['实习'],
    workNature: '远程办公',
    workType: 'internship',
    releaseTime: '2023-5-17',
    content: [
      {
        title: '【岗位职责】',
        body: [
          '参与高性能存储SoC芯片的软硬件开发：',
          '负责网络IO加速的RTL实现；',
          '负责加密、压缩、编码等算法加速的设计与RTL实现；',
          '负责SoC芯片的Linux驱动开发；',
          '负责实现软硬件联合调试与自动化测试。',
        ],
      },
      {
        title: '【岗位要求】',
        body: [
          '熟悉IC设计流程，熟悉常用的仿真、综合等EDA工具；',
          '熟悉Xilinx的FPGA设计流程，熟练掌握Xilinx的FPGA开发工具；',
          '熟悉Bluespec、SpinalHDL、Chisel或Clash等新一代HDL语言；',
          '熟悉Rust for Linux开发内核模块、驱动；',
          '熟悉基于QEMU的软硬件联合调试工具链；',
          '具有很强的学习能力，自我驱动以及团队合作意识。',
        ],
      },
      {
        title: '【加分项】',
        body: [
          '有网络或存储硬件系统开发经验优先；',
          '熟悉TCP/IP或InfiniBand/RDMA网络协议栈优先；',
          '熟悉CXL、PCIe、AXI、ACE、CHI、NVMe等协议接口开发优先；',
          '有DSP领域相关经验，熟悉LDPC、喷泉码、椭圆曲线加密算法和零知识证明算法优先；',
          '有Linux内核网络、文件、存储相关开发经验优先；',
          '能长期实习（1年以上）优先。',
        ],
      },
    ],
  },
]

export default () => {
  const navigate = useNavigate()
  const [data, setData] = useState(JDdata)
  const [selected, setSelected] = useState({
    fullTime: true,
    internship: true,
  })

  useEffect(() => {
    setData(JDdata.filter(item => selected[item.workType] === true))
  }, [selected])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <ViewWrapper>
      <ViewContainer>
        <LeftSidebarContainer>
          <Filters>
            <FiltersTitle>筛选</FiltersTitle>
            <FiltersClass>工作类型</FiltersClass>
            <CheckboxContainer as={'div'}>
              <Checkbox
                type="checkbox"
                id="full-time"
                checked={selected['fullTime']}
                onChange={() => {
                  const _selected = { ...selected }
                  _selected['fullTime'] = !_selected['fullTime']
                  setSelected(_selected)
                }}
              />
              <label htmlFor="full-time">全职</label>
            </CheckboxContainer>
            <CheckboxContainer as={'div'}>
              <Checkbox
                type="checkbox"
                id="internship"
                checked={selected['internship']}
                onChange={() => {
                  const _selected = { ...selected }
                  _selected['internship'] = !_selected['internship']
                  setSelected(_selected)
                }}
              />
              <label htmlFor="internship">兼职</label>
            </CheckboxContainer>
          </Filters>
        </LeftSidebarContainer>
        <MainContainer>
          <JDList>
            {data.map(props => {
              const {
                id,
                label,
                tag,
                workNature,
                workType,
                releaseTime,
                content,
              } = props
              return (
                <JDCard
                  key={id}
                  onClick={() => {
                    navigate(id.split(' ').join('-'))
                  }}
                >
                  <Logo src={logoUrl} />
                  <ContentContainer>
                    <CardTags>{tag.join(', ')}</CardTags>
                    <Container>
                      <CardTitle>{label}</CardTitle>
                      {/* <Button>New Post</Button> */}
                    </Container>
                    <TagContainer>
                      <Tag icon={locationIconUrl}>{workNature}</Tag>
                      <Placeholder>·</Placeholder>
                      <Tag icon={clockIconUrl}>{workTypeMap.get(workType)}</Tag>
                      <Placeholder>·</Placeholder>
                      <Placeholder>·</Placeholder>
                      <Tag icon={calendarIconUrl}>
                        {moment(releaseTime, 'YYYY-MM-DD').fromNow()}
                      </Tag>
                    </TagContainer>
                    {content.map(({ title, body }) => (
                      <ContentSection key={title}>
                        <ContentTitle as={'p'}>{title}</ContentTitle>
                        <ContentList>
                          {body.map(item => (
                            <ContentItem as={'li'} key={item}>
                              {item}
                            </ContentItem>
                          ))}
                        </ContentList>
                      </ContentSection>
                    ))}
                  </ContentContainer>
                </JDCard>
              )
            })}
          </JDList>
        </MainContainer>
        <RightSidebarContainer>
          <DescriptionCard>
            <DescriptionTitle>面试流程</DescriptionTitle>
            <DescriptionClass>实习岗位：</DescriptionClass>
            <DescriptionText>
              <DescriptionTextBold>项目笔试</DescriptionTextBold>- 两天
            </DescriptionText>
            <DescriptionText>
              <DescriptionTextBold>性能优化</DescriptionTextBold> - 不超过一周
            </DescriptionText>
            <DescriptionText>
              <DescriptionTextBold>交叉面试</DescriptionTextBold>
            </DescriptionText>
            <DescriptionText>
              <DescriptionTextBold>思路 review</DescriptionTextBold> - 交流指导
            </DescriptionText>
            <div style={{ paddingBlock: '0.06rem' }} />
            <DescriptionClass>校招 / 社招岗位：</DescriptionClass>
            <DescriptionText>
              <DescriptionTextBold>项目笔试</DescriptionTextBold> - 两天
            </DescriptionText>
            <DescriptionText>
              <DescriptionTextBold>思路 review</DescriptionTextBold> - 交流指导
            </DescriptionText>
            <DescriptionText>
              <DescriptionTextBold>性能优化</DescriptionTextBold> - 不超过一周
            </DescriptionText>
            <DescriptionText>
              <DescriptionTextBold>交叉面试</DescriptionTextBold>
            </DescriptionText>
          </DescriptionCard>
          <LinkCard>
            <LinkTitle>投递简历</LinkTitle>
            <LinkSebTitle>- 投递至邮箱:</LinkSebTitle>
            <LinkText style={{ paddingTop: '0.04rem' }}>
              <ColorText>info@datenlord.com</ColorText>
            </LinkText>
            <div style={{ height: '0.24rem' }} />
            <LinkSebTitle>- 添加达坦科技小助手微信:</LinkSebTitle>
            {/* <LinkText>
              <ColorText>info@datenlord.com</ColorText>或扫描微信联系也可以喔~
            </LinkText> */}
            <Img src={weChatQRcode} />
          </LinkCard>
        </RightSidebarContainer>
      </ViewContainer>
    </ViewWrapper>
  )
}
