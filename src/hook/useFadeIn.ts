import { useEffect, useRef, useState } from "react";

// 스크롤 시 요소가 화면에 들어오면 페이드 인 상태를 반환하는 커스텀 훅
const useFadeIn = () => {
  const ref = useRef<HTMLDivElement | null>(null); // 관찰할 DOM 요소에 연결할 ref

  // 요소가 보이면 true로 바뀌는 상태
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    // IntersectionObserver 생성: 요소가 뷰포트에 들어올 때 콜백 실행
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 요소가 화면에 10% 이상 보이면 true로 설정
        if (entry.isIntersecting) setVisible(true);
      },
      {
        threshold: 0.1, // 10% 이상 보이면 트리거
      }
    );

    // 요소(ref)가 존재하면 관찰 시작
    if (ref.current) observer.observe(ref.current);

    // 컴포넌트 언마운트 시 관찰 중단
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

export default useFadeIn;
