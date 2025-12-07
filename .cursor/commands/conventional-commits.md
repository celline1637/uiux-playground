# Conventional Commits 가이드

이 문서는 커밋 메시지를 **명확하게 기록**하고
팀 내 변경 사항이 **효율적으로 공유**될 수 있도록
Conventional Commits 규칙을 적용하는 기준을 정의합니다.

> 목적:
>
> * 변경 히스토리를 이해하기 쉽게 유지
> * 커뮤니케이션 비용 감소
> * 유지보수성과 협업 효율 향상
> * 자동화(릴리즈/CHANGELOG) 가능성 강화

이 프로젝트는 [Conventional Commits](https://www.conventionalcommits.org/) 스펙을 따릅니다.

---

## 커밋 메시지 형식

```
<type>(<scope>): <subject>

<body>

<footer>
```

---

## Type (필수)

명확한 히스토리를 위해 각 커밋은 변경의 성격을 `type`으로 구분합니다.

* `feat`: 새로운 기능 추가
* `fix`: 버그 수정
* `docs`: 문서 변경
* `style`: 코드 포맷팅, 세미콜론 누락 등 (코드 변경 없음)
* `refactor`: 코드 리팩토링
* `perf`: 성능 개선
* `test`: 테스트 추가 또는 수정
* `build`: 빌드 시스템 또는 외부 종속성 변경
* `ci`: CI 설정 파일 및 스크립트 변경
* `chore`: 기타 변경사항 (빌드 업데이트, 패키지 매니저 설정 등)
* `revert`: 이전 커밋 되돌리기

---

## Scope (필수)

명확한 추적을 위해 **브랜치명에서 티켓 정보를 추출하여 scope로 사용합니다.**

브랜치명 형식:

```
<type>/<WORKSPACE>/<ticket-id>-<description>
```

예:

* `feat(CLIP-7421):`
* `fix(CLIP-1234):`
* `refactor(CLIP-5678):`

> 티켓이 없는 경우에만 변경 범위를 scope로 사용합니다.

---

## Subject (필수)

커밋 목적을 빠르게 이해할 수 있도록 작성합니다.

* 50자 이내
* 첫 글자는 소문자
* 마침표 생략
* 명령형 표현 사용 (`add`, `update`, `remove` 등)

---

## Body (선택)

히스토리 분석과 리뷰에 도움이 되도록 작성합니다.

* 상세 변경 내용을 기술
* 왜 변경했는지 명확히
* 72자마다 줄바꿈

---

## Footer (선택)

* Breaking changes 시: `BREAKING CHANGE:`
* 관련 Issue 참조: `Closes #123`, `Fixes #456`

---

## 예시

### 티켓 정보가 있는 경우 (권장 사례)

```
feat(CLIP-7421): add guide page structure

- Add table of contents with anchor links
- Reorganize guide sections
- Add smooth scroll navigation

This improves user experience for guide navigation.
```

```
fix(CLIP-1234): resolve 401 error on token expiration

The API was returning 401 errors even when refresh token was valid.
Now properly handles token refresh flow.
```

```
refactor(CLIP-5678): reorganize file structure

- Move hooks to shared/hooks/
- Move lib to shared/lib/
- Reorganize sections into ui/, view/, schema/ folders

This improves code organization and maintainability.
```

### 티켓 정보가 없는 경우 (예외)

```
feat(auth): add JWT token refresh functionality

Implement automatic token refresh when access token expires.
This improves user experience by reducing forced logouts.

Closes #123
```