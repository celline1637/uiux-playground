# 수직 스크롤 피드 플로우 문서

## 📋 목차
1. [전체 아키텍처](#전체-아키텍처)
2. [리스트 조회 플로우](#리스트-조회-플로우)
3. [컨텐츠 재생/일시정지 플로우](#컨텐츠-재생일시정지-플로우)
4. [상세 시퀀스 다이어그램](#상세-시퀀스-다이어그램)

---

## 전체 아키텍처

### 컴포넌트 구조
```
XYDragFeedView (widgets/vertical-scroll-feed/view.tsx)
├── useVerticalSnapScroll (스크롤 상태 관리)
├── useIntersectionObserver (무한 스크롤 감지)
├── IntersectionObserver (가시성 추적)
└── FeedItemComponent (개별 피드 아이템)
    └── video element (비디오 재생)
```

### 주요 상태 관리
- `items`: 피드 아이템 리스트 (초기 10개, 무한 스크롤로 추가)
- `visibleItems`: 현재 뷰포트에 보이는 아이템 ID Set
- `mute`: 음소거 상태
- `currentIndex`: 현재 스크롤 위치의 아이템 인덱스

---

## 리스트 조회 플로우

### 1. 초기 리스트 로드

**시점**: 컴포넌트 마운트 시 (`useState` 초기화)

```typescript
// widgets/vertical-scroll-feed/view.tsx:15
const [items, setItems] = useState(() => generateMockItems(10))
```

**동작**:
- `generateMockItems(10)` 호출로 초기 10개 아이템 생성
- 각 아이템은 `id`, `title`, `description`, `videoUrl`, `color`, `likes`, `comments` 포함

**결과**: 화면에 10개 피드 아이템 렌더링

---

### 2. 무한 스크롤 (Lazy Loading)

**시점**: 마지막에서 두 번째 아이템이 뷰포트에 50% 이상 보일 때

**트리거 조건**:
```typescript
// widgets/vertical-scroll-feed/view.tsx:98
const isLastOfSecond = items.length > 1 && items.length - 2 === index
```

**감지 메커니즘**:
```typescript
// widgets/vertical-scroll-feed/view.tsx:30-32
const { setObservationTarget } = useIntersectionObserver(loadMoreItems, {
  threshold: 0.5, // 50% 이상 보일 때 트리거
})
```

**로드 프로세스**:
1. 마지막에서 두 번째 아이템에 `setObservationTarget` ref 연결
2. 해당 아이템이 뷰포트의 50% 이상 보이면 `loadMoreItems` 콜백 실행
3. `generateMockItems(5)` 호출로 추가 5개 아이템 생성
4. 기존 리스트에 새 아이템 추가: `setItems((prev) => [...prev, ...newItems])`

**코드 위치**:
```25:28:src/widgets/vertical-scroll-feed/view.tsx
const loadMoreItems = useCallback(() => {
  const newItems = generateMockItems(5)
  setItems((prev) => [...prev, ...newItems])
}, [])
```

---

## 컨텐츠 재생/일시정지 플로우

### 1. 가시성 추적 시스템

**설정 시점**: `containerRef`가 준비된 후 (`useEffect`)

**IntersectionObserver 설정**:
```typescript
// widgets/vertical-scroll-feed/view.tsx:35-70
useEffect(() => {
  if (!containerRef.current) return

  observerRef.current = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const itemId = entry.target.getAttribute("data-item-id")
        if (!itemId) continue

        setVisibleItems((prev) => {
          const next = new Set(prev)
          if (entry.isIntersecting) {
            next.add(itemId)      // 뷰포트에 진입
          } else {
            next.delete(itemId)   // 뷰포트에서 이탈
          }
          return next
        })
      }
    },
    {
      root: containerRef.current,  // 스크롤 컨테이너를 root로 설정
      rootMargin: "0px",
      threshold: 0.5,  // 50% 이상 보일 때 visible로 간주
    }
  )
}, [containerRef])
```

**아이템 등록**:
```typescript
// widgets/vertical-scroll-feed/view.tsx:73-85
const registerItemRef = useCallback((itemId: string, element: HTMLElement | null) => {
  if (element) {
    element.setAttribute("data-item-id", itemId)
    itemRefs.current.set(itemId, element)
    observerRef.current?.observe(element)  // 관찰 시작
  } else {
    // 언마운트 시 정리
    const existingElement = itemRefs.current.get(itemId)
    if (existingElement) {
      observerRef.current?.unobserve(existingElement)
      itemRefs.current.delete(itemId)
    }
  }
}, [])
```

---

### 2. 자동 재생/일시정지 로직

**위치**: `FeedItemComponent` 내부

**재생 조건**:
- `isVisible === true` (뷰포트에 50% 이상 보임)
- `item.videoUrl` 존재
- `mute` 상태와 무관 (음소거여도 재생은 됨, 단 음소거 상태)

**일시정지 조건**:
- `isVisible === false` (뷰포트에서 벗어남)

**구현 코드**:
```typescript
// features/vertical-scroll-feed/components/feed-item.tsx:38-51
useEffect(() => {
  if (!mediaRef.current || !item.videoUrl) return

  if (isVisible) {
    // 뷰포트에 보일 때 재생
    mediaRef.current.play().catch((error) => {
      console.warn("자동 재생 실패:", error)
    })
  } else {
    // 뷰포트에서 벗어나면 일시정지
    mediaRef.current.pause()
  }
}, [isVisible, item.videoUrl])
```

**음소거 동기화**:
```typescript
// features/vertical-scroll-feed/components/feed-item.tsx:53-58
useEffect(() => {
  if (mediaRef.current) {
    mediaRef.current.muted = mute
  }
}, [mute])
```

---

## 상세 시퀀스 다이어그램

### 초기 로드 시퀀스

```
1. XYDragFeedView 마운트
   ↓
2. useState(() => generateMockItems(10))
   → 초기 10개 아이템 생성
   ↓
3. 각 FeedItemComponent 렌더링
   ↓
4. registerItemRef 호출
   → 각 아이템에 data-item-id 설정
   → IntersectionObserver에 등록
   ↓
5. IntersectionObserver 콜백 실행
   → 첫 번째 아이템이 뷰포트에 보임
   → visibleItems Set에 첫 번째 아이템 ID 추가
   ↓
6. FeedItemComponent의 useEffect 실행
   → isVisible === true 감지
   → video.play() 호출
   → 비디오 자동 재생 시작
```

### 스크롤 시퀀스

```
사용자 스크롤
   ↓
1. useVerticalSnapScroll의 handleScroll 실행
   → currentIndex 업데이트
   → hasPrev/hasNext 상태 업데이트
   ↓
2. IntersectionObserver 콜백 실행
   → 이전 아이템: entry.isIntersecting === false
   → visibleItems Set에서 이전 아이템 ID 제거
   → 새 아이템: entry.isIntersecting === true
   → visibleItems Set에 새 아이템 ID 추가
   ↓
3. FeedItemComponent 리렌더링
   → 이전 아이템: isVisible === false
   → video.pause() 호출 (일시정지)
   → 새 아이템: isVisible === true
   → video.play() 호출 (재생)
```

### 무한 스크롤 시퀀스

```
사용자가 스크롤하여 마지막에서 두 번째 아이템 근처 도달
   ↓
1. useIntersectionObserver 감지
   → 마지막에서 두 번째 아이템이 뷰포트 50% 이상 보임
   → loadMoreItems 콜백 실행
   ↓
2. generateMockItems(5) 호출
   → 추가 5개 아이템 생성
   ↓
3. setItems((prev) => [...prev, ...newItems])
   → items 상태 업데이트
   ↓
4. 새로운 FeedItemComponent 렌더링
   → registerItemRef로 새 아이템들 IntersectionObserver에 등록
   ↓
5. 사용자가 계속 스크롤하면
   → 새 아이템들이 뷰포트에 진입
   → 자동 재생 시작
```

---

## 핵심 포인트 요약

### 리스트 조회
- ✅ **초기 로드**: 컴포넌트 마운트 시 10개 아이템 생성
- ✅ **무한 스크롤**: 마지막에서 두 번째 아이템이 50% 보일 때 추가 5개 로드
- ✅ **지연 로딩**: 필요한 시점에만 데이터 로드

### 컨텐츠 재생/일시정지
- ✅ **자동 재생**: 뷰포트에 50% 이상 보이면 자동 재생
- ✅ **자동 일시정지**: 뷰포트에서 벗어나면 자동 일시정지
- ✅ **단일 재생**: 한 번에 하나의 아이템만 재생 (뷰포트에 보이는 것만)
- ✅ **음소거 지원**: mute 상태에 따라 비디오 음소거/해제

### 성능 최적화
- ✅ **IntersectionObserver**: 효율적인 가시성 감지
- ✅ **Set 자료구조**: O(1) 가시성 체크
- ✅ **CSS Snap**: 부드러운 스크롤 스냅
- ✅ **Ref 관리**: 불필요한 리렌더링 방지

---

## 관련 파일 위치

- **메인 뷰**: `src/widgets/vertical-scroll-feed/view.tsx`
- **피드 아이템**: `src/features/vertical-scroll-feed/components/feed-item.tsx`
- **스크롤 훅**: `src/features/vertical-scroll-feed/model/use-vertical-snap-scroll.ts`
- **목업 데이터**: `src/entities/feed/mock/generate-mock-items.ts`
- **타입 정의**: `src/entities/feed/interface/feed.ts`

