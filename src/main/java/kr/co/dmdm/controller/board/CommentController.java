package kr.co.dmdm.controller.board;

import kr.co.dmdm.dto.board.CommentDto;
import kr.co.dmdm.dto.board.CommentRequestDto;
import kr.co.dmdm.dto.board.LikesDto;
import kr.co.dmdm.dto.common.FileDto;
import kr.co.dmdm.service.board.BoardService;
import kr.co.dmdm.service.common.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@RequestMapping("/api/v1/comment")
@Slf4j
public class CommentController {

    private final BoardService boardService;

    @PostMapping
    public List<CommentDto> saveComment(@RequestBody CommentRequestDto comment){

        comment.setUserId("yiok79");

        return boardService.saveComment(comment);
    }



}
