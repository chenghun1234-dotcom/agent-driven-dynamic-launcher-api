export type IconType = 'app' | 'action' | 'widget' | 'pin'

export interface WidgetData {
  type: string
  update_interval?: number
  data_url?: string
  preview?: string
}

export interface IconMapping {
  id: string
  label: string
  icon_url: string
  action: string
  type: IconType
  widget_data?: WidgetData
  is_pinned?: boolean
}

export interface Cluster {
  id: string
  label: string
  icon_ids: string[]
  color?: string
}

export interface IntentTemplate {
  layout_id: string
  expiry_hours?: number
  icons: IconMapping[]
  clusters?: Cluster[]
  keywords: string[]
}

export const INTENT_TEMPLATES: IntentTemplate[] = [
  {
    layout_id: 'busan_trip_001',
    expiry_hours: 24,
    keywords: ['출장', 'busan', 'trip', '제주도', '여행'],
    icons: [
      {
        id: 'ktx_001',
        label: 'KTX 예매',
        icon_url: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/korail.svg',
        action: 'https://www.letskorail.com',
        type: 'action'
      },
      {
        id: 'weather_001',
        label: '부산 날씨',
        icon_url: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/openweathermap.svg',
        action: 'https://openweathermap.org/city/1838524',
        type: 'widget',
        widget_data: {
          type: 'weather',
          update_interval: 300,
          data_url: 'https://api.openweathermap.org/data/2.5/weather?q=Busan',
          preview: '18°C, 맑음'
        }
      },
      {
        id: 'contact_001',
        label: '방문처 연락',
        icon_url: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/phone.svg',
        action: 'tel:010-0000-0000',
        type: 'action'
      },
      {
        id: 'hotel_001',
        label: '숙소 예약',
        icon_url: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/booking.svg',
        action: 'https://www.booking.com',
        type: 'action'
      },
      {
        id: 'food_001',
        label: '맛집 리스트',
        icon_url: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/googlemaps.svg',
        action: 'https://maps.google.com',
        type: 'action'
      }
    ],
    clusters: [
      {
        id: 'trip_cluster_001',
        label: '부산 출장 준비',
        icon_ids: ['ktx_001', 'weather_001', 'contact_001', 'hotel_001', 'food_001'],
        color: '#3B82F6'
      }
    ]
  },
  {
    layout_id: 'delivery_001',
    expiry_hours: 2,
    keywords: ['배달', 'delivery', '음식', 'food'],
    icons: [
      {
        id: 'baedal_001',
        label: '배달의민족',
        icon_url: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/baedalminjok.svg',
        action: 'https://www.baedal.com',
        type: 'app'
      },
      {
        id: 'yogiyo_001',
        label: '요기요',
        icon_url: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/yogiyo.svg',
        action: 'https://www.yogiyo.co.kr',
        type: 'app'
      },
      {
        id: 'coupang_001',
        label: '쿠팡이츠',
        icon_url: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/coupang.svg',
        action: 'https://www.coupangeats.com',
        type: 'app'
      }
    ],
    clusters: [
      {
        id: 'delivery_cluster_001',
        label: '배달 앱',
        icon_ids: ['baedal_001', 'yogiyo_001', 'coupang_001'],
        color: '#10B981'
      }
    ]
  },
  {
    layout_id: 'exercise_001',
    expiry_hours: 6,
    keywords: ['운동', 'exercise', 'workout', '헬스', '러닝'],
    icons: [
      {
        id: 'strava_001',
        label: '러닝 기록',
        icon_url: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/strava.svg',
        action: 'https://www.strava.com',
        type: 'action'
      },
      {
        id: 'fit_001',
        label: '운동 통계',
        icon_url: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/googlefit.svg',
        action: 'https://fit.google.com',
        type: 'widget',
        widget_data: {
          type: 'stats',
          update_interval: 600,
          preview: '오늘: 5,000보'
        }
      }
    ]
  },
  {
    layout_id: 'report_001',
    expiry_hours: 4,
    keywords: ['보고', 'report', '팀장', '팀'],
    icons: [
      {
        id: 'report_001',
        label: '팀장님께 보고하기',
        icon_url: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/kakaotalk.svg',
        action: 'kakaotalk://chat?user=team_leader',
        type: 'action'
      }
    ]
  }
]

export const DEFAULT_TEMPLATE: IntentTemplate = {
  layout_id: 'default_001',
  expiry_hours: 24,
  keywords: [],
  icons: [
    {
      id: 'home_001',
      label: '기본 홈',
      icon_url: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/home.svg',
      action: 'https://example.com',
      type: 'app'
    }
  ]
}

export interface PinItem {
  id: string
  label: string
  icon_url: string
  action: string
  created_at: string
}

export let PINNED_ITEMS: PinItem[] = []

