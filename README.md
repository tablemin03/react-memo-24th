# React Memo


## 1. 기술 스택

| 구분 | 기술 |
| --- | --- |
| UI | React 19, TypeScript 6 |
| 개발·빌드 | Vite 8 |
| 스타일 | Tailwind CSS 4, Pretendard |
| 라우팅 | React Router 7 |
| 서버 상태 관리 | TanStack Query 5 |
| 인증 상태 관리 | Zustand 5 |
| 폼 관리 | React Hook Form 7 |
| HTTP 통신 | Axios 1 |
| 코드 검사 | ESLint 10 |
| 패키지 관리 | pnpm |

## 2. 주요 기능

- **회원가입·로그인**: 이메일과 비밀번호를 이용한 인증
- **메모 목록 조회**: 카테고리별 카드와 즐겨찾기·일반 메모 구분
- **검색·필터**: 불러온 메모의 제목·내용 검색 및 카테고리 필터
- **상세 보기**: 메모의 전체 내용을 모달로 확인

## 3. 지금까지 구현한 기능

현재 구현 범위는 다음과 같습니다.
- 이메일 형식, 비밀번호 8자 이상, 비밀번호 확인 검증 후 회원가입 요청
- 로그인 성공 시 액세스 토큰 저장 및 메인 페이지 이동
- 토큰이 없으면 로그인 페이지로 이동, Axios 요청에 Bearer 토큰 추가
- 검색·필터는 **현재까지 불러온 메모**에 적용됩니다.
- 즐겨찾기 변경은 화면의 로컬 상태에만 반영되며 서버에 저장되지 않습니다.
- 토큰을 영속 저장하지 않으므로 새로고침하면 다시 로그인해야 합니다.
- 메모 생성·수정·삭제, 마이페이지, 아이디·비밀번호 찾기는 버튼 UI만 있습니다.
- 서버 전체 검색·필터, 토큰 갱신, 메모 목록 오류 안내·재시도 UI는 아직 구현하지 않았습니다.

## 4. 파일 구조

```text
src/
├── apis/
│   ├── auth.ts                 # 회원가입·로그인 API
│   ├── axios.ts                # 공통 Axios 인스턴스와 인증 헤더
│   └── memos.ts                # 메모 목록 API
├── assets/fonts/               # Pretendard 폰트
├── components/
│   ├── icons/                  # SVG 아이콘
│   ├── skeletons/
│   │   └── MemoListSkeleton.tsx # 메모 로딩 스켈레톤
│   ├── MemoLists.tsx           # 메모 카드 목록과 빈 상태
│   ├── MemoModal.tsx           # 메모 상세 모달
│   └── Select.tsx              # 카테고리 선택 UI
├── constants/
│   └── tags.ts                 # 카테고리 표시명·색상·선택 옵션
├── data/
│   └── mockData.ts             # 개발용 데이터, 현재 메인 화면에는 미사용
├── hooks/queries/
│   └── useInfiniteMemos.ts     # 무한 스크롤 조회·캐시 관리
├── pages/
│   ├── LoginPage.tsx
│   ├── SignupPage.tsx
│   └── MainPage.tsx
├── routes/
│   ├── PublicRoute.tsx         # 페이지 경로 설정
│   └── ProtectedRoute.tsx      # 인증 여부에 따른 접근 제어
├── stores/
│   └── useAuthStore.ts         # 액세스 토큰 상태
├── types/
│   ├── auth.ts                 # 인증 요청·응답 타입
│   ├── memos.ts                # 메모·페이지 응답 타입
│   └── response.ts             # 공통 API 응답 타입
├── App.tsx                     # 쿼리·라우터 Provider
├── main.tsx                    # 앱 진입점
└── index.css                   # 색상·타이포그래피 테마
```