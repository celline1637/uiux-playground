# 코드 리뷰 (Frontend Fundamentals 기반)

## 개요

프론트엔드 코드 품질 기준(가독성, 예측 가능성, 응집도, 결합도)에 따라 변경사항을 체계적으로 리뷰하고 개선 제안을 제공합니다.

**에이전트 지시사항**: 이 커맨드 실행 시 다음을 자동으로 수행하세요:

1. 현재 변경사항 확인 (`git status`, `git diff`)
2. 변경된 파일 분석 (TypeScript/JavaScript/React 파일 우선)
3. Frontend Fundamentals의 4가지 기준에 따라 체크리스트 검토
4. 구체적인 개선 제안 및 예시 코드 제공
5. 우선순위별로 정리된 리뷰 결과 제공

## Frontend Fundamentals 기준

### 핵심 원칙: 변경하기 쉬운 코드

좋은 프론트엔드 코드는 **변경하기 쉬운 코드**입니다. 다음 4가지 기준으로 판단합니다:

1. **가독성(Readability)**: 읽는 흐름이 위→아래로 자연스럽고, 한 번에 들고 가야 할 맥락이 적음
2. **예측 가능성(Predictability)**: 이름·파라미터·반환값만 보고 동작을 예측할 수 있음
3. **응집도(Cohesion)**: 함께 바뀌어야 하는 코드가 함께 모여 있음
4. **결합도(Coupling)**: 수정 영향 범위가 작게 제한됨

## 리뷰 체크리스트

### 1. 가독성 (Readability)

#### 1.1 맥락 줄이기

- [ ] 동시에 실행되지 않는 코드가 분리되어 있나요?
  - 권한/역할별 UI가 별도 컴포넌트로 분리되었나요?
  - 인증/권한 같은 공통 로직이 HOC/Wrapper/Hook으로 분리되었나요?
  - 서로 다른 종류의 로직(쿼리 파라미터, 상태, API, URL 동기화)이 섞여 있지 않나요?

#### 1.2 이름 붙이기

- [ ] 복잡한 조건에 이름이 붙어 있나요?
  - 조건의 의도가 함수명으로 드러나나요?
  - 비즈니스 로직이 서비스 레이어로 분리되었나요?
- [ ] 매직 넘버에 이름이 붙어 있나요?
  - 의미 없는 숫자가 상수로 모여 있나요?
  - 관련 상수가 논리적으로 그룹화되어 있나요?

#### 1.3 위에서 아래로 읽히게

- [ ] 시점 이동이 최소화되어 있나요?
  - 상태 선언이 상단에 그룹화되어 있나요?
  - API 함수 정의 → useEffect 호출 → 핸들러 → 조건부 렌더 → JSX 순서로 정렬되어 있나요?
- [ ] 삼항 연산자가 단순화되어 있나요?
  - 삼항이 3단 이상 중첩되지 않았나요?
  - 공통 규칙이 전략 객체/함수로 분리되었나요?

### 2. 예측 가능성 (Predictability)

- [ ] 이름이 겹치지 않게 되어 있나요?
  - 같은 이름이면 같은 의미/동작인가요?
  - 라이브러리와의 이름 충돌을 피했나요?
- [ ] 같은 종류 함수의 반환 타입이 통일되어 있나요?
  - 성공/실패의 타입 골격이 동일한가요?
  - 호출부 분기 로직이 일관되게 동작하나요?
- [ ] 숨은 로직이 드러나 있나요?
  - 함수 본문에 숨은 부수효과가 없나요?
  - 부수효과가 호출부로 끌어올려졌나요?

### 3. 응집도 (Cohesion)

- [ ] 함께 수정되는 파일이 같은 디렉터리에 있나요?
  - "이 파일을 수정하면 항상 저 파일도 수정되나요?" 질문에 답할 수 있나요?
  - FSD 2.0 구조를 따르고 있나요?
- [ ] 매직 넘버가 상수로 모여 있나요?
  - 관련 상수가 하나의 모듈에 모여 있나요?
  - 변경 시 한 군데만 수정하면 되나요?
- [ ] 폼의 응집도가 고려되었나요?
  - 폼 구조가 바뀌면 상태·검증·제출이 같이 바뀌나요?
  - 세 요소가 한 파일/모듈 안에 모여 있나요?

### 4. 결합도 (Coupling)

- [ ] 책임이 하나씩 관리되고 있나요? (SRP)
  - 모듈/Hook/컴포넌트가 한 가지 책임만 가지나요?
  - 수정 영향이 국소적으로 제한되나요?
- [ ] 중복 코드를 전략적으로 허용했나요?
  - 공통화가 오히려 수정 범위를 넓히지 않나요?
  - 중복 허용이 안전/명료함을 준다면 선택했나요?
- [ ] Props Drilling이 제거되었나요?
  - Props 체인이 2~3단 이상 길어지지 않았나요?
  - 합성/Context/상태 관리로 전달 경로를 줄였나요?

