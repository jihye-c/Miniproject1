// main.js
import mainHeader from "./mainHeader.js";
import axiosInstance from "./axiosInstance.js";

async function render(path = "", query) {
  const pathArr = path.split("/");
  const response = await axiosInstance.get(`/documents/${pathArr[2]}`);
  let data;
  try {
    data = await response.data;
  } catch (error) {}

  return await body(data);

  // if (response.status === 200 && data?.id > 0) {
  //   return await body(data);
  // } else {
  //   const response = await axiosInstance.get("/documents");
  //   const data = await response.data;
  //   const newId = Number(data[data.length - 1].id) + 1;
  //   return await body({
  //     id: newId,
  //     title: "새로운 글 제목",
  //     content: "내용을 입력 바랍니다.",
  //   });
  // }
}

async function body(data) {
  let header = await mainHeader(data);
  let pre_main = `  
  <div class="flex-shrink-1" >
    <div id="did" class="d-none">${data.id}</div>`;
  let sub_posts = "";
  data.documents.forEach((document) => {
    // TODO: navigation으로 변경하기
    sub_posts += `
    <button id=${document.id} class="item-container btn btn-outline-light w-100 d-flex gap-2 align-items-center" onclick="navigater('/app/${document.id}');">
      <i class="fa-regular fa-note-sticky" style="pointer-events:none;"></i>
      <u class="link-secondary" style="pointer-events:none;">${document.title}</u>
    </button>
    `;
  });

  let post_main = `
  <div class="m-3 mt-5 ps-5 pe-5" style="overflow-y: auto; height: 100%;"  >
      <!-- 제목 -->
      <div class="mb-3">
        <blockquote id="title" class="h2 p-1 fw-semibold" contenteditable="true">${data.title}</blockquote>
      </div>
      <!-- 컨텐츠 -->
      <div>
        <blockquote id="contents" class="p-1 fw-medium" contenteditable="true">
          ${data.content ? data.content : ""}
        </blockquote>
        <div id="documentsList" class="d-flex flex-column gap-1">
          ${sub_posts}
        </div>
      </div>
      </div>
    </div>
  </div>`;
  return pre_main + header + post_main;
}

export default render;
