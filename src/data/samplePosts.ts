export type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  created_at: string;
};

export const samplePosts: Post[] = [
  {
    id: 1,
    title: "React useState 기초 정리",
    content:
      "useState는 컴포넌트 안에서 값을 기억하는 Hook이다.\n\nconst [count, setCount] = useState(0); 처럼 쓰고, 값을 바꿀 때는 반드시 setCount를 사용한다. setter를 호출하면 컴포넌트가 다시 렌더링된다.",
    author: "노트 주인",
    created_at: "2026-09-28T21:30:00+09:00",
  },
  {
    id: 2,
    title: "TypeScript type과 interface 차이",
    content:
      "둘 다 객체의 모양을 정의할 수 있다.\n\ninterface는 같은 이름으로 다시 선언하면 합쳐지고, type은 유니온(|)이나 교차(&) 같은 조합 표현에 더 자유롭다. 작은 프로젝트에서는 한 가지로 통일해서 쓰면 충분하다.",
    author: "노트 주인",
    created_at: "2026-09-30T20:10:00+09:00",
  },
  {
    id: 3,
    title: "Git 커밋 메시지 잘 쓰는 법",
    content:
      "제목은 50자 안쪽으로, 무엇을 바꿨는지 한 줄로 쓴다.\n\n본문에는 왜 바꿨는지를 적는다. 예: 'fix: 글 목록 정렬 순서 오류 수정'. 작업 단위를 작게 나누면 메시지도 자연스럽게 짧아진다.",
    author: "노트 주인",
    created_at: "2026-10-02T22:45:00+09:00",
  },
];
