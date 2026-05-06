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
  },
  {
    layout_id: 'study_001',
    expiry_hours: 12,
    keywords: ['학습', 'study', '공부', '시험'],
    icons: [
      {
        id: 'notion_001',
        label: '노트 정리',
        icon_url: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/notion.svg',
        action: 'https://www.notion.so',
        type: 'action'
      },
      {
        id: 'quizlet_001',
        label: '플래시카드',
        icon_url: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/quizlet.svg',
        action: 'https://www.quizlet.com',
        type: 'action'
      },
      {
        id: 'timer_001',
        label: '포모도로 타이머',
        icon_url: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/clockify.svg',
        action: 'https://clockify.me',
        type: 'widget',
        widget_data: {
          type: 'timer',
          update_interval: 1,
          preview: '25:00'
        }
      }
    ],
    clusters: [
      {
        id: 'study_cluster_001',
        label: '학습 도구',
        icon_ids: ['notion_001', 'quizlet_001', 'timer_001'],
        color: '#8B5CF6'
      }
    ]
  },
  {
    layout_id: 'shopping_001',
    expiry_hours: 6,
    keywords: ['쇼핑', 'shopping', '구매', '물건'],
    icons: [
      {
        id: 'coupang_002',
        label: '쿠팡',
        icon_url: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/coupang.svg',
        action: 'https://www.coupang.com',
        type: 'app'
      },
      {
        id: 'amazon_001',
        label: '아마존',
        icon_url: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/amazon.svg',
        action: 'https://www.amazon.com',
        type: 'app'
      },
      {
        id: 'cart_001',
        label: '장바구니 확인',
        icon_url: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/shoppingcart.svg',
        action: 'https://www.coupang.com/cart',
        type: 'action'
      }
    ],
    clusters: [
      {
        id: 'shopping_cluster_001',
        label: '쇼핑 앱',
        icon_ids: ['coupang_002', 'amazon_001', 'cart_001'],
        color: '#F59E0B'
      }
    ]
  },
  {
    layout_id: 'gaming_001',
    expiry_hours: 8,
    keywords: ['게임', 'gaming', '플레이', 'game'],
    icons: [
      {
        id: 'steam_001',
        label: '스팀',
        icon_url: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/steam.svg',
        action: 'https://store.steampowered.com',
        type: 'app'
      },
      {
        id: 'discord_001',
        label: '디스코드',
        icon_url: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/discord.svg',
        action: 'https://discord.com',
        type: 'app'
      },
      {
        id: 'twitch_001',
        label: '트위치',
        icon_url: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/twitch.svg',
        action: 'https://www.twitch.tv',
        type: 'app'
      }
    ],
    clusters: [
      {
        id: 'gaming_cluster_001',
        label: '게임 플랫폼',
        icon_ids: ['steam_001', 'discord_001', 'twitch_001'],
        color: '#EF4444'
      }
    ]
  },
  {
    layout_id: 'work_001',
    expiry_hours: 10,
    keywords: ['업무', 'work', '직장', '회사'],
    icons: [
      {
        id: 'slack_001',
        label: '슬랙',
        icon_url: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/slack.svg',
        action: 'https://slack.com',
        type: 'app'
      },
      {
        id: 'notion_002',
        label: '업무 노트',
        icon_url: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/notion.svg',
        action: 'https://www.notion.so',
        type: 'action'
      },
      {
        id: 'googlecalendar_001',
        label: '일정 확인',
        icon_url: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/googlecalendar.svg',
        action: 'https://calendar.google.com',
        type: 'widget',
        widget_data: {
          type: 'calendar',
          update_interval: 300,
          preview: '오늘 2시 미팅'
        }
      }
    ],
    clusters: [
      {
        id: 'work_cluster_001',
        label: '업무 도구',
        icon_ids: ['slack_001', 'notion_002', 'googlecalendar_001'],
        color: '#3B82F6'
      }
    ]
  },
  {
    layout_id: 'music_001',
    expiry_hours: 12,
    keywords: ['음악', 'music', '노래', 'spotify'],
    icons: [
      {
        id: 'spotify_001',
        label: '스포티파이',
        icon_url: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/spotify.svg',
        action: 'https://www.spotify.com',
        type: 'app'
      },
      {
        id: 'youtube_001',
        label: '유튜브 뮤직',
        icon_url: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/youtubemusic.svg',
        action: 'https://music.youtube.com',
        type: 'app'
      }
    ]
  },
  {
    layout_id: 'movie_001',
    expiry_hours: 6,
    keywords: ['영화', 'movie', '영화관', 'netflix'],
    icons: [
      {
        id: 'netflix_001',
        label: '넷플릭스',
        icon_url: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/netflix.svg',
        action: 'https://www.netflix.com',
        type: 'app'
      },
      {
        id: 'disney_001',
        label: '디즈니+',
        icon_url: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/disney.svg',
        action: 'https://www.disneyplus.com',
        type: 'app'
      },
      {
        id: 'cgv_001',
        label: 'CGV 예매',
        icon_url: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/cgv.svg',
        action: 'https://www.cgv.co.kr',
        type: 'action'
      }
    ]
  },
  {
    layout_id: 'finance_001',
    expiry_hours: 8,
    keywords: ['금융', 'finance', '은행', '주식'],
    icons: [
      {
        id: 'kb_001',
        label: 'KB국민은행',
        icon_url: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/kookminbank.svg',
        action: 'https://www.kbstar.com',
        type: 'app'
      },
      {
        id: 'kakao_001',
        label: '카카오페이',
        icon_url: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/kakaopay.svg',
        action: 'https://www.kakaopay.com',
        type: 'app'
      }
    ]
  },
  {
    layout_id: 'cooking_001',
    expiry_hours: 4,
    keywords: ['요리', 'cooking', '레시피', 'recipe'],
    icons: [
      {
        id: 'recipe10000recipe_001',
        label: '만개의 레시피',
        icon_url: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/10000recipe.svg',
        action: 'https://www.10000recipe.com',
        type: 'app'
      },
      {
        id: 'youtube_002',
        label: '요리 영상',
        icon_url: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/youtube.svg',
        action: 'https://www.youtube.com/results?search_query=요리',
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

export interface KVStore {
  get(key: string): Promise<string | null>
  put(key: string, value: string): Promise<void>
  delete(key: string): Promise<void>
  list(): Promise<{ keys: { name: string }[] }>
}

let inMemoryPinnedItems: PinItem[] = []

export async function getPinnedItems(kv?: KVStore): Promise<PinItem[]> {
  if (kv) {
    const listResult = await kv.list()
    const items: PinItem[] = []
    for (const key of listResult.keys) {
      const value = await kv.get(key.name)
      if (value) {
        items.push(JSON.parse(value))
      }
    }
    return items.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
  }
  return [...inMemoryPinnedItems]
}

export async function addPinnedItem(item: PinItem, kv?: KVStore): Promise<void> {
  if (kv) {
    await kv.put(`pin:${item.id}`, JSON.stringify(item))
  } else {
    inMemoryPinnedItems.push(item)
  }
}

export async function removePinnedItem(id: string, kv?: KVStore): Promise<boolean> {
  if (kv) {
    await kv.delete(`pin:${id}`)
    return true
  }
  const initialLength = inMemoryPinnedItems.length
  inMemoryPinnedItems = inMemoryPinnedItems.filter(pin => pin.id !== id)
  return inMemoryPinnedItems.length !== initialLength
}

