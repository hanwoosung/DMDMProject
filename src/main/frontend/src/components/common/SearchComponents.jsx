import Input from "./InputComponents";
import SmallBtn from "./SmallBtnComponents";
import Select from "./SelectComponents";

import SearchStyles from "../../assets/css/common/Search.module.css";

const Search = ({
                    options = [
                        {value: "title", label: "제목"},
                        {value: "content", label: "내용"},
                        {value: "writer", label: "작성자"},
                        {value: "all", label: "전체"},
                    ],
                    btnTitle = "검색",
                    onClick,
                    onSelectChange,
                    onInputChange,
                    selectValue
                },
) => {
    return (
        <div className={SearchStyles.searchWrap}>
            <Select options={options}
                    width={100}
                    value={selectValue}
                    onChange={onSelectChange} />

            <Input onChange={(e) => {
                onInputChange(e.target.value);
            }} />

            <SmallBtn title={btnTitle}
                      onClick={onClick} />
        </div>
    );

}

export default Search;

