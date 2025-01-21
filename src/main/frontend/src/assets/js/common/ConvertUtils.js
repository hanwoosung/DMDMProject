const ConvertUtils = {
    /**
     * 숫자에 콤마 추가
     * @param {number|string} num - 숫자 또는 숫자 문자열
     * @returns {string} 콤마가 추가된 문자열
     */
    addComma(num) {
        if (num === null || num === undefined) {
            throw new Error("입력값이 null 또는 undefined입니다.");
        }
        if (isNaN(num)) {
            throw new Error("유효한 숫자가 아닙니다.");
        }
        return Number(num).toLocaleString("en-US");
    },

    /**
     * 숫자에서 콤마 제거
     * @param {string} str - 콤마가 포함된 숫자 문자열
     * @returns {string} 콤마가 제거된 문자열
     */
    removeComma(str) {
        if (typeof str !== "string") {
            throw new Error("입력값은 문자열이어야 합니다.");
        }
        return str.replace(/,/g, "");
    }
};

export default ConvertUtils;