## 리뷰 결과 형식

리뷰 결과는 다음 형식으로 제공하세요:

````markdown
# 코드 리뷰 결과

## 📊 전체 평가

[변경사항에 대한 전반적인 평가]

## ✅ 잘된 점

- [구체적인 잘된 점 1]
- [구체적인 잘된 점 2]

## 🔍 개선 제안

### 우선순위: 높음

#### [문제점 1]

**위치**: `파일명:줄번호`
**문제**: [구체적인 문제 설명]
**기준**: [가독성/예측 가능성/응집도/결합도 중 해당]
**제안**:

```typescript
// 개선된 코드 예시
```
````

#### [문제점 2]

...

### 우선순위: 중간

...

### 우선순위: 낮음

...

## 📝 체크리스트 요약

### 가독성

- ✅ [통과한 항목]
- ⚠️ [개선 필요 항목]

### 예측 가능성

- ✅ [통과한 항목]
- ⚠️ [개선 필요 항목]

### 응집도

- ✅ [통과한 항목]
- ⚠️ [개선 필요 항목]

### 결합도

- ✅ [통과한 항목]
- ⚠️ [개선 필요 항목]

````

## 리뷰 우선순위 판단 기준

### 높음 (즉시 수정 권장)
- 숨은 부수효과 (암묵 로깅, 전역 변경)
- Props Drilling이 3단 이상
- 동시에 실행되지 않는 코드가 한 곳에 섞임
- 복잡한 조건이 이름 없이 사용됨

### 중간 (리팩토링 시 개선)
- 매직 넘버가 상수화되지 않음
- 함께 수정되는 파일이 다른 디렉터리에 분산
- 함수 반환 타입이 불일치
- 삼항 연산자가 3단 이상 중첩

### 낮음 (선택적 개선)
- 코드 순서가 최적화되지 않음
- 이름이 겹치지만 충돌하지 않음
- 중복 코드가 있지만 전략적으로 허용 가능

## 실무 적용 팁

### 작성 단계
- 기능보다 **읽히는 흐름과 변경 용이성**을 먼저 확인
- 자가 점검 체크리스트로 사전 검토

### 리뷰 단계
- 구현보다 **품질 기준 준수** 우선 확인
- 구체적인 개선 제안과 예시 코드 제공

### 리팩토링 단계
- 무분별 공통화보다 **변경 용이성**을 우선
- 공통화 vs 중복 허용의 트레이드오프 고려

## 예시 리뷰

### 예시 1: 가독성 개선

**문제**:
```tsx
function SubmitButton({ onSubmit, disabled }: SubmitButtonProps) {
  const role = useRole();
  const [isAnimating, setIsAnimating] = useState(false);
  if (role === 'viewer') {
    return <button disabled>Submit (View Only)</button>;
  }
  // ... admin 로직
}
````

**제안**:

```tsx
const SubmitButton = ({ onSubmit, disabled }: SubmitButtonProps) => {
  const role = useRole();
  return role === 'viewer' ? (
    <ViewerSubmitButton />
  ) : (
    <AdminSubmitButton onSubmit={onSubmit} disabled={disabled} />
  );
};
```

### 예시 2: 예측 가능성 개선

**문제**:

```ts
async function fetchBalance(): Promise<number> {
  const balance = await http.get<number>('/balance');
  logging.log('balance_fetched'); // 숨은 부수효과
  globalState.balance = balance; // 전역 변경
  return balance;
}
```

**제안**:

```ts
async function fetchBalance(): Promise<number> {
  return http.get<number>('/balance');
}

// 호출부에서 명시적으로 처리
<Button onClick={async () => {
  const balance = await fetchBalance();
  logging.log('balance_fetched');
  await syncBalance(balance);
}}>잔액 갱신</Button>
```

### 예시 3: 응집도 개선

**문제**:

```
src/
  components/
  hooks/
  utils/
  constants/
```

**제안**:

```
src/
├── features/
│   └── edit-user-profile/
│       ├── ui/
│       ├── model/
│       └── index.ts
├── entities/
│   └── user/
│       ├── ui/
│       ├── model/
│       └── index.ts
└── shared/
    ├── ui/
    ├── lib/
    └── api/
```

## 참고 자료

- [Frontend Fundamentals - 핵심 원칙](./rules/frontend-fundamentals/01-core-principle.md)
- [Frontend Fundamentals - 가독성](./rules/frontend-fundamentals/02-readability.md)
- [Frontend Fundamentals - 예측 가능성](./rules/frontend-fundamentals/03-predictability.md)
- [Frontend Fundamentals - 응집도](./rules/frontend-fundamentals/04-cohesion.md)
- [Frontend Fundamentals - 결합도](./rules/frontend-fundamentals/05-coupling.md)
- [Frontend Fundamentals - 실무 가이드](./rules/frontend-fundamentals/07-practical-guide.md)
