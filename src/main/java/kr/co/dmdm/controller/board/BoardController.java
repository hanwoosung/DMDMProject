package kr.co.dmdm.controller.board;

import kr.co.dmdm.dto.board.BoardDto;
import kr.co.dmdm.dto.board.BoardListDto;
import kr.co.dmdm.dto.common.FileDto;
import kr.co.dmdm.service.board.BoardServiceImpl;
import kr.co.dmdm.service.common.FileServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.weaver.ast.Var;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * 패키지명        : kr.co.dmdm.controller.board
 * 파일명          : BoardController
 * 작성자          : 김상준
 * 일자            : 2025-01-23
 * 내용            :
 * ===========================================================
 * 일자              작성자             메모
 * -----------------------------------------------------------
 * 2025-01-23        김상준            최초 생성
 */

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/board")
@Slf4j
public class BoardController {

    private final FileServiceImpl fileService;
    private final BoardServiceImpl boardService;

    @PostMapping("/file")
    public FileDto saveFiles(@RequestParam("image") MultipartFile file) throws IOException {

        String fileType = "BOARD";
        String userId = "yiok79";

//        1차로 refId는 사용자 Id 넣음
        fileService.saveFile(file, fileType, userId, userId);

//        이후 저장한거 넘김
        return fileService.findFileByRefNoAndFileType(userId, fileType);
    }

    @PostMapping
    public void saveBoards(@RequestBody Map<String, Object> params) throws IOException {
        boardService.saveBoard(params);
    }

    @GetMapping("/{boardType}")
    public List<BoardListDto> getBoards(@PathVariable String boardType) throws IOException {
        return boardService.getBoards(boardType, "ACTIVE");
    }

}
