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
                    ]
                },
                btnTitle = "검색") => {
    return (
        <div className={SearchStyles.searchWrap}>
            <Select options={options}
                    width={100} />
            <Input />
            <SmallBtn title={btnTitle} />
        </div>
    );

}

export default Search;

