import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useMemo } from "react";
interface QuillPropsType {
  value: string;
  onChange: string;
}
const QuillEditor = ({ value, onChange }: QuillPropsType) => {
  const [contents, setContents] = useState(""); // title과 합치는게 좋을거같아 BoardCreateOrEdit로 옮길예정

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ size: ["small", false, "large", "huge"] }, { color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
          ],
          ["image", "video"],
        ],
      },
    }),
    []
  );
  return (
    <div>
      <ReactQuill
        modules={modules}
        theme="snow"
        placeholder="내용을 입력해주세요."
        style={{
          height: "430px",
          marginBottom: "60px",
          width: "840px",
        }}
        value={contents} //
        onChange={setContents} //
      />
    </div>
  );
};
export default QuillEditor;
