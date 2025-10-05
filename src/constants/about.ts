import {
  구일호,
  김민정,
  김상우,
  박상아,
  정일혁,
  최서윤,
  홍성진,
} from "./../assets/images/about/index";

interface About {
  name: string;
  position: string;
  photo: string;
}

/* 복사하여 사용
    {
      name: "",
      position: "",
      photo: ,
    },
  */

export const about: About[] = [
  {
    name: "김민정",
    position: "대표",
    photo: 김민정,
  },
  {
    name: "홍성진",
    position: "이사",
    photo: 홍성진,
  },
  {
    name: "김상우",
    position: "이사",
    photo: 김상우,
  },
  {
    name: "정일혁",
    position: "이사",
    photo: 정일혁,
  },
  {
    name: "구일호",
    position: "본부장",
    photo: 구일호,
  },

  {
    name: "최서윤",
    position: "본부장",
    photo: 최서윤,
  },

  {
    name: "박상아",
    position: "팀장",
    photo: 박상아,
  },
];
