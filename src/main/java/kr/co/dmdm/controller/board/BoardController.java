package kr.co.dmdm.controller.board;

import kr.co.dmdm.dto.board.BoardDto;
import kr.co.dmdm.dto.board.BoardListDto;
import kr.co.dmdm.dto.board.LikesDto;
import kr.co.dmdm.dto.common.FileDto;
import kr.co.dmdm.global.exception.CustomException;
import kr.co.dmdm.global.exception.ExceptionEnum;
import kr.co.dmdm.jwt.JWTUtil;
import kr.co.dmdm.service.board.BoardService;
import kr.co.dmdm.service.board.BoardServiceImpl;
import kr.co.dmdm.service.common.FileService;
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

    private final FileService fileService;
    private final BoardService boardService;
    private final JWTUtil jwtUtil;

    @PostMapping("/file")
    public FileDto saveFiles(@RequestParam("image") MultipartFile file,
                             @RequestHeader("access") String token) throws IOException {

        String sess = "";

        try {
            sess = jwtUtil.getUsername(token);
        } catch (Exception e) {
            throw new CustomException(ExceptionEnum.SECURITY);
        }

        String fileType = "BOARD";

//        1차로 refId는 사용자 Id 넣음
        fileService.saveFile(file, fileType, sess, sess);

//        이후 저장한거 넘김
        return fileService.findFileByRefNoAndFileType(sess, fileType);
    }

    @PostMapping
    public void saveBoards(@RequestBody Map<String, Object> params,
                           @RequestHeader("access") String token) throws IOException {
        String sess = "";

        try {
            sess = jwtUtil.getUsername(token);
        } catch (Exception e) {
            throw new CustomException(ExceptionEnum.SECURITY);
        }

        params.put("sess", sess);
        boardService.saveBoard(params);
    }

    @GetMapping("/list/{boardType}")
    public Map<String, Object> getBoards(@PathVariable String boardType,
                                         @RequestParam(defaultValue = "1") int page,
                                         @RequestParam(defaultValue = "1") int size,
                                         @RequestParam(defaultValue = "all") String searchType,
                                         @RequestParam(defaultValue = "") String searchData,
                                         @RequestParam(defaultValue = "recent") String sortType,
                                         @RequestHeader("access") String token) throws IOException {
        String sess = "";

        try {
            sess = jwtUtil.getUsername(token);
        } catch (Exception e) {
            log.error("세션없음 빈값처리");
        }

        return boardService.getBoards(boardType, "ACTIVE", page, size, searchType, searchData, sortType, sess);
    }

    @GetMapping("/{boardId}")
    public Map<String, Object> getBoard(@PathVariable int boardId,
                                        @RequestHeader("access") String token) throws IOException {

        String sess = "";

        try {
            sess = jwtUtil.getUsername(token);
        } catch (Exception e) {
            log.error("세션없음 빈값처리");
        }

        return boardService.getBoard(boardId, sess);
    }

    @PostMapping("/likes")
    public void changeLikes(@RequestBody LikesDto likes,
                            @RequestHeader("access") String token) {

        String sess = "";

        try {
            sess = jwtUtil.getUsername(token);
        } catch (Exception e) {
            throw new CustomException(ExceptionEnum.SECURITY);
        }

        likes.setUserId(sess);

        boardService.setLikes(likes);
    }


    @DeleteMapping("/{boardId}")
    public void deleteBoard(@PathVariable Long boardId,
                            @RequestHeader("access") String token) throws IOException {

        String sess = jwtUtil.getUsername(token);
        boardService.deleteBoard(boardId);
    }


}
