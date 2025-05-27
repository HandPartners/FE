import { useCallback, useState, useEffect } from "react";
import BGTop from "../../components/BGTop";
import bannerImg from "../../assets/images/banner/portfolioBanner.png";
import PortfolioSection from "../../components/portfolio/PortfolioSection";
import PortfolioAddModal from "../../components/portfolio/modal/AddPortfolioModal";
import EditProtfolioModal from "../../components/portfolio/modal/EditPortfolioModal";
import DeleteModal from "../../components/portfolio/modal/DeleteModal";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import {
  addPortfolio,
  editPortfolio,
  getPortfolio,
  deletePortfolio,
} from "../../api/PortfolioApi";
import type {
  AddPortfolioBody,
  ResponsePortfolioList,
} from "../../api/PortfolioApi";

const AdminPortfolio = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [portfolioId, setPortfolioId] = useState<number>(1);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [portfolioList, setPortfolioList] = useState<ResponsePortfolioList>();

  const [formData, setFormData] = useState<AddPortfolioBody>({
    category: "ICT",
    name: "",
    content: "",
    logo: new File([], ""), // 초기값으로 빈 파일 생성
  });

  const initialFormData: AddPortfolioBody = {
    category: "ICT",
    name: "",
    content: "",
    logo: new File([], ""), // 빈 파일로 초기화
  };

  // 포트폴리오 리스트 불러오기 API 연결
  const fetchPortfolioList = useCallback(async () => {
    try {
      const portfolio = await getPortfolio({
        category,
        name,
      });
      setPortfolioList(portfolio);
      console.log(portfolio);
    } catch (error) {
      console.error("Error getPortfolio:", error);
    }
  }, [category, name]);

  useEffect(() => {
    fetchPortfolioList();
  }, [fetchPortfolioList]);

  // 포트폴리오 추가 API 연결
  const handleSubmit = async () => {
    try {
      console.log("formData 상태:", formData);
      console.log("File 타입 확인:", formData.logo instanceof File);

      // 입력값 유효성 검사
      if (
        !formData.category.trim() ||
        !formData.name.trim() ||
        !formData.content.trim() ||
        !formData.logo ||
        !(formData.logo instanceof File) ||
        formData.logo.size === 0
      ) {
        alert("모든 내용을 입력해주세요.");
        return;
      }

      const response = await addPortfolio(formData);
      if (response.success) {
        alert("포트폴리오가 추가되었습니다!");
        setAddModalOpen(false); // 모달 닫기
        fetchPortfolioList(); // ✅ 리스트 갱신
      }
    } catch (error) {
      console.error(error);
      alert("포트폴리오 추가에 실패했습니다.");
    }
  };

  //  수정 API 연결
  const handleEdit = async () => {
    const data = new FormData();

    if (formData.category.trim()) data.append("category", formData.category);
    if (formData.name.trim()) data.append("name", formData.name);
    if (formData.content.trim()) data.append("content", formData.content);
    if (formData.logo) {
      data.append("logo", formData.logo);
    }

    data.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    try {
      const result = await editPortfolio({ id: portfolioId, formData: data });

      if (result.success) {
        alert("수정되었습니다.");
        setEditModalOpen(false);
        setFormData(initialFormData);
        fetchPortfolioList();
      }
    } catch (error) {
      console.error(error);
      alert("포트폴리오 수정에 실패했습니다.");
    }
  };

  const handleDelete = async () => {
    try {
      const result = await deletePortfolio({ id: portfolioId });
      if (result.success) {
        alert("삭제되었습니다.");
        setEditModalOpen(false);
        setDeleteModalOpen(false);
        fetchPortfolioList();
      }
    } catch (error) {
      console.error(error);
      alert("포트폴리오 삭제에 실패했습니다.");
    }
  };

  return (
    <main className=" flex flex-col items-center w-[1280px] max-w-full mx-auto relative h-[100vw] ">
      {/* 배너 */}
      <div className="absolute top-[99px] left-[85px] z-10 flex flex-col  gap-[36px] w-fit">
        <h1 className="text-[48px] font-bold leading-[60px] tracking-[-0.96px]">
          Portfolio
        </h1>
        <h3 className="h3-medium">한줄 소개</h3>
      </div>
      <BGTop testBenner={bannerImg} />

      {/* 포트폴리오 추가 버튼 */}
      <div className="flex justify-end w-full">
        <button
          className="h5-bold cursor-pointer transition-colors duration-250 ease-in-out hover:text-[#FFF] flex bg-[var(--sub)] rounded-[30px] px-[40px] py-[16px] my-[50px] items-end"
          onClick={() => setAddModalOpen(true)}
        >
          포트폴리오 추가
        </button>
      </div>

      {/* 포트폴리오 리스트 */}
      <section className="flex flex-col  gap-[371px] mx-auto w-full h-full  ">
        <PortfolioSection
          portfolioList={portfolioList}
          setIsEditModalOpen={setEditModalOpen}
          setPortfolioId={setPortfolioId}
          setFormData={setFormData}
          category={category}
          setCategory={setCategory}
          setName={setName}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          isAdmin={true}
        />
      </section>

      {/* 추가 모달 */}
      {isAddModalOpen && (
        <PortfolioAddModal
          onClose={() => {
            setAddModalOpen(false);
            setFormData(initialFormData); // 💡 모달 닫을 때 초기화
          }}
          formData={formData}
          setFormData={setFormData}
          onSubmit={() => {
            handleSubmit();
            setFormData(initialFormData); // 💡 모달 닫을 때 초기화
          }}
        ></PortfolioAddModal>
      )}

      {/* 수정 모달 */}
      {isEditModalOpen && (
        <EditProtfolioModal
          onDelete={() => setDeleteModalOpen(true)}
          formData={formData}
          setFormData={setFormData}
          onModify={() => {
            handleEdit();
          }}
          onClose={() => {
            setEditModalOpen(false);
            setFormData(initialFormData); // 💡 수정 모달 닫을 때도 초기화
          }}
        ></EditProtfolioModal>
      )}

      {deleteModalOpen && (
        <DeleteModal
          onDelete={() => {
            handleDelete();
            setDeleteModalOpen(false);
            setEditModalOpen(false);
          }}
          onClose={() => {
            setDeleteModalOpen(false);
          }}
        ></DeleteModal>
      )}
      <ScrollToTopButton />
    </main>
  );
};

export default AdminPortfolio;
